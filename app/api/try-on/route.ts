import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.PERFECTCORP_API_KEY || 'sk-ZiHKw1wa9oqgYijb4P-3OSkxb7GJPULxh5LHv5r7QT9txVs5GfpeCNVW6iV7zrm_';
const BASE = 'https://yce-api-01.makeupar.com/s2s/v2.0';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');

  // List templates
  if (action === 'templates') {
    const pageSize = searchParams.get('page_size') || '20';
    const startingToken = searchParams.get('starting_token');
    let url = `${BASE}/task/template/hair-style?page_size=${pageSize}`;
    if (startingToken) url += `&starting_token=${startingToken}`;

    const resp = await fetch(url, {
      headers: { 'Authorization': `Bearer ${API_KEY}` },
    });
    const data = await resp.json();
    return NextResponse.json(data);
  }

  // Check task status
  if (action === 'status') {
    const taskId = searchParams.get('task_id');
    if (!taskId) return NextResponse.json({ error: 'task_id required' }, { status: 400 });

    const resp = await fetch(`${BASE}/task/hair-style/${taskId}`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` },
    });
    const data = await resp.json();
    return NextResponse.json(data);
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { src_file_url, src_file_id, template_id } = body;

  if ((!src_file_url && !src_file_id) || !template_id) {
    return NextResponse.json({ error: 'src_file_url or src_file_id, and template_id required' }, { status: 400 });
  }

  // Build task payload
  const taskBody: Record<string, string> = { template_id };
  if (src_file_id) {
    taskBody.src_file_id = src_file_id;
  } else {
    taskBody.src_file_url = src_file_url;
  }

  // Run hairstyle task
  const resp = await fetch(`${BASE}/task/hair-style`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskBody),
  });
  const data = await resp.json();
  return NextResponse.json(data);
}
