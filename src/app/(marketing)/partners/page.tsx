import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { partnersQuery } from '@/lib/sanity/queries/partners'
import { buildMetadata } from '@/lib/metadata'
import { PortableText } from '@portabletext/react'
import { ptComponents } from '@/lib/sanity/portable-text-components'
import { LottiePlayer } from '@/components/ui/LottiePlayer'
import { StepCtaSection } from '@/components/sections/StepCtaSection'
import ContactForm from '@/components/forms/ContactForm'

interface PartnersPageDoc {
  title: string
  description: string
  heroHeading: string
  heroSubtitlePrefix: string
  heroSubtitleBold: string
  heroSubtitleSuffix: string
  heroCta: { label: string; url: string; openInNewTab?: boolean }
  infoEyebrow: string
  infoHeading: string
  infoCardTitle: string
  infoCardBullets: string[]
  infoCardCta: { label: string; url: string; openInNewTab?: boolean }
  proofEyebrow: string
  proofPoints: { stat: string; description: string }[]
  partnerListHeading: string
  partnerListCta: { label: string; url: string; openInNewTab?: boolean }
  partnerTypes: string[]
  calloutHeading: string
  calloutParagraphs: string[]
  calloutCta: { label: string; url: string; openInNewTab?: boolean }
  aboutHeading: string
  aboutParagraphs: string[]
  faqHeading: string
  faq: { question: string; answer: any }[]
  contactForm?: {
    formTitle?: string
    formSubtitle?: string
    formVariant?: 'contact' | 'referral' | 'partners'
    fields?: any[]
    referralCodeField?: any
    partnerTypeField?: any
    submitButtonText?: string
    successMessage?: string
    errorMessage?: string
    apiEndpoint?: string
    notificationEmail?: string
  }
  stepCtaHeading?: string
  stepCtaButtonLabel?: string
  stepCtaButtonUrl?: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: any
    noIndex?: boolean
  }
}

const fetchOptions = { next: { tags: ['partnersPage', 'contactForm'] as string[], revalidate: 60 } }

export async function generateMetadata(): Promise<Metadata> {
  const doc = await client.fetch<PartnersPageDoc | null>(partnersQuery, {}, fetchOptions)
  if (!doc) return {}
  return buildMetadata({
    title: doc.title,
    description: doc.description,
    seo: doc.seo,
    path: '/partners',
  })
}

/* SVG icons kept in code — not CMS-managed */
const ArrowSvg = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_774_4073)">
      <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
      <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
    </g>
    <defs>
      <clipPath id="clip0_774_4073">
        <rect width="12" height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)"></rect>
      </clipPath>
    </defs>
  </svg>
)

const ChevronSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)

const BrightwaveIconSvg = () => (
  <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.0629 8.24795V11.6458L10.6195 12.0987L6.84943 8.24795C6.84943 8.05359 6.84943 7.94459 6.84943 7.75024L11.4369 3.06457L11.5083 2.99165C11.6277 2.94114 11.7334 2.89634 11.8528 2.84583H14.1301C14.3204 3.04018 14.4276 3.14943 14.6182 3.34378V7.25377C14.4284 7.44763 14.3221 7.55613 14.1323 7.74999H11.5502L11.0629 8.2477V8.24795Z" fill="white"></path>
    <path d="M0 2.84589L0.434168 2.39895L2.78627 4.80139C3.05525 4.80139 3.20655 4.80139 3.47553 4.80139L6.01817 2.20435L8.17634 0H8.86535L11.0635 2.24516V2.74287L10.9626 2.84589L6.50569 7.39818L6.30396 7.60423L5.95945 7.75006H0.488013C0.29773 7.5557 0.191015 7.4467 0.000731636 7.25235V7.24439" fill="white"></path>
    <path d="M0 8.75335V13.1518L0.436117 13.5973L2.78627 11.1968C3.05525 11.1968 3.20655 11.1968 3.47553 11.1968L6.49936 14.2854L8.17828 16C8.44751 16 8.59832 16 8.8673 16L11.0635 13.7568V13.2551L10.9626 13.1521L6.50569 8.5998L6.30396 8.39375C6.18457 8.34324 6.07883 8.29844 5.95945 8.24792H0.488013C0.29773 8.44228 0.191015 8.55128 0.000731636 8.74563V8.7536L0 8.75335Z" fill="currentColor"></path>
    <path d="M12.0376 8.24792H14.1309C14.3212 8.44228 14.4279 8.55128 14.6182 8.74563V12.6541C14.4279 12.8485 14.3212 12.9575 14.1309 13.1518H12.0376L11.5503 12.6541V8.74563L12.0376 8.24792Z" fill="white"></path>
  </svg>
)

