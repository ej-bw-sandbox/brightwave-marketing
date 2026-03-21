import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { eventsIndexQuery } from '@/lib/sanity/queries/events'

export const metadata: Metadata = {
  title: 'Events | Brightwave',
  description: 'Upcoming events and conferences.',
}

export default async function Page() {
  let upcoming: any[] = []
  let past: any[] = []
  try {
    const data = await client.fetch(
      eventsIndexQuery,
      {},
      { next: { tags: ['virtualEvent'], revalidate: 3600 } }
    )
    upcoming = data?.upcoming ?? []
    past = data?.past ?? []
  } catch { upcoming = []; past = [] }

  const allEvents = [...upcoming, ...past]

  return (
    <>
<section className="c-section cc-event_hero">
        <div className="c-container">
          <div className="c-events-hero_main"><img src="/webflow-images/events-hero_1.avif" loading="lazy" alt="" className="c-image" />
            <div className="c-event-hero_title">
              <h2 className="c-event-title">EXPLORE</h2>
              <div className="c-event-title_wrapper">
                <div className="c-event-title_span">
                  <h2 className="c-event-title">THE</h2>
                </div>
                <h2 className="c-event-title">PLATFORM</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="c-section cc-event-list">
        <div className="c-container">
          <div className="c-event w-dyn-list">
            {allEvents.length > 0 ? (
            <div role="list" className="c-event-list w-dyn-items">
              {allEvents.map((evt: any) => (
              <div key={evt.slug?.current || evt.title} role="listitem" className="c-event-item w-dyn-item">
                {evt.thumbnailImage?.asset?.url ? (
                  <img src={evt.thumbnailImage.asset.url} loading="lazy" alt={evt.title || ''} className="c-event-item_image" />
                ) : (
                  <img src="/webflow-images/illustration_Investment-Intelligence-Engine_1.avif" loading="lazy" alt="" className="c-event-item_image" />
                )}
                <div className="c-event-item_box">
                  <h2 className="c-title-3">{evt.title}</h2>
                  <p className="c-text-4">{evt.description || ''}</p>
                  {evt.startDate && (
                    <p className="c-text-6">{new Date(evt.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}{evt.city ? ` - ${evt.city}` : ''}</p>
                  )}
                </div>
                <Link stagger-cta="" href={`/events/${evt.slug?.current || ''}`} className="cta-p-sm w-inline-block">
                  <div>
                    <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">Learn More</div>
                  </div>
                  <div className="flip-small">
                    <div className="flip-bg"></div>
                  </div>
                  <div className="flip-big">
                    <div className="svg cta-sm-arrow w-embed"><svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_774_4073)">
                          <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                          <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_774_4073">
                            <rect width={12} height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)"></rect>
                          </clipPath>
                        </defs>
                      </svg></div>
                  </div>
                </Link>
              </div>
              ))}
            </div>
            ) : (
            <div className="w-dyn-empty">
              <div>No items found.</div>
            </div>
            )}
          </div>
        </div>
      </section>
      
    </>
  )
}
