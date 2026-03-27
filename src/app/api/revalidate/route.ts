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
      console.warn('[revalidate] Invalid webhook signature')
      return new NextResponse('Invalid signature', { status: 401 })
    }

    if (!body?._type) {
      console.warn('[revalidate] Missing _type in webhook body')
      return new NextResponse('Bad request', { status: 400 })
    }

    console.log(`[revalidate] Revalidating type=${body._type} slug=${body.slug?.current || 'none'}`)

    revalidateTag(body._type, 'max')

    if (body.slug?.current) {
      revalidateTag(`${body._type}:${body.slug.current}`, 'max')
    }

    // Always revalidate shared layout data
    revalidateTag('siteSettings', 'max')
    revalidateTag('testimonial', 'max')
    revalidateTag('enterpriseSalesPage', 'max')
    revalidateTag('homepage', 'max')
    revalidateTag('contentPost', 'max')

    return NextResponse.json({ revalidated: true, type: body._type, now: Date.now() })
  } catch (err) {
    console.error('[revalidate] Error:', err)
    return new NextResponse('Error', { status: 500 })
  }
}
