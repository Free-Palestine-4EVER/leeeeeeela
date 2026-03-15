import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const API_BASE = 'https://yce-api-01.perfectcorp.com';
const API_KEY = process.env.PERFECTCORP_API_KEY || 'sk-ZiHKw1wa9oqgYijb4P-3OSkxb7GJPULxh5LHv5r7QT9txVs5GfpeCNVW6iV7zrm_';
const SECRET_KEY = process.env.PERFECTCORP_SECRET_KEY || 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbPK82l3Vl+J1555NQDkHGkDP1K6qUS79DY4q90oh5/yQaiZ3ZkDb9kbbjZTqUzYUSHeOEzAALXyR34LK4RuySacUGGAqNQODlvp0H1UVPLsfowleFQitY86OUHxpXtDIejwzv41ChLWoUtCt388fIJDK2iyh2U1XRf4Q7o12I0wIDAQAB';

async function getAccessToken(): Promise<string> {
  const pubKeyPem = '-----BEGIN PUBLIC KEY-----\n' + SECRET_KEY.match(/.{1,64}/g)!.join('\n') + '\n-----END PUBLIC KEY-----';
  const timestamp = Date.now();
  const payload = `client_id=${API_KEY}&timestamp=${timestamp}`;
  const encrypted = crypto.publicEncrypt(
    { key: pubKeyPem, padding: crypto.constants.RSA_PKCS1_PADDING },
    Buffer.from(payload)
  );
  const idToken = encrypted.toString('base64');

  const res = await fetch(`${API_BASE}/s2s/v1.0/client/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: API_KEY, id_token: idToken }),
  });
  const data = await res.json();
  if (data.status !== 200) throw new Error('Auth failed: ' + JSON.stringify(data));
  return data.result.access_token;
}

async function createFile(token: string, taskType: string): Promise<{ fileId: string; uploadUrl: string }> {
  const res = await fetch(`${API_BASE}/s2s/v1.0/file/${taskType}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ files: [{ content_type: 'image/jpg', file_name: 'selfie.jpg' }] }),
  });
  const data = await res.json();
  if (data.status !== 200) throw new Error('File creation failed: ' + JSON.stringify(data));
  const file = data.result.files[0];
  return { fileId: file.file_id, uploadUrl: file.requests[0].url };
}

async function uploadFile(uploadUrl: string, imageBuffer: Buffer) {
  const res = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': 'image/jpg' },
    body: new Uint8Array(imageBuffer),
  });
  if (!res.ok) throw new Error('Upload failed: ' + res.status);
}

async function runTask(
  token: string,
  taskType: string,
  fileId: string,
  styleGroupId: number,
  styleId: number,
  requestId: number
): Promise<string> {
  const res = await fetch(`${API_BASE}/s2s/v1.0/task/${taskType}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      request_id: requestId,
      payload: {
        file_sets: { src_ids: [fileId] },
        actions: [{ id: 0, params: { style_group_id: styleGroupId, style_ids: [styleId] } }],
        output_ext: 'jpg',
      },
    }),
  });
  const data = await res.json();
  if (data.status !== 200) throw new Error('Task creation failed: ' + JSON.stringify(data));
  return data.result.task_id;
}

async function pollTask(token: string, taskType: string, taskId: string): Promise<string> {
  const maxAttempts = 60;
  for (let i = 0; i < maxAttempts; i++) {
    const res = await fetch(
      `${API_BASE}/s2s/v1.0/task/${taskType}?task_id=${encodeURIComponent(taskId)}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    if (data.result?.status === 'success') {
      return data.result.results[0].data[0].url;
    }
    if (data.result?.status === 'error') {
      throw new Error('Task failed: ' + (data.result.error || 'unknown'));
    }
    const interval = data.result?.polling_interval || 1000;
    await new Promise((r) => setTimeout(r, Math.max(interval, 500)));
  }
  throw new Error('Task timed out');
}

export async function POST(req: NextRequest) {
  try {
    const { image, styleGroupId, styleId, taskType = 'hair-style' } = await req.json();

    if (!image || !styleGroupId || !styleId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Decode base64 image
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // 1. Auth
    const token = await getAccessToken();

    // 2. Create file slot
    const { fileId, uploadUrl } = await createFile(token, taskType);

    // 3. Upload image
    await uploadFile(uploadUrl, imageBuffer);

    // 4. Run task
    const requestId = Math.floor(Math.random() * 1000000);
    const taskId = await runTask(token, taskType, fileId, styleGroupId, styleId, requestId);

    // 5. Poll for result
    const resultUrl = await pollTask(token, taskType, taskId);

    return NextResponse.json({ resultUrl });
  } catch (error: any) {
    console.error('Try-on API error:', error);
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}
