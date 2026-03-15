import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.PERFECTCORP_API_KEY || 'sk-ZiHKw1wa9oqgYijb4P-3OSkxb7GJPULxh5LHv5r7QT9txVs5GfpeCNVW6iV7zrm_';
const BASE = 'https://yce-api-01.makeupar.com/s2s/v2.0';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  // 1. Create file entry to get upload URL
  const fileResp = await fetch(`${BASE}/file/hair-style`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      files: [{ content_type: file.type || 'image/jpeg', file_name: file.name || 'photo.jpg' }]
    }),
  });
  
  // V2 file endpoint might not exist, use v1
  if (!fileResp.ok) {
    // Try v1.0 endpoint
    const v1Resp = await fetch('https://yce-api-01.makeupar.com/s2s/v1.0/file/hair-style', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        files: [{ content_type: file.type || 'image/jpeg', file_name: file.name || 'photo.jpg' }]
      }),
    });
    const v1Data = await v1Resp.json();
    if (v1Data.status !== 200) {
      return NextResponse.json({ error: 'Failed to create file entry', details: v1Data }, { status: 500 });
    }
    
    const fileInfo = v1Data.result.files[0];
    const uploadUrl = fileInfo.requests[0].url;
    
    // 2. Upload the file
    const fileBuffer = await file.arrayBuffer();
    const uploadResp = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type || 'image/jpeg' },
      body: fileBuffer,
    });
    
    if (!uploadResp.ok) {
      return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
    
    return NextResponse.json({ 
      status: 200, 
      file_id: fileInfo.file_id,
    });
  }

  const data = await fileResp.json();
  if (data.status !== 200) {
    return NextResponse.json({ error: 'Failed to create file', details: data }, { status: 500 });
  }

  const fileInfo = data.result.files[0];
  const uploadUrl = fileInfo.requests[0].url;
  
  const fileBuffer = await file.arrayBuffer();
  await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type || 'image/jpeg' },
    body: fileBuffer,
  });

  return NextResponse.json({ status: 200, file_id: fileInfo.file_id });
}
