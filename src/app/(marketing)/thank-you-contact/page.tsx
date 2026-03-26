import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { thank_you_contactQuery } from '@/lib/sanity/queries/thank-you-contact'
import { buildMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const doc = await client.fetch(thank_you_contactQuery, {}, { next: { tags: ['thankYouContactPage'], revalidate: 3600 } })
    if (!doc) return { title: 'Thank You Contact | Brightwave' }
    return buildMetadata({
      title: doc.heroHeading,
      description: doc.heroBody,
      seo: doc.seo,
      path: '/thank-you-contact',
    })
  } catch {
    return { title: 'Thank You Contact | Brightwave' }
  }
}

export default async function Page() {
  let doc: any = null
  try {
    doc = await client.fetch(thank_you_contactQuery, {}, { next: { tags: ['thankYouContactPage'], revalidate: 3600 } })
  } catch {
    doc = null
  }

  if (!doc) return null

  return (
    <>
      <div className="main">
            <div data-w-id="146090b3-a797-0b71-5c03-2ee27e68f65a" data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="nav w-nav">
              <div id="cio-banner" className="cio-banner"></div>
              <div className="c-container cc-nav">
                <div className="nav_flex">
                  <div className="nav-abso">
                    <div className="nav-asbo_flex">
                      <a href="index.html" className="nav_logo w-nav-brand">
                        <div className="svg cc-onsurface-fill cc-logo w-embed"><svg width="150" height="28" viewBox="0 0 150 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M143.169 22.3786C139.582 22.3786 137.215 19.7896 137.215 15.8817C137.215 11.9738 139.558 9.38477 143.145 9.38477C146.899 9.38477 149.195 12.2424 148.86 16.5167H139.63C139.821 19.0324 141.137 20.4979 143.193 20.4979C144.652 20.4979 145.847 19.7651 146.278 18.5439H148.549C147.952 20.8887 145.895 22.3786 143.169 22.3786ZM139.678 14.8558H146.541C146.373 12.5844 145.154 11.2654 143.217 11.2654C141.256 11.2654 139.965 12.6088 139.678 14.8558Z" fill="#0F0F0F"></path>
                            <path d="M134.261 9.77539H136.7L132.18 21.9876H129.478L124.982 9.77539H127.398L130.841 19.4719L134.261 9.77539Z" fill="#0F0F0F"></path>
                            <path d="M115.963 13.2682H113.668C114.074 10.8258 116.011 9.38477 118.881 9.38477C121.894 9.38477 123.783 10.9968 123.783 13.6346V19.814C123.783 20.6444 123.855 21.2062 124.022 21.9878H121.726C121.607 21.4748 121.535 20.9375 121.511 20.3269C120.579 21.6214 119.024 22.3786 117.207 22.3786C114.792 22.3786 113.285 21.0352 113.285 18.8614C113.285 16.7854 114.624 15.442 117.279 15.0024L119.311 14.6604C120.818 14.3918 121.463 13.8789 121.463 12.9752C121.463 11.8761 120.483 11.1677 118.905 11.1677C117.255 11.1677 116.131 11.9738 115.963 13.2682ZM121.487 16.8342V15.2466C120.961 15.7351 120.292 16.0526 119.359 16.2236L117.661 16.5167C116.346 16.7365 115.629 17.4692 115.629 18.6172C115.629 19.8628 116.442 20.5956 117.9 20.5956C119.981 20.5956 121.487 19.0324 121.487 16.8342Z" fill="#0F0F0F"></path>
                            <path d="M102.241 9.77539H104.728L107.597 19.0567L110.132 9.77539H112.547L109.08 21.9876H106.378L103.484 12.9506L100.615 21.9876H97.8887L94.4453 9.77539H96.8366L99.3713 19.0567L102.241 9.77539Z" fill="#0F0F0F"></path>
                            <path d="M87.7837 6.45361H90.0793V9.77533H92.9488V11.6072H90.0793V18.1773C90.0793 19.5939 90.5337 20.1557 91.7293 20.1557H93.0206V21.9875H91.2032C88.788 21.9875 87.7837 20.7419 87.7837 18.0552V11.6072H85.9902V9.77533H87.7837V6.45361Z" fill="#0F0F0F"></path>
                            <path d="M74.0137 4.89062H76.2615V11.3142C77.1941 10.0686 78.581 9.38472 80.231 9.38472C82.9092 9.38472 84.5114 11.2165 84.5114 14.1719V21.9877H82.2157V14.5871C82.2157 12.4866 81.331 11.3875 79.5136 11.3875C77.6006 11.3875 76.3093 12.6332 76.3093 14.6115V21.9877H74.0137V4.89062Z" fill="#0F0F0F"></path>
                            <path d="M62.1075 22.9647C62.4423 24.5279 63.6857 25.3828 65.5509 25.3828C67.8465 25.3828 69.09 24.1127 69.09 21.7679V19.7896C68.1335 21.2795 66.6987 22.061 64.9531 22.061C61.7727 22.061 59.5488 19.4965 59.5488 15.7107C59.5488 11.9982 61.7966 9.38477 64.9292 9.38477C66.6748 9.38477 68.1335 10.1663 69.09 11.6562V9.77556H71.3856V21.4993C71.3856 25.1385 69.2574 27.2634 65.5509 27.2634C62.3705 27.2634 60.314 25.7003 59.8597 22.9647H62.1075ZM65.5509 20.0582C67.7031 20.0582 69.1139 18.2753 69.1139 15.7107C69.1139 13.1705 67.7031 11.3876 65.5509 11.3876C63.3988 11.3876 61.9401 13.1705 61.9401 15.7107C61.9401 18.2508 63.3988 20.0582 65.5509 20.0582Z" fill="#0F0F0F"></path>
                            <path d="M55.903 7.77279C54.8747 7.77279 54.3486 7.04005 54.3486 6.23405C54.3486 5.40362 54.8747 4.69531 55.903 4.69531C56.8834 4.69531 57.4573 5.40362 57.4573 6.23405C57.4573 7.04005 56.8834 7.77279 55.903 7.77279ZM54.7551 21.9878V9.77559H57.0508V21.9878H54.7551Z" fill="#0F0F0F"></path>
                            <path d="M46.4932 9.77556H48.741V11.8516C49.6257 10.2152 51.1083 9.38477 53.0213 9.38477V11.6318C50.1279 11.6318 48.7888 12.853 48.7888 15.442V21.9878H46.4932V9.77556Z" fill="#0F0F0F"></path>
                            <path d="M40.6901 12.7797C43.0814 13.0728 44.6596 14.8558 44.6596 17.3226C44.6596 20.1315 42.5792 21.9877 39.4467 21.9877H32.0576V4.89062H38.8488C41.6705 4.89062 43.464 6.47821 43.464 8.99393C43.464 10.899 42.4118 12.3401 40.6901 12.7797ZM38.4423 12.047C40.1879 12.047 41.1684 11.1188 41.1684 9.45799C41.1684 7.84598 40.2597 7.01555 38.4662 7.01555H34.4489V12.047H38.4423ZM34.4489 19.8628H39.1597C41.2401 19.8628 42.2684 18.9102 42.2684 16.9807C42.2684 15.0512 41.1684 14.0498 39.0162 14.0498H34.4489V19.8628Z" fill="#0F0F0F"></path>
                            <path d="M18.7779 14V19.7675L18.0253 20.5363L11.626 14C11.626 13.6702 11.626 13.4851 11.626 13.1552L19.4127 5.20186L19.5339 5.07809C19.7366 4.99235 19.916 4.91631 20.1187 4.83057H23.9842C24.3071 5.16046 24.4891 5.3459 24.8125 5.67579V12.3126C24.4903 12.6416 24.31 12.8258 23.9879 13.1548H19.605L18.7779 13.9996V14Z" fill="#0F0F0F"></path>
                            <path d="M0 4.83058L0.73695 4.07194L4.72938 8.1498C5.18594 8.1498 5.44276 8.1498 5.89932 8.1498L10.2151 3.74163L13.8784 0H15.0479L18.779 3.8109V4.6557L18.6078 4.83058L11.0427 12.5576L10.7002 12.9073L10.1155 13.1548H0.828346C0.505362 12.8249 0.324226 12.6399 0.00124187 12.31V12.2965" fill="#0F0F0F"></path>
                            <path d="M0 14.8579V22.3238L0.740259 23.0799L4.72938 19.0055C5.18594 19.0055 5.44276 19.0055 5.89932 19.0055L11.0319 24.2479L13.8817 27.1582C14.3387 27.1582 14.5947 27.1582 15.0512 27.1582L18.779 23.3507V22.4991L18.6078 22.3243L11.0427 14.5973L10.7002 14.2475C10.4976 14.1618 10.3181 14.0857 10.1155 14H0.828346C0.505362 14.3299 0.324226 14.5149 0.00124187 14.8448V14.8583L0 14.8579Z" fill="#0F0F0F"></path>
                            <path d="M20.4326 14H23.9858C24.3088 14.3299 24.4899 14.5149 24.8129 14.8448V21.479C24.4899 21.8089 24.3088 21.9939 23.9858 22.3238H20.4326L19.6055 21.479V14.8448L20.4326 14Z" fill="#0F0F0F"></path>
                          </svg></div>
                      </a>
                      <nav role="navigation" className="nav_menu w-nav-menu">
                        <div className="nav_links">
                          <div data-hover="false" data-delay="500" data-w-id="146090b3-a797-0b71-5c03-2ee27e68f664" className="nav_dropdown cc-desktop w-dropdown">
                            <div data-w-id="146090b3-a797-0b71-5c03-2ee27e68f665" className="nav_toggle w-dropdown-toggle">
                              <div className="text-overflow">
                                <div className="c-text-link cc-nav">Platform</div>
                                <div className="nav_line"></div>
                              </div><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 10 6" fill="none" className="chevron">
                                <path d="M0.525391 1L5.02539 5L9.52539 1" stroke="currentColor"></path>
                              </svg>
                            </div>
                            <nav a-dm="" className="nav_list w-dropdown-list">
                              <div className="nav_list-wrap">
                                <div className="nav_list-flex">
                                  <div className="nav_list-flex cc-inner">
                                    <a a-dm="" data-w-id="146090b3-a797-0b71-5c03-2ee27e68f676" href="investment-intelligence-engine.html" className="nav_item cc-2 w-inline-block">
                                      <div className="c-title-3 cc-nav-2">Investment Intelligence Engine</div>
                                      <div className="nav_arrow">
                                        <div className="svg cc-nav-arrow-bg w-embed"><svg width="54" height="51" viewBox="0 0 54 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M54 5.6L48.75 0H6L0.375 6L0 5.6V45.4L0.375 45L6 51H48.75L54 45.4V5.6Z" fill="#E7E70D"></path>
                                          </svg></div>
                                        <div className="arrow-wrap cc-2">
                                          <div className="nav_arrow-svg w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_782_8055)">
                                                <path d="M14.8926 24.8372L26.2697 13.46L14.9649 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                                                <path d="M26.2663 13.4614L1.36784 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel"></path>
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_782_8055">
                                                  <rect width="19.1528" height="19.031" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.957 27)"></rect>
                                                </clipPath>
                                              </defs>
                                            </svg></div>
                                        </div>
                                        <div className="arrow-wrap">
                                          <div className="nav_arrow-svg w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_782_8055)">
                                                <path d="M14.8926 24.8372L26.2697 13.46L14.9649 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                                                <path d="M26.2663 13.4614L1.36784 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel"></path>
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_782_8055">
                                                  <rect width="19.1528" height="19.031" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.957 27)"></rect>
                                                </clipPath>
                                              </defs>
                                            </svg></div>
                                        </div>
                                      </div>
                                    </a>
                                    <a a-dm="" data-w-id="146090b3-a797-0b71-5c03-2ee27e68f67f" href="enterprise-security-compliance.html" className="nav_item cc-3 w-inline-block">
                                      <div className="c-title-3 cc-nav-3">Enterprise Security &amp; Compliance</div>
                                      <div className="nav_arrow">
                                        <div className="svg cc-nav-arrow-bg w-embed"><svg width="54" height="51" viewBox="0 0 54 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M54 5.6L48.75 0H6L0.375 6L0 5.6V45.4L0.375 45L6 51H48.75L54 45.4V5.6Z" fill="#E7E70D"></path>
                                          </svg></div>
                                        <div className="arrow-wrap cc-2">
                                          <div className="nav_arrow-svg w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_782_8055)">
                                                <path d="M14.8926 24.8372L26.2697 13.46L14.9649 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                                                <path d="M26.2663 13.4614L1.36784 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel"></path>
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_782_8055">
                                                  <rect width="19.1528" height="19.031" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.957 27)"></rect>
                                                </clipPath>
                                              </defs>
                                            </svg></div>
                                        </div>
                                        <div className="arrow-wrap">
                                          <div className="nav_arrow-svg w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_782_8055)">
                                                <path d="M14.8926 24.8372L26.2697 13.46L14.9649 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                                                <path d="M26.2663 13.4614L1.36784 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel"></path>
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_782_8055">
                                                  <rect width="19.1528" height="19.031" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.957 27)"></rect>
                                                </clipPath>
                                              </defs>
                                            </svg></div>
                                        </div>
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </nav>
                          </div>
                          <div data-hover="false" data-delay="500" data-w-id="ac16cc5c-4857-2364-279f-0d7a4cd1256d" className="nav_dropdown cc-desktop w-dropdown">
                            <div data-w-id="ac16cc5c-4857-2364-279f-0d7a4cd1256e" className="nav_toggle w-dropdown-toggle">
                              <div className="text-overflow">
                                <div className="c-text-link cc-nav">Solutions</div>
                                <div className="nav_line"></div>
                              </div><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 10 6" fill="none" className="chevron">
                                <path d="M0.525391 1L5.02539 5L9.52539 1" stroke="currentColor"></path>
                              </svg>
                            </div>
                            <nav a-dm="" className="nav_list w-dropdown-list">
                              <div className="nav_list-wrap">
                                <div className="nav_list-flex">
                                  <div className="nav_list-flex cc-inner">
                                    <a a-dm="" data-w-id="ac16cc5c-4857-2364-279f-0d7a4cd12579" href="private-markets-platform.html" className="nav_item cc-2 w-inline-block">
                                      <div className="c-title-3 cc-nav-2">Private Markets</div>
                                      <div className="nav_arrow">
                                        <div className="svg cc-nav-arrow-bg w-embed"><svg width="54" height="51" viewBox="0 0 54 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M54 5.6L48.75 0H6L0.375 6L0 5.6V45.4L0.375 45L6 51H48.75L54 45.4V5.6Z" fill="#E7E70D"></path>
                                          </svg></div>
                                        <div className="arrow-wrap cc-2">
                                          <div className="nav_arrow-svg w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_782_8055)">
                                                <path d="M14.8926 24.8372L26.2697 13.46L14.9649 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                                                <path d="M26.2663 13.4614L1.36784 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel"></path>
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_782_8055">
                                                  <rect width="19.1528" height="19.031" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.957 27)"></rect>
                                                </clipPath>
                                              </defs>
                                            </svg></div>
                                        </div>
                                        <div className="arrow-wrap">
                                          <div className="nav_arrow-svg w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_782_8055)">
                                                <path d="M14.8926 24.8372L26.2697 13.46L14.9649 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                                                <path d="M26.2663 13.4614L1.36784 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel"></path>
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_782_8055">
                                                  <rect width="19.1528" height="19.031" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.957 27)"></rect>
                                                </clipPath>
                                              </defs>
                                            </svg></div>
                                        </div>
                                      </div>
                                    </a>
                                    <a a-dm="" data-w-id="ac16cc5c-4857-2364-279f-0d7a4cd12581" href="public-markets-platform.html" className="nav_item cc-3 w-inline-block">
                                      <div className="c-title-3 cc-nav-3">Public Markets</div>
                                      <div className="nav_arrow">
                                        <div className="svg cc-nav-arrow-bg w-embed"><svg width="54" height="51" viewBox="0 0 54 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M54 5.6L48.75 0H6L0.375 6L0 5.6V45.4L0.375 45L6 51H48.75L54 45.4V5.6Z" fill="#E7E70D"></path>
                                          </svg></div>
                                        <div className="arrow-wrap cc-2">
                                          <div className="nav_arrow-svg w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_782_8055)">
                                                <path d="M14.8926 24.8372L26.2697 13.46L14.9649 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                                                <path d="M26.2663 13.4614L1.36784 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel"></path>
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_782_8055">
                                                  <rect width="19.1528" height="19.031" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.957 27)"></rect>
                                                </clipPath>
                                              </defs>
                                            </svg></div>
                                        </div>
                                        <div className="arrow-wrap">
                                          <div className="nav_arrow-svg w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_782_8055)">
                                                <path d="M14.8926 24.8372L26.2697 13.46L14.9649 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                                                <path d="M26.2663 13.4614L1.36784 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel"></path>
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_782_8055">
                                                  <rect width="19.1528" height="19.031" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.957 27)"></rect>
                                                </clipPath>
                                              </defs>
                                            </svg></div>
                                        </div>
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </nav>
                          </div>
                          <a href="blog.html" className="nav_link w-inline-block">
                            <div className="c-text-link cc-nav">Blog</div>
                            <div className="nav_line"></div>
                          </a>
                          <div data-hover="false" data-delay="500" data-w-id="83771abb-9268-5d18-1c75-96be37352b7a" className="nav_dropdown cc-desktop w-dropdown">
                            <div data-w-id="83771abb-9268-5d18-1c75-96be37352b7b" className="nav_toggle w-dropdown-toggle">
                              <div className="text-overflow">
                                <div className="c-text-link cc-nav">Company</div>
                                <div className="nav_line"></div>
                              </div><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 10 6" fill="none" className="chevron">
                                <path d="M0.525391 1L5.02539 5L9.52539 1" stroke="currentColor"></path>
                              </svg>
                            </div>
                            <nav a-dm="" className="nav_list w-dropdown-list">
                              <div className="nav_list-wrap">
                                <div className="nav_list-flex">
                                  <div className="nav_list-flex cc-inner">
                                    <a a-dm="" data-w-id="83771abb-9268-5d18-1c75-96be37352b86" href="about.html" className="nav_item cc-1 w-inline-block">
                                      <div className="c-title-3 cc-nav-1">About</div>
                                      <div className="nav_arrow">
                                        <div className="svg cc-nav-arrow-bg w-embed"><svg width="54" height="51" viewBox="0 0 54 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M54 5.6L48.75 0H6L0.375 6L0 5.6V45.4L0.375 45L6 51H48.75L54 45.4V5.6Z" fill="#E7E70D"></path>
                                          </svg></div>
                                        <div className="arrow-wrap cc-2">
                                          <div className="nav_arrow-svg w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_782_8055)">
                                                <path d="M14.8926 24.8372L26.2697 13.46L14.9649 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                                                <path d="M26.2663 13.4614L1.36784 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel"></path>
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_782_8055">
                                                  <rect width="19.1528" height="19.031" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.957 27)"></rect>
                                                </clipPath>
                                              </defs>
                                            </svg></div>
                                        </div>
                                        <div className="arrow-wrap">
                                          <div className="nav_arrow-svg w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_782_8055)">
                                                <path d="M14.8926 24.8372L26.2697 13.46L14.9649 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                                                <path d="M26.2663 13.4614L1.36784 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel"></path>
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_782_8055">
                                                  <rect width="19.1528" height="19.031" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.957 27)"></rect>
                                                </clipPath>
                                              </defs>
                                            </svg></div>
                                        </div>
                                      </div>
                                    </a>
                                    <a a-dm="" data-w-id="83771abb-9268-5d18-1c75-96be37352b8e" href="https://www.linkedin.com/company/brightwaveio/jobs/" target="_blank" className="nav_item cc-2 w-inline-block">
                                      <div className="c-title-3 cc-nav-2">Careers</div>
                                      <div className="nav_arrow">
                                        <div className="svg cc-nav-arrow-bg w-embed"><svg width="54" height="51" viewBox="0 0 54 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M54 5.6L48.75 0H6L0.375 6L0 5.6V45.4L0.375 45L6 51H48.75L54 45.4V5.6Z" fill="#E7E70D"></path>
                                          </svg></div>
                                        <div className="arrow-wrap cc-2">
                                          <div className="nav_arrow-svg w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_782_8055)">
                                                <path d="M14.8926 24.8372L26.2697 13.46L14.9649 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                                                <path d="M26.2663 13.4614L1.36784 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel"></path>
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_782_8055">
                                                  <rect width="19.1528" height="19.031" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.957 27)"></rect>
                                                </clipPath>
                                              </defs>
                                            </svg></div>
                                        </div>
                                        <div className="arrow-wrap">
                                          <div className="nav_arrow-svg w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_782_8055)">
                                                <path d="M14.8926 24.8372L26.2697 13.46L14.9649 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                                                <path d="M26.2663 13.4614L1.36784 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel"></path>
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_782_8055">
                                                  <rect width="19.1528" height="19.031" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.957 27)"></rect>
                                                </clipPath>
                                              </defs>
                                            </svg></div>
                                        </div>
                                      </div>
                                    </a>
                                    <a a-dm="" data-w-id="83771abb-9268-5d18-1c75-96be37352b96" href="news.html" className="nav_item cc-3 w-inline-block">
                                      <div className="c-title-3 cc-nav-3">News</div>
                                      <div className="nav_arrow">
                                        <div className="svg cc-nav-arrow-bg w-embed"><svg width="54" height="51" viewBox="0 0 54 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M54 5.6L48.75 0H6L0.375 6L0 5.6V45.4L0.375 45L6 51H48.75L54 45.4V5.6Z" fill="#E7E70D"></path>
                                          </svg></div>
                                        <div className="arrow-wrap cc-2">
                                          <div className="nav_arrow-svg w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_782_8055)">
                                                <path d="M14.8926 24.8372L26.2697 13.46L14.9649 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                                                <path d="M26.2663 13.4614L1.36784 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel"></path>
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_782_8055">
                                                  <rect width="19.1528" height="19.031" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.957 27)"></rect>
                                                </clipPath>
                                              </defs>
                                            </svg></div>
                                        </div>
                                        <div className="arrow-wrap">
                                          <div className="nav_arrow-svg w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clipPath="url(#clip0_782_8055)">
                                                <path d="M14.8926 24.8372L26.2697 13.46L14.9649 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                                                <path d="M26.2663 13.4614L1.36784 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel"></path>
                                              </g>
                                              <defs>
                                                <clipPath id="clip0_782_8055">
                                                  <rect width="19.1528" height="19.031" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.957 27)"></rect>
                                                </clipPath>
                                              </defs>
                                            </svg></div>
                                        </div>
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </nav>
                          </div>
                          <div accordion="" className="nav_dropdown cc-mobile">
                            <div className="nav_toggle">
                              <div className="c-text-link cc-nav">Platform</div><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 10 6" fill="none" chevron="" className="chevron">
                                <path d="M0.525391 1L5.02539 5L9.52539 1" stroke="currentColor"></path>
                              </svg><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                            </div>
                            <div accordion="element" className="nav_list">
                              <div mask-height="element">
                                <div className="mobile_items">
                                  <a href="investment-intelligence-engine.html" className="c-title-4">Investment Intelligence Engine</a>
                                  <a href="enterprise-security-compliance.html" className="c-title-4">Enterprise Security &amp; Compliance</a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div accordion="" className="nav_dropdown cc-mobile">
                            <div className="nav_toggle">
                              <div className="c-text-link cc-nav">Solutions</div><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 10 6" fill="none" chevron="" className="chevron">
                                <path d="M0.525391 1L5.02539 5L9.52539 1" stroke="currentColor"></path>
                              </svg><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                            </div>
                            <div accordion="element" className="nav_list">
                              <div mask-height="element">
                                <div className="mobile_items">
                                  <a href="private-markets-platform.html" className="c-title-4">Private Markets</a>
                                  <a href="public-markets-platform.html" className="c-title-4">Public Markets</a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div accordion="" className="nav_dropdown cc-mobile">
                            <div className="nav_toggle">
                              <div className="c-text-link cc-nav">Resources</div><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 10 6" fill="none" chevron="" className="chevron">
                                <path d="M0.525391 1L5.02539 5L9.52539 1" stroke="currentColor"></path>
                              </svg><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                            </div>
                            <div accordion="element" className="nav_list">
                              <div mask-height="element">
                                <div className="mobile_items">
                                  <a href="#" className="c-title-4 cc-hidden">Case Studies</a>
                                  <a href="blog.html" className="c-title-4">Blog</a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div accordion="" className="nav_dropdown cc-mobile">
                            <div className="nav_toggle">
                              <div className="c-text-link cc-nav">Company</div><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 10 6" fill="none" chevron="" className="chevron">
                                <path d="M0.525391 1L5.02539 5L9.52539 1" stroke="currentColor"></path>
                              </svg><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                            </div>
                            <div accordion="element" className="nav_list">
                              <div mask-height="element">
                                <div className="mobile_items">
                                  <a href="about.html" className="c-title-4">About</a>
                                  <a href="https://www.linkedin.com/company/brightwaveio/jobs/" target="_blank" className="c-title-4">Careers</a>
                                  <a href="news.html" className="c-title-4">News</a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <a href="pricing.html" className="nav_link w-inline-block">
                            <div className="nav_line"></div>
                          </a>
                        </div>
                      </nav>
                      <div className="nav_ctas">
                        <div className="nav_btns">
                          <div data-w-id="faefcd5e-5b3c-824a-01c6-d01116acb6bc" className="toggle">
                            <div data-is-ix2-target="1" className="nav_lottie" data-w-id="28ceacb8-4b78-f834-de1e-a515771ea564" data-animation-type="lottie" data-src="/webflow-documents/Animation---1728577640189.json" data-loop="1" data-direction="1" data-autoplay="0" data-renderer="svg" data-default-duration="0" data-duration="2.566666666666667" data-ix2-initial-state="50"></div>
                          </div>
                          <a stagger-text-btn="" href="https://app.brightwave.io/login" className="cta-sec cc-fill w-inline-block">
                            <div stagger-link-text="light" className="c-text-link cc-stagger">Login</div>
                          </a>
                          <a stagger-text-btn="" href="contact.html" className="cta-sec w-inline-block">
                            <div stagger-link-text="dark" className="c-text-link cc-stagger">Get Started</div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hamburger w-nav-button">
                    <div className="hamburger_inner cc-fill">
                      <div className="c-text-link cc-stagger">Menu</div>
                    </div>
                    <div className="hamburger_inner cc-abso">
                      <div className="c-text-link cc-stagger">Close</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section className="c-section cc-thank-you_hero">
              <div className="c-container">
                <div className="c-thank-you_hero_main-wrapper">
                  <div className="c-thank-you_hero_content-wrapper">
                    <div className="c-thank-you_hero_content-text-stack">
                      <h1 className="c-title-2">{doc.heroHeading}</h1>
                      <div className="c-thank-you_hero_content-divider"></div>
                      <p className="c-text-3">{doc.heroBody}</p>
                    </div>
                    <div className="c-thank-you_hero_button-wrapper">
                      <a stagger-cta="" href={doc.ctaUrl} className="cta-p-sm w-inline-block">
                        <div>
                          <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">{doc.ctaText}</div>
                        </div>
                        <div className="flip-small">
                          <div className="flip-bg"></div>
                        </div>
                        <div className="flip-big">
                          <div className="svg cta-sm-arrow w-embed"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_774_4073)">
                                <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                                <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_774_4073">
                                  <rect width="12" height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)"></rect>
                                </clipPath>
                              </defs>
                            </svg></div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="c-thank-you_hero_image-wrapper"><img src={doc.heroImageUrl} loading="lazy" alt={doc.heroImageAlt} className="c-thank-you_hero_image" /></div>
                </div>
              </div>
            </section>
      </div>
    </>
  )
}
