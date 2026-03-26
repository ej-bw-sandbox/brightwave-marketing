import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { partner_termsQuery } from '@/lib/sanity/queries/partner-terms'
import { buildMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  const doc = await client.fetch(partner_termsQuery, {}, { next: { tags: ['partnerTermsPage'], revalidate: 3600 } })
  if (!doc) return { title: 'Partner Program Terms' }
  return buildMetadata({
    title: doc.title || 'Partner Program Terms',
    description: doc.description || '',
    seo: doc.seo,
    path: '/partner-terms',
  })
}

export default async function Page() {
  let doc: Record<string, string> | null = null
  try {
    doc = await client.fetch(partner_termsQuery, {}, { next: { tags: ['partnerTermsPage'], revalidate: 3600 } })
  } catch {
    doc = null
  }

  return (
    <>
      <div className="main">
            <section className="c-section cc-legal">
              <div className="c-container">
                <div className="grid cc-8">
                  <div id="w-node-b7d89e17-45e9-fcac-1fde-18aac1a9272e-1e775268" className="legal_flex">
                    <div className="legal_titles">
                      <div className="legal_title">
                        <div className="c-title-2">PARTNER <br />PROGRAM</div>
                      </div>
                      <div className="legal_title cc-right">
                        <div className="c-title-2">Terms of use</div>
                      </div>
                      <div className="legal_date">
                        <div className="block"></div>
                        <div className="c-title-5">February 2026</div>
                      </div>
                    </div>
                    <div className="legal-rt w-richtext">
                      <p>These Partner Program Terms of Service (&quot;Partner Terms&quot;) govern your participation in the Brightwave Partner Program (&quot;Program&quot;) operated by Brightwave, Inc. (&quot;Brightwave,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By applying to or participating in the Program, you (&quot;Partner,&quot; &quot;you,&quot; or &quot;your&quot;) agree to be bound by these Partner Terms.</p>
                      <p>‍</p>
                      <p>These Partner Terms are in addition to, and do not replace, the Brightwave Terms of Service available at brightwave.io/terms (&quot;General Terms&quot;). In the event of a conflict between these Partner Terms and the General Terms, these Partner Terms shall govern with respect to your participation in the Program.</p>
                      <h2>1. Program Overview</h2>
                      <p>The Brightwave Partner Program enables approved partners to refer prospective customers to Brightwave and earn referral rewards for qualifying meetings generated through those referrals. Brightwave administers the Program through its designated referral platform (currently Dub.co) and reserves the right to change platforms at any time with reasonable notice to active partners.</p>
                      <h2>2. Definitions</h2>
                      <p><strong>&quot;Referral&quot;</strong> means a prospective customer who (a) clicks on your unique referral link, (b) has not previously been a Brightwave customer or active prospect in Brightwave&#x27;s pipeline, and (c) is not already associated with another partner&#x27;s referral.</p>
                      <p>‍</p>
                      <p><strong>&quot;Qualifying meeting&quot;</strong> means a new, sales meeting initiated by a Referral within ninety (90) days of clicking your referral link, excluding meetings that are scheduled, but do not occur.</p>
                      <p>‍</p>
                      <p><strong>&quot;Referral Reward&quot;</strong> means the payment owed to you for each Qualifying Meeting, as set forth in Section 6.</p>
                      <p>‍</p>
                      <p><strong>&quot;Referral Link&quot;</strong> means the unique, trackable URL provided to you through the Program&#x27;s referral platform for the purpose of identifying and attributing Referrals.</p>
                      <p>‍</p>
                      <p><strong>&quot;Partner Content&quot;</strong> means any marketing materials, copy, descriptions, or other content you create or distribute in connection with promoting Brightwave through the Program.</p>
                      <h2>3. Eligibility and Enrollment</h2>
                      <h3>3.1 Application</h3>
                      <p>Participation in the Program requires submission of an application through the designated application page. Brightwave reviews all applications and reserves the right to accept or reject any application at its sole discretion, without obligation to provide a reason for rejection.</p>
                      <h3>3.2 Eligibility Requirements</h3>
                      <p>To be eligible for the Program, you must:</p>
                      <p>‍</p>
                      <ul role="list">
                        <li>Be at least 18 years of age or the age of majority in your jurisdiction</li>
                        <li>Provide accurate and complete information in your application</li>
                        <li>Have a legitimate platform, audience, network, or professional practice through which to promote Brightwave</li>
                        <li>Comply with all applicable laws and regulations in your jurisdiction</li>
                        <li>Not be a current Brightwave employee or contractor</li>
                      </ul>
                      <h3>3.3 Approval</h3>
                      <p>Upon approval, you will receive access to your unique Referral Link and any Program materials made available through the referral platform. Approval does not guarantee any minimum level of referral rewards or program duration.</p>
                      <h2>4. Partner Obligations</h2>
                      <h3>4.1 Promotional Standards</h3>
                      <p>When promoting Brightwave, you agree to:</p>
                      <ul role="list">
                        <li>Represent Brightwave and its products accurately and honestly</li>
                        <li>Use only current, approved descriptions of Brightwave&#x27;s features, capabilities, and pricing</li>
                        <li>Clearly disclose your participation in the Program and your financial relationship with Brightwave in compliance with applicable laws, including FTC Endorsement Guides (16 CFR Part 255) or equivalent regulations in your jurisdiction</li>
                        <li>Not make guarantees, warranties, or representations about Brightwave&#x27;s products beyond what is stated in Brightwave&#x27;s official materials</li>
                        <li>Not engage in any deceptive, misleading, or unethical promotional practices</li>
                      </ul>
                      <h3>4.2 Prohibited Activities</h3>
                      <p>You shall not:</p>
                      <ul role="list">
                        <li>Use spam, unsolicited messaging, or bulk communications to generate Referrals</li>
                        <li>Bid on Brightwave&#x27;s trademarks, brand terms, or variations thereof in paid search advertising (including Google Ads, Bing Ads, or similar platforms) without prior written approval</li>
                        <li>Create websites, landing pages, or social media profiles that could be confused with official Brightwave properties</li>
                        <li>Offer unauthorized discounts, rebates, or incentives to prospective customers beyond those officially provided through the Program</li>
                        <li>Generate Referrals through cookie stuffing, click fraud, forced clicks, misleading redirects, or any other form of artificial or fraudulent traffic</li>
                        <li>Use Brightwave&#x27;s name, logo, or trademarks in any manner that implies an official endorsement, employment relationship, or partnership beyond your status as a Program participant</li>
                        <li>Promote Brightwave in connection with content that is unlawful, defamatory, obscene, discriminatory, or otherwise objectionable</li>
                        <li>Refer yourself, your own accounts, or entities you control for the purpose of earning Referral Rewards</li>
                        <li>Share, transfer, or sublicense your Referral Link to third parties</li>
                      </ul>
                      <h3>4.3 Regulatory Compliance</h3>
                      <p>If you are a regulated professional (including but not limited to licensed financial advisors, broker-dealers, or registered investment advisors), you are solely responsible for ensuring that your participation in the Program and any promotional activities comply with applicable regulatory requirements, including disclosure obligations and compensation reporting.</p>
                      <h2>5. Referral Tracking and Attribution</h2>
                      <h3>5.1 Tracking</h3>
                      <p>All Referrals are tracked through your unique Referral Link using the Program&#x27;s referral platform. You are responsible for ensuring prospective customers use your Referral Link. Brightwave is not responsible for tracking or crediting referrals made outside the referral platform&#x27;s tracking system.</p>
                      <h3>5.2 Attribution</h3>
                      <p>A Referral is attributed to you when a prospective customer clicks your Referral Link and the referral platform records the activity. Attribution is subject to:</p>
                      <ul role="list">
                        <li>A ninety (90) day attribution window from the date of the initial click</li>
                        <li>First-touch attribution: if a prospect has clicked multiple partners&#x27; Referral Links, the first referring partner receives attribution</li>
                        <li>Brightwave&#x27;s sole discretion in cases of disputed attribution</li>
                      </ul>
                      <h3>5.3 Exclusions</h3>
                      <p>A Referral will not qualify, and no Referral Reward will be owed, if:</p>
                      <ul role="list">
                        <li>The referred individual is not a private equity or private credit investment professional.</li>
                      </ul>
                      <ul role="list">
                        <li>The referred individual or entity was already a Brightwave customer or active prospect in Brightwave&#x27;s sales pipeline at the time of the referral</li>
                        <li>A referral has already been generated from the same company</li>
                        <li>The referral was generated through prohibited activities as described in Section 4.2</li>
                        <li>The referred customer cancels their subscription within the first thirty (30) days</li>
                        <li>The referred customer&#x27;s payment is declined, disputed, or refunded</li>
                        <li>Other cases in which the referral does not meet the requirements outlined by referral offers at Brightwave&#x27;s sole discretion in cases of dispute.</li>
                      </ul>
                      <h2>6. Referral Rewards</h2>
                      <h3>6.1 Reward Structure</h3>
                      <p>For each Qualifying Meeting Held, you will earn a Referral Reward as specified on the Program page at the time the Referral was initiated. As of the effective date of these Partner Terms, the Referral Reward is <strong>$1,000 per Qualifying Meeting Held</strong>.</p>
                      <h3>6.2 Modifications to Reward Structure</h3>
                      <p>Brightwave reserves the right to modify the Referral Reward structure at any time. Changes to the reward structure will be communicated through the referral platform or via email to your registered address. Changes apply only to Referrals initiated after the effective date of the modification; Referral Rewards for previously initiated and qualifying Referrals will be honored at the rate in effect when the Referral was made.</p>
                      <h3>6.3 Payment</h3>
                      <p>Referral Rewards are processed through the Program&#x27;s referral platform according to the platform&#x27;s standard payment schedule and methods. You are responsible for providing accurate payment information and maintaining an active account on the referral platform.</p>
                      <h3>6.4 Taxes</h3>
                      <p>Referral Rewards constitute taxable income. You are solely responsible for reporting and paying all taxes applicable to Referral Rewards received through the Program. Brightwave may require you to provide tax identification information (such as a W-9 for U.S. partners) and may issue tax reporting documents (such as a 1099) as required by applicable law. Brightwave will not process Referral Rewards until required tax documentation has been received.</p>
                      <h3>6.5 Minimum Threshold</h3>
                      <p>Referral Rewards may be subject to a minimum payout threshold as determined by the referral platform&#x27;s payment processing requirements.</p>
                      <h2>7. Intellectual Property</h2>
                      <h3>7.1 Limited License</h3>
                      <p>Subject to these Partner Terms, Brightwave grants you a limited, non-exclusive, non-transferable, revocable license to use Brightwave&#x27;s name, logo, and approved marketing materials solely for the purpose of promoting Brightwave through the Program. This license terminates immediately upon your removal from or departure from the Program.</p>
                      <h3>7.2 Brand Guidelines</h3>
                      <p>Your use of Brightwave&#x27;s trademarks and brand assets must comply with any brand guidelines provided to you. Brightwave reserves the right to review and require modification or removal of any Partner Content that does not comply with its brand guidelines or these Partner Terms.</p>
                      <h3>7.3 Ownership</h3>
                      <p>Nothing in these Partner Terms transfers any ownership interest in Brightwave&#x27;s intellectual property to you. All goodwill generated through your use of Brightwave&#x27;s trademarks inures solely to Brightwave&#x27;s benefit.</p>
                      <h2>8. Confidentiality</h2>
                      <h3>8.1 Confidential Information</h3>
                      <p>In connection with the Program, you may receive non-public information about Brightwave&#x27;s products, pricing, business strategies, or customers (&quot;Confidential Information&quot;). You agree to keep Confidential Information strictly confidential and not to disclose it to any third party without Brightwave&#x27;s prior written consent.</p>
                      <h3>8.2 Exclusions</h3>
                      <p>Confidential Information does not include information that: (a) is or becomes publicly available through no fault of yours; (b) was known to you prior to disclosure by Brightwave; (c) is independently developed by you without use of Confidential Information; or (d) is disclosed to you by a third party without breach of any confidentiality obligation.</p>
                      <h2>9. Data Privacy</h2>
                      <h3>9.1 Referral Data</h3>
                      <p>Brightwave collects and processes data related to Referrals, including click data, conversion events, and subscription information. This data is processed in accordance with Brightwave&#x27;s Privacy Policy.</p>
                      <h3>9.2 Partner Data</h3>
                      <p>Information you provide in your application and through your participation in the Program is processed in accordance with Brightwave&#x27;s Privacy Policy. You consent to Brightwave&#x27;s use of your name, company name, and a general description of your partnership for promotional purposes, unless you opt out in writing.</p>
                      <h3>9.3 Your Obligations</h3>
                      <p>If your promotional activities involve the collection of personal data from prospective customers, you are solely responsible for complying with applicable data privacy laws, including obtaining any necessary consents.</p>
                      <h2>10. Representations and Warranties</h2>
                      <p>You represent and warrant that:</p>
                      <p>‍</p>
                      <ul role="list">
                        <li>You have the legal authority to enter into these Partner Terms</li>
                        <li>Your participation in the Program does not violate any agreement you have with a third party</li>
                        <li>All information provided in your application and throughout your participation is accurate and current</li>
                        <li>Your promotional activities will comply with all applicable laws and regulations</li>
                        <li>You will not engage in any activity that could harm Brightwave&#x27;s reputation or goodwill</li>
                      </ul>
                      <h2>11. Disclaimers</h2>
                      <p>THE PROGRAM IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE.&quot; BRIGHTWAVE MAKES NO WARRANTIES, EXPRESS OR IMPLIED, REGARDING THE PROGRAM, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. BRIGHTWAVE DOES NOT GUARANTEE ANY MINIMUM LEVEL OF REFERRAL REWARDS, PROGRAM AVAILABILITY, OR CONVERSION RATES.</p>
                      <h2>12. Limitation of Liability</h2>
                      <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, BRIGHTWAVE&#x27;S TOTAL LIABILITY TO YOU IN CONNECTION WITH THE PROGRAM SHALL NOT EXCEED THE TOTAL REFERRAL REWARDS PAID TO YOU IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM. IN NO EVENT SHALL BRIGHTWAVE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO THE PROGRAM.</p>
                      <h2>13. Indemnification</h2>
                      <p>You agree to indemnify, defend, and hold harmless Brightwave, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorneys&#x27; fees) arising out of or related to: (a) your participation in the Program; (b) your breach of these Partner Terms; (c) your promotional activities; or (d) your violation of any applicable law or regulation.</p>
                      <h2>14. Term and Termination</h2>
                      <h3>14.1 Term</h3>
                      <p>These Partner Terms are effective upon your acceptance into the Program and remain in effect until terminated by either party.</p>
                      <h3>14.2 Termination by Partner</h3>
                      <p>You may terminate your participation in the Program at any time by deactivating your account on the referral platform or by providing written notice to <a href="mailto:partners@brightwave.io">partners@brightwave.io</a>.</p>
                      <h3>14.3 Termination by Brightwave</h3>
                      <p>Brightwave may terminate your participation in the Program at any time, with or without cause, by providing notice to your registered email address. Brightwave may immediately suspend or terminate your participation without prior notice if it reasonably believes you have violated these Partner Terms.</p>
                      <h3>14.4 Effect of Termination</h3>
                      <p>Upon termination:</p>
                      <p>‍</p>
                      <ul role="list">
                        <li>Your license to use Brightwave&#x27;s trademarks and brand assets terminates immediately</li>
                        <li>You must cease all promotional activities on behalf of Brightwave</li>
                        <li>You must remove or disable your Referral Link from all platforms and content</li>
                        <li>Referral Rewards for Qualifying Meetings that occurred prior to termination will be honored, subject to the terms of Section 6</li>
                        <li>Sections 7.3, 8, 11, 12, 13, and 15 survive termination</li>
                      </ul>
                      <h3>14.5 Program Discontinuation</h3>
                      <p>Brightwave reserves the right to discontinue the Program entirely at any time. In such event, Brightwave will honor outstanding Referral Rewards for Qualifying Meetings initiated prior to the discontinuation date.</p>
                      <h2>15. General Provisions</h2>
                      <h3>15.1 Governing Law</h3>
                      <p>These Partner Terms are governed by the laws of the State of Delaware, without regard to its conflict of laws principles. Any disputes arising under these Partner Terms shall be resolved in the state or federal courts located in Delaware.</p>
                      <h3>15.2 Entire Agreement</h3>
                      <p>These Partner Terms, together with the General Terms and Privacy Policy, constitute the entire agreement between you and Brightwave with respect to the Program and supersede all prior or contemporaneous agreements relating to the Program.</p>
                      <h3>15.3 Amendments</h3>
                      <p>Brightwave may amend these Partner Terms at any time by posting the revised terms on its website or notifying you via the referral platform or email. Your continued participation in the Program after the effective date of any amendment constitutes your acceptance of the revised terms. If you do not agree to the revised terms, your sole remedy is to terminate your participation.</p>
                      <h3>15.4 Assignment</h3>
                      <p>You may not assign or transfer your participation in the Program or any rights under these Partner Terms without Brightwave&#x27;s prior written consent. Brightwave may assign these Partner Terms without restriction.</p>
                      <h3>15.5 Severability</h3>
                      <p>If any provision of these Partner Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.</p>
                      <h3>15.6 Waiver</h3>
                      <p>Brightwave&#x27;s failure to enforce any provision of these Partner Terms does not constitute a waiver of that provision or any other provision.</p>
                      <h3>15.7 Independent Contractor</h3>
                      <p>Your relationship with Brightwave under the Program is that of an independent contractor. Nothing in these Partner Terms creates an employment, agency, joint venture, or partnership relationship.</p>
                      <h3>15.8 Notices</h3>
                      <p>Notices under these Partner Terms shall be sent to <a href="mailto:partners@brightwave.io">partners@brightwave.io</a> for Brightwave, and to your registered email address for you.</p>
                      <h2>Contact</h2>
                      <p>For questions about these Partner Terms or the Brightwave Partner Program, contact us at <a href="mailto:partners@brightwave.io"><strong>partners@brightwave.io</strong></a>.</p>
                      <p><em>Brightwave, Inc. All rights reserved.</em></p>
                      <p>‍</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
      </div>
    </>
  )
}