const partnerIconSvgs = [
  /* Private markets investors */
  <svg key="icon-0" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="4" fill="#E7E70D"></rect><mask id="mask0_5757_19561" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="8" y="8" width="24" height="24"><rect x="8" y="8" width="24" height="24" fill="currentColor"></rect></mask><g mask="url(#mask0_5757_19561)"><path d="M20 30C18.6167 30 17.3167 29.7375 16.1 29.2125C14.8833 28.6875 13.825 27.975 12.925 27.075C12.025 26.175 11.3125 25.1167 10.7875 23.9C10.2625 22.6833 10 21.3833 10 20C10 18.6167 10.2625 17.3167 10.7875 16.1C11.3125 14.8833 12.025 13.825 12.925 12.925C13.825 12.025 14.8833 11.3125 16.1 10.7875C17.3167 10.2625 18.6167 10 20 10C21.3833 10 22.6833 10.2625 23.9 10.7875C25.1167 11.3125 26.175 12.025 27.075 12.925C27.975 13.825 28.6875 14.8833 29.2125 16.1C29.7375 17.3167 30 18.6167 30 20C30 21.3833 29.7375 22.6833 29.2125 23.9C28.6875 25.1167 27.975 26.175 27.075 27.075C26.175 27.975 25.1167 28.6875 23.9 29.2125C22.6833 29.7375 21.3833 30 20 30ZM20 28C22.2333 28 24.125 27.225 25.675 25.675C27.225 24.125 28 22.2333 28 20C28 17.7667 27.225 15.875 25.675 14.325C24.125 12.775 22.2333 12 20 12C17.7667 12 15.875 12.775 14.325 14.325C12.775 15.875 12 17.7667 12 20C12 22.2333 12.775 24.125 14.325 25.675C15.875 27.225 17.7667 28 20 28ZM20.5875 26.7375C20.7625 26.5625 20.85 26.3583 20.85 26.125V25.75C21.6833 25.6 22.4 25.275 23 24.775C23.6 24.275 23.9 23.5333 23.9 22.55C23.9 21.85 23.7 21.2083 23.3 20.625C22.9 20.0417 22.1 19.5333 20.9 19.1C19.9 18.7667 19.2083 18.475 18.825 18.225C18.4417 17.975 18.25 17.6333 18.25 17.2C18.25 16.7667 18.4042 16.425 18.7125 16.175C19.0208 15.925 19.4667 15.8 20.05 15.8C20.3833 15.8 20.675 15.8583 20.925 15.975C21.175 16.0917 21.3833 16.25 21.55 16.45C21.7167 16.65 21.9042 16.7875 22.1125 16.8625C22.3208 16.9375 22.5167 16.9333 22.7 16.85C22.95 16.75 23.1208 16.5792 23.2125 16.3375C23.3042 16.0958 23.2833 15.875 23.15 15.675C22.8833 15.2917 22.5542 14.9667 22.1625 14.7C21.7708 14.4333 21.35 14.2833 20.9 14.25V13.875C20.9 13.6417 20.8125 13.4375 20.6375 13.2625C20.4625 13.0875 20.2583 13 20.025 13C19.7917 13 19.5875 13.0875 19.4125 13.2625C19.2375 13.4375 19.15 13.6417 19.15 13.875V14.25C18.3167 14.4333 17.6667 14.8 17.2 15.35C16.7333 15.9 16.5 16.5167 16.5 17.2C16.5 17.9833 16.7292 18.6167 17.1875 19.1C17.6458 19.5833 18.3667 20 19.35 20.35C20.4 20.7333 21.1292 21.075 21.5375 21.375C21.9458 21.675 22.15 22.0667 22.15 22.55C22.15 23.1 21.9542 23.5042 21.5625 23.7625C21.1708 24.0208 20.7 24.15 20.15 24.15C19.7167 24.15 19.325 24.0458 18.975 23.8375C18.625 23.6292 18.3333 23.3167 18.1 22.9C17.9667 22.6667 17.7917 22.5083 17.575 22.425C17.3583 22.3417 17.1417 22.3417 16.925 22.425C16.6917 22.5083 16.5208 22.6667 16.4125 22.9C16.3042 23.1333 16.3 23.3583 16.4 23.575C16.6667 24.1417 17.025 24.6042 17.475 24.9625C17.925 25.3208 18.4667 25.5667 19.1 25.7V26.125C19.1 26.3583 19.1875 26.5625 19.3625 26.7375C19.5375 26.9125 19.7417 27 19.975 27C20.2083 27 20.4125 26.9125 20.5875 26.7375Z" fill="currentColor"></path></g></svg>,
  /* Financial technology consultants */
  <svg key="icon-1" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="4" fill="#E7E70D"></rect><mask id="mask0_5757_19616" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="8" y="8" width="24" height="24"><rect x="8" y="8" width="24" height="24" fill="#D9D9D9"></rect></mask><g mask="url(#mask0_5757_19616)"><path d="M9.74998 21.4C9.53331 21.25 9.40414 21.0458 9.36248 20.7875C9.32081 20.5292 9.36664 20.2833 9.49998 20.05L12.55 15.15C12.9166 14.5667 13.4375 14.2542 14.1125 14.2125C14.7875 14.1708 15.3416 14.4083 15.775 14.925L17 16.35L19.375 12.5C19.7583 11.8667 20.3125 11.5458 21.0375 11.5375C21.7625 11.5292 22.325 11.8333 22.725 12.45L24 14.35L26.8 9.9C26.95 9.65 27.1708 9.49584 27.4625 9.4375C27.7541 9.37917 28.0166 9.44167 28.25 9.625C28.4666 9.775 28.5958 9.97917 28.6375 10.2375C28.6791 10.4958 28.6333 10.7417 28.5 10.975L25.7 15.425C25.3166 16.0417 24.7625 16.35 24.0375 16.35C23.3125 16.35 22.75 16.05 22.35 15.45L21.075 13.55L18.7 17.4C18.35 17.9833 17.8375 18.3 17.1625 18.35C16.4875 18.4 15.9333 18.1667 15.5 17.65L14.25 16.2L11.2 21.125C11.05 21.375 10.8291 21.5292 10.5375 21.5875C10.2458 21.6458 9.98331 21.5833 9.74998 21.4ZM22.5 26C23.2 26 23.7916 25.7583 24.275 25.275C24.7583 24.7917 25 24.2 25 23.5C25 22.8 24.7583 22.2083 24.275 21.725C23.7916 21.2417 23.2 21 22.5 21C21.8 21 21.2083 21.2417 20.725 21.725C20.2416 22.2083 20 22.8 20 23.5C20 24.2 20.2416 24.7917 20.725 25.275C21.2083 25.7583 21.8 26 22.5 26ZM22.5 28C21.25 28 20.1875 27.5625 19.3125 26.6875C18.4375 25.8125 18 24.75 18 23.5C18 22.25 18.4375 21.1875 19.3125 20.3125C20.1875 19.4375 21.25 19 22.5 19C23.75 19 24.8125 19.4375 25.6875 20.3125C26.5625 21.1875 27 22.25 27 23.5C27 23.9333 26.9416 24.3542 26.825 24.7625C26.7083 25.1708 26.5333 25.55 26.3 25.9L28.3 27.9C28.4833 28.0833 28.575 28.3167 28.575 28.6C28.575 28.8833 28.4833 29.1167 28.3 29.3C28.1166 29.4833 27.8833 29.575 27.6 29.575C27.3166 29.575 27.0833 29.4833 26.9 29.3L24.9 27.3C24.55 27.5333 24.1708 27.7083 23.7625 27.825C23.3541 27.9417 22.9333 28 22.5 28Z" fill="#1C1B1F"></path></g></svg>,
  /* Industry influencers */
  <svg key="icon-2" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="4" fill="#E7E70D"></rect><mask id="mask0_5757_19621" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="8" y="8" width="24" height="24"><rect x="8" y="8" width="24" height="24" fill="#D9D9D9"></rect></mask><g mask="url(#mask0_5757_19621)"><path d="M29 20.9999H27C26.7167 20.9999 26.4792 20.9041 26.2875 20.7124C26.0958 20.5208 26 20.2833 26 19.9999C26 19.7166 26.0958 19.4791 26.2875 19.2874C26.4792 19.0958 26.7167 18.9999 27 18.9999H29C29.2833 18.9999 29.5208 19.0958 29.7125 19.2874C29.9042 19.4791 30 19.7166 30 19.9999C30 20.2833 29.9042 20.5208 29.7125 20.7124C29.5208 20.9041 29.2833 20.9999 29 20.9999ZM24.6 24.7999C24.7667 24.5666 24.9833 24.4333 25.25 24.3999C25.5167 24.3666 25.7667 24.4333 26 24.5999L27.6 25.7999C27.8333 25.9666 27.9667 26.1833 28 26.4499C28.0333 26.7166 27.9667 26.9666 27.8 27.1999C27.6333 27.4333 27.4167 27.5666 27.15 27.5999C26.8833 27.6333 26.6333 27.5666 26.4 27.3999L24.8 26.1999C24.5667 26.0333 24.4333 25.8166 24.4 25.5499C24.3667 25.2833 24.4333 25.0333 24.6 24.7999ZM27.6 14.1999L26 15.3999C25.7667 15.5666 25.5167 15.6333 25.25 15.5999C24.9833 15.5666 24.7667 15.4333 24.6 15.1999C24.4333 14.9666 24.3667 14.7166 24.4 14.4499C24.4333 14.1833 24.5667 13.9666 24.8 13.7999L26.4 12.5999C26.6333 12.4333 26.8833 12.3666 27.15 12.3999C27.4167 12.4333 27.6333 12.5666 27.8 12.7999C27.9667 13.0333 28.0333 13.2833 28 13.5499C27.9667 13.8166 27.8333 14.0333 27.6 14.1999ZM13 22.9999H12C11.45 22.9999 10.9792 22.8041 10.5875 22.4124C10.1958 22.0208 10 21.5499 10 20.9999V18.9999C10 18.4499 10.1958 17.9791 10.5875 17.5874C10.9792 17.1958 11.45 16.9999 12 16.9999H16L19.475 14.8999C19.8083 14.6999 20.1458 14.6999 20.4875 14.8999C20.8292 15.0999 21 15.3916 21 15.7749V24.2249C21 24.6083 20.8292 24.8999 20.4875 25.0999C20.1458 25.2999 19.8083 25.2999 19.475 25.0999L16 22.9999H15V25.9999C15 26.2833 14.9042 26.5208 14.7125 26.7124C14.5208 26.9041 14.2833 26.9999 14 26.9999C13.7167 26.9999 13.4792 26.9041 13.2875 26.7124C13.0958 26.5208 13 26.2833 13 25.9999V22.9999ZM19 22.4499V17.5499L16.55 18.9999H12V20.9999H16.55L19 22.4499ZM22 23.3499V16.6499C22.45 17.0499 22.8125 17.5374 23.0875 18.1124C23.3625 18.6874 23.5 19.3166 23.5 19.9999C23.5 20.6833 23.3625 21.3124 23.0875 21.8874C22.8125 22.4624 22.45 22.9499 22 23.3499Z" fill="#1C1B1F"></path></g></svg>,
  /* Technology integrators */
  <svg key="icon-3" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="4" fill="#E7E70D"></rect><mask id="mask0_5757_19626" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="8" y="8" width="24" height="24"><rect x="8" y="8" width="24" height="24" fill="#D9D9D9"></rect></mask><g mask="url(#mask0_5757_19626)"><path d="M11.875 30.125C11.2917 29.5417 11 28.8333 11 28C11 27.1667 11.2917 26.4583 11.875 25.875C12.4583 25.2917 13.1667 25 14 25C14.2333 25 14.45 25.025 14.65 25.075C14.85 25.125 15.0417 25.1917 15.225 25.275L16.65 23.5C16.1833 22.9833 15.8583 22.4 15.675 21.75C15.4917 21.1 15.45 20.45 15.55 19.8L13.525 19.125C13.2417 19.5417 12.8833 19.875 12.45 20.125C12.0167 20.375 11.5333 20.5 11 20.5C10.1667 20.5 9.45833 20.2083 8.875 19.625C8.29167 19.0417 8 18.3333 8 17.5C8 16.6667 8.29167 15.9583 8.875 15.375C9.45833 14.7917 10.1667 14.5 11 14.5C11.8333 14.5 12.5417 14.7917 13.125 15.375C13.7083 15.9583 14 16.6667 14 17.5V17.7L16.025 18.4C16.3583 17.8 16.8042 17.2917 17.3625 16.875C17.9208 16.4583 18.55 16.1917 19.25 16.075V13.9C18.6 13.7167 18.0625 13.3625 17.6375 12.8375C17.2125 12.3125 17 11.7 17 11C17 10.1667 17.2917 9.45833 17.875 8.875C18.4583 8.29167 19.1667 8 20 8C20.8333 8 21.5417 8.29167 22.125 8.875C22.7083 9.45833 23 10.1667 23 11C23 11.7 22.7833 12.3125 22.35 12.8375C21.9167 13.3625 21.3833 13.7167 20.75 13.9V16.075C21.45 16.1917 22.0792 16.4583 22.6375 16.875C23.1958 17.2917 23.6417 17.8 23.975 18.4L26 17.7V17.5C26 16.6667 26.2917 15.9583 26.875 15.375C27.4583 14.7917 28.1667 14.5 29 14.5C29.8333 14.5 30.5417 14.7917 31.125 15.375C31.7083 15.9583 32 16.6667 32 17.5C32 18.3333 31.7083 19.0417 31.125 19.625C30.5417 20.2083 29.8333 20.5 29 20.5C28.4667 20.5 27.9792 20.375 27.5375 20.125C27.0958 19.875 26.7417 19.5417 26.475 19.125L24.45 19.8C24.55 20.45 24.5083 21.0958 24.325 21.7375C24.1417 22.3792 23.8167 22.9667 23.35 23.5L24.775 25.25C24.9583 25.1667 25.15 25.1042 25.35 25.0625C25.55 25.0208 25.7667 25 26 25C26.8333 25 27.5417 25.2917 28.125 25.875C28.7083 26.4583 29 27.1667 29 28C29 28.8333 28.7083 29.5417 28.125 30.125C27.5417 30.7083 26.8333 31 26 31C25.1667 31 24.4583 30.7083 23.875 30.125C23.2917 29.5417 23 28.8333 23 28C23 27.6667 23.0542 27.3458 23.1625 27.0375C23.2708 26.7292 23.4167 26.45 23.6 26.2L22.175 24.425C21.4917 24.8083 20.7625 25 19.9875 25C19.2125 25 18.4833 24.8083 17.8 24.425L16.4 26.2C16.5833 26.45 16.7292 26.7292 16.8375 27.0375C16.9458 27.3458 17 27.6667 17 28C17 28.8333 16.7083 29.5417 16.125 30.125C15.5417 30.7083 14.8333 31 14 31C13.1667 31 12.4583 30.7083 11.875 30.125ZM11 18.5C11.2833 18.5 11.5208 18.4042 11.7125 18.2125C11.9042 18.0208 12 17.7833 12 17.5C12 17.2167 11.9042 16.9792 11.7125 16.7875C11.5208 16.5958 11.2833 16.5 11 16.5C10.7167 16.5 10.4792 16.5958 10.2875 16.7875C10.0958 16.9792 10 17.2167 10 17.5C10 17.7833 10.0958 18.0208 10.2875 18.2125C10.4792 18.4042 10.7167 18.5 11 18.5ZM14.7125 28.7125C14.9042 28.5208 15 28.2833 15 28C15 27.7167 14.9042 27.4792 14.7125 27.2875C14.5208 27.0958 14.2833 27 14 27C13.7167 27 13.4792 27.0958 13.2875 27.2875C13.0958 27.4792 13 27.7167 13 28C13 28.2833 13.0958 28.5208 13.2875 28.7125C13.4792 28.9042 13.7167 29 14 29C14.2833 29 14.5208 28.9042 14.7125 28.7125ZM20.7125 11.7125C20.9042 11.5208 21 11.2833 21 11C21 10.7167 20.9042 10.4792 20.7125 10.2875C20.5208 10.0958 20.2833 10 20 10C19.7167 10 19.4792 10.0958 19.2875 10.2875C19.0958 10.4792 19 10.7167 19 11C19 11.2833 19.0958 11.5208 19.2875 11.7125C19.4792 11.9042 19.7167 12 20 12C20.2833 12 20.5208 11.9042 20.7125 11.7125ZM20 23C20.7 23 21.2917 22.7583 21.775 22.275C22.2583 21.7917 22.5 21.2 22.5 20.5C22.5 19.8 22.2583 19.2083 21.775 18.725C21.2917 18.2417 20.7 18 20 18C19.3 18 18.7083 18.2417 18.225 18.725C17.7417 19.2083 17.5 19.8 17.5 20.5C17.5 21.2 17.7417 21.7917 18.225 22.275C18.7083 22.7583 19.3 23 20 23ZM26.7125 28.7125C26.9042 28.5208 27 28.2833 27 28C27 27.7167 26.9042 27.4792 26.7125 27.2875C26.5208 27.0958 26.2833 27 26 27C25.7167 27 25.4792 27.0958 25.2875 27.2875C25.0958 27.4792 25 27.7167 25 28C25 28.2833 25.0958 28.5208 25.2875 28.7125C25.4792 28.9042 25.7167 29 26 29C26.2833 29 26.5208 28.9042 26.7125 28.7125ZM29.7125 18.2125C29.9042 18.0208 30 17.7833 30 17.5C30 17.2167 29.9042 16.9792 29.7125 16.7875C29.5208 16.5958 29.2833 16.5 29 16.5C28.7167 16.5 28.4792 16.5958 28.2875 16.7875C28.0958 16.9792 28 17.2167 28 17.5C28 17.7833 28.0958 18.0208 28.2875 18.2125C28.4792 18.4042 28.7167 18.5 29 18.5C29.2833 18.5 29.5208 18.4042 29.7125 18.2125Z" fill="#1C1B1F"></path></g></svg>,
  /* Business development professionals */
  <svg key="icon-4" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="4" fill="#E7E70D"></rect><mask id="mask0_5757_19631" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="8" y="8" width="24" height="24"><rect x="8" y="8" width="24" height="24" fill="#D9D9D9"></rect></mask><g mask="url(#mask0_5757_19631)"><path d="M19.875 28C19.9417 28 20.0084 27.9833 20.075 27.95C20.1417 27.9167 20.1917 27.8833 20.225 27.85L28.425 19.65C28.625 19.45 28.7709 19.225 28.8625 18.975C28.9542 18.725 29 18.475 29 18.225C29 17.9583 28.9542 17.7042 28.8625 17.4625C28.7709 17.2208 28.625 17.0083 28.425 16.825L24.175 12.575C23.9917 12.375 23.7792 12.2292 23.5375 12.1375C23.2959 12.0458 23.0417 12 22.775 12C22.525 12 22.275 12.0458 22.025 12.1375C21.775 12.2292 21.55 12.375 21.35 12.575L21.075 12.85L22.925 14.725C23.175 14.9583 23.3584 15.225 23.475 15.525C23.5917 15.825 23.65 16.1417 23.65 16.475C23.65 17.175 23.4125 17.7625 22.9375 18.2375C22.4625 18.7125 21.875 18.95 21.175 18.95C20.8417 18.95 20.5209 18.8917 20.2125 18.775C19.9042 18.6583 19.6334 18.4833 19.4 18.25L17.525 16.4L13.15 20.775C13.1 20.825 13.0625 20.8792 13.0375 20.9375C13.0125 20.9958 13 21.0583 13 21.125C13 21.2583 13.05 21.3792 13.15 21.4875C13.25 21.5958 13.3667 21.65 13.5 21.65C13.5667 21.65 13.6334 21.6333 13.7 21.6C13.7667 21.5667 13.8167 21.5333 13.85 21.5L16.55 18.8C16.7334 18.6167 16.9625 18.5208 17.2375 18.5125C17.5125 18.5042 17.75 18.6 17.95 18.8C18.1334 18.9833 18.225 19.2167 18.225 19.5C18.225 19.7833 18.1334 20.0167 17.95 20.2L15.275 22.9C15.225 22.95 15.1875 23.0042 15.1625 23.0625C15.1375 23.1208 15.125 23.1833 15.125 23.25C15.125 23.3833 15.175 23.5 15.275 23.6C15.375 23.7 15.4917 23.75 15.625 23.75C15.6917 23.75 15.7584 23.7333 15.825 23.7C15.8917 23.6667 15.9417 23.6333 15.975 23.6L18.675 20.925C18.8584 20.7417 19.0875 20.6458 19.3625 20.6375C19.6375 20.6292 19.875 20.725 20.075 20.925C20.2584 21.1083 20.35 21.3417 20.35 21.625C20.35 21.9083 20.2584 22.1417 20.075 22.325L17.4 25.025C17.35 25.0583 17.3125 25.1083 17.2875 25.175C17.2625 25.2417 17.25 25.3083 17.25 25.375C17.25 25.5083 17.3 25.625 17.4 25.725C17.5 25.825 17.6167 25.875 17.75 25.875C17.8167 25.875 17.8792 25.8625 17.9375 25.8375C17.9959 25.8125 18.05 25.775 18.1 25.725L20.8 23.05C20.9834 22.8667 21.2125 22.7708 21.4875 22.7625C21.7625 22.7542 22 22.85 22.2 23.05C22.3834 23.2333 22.475 23.4667 22.475 23.75C22.475 24.0333 22.3834 24.2667 22.2 24.45L19.5 27.15C19.45 27.2 19.4125 27.2542 19.3875 27.3125C19.3625 27.3708 19.35 27.4333 19.35 27.5C19.35 27.6333 19.4042 27.75 19.5125 27.85C19.6209 27.95 19.7417 28 19.875 28ZM19.85 30C19.2334 30 18.6875 29.7958 18.2125 29.3875C17.7375 28.9792 17.4584 28.4667 17.375 27.85C16.8084 27.7667 16.3334 27.5333 15.95 27.15C15.5667 26.7667 15.3334 26.2917 15.25 25.725C14.6834 25.6417 14.2125 25.4042 13.8375 25.0125C13.4625 24.6208 13.2334 24.15 13.15 23.6C12.5167 23.5167 12 23.2417 11.6 22.775C11.2 22.3083 11 21.7583 11 21.125C11 20.7917 11.0625 20.4708 11.1875 20.1625C11.3125 19.8542 11.4917 19.5833 11.725 19.35L16.1 14.975C16.4834 14.5917 16.9542 14.4 17.5125 14.4C18.0709 14.4 18.5417 14.5917 18.925 14.975L20.8 16.85C20.8334 16.9 20.8834 16.9375 20.95 16.9625C21.0167 16.9875 21.0834 17 21.15 17C21.3 17 21.425 16.9542 21.525 16.8625C21.625 16.7708 21.675 16.65 21.675 16.5C21.675 16.4333 21.6625 16.3667 21.6375 16.3C21.6125 16.2333 21.575 16.1833 21.525 16.15L17.95 12.575C17.7667 12.375 17.5542 12.2292 17.3125 12.1375C17.0709 12.0458 16.8167 12 16.55 12C16.3 12 16.05 12.0458 15.8 12.1375C15.55 12.2292 15.325 12.375 15.125 12.575L11.6 16.125C11.3667 16.3583 11.2 16.6333 11.1 16.95C11 17.2667 10.975 17.5833 11.025 17.9C11.075 18.1833 11.0167 18.4333 10.85 18.65C10.6834 18.8667 10.4584 18.9917 10.175 19.025C9.89169 19.0583 9.64169 18.9958 9.42502 18.8375C9.20836 18.6792 9.08336 18.4583 9.05002 18.175C8.95002 17.5417 8.99586 16.9208 9.18752 16.3125C9.37919 15.7042 9.70836 15.1667 10.175 14.7L13.7 11.175C14.1 10.7917 14.5459 10.5 15.0375 10.3C15.5292 10.1 16.0334 10 16.55 10C17.0667 10 17.5709 10.1 18.0625 10.3C18.5542 10.5 18.9917 10.7917 19.375 11.175L19.65 11.45L19.925 11.175C20.325 10.7917 20.7709 10.5 21.2625 10.3C21.7542 10.1 22.2584 10 22.775 10C23.2917 10 23.7959 10.1 24.2875 10.3C24.7792 10.5 25.2167 10.7917 25.6 11.175L29.825 15.4C30.2084 15.7833 30.5 16.225 30.7 16.725C30.9 17.225 31 17.7333 31 18.25C31 18.7667 30.9 19.2708 30.7 19.7625C30.5 20.2542 30.2084 20.6917 29.825 21.075L21.625 29.25C21.3917 29.4833 21.1209 29.6667 20.8125 29.8C20.5042 29.9333 20.1834 30 19.85 30Z" fill="#1C1B1F"></path></g></svg>,
]

