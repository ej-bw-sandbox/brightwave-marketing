
/* ------------------------------------------------------------------ */
/*  Footer Component - CMS-driven from Sanity siteSettings             */
/* ------------------------------------------------------------------ */

import { client } from '@/lib/sanity/client'
import { siteSettingsQuery } from '@/lib/sanity/queries/site-settings'

interface FooterLink { _key: string; label: string; url: string }
interface FooterColumn { _key: string; title: string; links: FooterLink[] }
interface SiteSettings {
  footerTagline?: string
  footerColumns?: FooterColumn[]
  socialLinks?: { linkedin?: string; twitter?: string; github?: string; youtube?: string }
  legalLinks?: FooterLink[]
  copyrightText?: string
  companyName?: string
}

/* ---- Fallback data so the footer always renders ---- */
const FALLBACK: SiteSettings = {
  footerTagline: "Professional-grade AI for the world's most complex challenges.",
  copyrightText: '2026 Brightwave Inc. All rights reserved.',
  socialLinks: { linkedin: 'https://www.linkedin.com/company/brightwave-io/about/', twitter: 'https://x.com/brightwaveio' },
  footerColumns: [
    { _key: 'col-solutions', title: 'Solutions', links: [{ _key: 'l-pm', label: 'Private Markets', url: '/private-markets-platform' }] },
    { _key: 'col-resources', title: 'Resources', links: [
      { _key: 'l-blog', label: 'Blog', url: '/blog' },
      { _key: 'l-eng-log', label: 'Engineering Log', url: '/engineering-log' },
      { _key: 'l-events', label: 'Events', url: '/events' },
      { _key: 'l-kb', label: 'Knowledge Base', url: 'https://docs.brightwave.io' },
      { _key: 'l-partners', label: 'Partner Program', url: '/partners' },
      { _key: 'l-rn', label: 'Release Notes', url: '/release-notes' },
      { _key: 'l-support', label: 'Support', url: '/support' },
      { _key: 'l-tools', label: 'Tools & Guides', url: '/tools-guides' },
    ]},
    { _key: 'col-company', title: 'Company', links: [
      { _key: 'l-about', label: 'About', url: '/about' },
      { _key: 'l-news2', label: 'News', url: '/news' },
      { _key: 'l-careers', label: 'Careers', url: 'https://www.linkedin.com/company/brightwaveio/jobs/' },
    ]},
    { _key: 'col-comparisons', title: 'Comparisons', links: [
      { _key: 'l-c1', label: 'vs. AlphaSense', url: '/comparisons/brightwave-vs-alphasense' },
      { _key: 'l-c2', label: 'vs. Blueflame AI', url: '/comparisons/brightwave-vs-blueflame-ai' },
      { _key: 'l-c3', label: 'vs. Boosted AI', url: '/comparisons/brightwave-vs-boosted-ai' },
      { _key: 'l-c4', label: 'vs. ChatGPT', url: '/comparisons/brightwave-vs-chatgpt' },
      { _key: 'l-c5', label: 'vs. Claude', url: '/comparisons/brightwave-vs-claude' },
      { _key: 'l-c6', label: 'vs. Daloopa AI', url: '/comparisons/brightwave-vs-daloopa-ai' },
      { _key: 'l-c7', label: 'vs. Hebbia', url: '/comparisons/brightwave-vs-hebbia' },
      { _key: 'l-c8', label: 'vs. Perplexity', url: '/comparisons/brightwave-vs-perplexity' },
      { _key: 'l-c9', label: 'vs. Rogo AI', url: '/comparisons/brightwave-vs-rogo-ai' },
    ]},
  ],
  legalLinks: [
    { _key: 'll-security', label: 'Safety & Security', url: '/legal/safety-security' },
    { _key: 'll-privacy', label: 'Privacy Policy', url: '/legal/privacy-policy' },
    { _key: 'll-terms', label: 'Terms of Service', url: '/legal/terms-of-use' },
  ],
}

function isExternal(url: string) {
  return url.startsWith('http://') || url.startsWith('https://')
}

