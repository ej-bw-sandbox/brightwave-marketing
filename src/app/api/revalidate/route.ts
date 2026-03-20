import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string
      slug?: { current: string }
    }>(req, process.env.SANITY_WEBHOOK_SECRET)

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 })
    }

    if (!body?._type) {
      return new NextResponse('Bad request', { status: 400 })
    }

    revalidateTag(body._type, 'max')

    if (body.slug?.current) {
      revalidateTag(`${body._type}:${body.slug.current}`, 'max')
    }

    revalidateTag('siteSettings', 'max')

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return new NextResponse('Error', { status: 500 })
  }
}
