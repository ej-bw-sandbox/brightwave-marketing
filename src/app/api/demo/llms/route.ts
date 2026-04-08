export async function GET() {
  const res = await fetch('https://api.anam.ai/v1/llms', {
    headers: { Authorization: `Bearer ${process.env.ANAM_API_KEY}` },
    next: { revalidate: 3600 },
  })
  if (!res.ok) return Response.json({ error: 'Failed to fetch LLMs' }, { status: 502 })
  const data = await res.json()
  return Response.json(data)
}