export async function Footer() {
  let settings: SiteSettings | null = null
  try {
    settings = await client.fetch(siteSettingsQuery, {}, { next: { tags: ['siteSettings'], revalidate: 60 } })
  } catch { /* use fallback */ }

  const s = settings ?? FALLBACK
  const tagline = s.footerTagline ?? FALLBACK.footerTagline
  const columns = s.footerColumns?.length ? s.footerColumns : FALLBACK.footerColumns!
  const social = s.socialLinks ?? FALLBACK.socialLinks!
  const legal = s.legalLinks?.length ? s.legalLinks : FALLBACK.legalLinks!
  const copyright = s.copyrightText ?? FALLBACK.copyrightText

  return (
    <>
<section no-fade="" className="c-section cc-footer">
        <div className="c-container">
          <div className="footer-wrap" style={{ maxHeight: 'none' }}>
            <div className="footer">
              <div className="footer_content" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <div className="c-text-1" style={{ marginBottom: '2.5rem' }}>{tagline}</div>
                <div className="footer_cols" style={{ gridTemplateColumns: `repeat(${columns.length + 1}, minmax(0, 1fr))` }}>
                  {/* CTA + Social column */}
                  <div className="footer_cat">
                    <div className="invert">
                      <div className="dark-mode-invert">
                        <a stagger-cta="" href="/contact" className="cta-p-sm cc-stroke w-inline-block">
                          <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">Contact us</div>
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
                        </a>
                      </div>
                    </div>
                    <div className="mobile-btns cc-footer" style={{ marginTop: '1.5rem' }}>
                      {social.linkedin && (
                        <div className="nav-social">
                          <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="c-linkedin w-inline-block">
                            <div className="svg w-embed"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.94043 5.00002C6.94017 5.53046 6.7292 6.03906 6.35394 6.41394C5.97868 6.78883 5.46986 6.99929 4.93943 6.99902C4.409 6.99876 3.90039 6.78779 3.52551 6.41253C3.15062 6.03727 2.94016 5.52846 2.94043 4.99802C2.9407 4.46759 3.15166 3.95899 3.52692 3.5841C3.90218 3.20922 4.411 2.99876 4.94143 2.99902C5.47186 2.99929 5.98047 3.21026 6.35535 3.58552C6.73024 3.96078 6.9407 4.46959 6.94043 5.00002ZM7.00043 8.48002H3.00043L3.00043 21H7.00043L7.00043 8.48002ZM13.3204 8.48002H9.34043L9.34043 21H13.2804V14.43C13.2804 10.77 18.0504 10.43 18.0504 14.43V21H22.0004L22.0004 13.07C22.0004 6.90002 14.9404 7.13002 13.2804 10.16L13.3204 8.48002Z" fill="white"></path>
                              </svg></div>
                          </a>
                        </div>
                      )}
                      {social.twitter && (
                        <div className="nav-social">
                          <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="c-x w-inline-block">
                            <div className="svg w-embed"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.6873 3.06299L12.6913 8.77399L8.3713 3.06299H2.1123L9.5893 12.839L2.5033 20.938H5.5373L11.0063 14.688L15.7863 20.938H21.8883L14.0943 10.634L20.7193 3.06299H17.6873ZM16.6233 19.123L5.6543 4.78199H7.4573L18.3033 19.122L16.6233 19.123Z" fill="white"></path>
                              </svg></div>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Dynamic columns from Sanity */}
                  {columns.map((col) => (
                    <div key={col._key} className="footer_cat">
                      <div className="c-text-link">{col.title}</div>
                      <div className="footer_cat_spacer">
                        {col.links.map((link) => (
                          <a
                            key={link._key}
                            href={link.url}
                            className="c-text-5 cc-link"
                            {...(isExternal(link.url) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          >{link.label}</a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="footer_grid">
                <div id="w-node-dc976ae4-68fc-b3a7-f2fa-a21c48aa546d-48aa5435" className="grid_1"></div>
                <div className="grid_2"></div>
                <div className="grid_2"></div>
                <div className="grid_3"></div>
              </div>
              <div className="footer_brightwave"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1505 285" fill="none" className="brightwave">
                  <path d="M1431.27 223.017C1385.07 223.017 1354.57 190.366 1354.57 141.081C1354.57 91.7958 1384.76 59.1445 1430.96 59.1445C1479.32 59.1445 1508.89 95.1842 1504.58 149.09H1385.68C1388.15 180.817 1405.09 199.299 1431.58 199.299C1450.37 199.299 1465.77 190.058 1471.31 174.656H1500.58C1492.88 204.227 1466.39 223.017 1431.27 223.017ZM1386.3 128.143H1474.7C1472.55 99.4966 1456.84 82.8629 1431.89 82.8629C1406.63 82.8629 1389.99 99.8046 1386.3 128.143Z" fill="currentColor"></path>
                  <path d="M1316.52 64.0703H1347.94L1289.73 218.086H1254.92L1197.01 64.0703H1228.12L1272.48 186.359L1316.52 64.0703Z" fill="currentColor"></path>
                  <path d="M1080.83 108.121H1051.26C1056.49 77.3184 1081.44 59.1445 1118.41 59.1445C1157.22 59.1445 1181.55 79.4746 1181.55 112.742V190.674C1181.55 201.147 1182.48 208.232 1184.63 218.089H1155.06C1153.52 211.62 1152.6 204.843 1152.29 197.142C1140.28 213.468 1120.26 223.017 1096.85 223.017C1065.73 223.017 1046.33 206.075 1046.33 178.661C1046.33 152.478 1063.58 135.536 1097.77 129.992L1123.95 125.679C1143.36 122.291 1151.67 115.822 1151.67 104.425C1151.67 90.5637 1139.05 81.6308 1118.72 81.6308C1097.46 81.6308 1082.98 91.7958 1080.83 108.121ZM1151.98 153.094V133.072C1145.21 139.233 1136.58 143.237 1124.57 145.393L1102.7 149.09C1085.76 151.862 1076.52 161.103 1076.52 175.58C1076.52 191.29 1086.99 200.531 1105.78 200.531C1132.58 200.531 1151.98 180.817 1151.98 153.094Z" fill="currentColor"></path>
                  <path d="M904.067 64.0703H936.102L973.066 181.122L1005.72 64.0703H1036.83L992.163 218.086H957.356L920.084 104.114L883.12 218.086H848.005L803.648 64.0703H834.452L867.103 181.122L904.067 64.0703Z" fill="currentColor"></path>
                  <path d="M717.829 22.1797H747.4V64.0719H784.364V87.1743H747.4V170.035C747.4 187.9 753.253 194.985 768.654 194.985H785.288V218.087H761.877C730.766 218.087 717.829 202.378 717.829 168.494V87.1743H694.727V64.0719H717.829V22.1797Z" fill="currentColor"></path>
                  <path d="M540.453 2.46094H569.408V83.4731C581.421 67.7635 599.287 59.1387 620.541 59.1387C655.041 59.1387 675.679 82.241 675.679 119.513V218.083H646.108V124.749C646.108 98.2586 634.711 84.3972 611.3 84.3972C586.658 84.3972 570.024 100.107 570.024 125.057V218.083H540.453V2.46094Z" fill="currentColor"></path>
                  <path d="M387.08 230.41C391.393 250.124 407.41 260.905 431.437 260.905C461.008 260.905 477.026 244.887 477.026 215.316V190.366C464.704 209.156 446.222 219.013 423.736 219.013C382.768 219.013 354.121 186.669 354.121 138.925C354.121 92.1038 383.076 59.1445 423.428 59.1445C445.914 59.1445 464.704 69.0015 477.026 87.7914V64.073H506.596V211.928C506.596 257.825 479.182 284.623 431.437 284.623C390.469 284.623 363.978 264.909 358.126 230.41H387.08ZM431.437 193.754C459.16 193.754 477.334 171.268 477.334 138.925C477.334 106.889 459.16 84.4031 431.437 84.4031C403.714 84.4031 384.924 106.889 384.924 138.925C384.924 170.96 403.714 193.754 431.437 193.754Z" fill="currentColor"></path>
                  <path d="M307.163 38.8119C293.917 38.8119 287.141 29.571 287.141 19.4059C287.141 8.93289 293.917 0 307.163 0C319.792 0 327.185 8.93289 327.185 19.4059C327.185 29.571 319.792 38.8119 307.163 38.8119ZM292.377 218.086V64.0705H321.948V218.086H292.377Z" fill="currentColor"></path>
                  <path d="M185.941 64.073H214.896V90.2557C226.293 69.6176 245.391 59.1445 270.034 59.1445V87.4834C232.762 87.4834 215.512 102.885 215.512 135.536V218.089H185.941V64.073Z" fill="currentColor"></path>
                  <path d="M111.199 101.955C142.002 105.651 162.332 128.138 162.332 159.249C162.332 194.672 135.534 218.083 95.1816 218.083H0V2.46094H87.4808C123.828 2.46094 146.931 22.483 146.931 54.2102C146.931 78.2366 133.377 96.4104 111.199 101.955ZM82.2443 92.7141C104.731 92.7141 117.36 81.0089 117.36 60.0628C117.36 39.7327 105.655 29.2596 82.5523 29.2596H30.8031V92.7141H82.2443ZM30.8031 191.284H91.4852C118.284 191.284 131.529 179.271 131.529 154.936C131.529 130.602 117.36 117.973 89.637 117.973H30.8031V191.284Z" fill="currentColor"></path>
                </svg></div>
              <div className="emblem-wrap"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1538 1669" fill="none" className="brightwave_emblem">
                  <path d="M260.505 300.816L306.359 347.238V751.384L260.505 797.805H45.8869L0.00679596 751.384V347.238L45.8869 300.816H260.505Z" fill="currentColor" fillOpacity="0.35"></path>
                  <path d="M672.07 -2.66019e-05L1173.5 507.345H1255.6L1501.89 258.154L1538 294.666V751.384L1492.12 797.805H915.059L882.142 784.005L379.097 275.03V230.764L607.199 -2.66019e-05H672.07Z" fill="currentColor" fillOpacity="0.35"></path>
                  <path d="M1492.12 871.405L1538 917.826V1374.6L1502.07 1411.24L1255.6 1161.87H1173.5L672.278 1669H607.407L379.097 1438.03V1394.15L882.142 885.206L915.059 871.405H1492.12Z" fill="currentColor" fillOpacity="0.35"></path>
                  <path d="M807.605 812.677V856.522L315.316 1354.61L282.4 1368.41H45.9325C37.2033 1359.58 8.7036 1330.8 0.000401625 1321.97V917.663L45.7246 871.4H321.058L379.096 812.677V453.768L415.987 416.442L807.605 812.677Z" fill="currentColor" fillOpacity="0.35"></path>
                </svg></div>
            </div>
          </div>
          <div className="footer_bootom-wrap">
            <div className="footer_links">
              {legal.map((link) => (
                <a key={link._key} href={link.url} className="footer_link w-inline-block">
                  <div>{link.label}</div>
                </a>
              ))}
            </div>
            <div>
              <div>{copyright}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