function CtaButton({ cta }: { cta: { label: string; url: string; openInNewTab?: boolean } }) {
  return (
    <a stagger-cta="" href={cta.url} {...(cta.openInNewTab ? { target: '_blank' } : {})} className="cta-p-sm w-inline-block">
      <div>
        <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">{cta.label}</div>
      </div>
      <div className="flip-small">
        <div className="flip-bg"></div>
      </div>
      <div className="flip-big">
        <div className="svg cta-sm-arrow w-embed"><ArrowSvg /></div>
      </div>
    </a>
  )
}

function CtaButtonStroke({ cta }: { cta: { label: string; url: string; openInNewTab?: boolean } }) {
  return (
    <a stagger-cta="" href={cta.url} {...(cta.openInNewTab ? { target: '_blank' } : {})} className="cta-p-sm cc-stroke w-inline-block">
      <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">{cta.label}</div>
      <div className="flip-small">
        <div className="flip-bg"></div>
      </div>
      <div className="flip-big">
        <div className="svg cta-sm-arrow w-embed"><ArrowSvg /></div>
      </div>
    </a>
  )
}

/** Parse infoCardTitle: text outside {} is normal, text inside {} gets cc-yellow span */
function renderCardTitle(raw: string) {
  const parts = raw.split(/\{|\}/)
  return parts.map((part, i) =>
    i % 2 === 1
      ? <span key={i} className="cc-yellow">{part}</span>
      : part
  )
}

export default async function Page() {
  let doc: PartnersPageDoc | null = null
  try {
    doc = await client.fetch<PartnersPageDoc | null>(partnersQuery, {}, fetchOptions)
  } catch {
    doc = null
  }

  if (!doc) return null

  return (
    <>
      <div className="main">
            <div className="partner-hero_wrapper">
              <section className="c-section cc-partner-hero">
                <div className="c-container">
                  <div className="partner-program-hero">
                    <div className="partner-title">
                      <h1 className="c-title-1">{doc.heroHeading}</h1>
                    </div>
                    <div className="partner-cta">
                      <div className="_428">
                        <div className="c-text-4">{doc.heroSubtitlePrefix}<strong className="bold">{doc.heroSubtitleBold}</strong>{doc.heroSubtitleSuffix}</div>
                      </div>
                      <div className="h-20">
                        {doc.heroCta && <CtaButton cta={doc.heroCta} />}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="c-section cc-program-lottie">
                <div className="c-container">
                  <div lottie-bg="" className="lottie-crop cc-market">
                    <LottiePlayer src="/webflow-documents/Generative-Loop-Final-25.json" className="lottie_cropped-desktop cc-market" loop={true} autoplay={true} />
                    <LottiePlayer src="/webflow-documents/Generative-Loop-Final.json" className="lottie_cropped-mobile" loop={true} autoplay={true} />
                  </div>
                </div>
              </section>
            </div>
            <section className="c-section partner-info">
              <div className="c-container">
                <div className="partner-info_wrapper">
                  <div className="partner-info_text-col">
                    <div className="eyebrow cc-no-bp">
                      <div className="block"></div>
                      <div className="c-title-5">{doc.infoEyebrow}</div>
                    </div>
                    <h2 className="c-text-2">{doc.infoHeading}</h2>
                  </div>
                  <div className="partner-info_refer-card">
                    <div className="partner-info_icon-wrapper">
                      <div className="icon-wrapper dark">
                        <div className="svg w-embed"><BrightwaveIconSvg /></div>
                      </div>
                      <h3 className="c-title-4">{renderCardTitle(doc.infoCardTitle)}</h3>
                    </div>
                    <div className="partner-info_cta-wrapper">
                      <div className="c-text-5 w-richtext">
                        <ul role="list">
                          {(doc.infoCardBullets ?? []).map((bullet, i) => (
                            <li key={i}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                      {doc.infoCardCta && <CtaButton cta={doc.infoCardCta} />}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="c-section partner-proofs">
              <div className="c-container">
                <div className="partner-proofs_wrapper">
                  <div>
                    <div className="eyebrow cc-no-bp blue">
                      <div className="block blue"></div>
                      <div className="c-title-5">{doc.proofEyebrow}</div>
                    </div>
                  </div>
                  <div className="partner-proof_points">
                    {(doc.proofPoints ?? []).map((point, i) => (
                      <div key={i} className="partner-proof_point">
                        <h3 className="c-title-4">{point.stat}</h3>
                        <div className="c-text-4">{point.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <section className="c-section partner-list">
              <div className="c-container">
                <div className="partner-list_wrapper">
                  <div className="partner-list_title">
                    <h3 className="c-title-3">{doc.partnerListHeading}</h3>
                    {doc.partnerListCta && <CtaButtonStroke cta={doc.partnerListCta} />}
                  </div>
                  <div className="partner-list_list-wrapper">
                    {(doc.partnerTypes ?? []).map((label, i) => (
                      <div key={i} className="partner-list_list-item">
                        <div className="partner_icon">
                          <div className="svg w-embed">{partnerIconSvgs[i] ?? null}</div>
                        </div>
                        <div className="c-text-3 cc-500">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <section className="c-section partner-callout_vox">
              <div className="c-container">
                <div className="callout-info_box">
                  <div className="callout-info_text">
                    <div className="div-block-98">
                      <h2 className="c-title-3">{doc.calloutHeading}</h2>
                      <div className="div-block-99">
                        {(doc.calloutParagraphs ?? []).map((p, i) => (
                          <p key={i} className="c-text-4">{p}</p>
                        ))}
                      </div>
                    </div>
                    {doc.calloutCta && <CtaButton cta={doc.calloutCta} />}
                  </div>
                  <LottiePlayer src="/webflow-documents/Testimonial-BG-25.json" className="slider_lottie" loop={true} autoplay={true} />
                </div>
              </div>
            </section>
            {doc.contactForm && (
              <section className="c-section">
                <div className="c-container">
                  <div className="grid cc-contact">
                    <div id="w-node-partner-form" className="v-40">
                      <ContactForm formConfig={doc.contactForm} />
                    </div>
                  </div>
                </div>
              </section>
            )}
            <section className="c-section partner-about">
              <div className="c-container">
                <div className="partner-about_title">
                  <h3 className="c-title-3">{doc.aboutHeading}</h3>
                </div>
                <div className="partner-about_wrapper">
                  <div className="partner-about_text-wrapper">
                    {(doc.aboutParagraphs ?? []).map((p, i) => (
                      <p key={i} className="c-text-4">{p}</p>
                    ))}
                  </div>
                  <div className="partner-about_image-wrapper">
                    <LottiePlayer src="/webflow-documents/About-Lottie-25.json" className="partner-about_lottie-wrapper" loop={false} autoplay={true} />
                  </div>
                </div>
              </div>
            </section>
            <section className="c-section partner-faq">
              <div className="c-container">
                <div className="v-40">
                  <h2 className="c-title-2">{doc.faqHeading}</h2>
                  <div>
                    {(doc.faq ?? []).map((item, i) => (
                      <div key={i}>
                        <div id={`w-node-faq-line-${i}`} className="c-line"></div>
                        <div id={`w-node-faq-wrap-${i}`} className="accordion-wrap">
                          <div accordion="" id={`w-node-faq-${i}`} className="accordion">
                            <div className="accordion_toggle">
                              <div className="c-text-2 cc-balance">{item.question}</div>
                              <div chevron-x="" className="c-svg-2 cc-20 w-embed"><ChevronSvg /></div>
                              <input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                            </div>
                            <div accordion="element" className="accordion_dropdown">
                              <div mask-height="element">
                                <div className="accordion_content">
                                  <div className="c-text-4 w-richtext">
                                    <PortableText components={ptComponents} value={item.answer} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="c-line"></div>
                  </div>
                </div>
              </div>
            </section>
      </div>

      <StepCtaSection
          heading={doc.stepCtaHeading}
          buttonLabel={doc.stepCtaButtonLabel}
          buttonUrl={doc.stepCtaButtonUrl}
        />
    </>
  )
}
