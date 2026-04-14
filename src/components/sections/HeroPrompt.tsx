'use client'

import { useState, useEffect, useCallback, type ReactNode } from 'react'

/* ── Popup Overlay (paywall) ── */

function PopupOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div id="paywall" className="paywall" style={{ display: 'block', position: 'fixed', inset: 0, zIndex: 9999 }}>
      <div id="overlay" className="popup-overlay" style={{ display: 'flex' }} onClick={onClose} />
      <div id="popup" className="sandbox-pop-up" style={{ display: 'flex' }}>
        <div className="div-block-40">
          <img src="/webflow-images/private-markets.png" loading="lazy" alt="brightwave private markets logo" className="image-5" />
          <div className="div-block-38"><h1 className="heading-10">Start Your 7-Day Free Trial to Continue Exploring</h1></div>
          <div><div className="text-block-17">The research platform built for Private Markets professionals.<br /></div></div>
          <div className="div-block-45">
            <a id="paywall-cta-btn" stagger-cta="" href="https://app.brightwave.io/register?type=individual" className="paywall-cta w-inline-block">
              <div><div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">Start My Free Trial</div></div>
              <div className="flip-small"><div className="flip-bg" /></div>
              <div className="flip-big"><div className="svg cta-sm-arrow w-embed">
                <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip_popup)"><path d="M2.278 1.625L12.358 1.449L12.533 11.464" stroke="white" strokeWidth="1.088" strokeLinejoin="bevel" /><path d="M12.356 1.449L1.484 12.637" stroke="white" strokeWidth="1.088" strokeLinejoin="bevel" /></g>
                  <defs><clipPath id="clip_popup"><rect width={12} height="11.924" fill="white" transform="translate(0.896 1.105) rotate(-1)" /></clipPath></defs>
                </svg>
              </div></div>
            </a>
          </div>
          <div className="div-block-39">
            <div className="div-block-42"><div className="code-embed-6 w-embed">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
            </div></div>
            <div><div>No Credit Card Required.</div></div>
          </div>
        </div>
        <div className="div-block-41"><img src="/webflow-images/New-thank-you-contact_1New thank you contact.avif" loading="lazy" alt="Brightwave mosaic accent" className="image-6" /></div>
      </div>
    </div>
  )
}

/* ── Icon helper ── */

function I({ children, size = 16, stroke = '#666' }: { children: ReactNode; size?: number; stroke?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
}

/* ── Styles ── */

const panel: React.CSSProperties = {
  position: 'absolute', background: '#fff', borderRadius: 12,
  border: '1px solid #e5e5e5', boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
  padding: '4px 0', zIndex: 10, overflow: 'visible',
}

const row: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 10,
  padding: '9px 14px', cursor: 'pointer', fontSize: '0.875rem', color: '#333',
  background: 'transparent', transition: 'background 0.1s',
}

const sHead: React.CSSProperties = {
  fontSize: '0.7rem', fontWeight: 600, color: '#999',
  padding: '10px 14px 4px', textTransform: 'uppercase', letterSpacing: '0.05em',
}

const searchRow: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 8,
  padding: '8px 14px', borderTop: '1px solid #eee',
  fontSize: '0.8125rem', color: '#999',
}

const sep: React.CSSProperties = { height: 1, background: '#eee', margin: '4px 0' }

const chevron = <I size={12} stroke="#999"><path d="m9 18 6-6-6-6" /></I>
const searchIcon = <I size={14} stroke="#999"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></I>


function hi(e: React.MouseEvent) { (e.currentTarget as HTMLElement).style.background = '#f5f5f5' }
function ho(e: React.MouseEvent) { (e.currentTarget as HTMLElement).style.background = 'transparent' }

/* ── Mock data ── */

const connectedApps = [
  { name: 'PitchBook', url: 'pitchbook.com' },
  { name: 'FRED (Federal Reserve Economic Data)', url: 'api.stlo...' },
  { name: 'Capital IQ', url: 'capitaliq...' },
  { name: 'Preqin', url: 'preqin.com' },
]

const mockPrompts = [
  { section: 'Prompts library', items: [
    'US Top 5 Banks Competitive Analysis',
    'Portfolio Company Operating Metrics Review',
    'LBO Model Assumptions Summary',
    'Quarterly Fund Performance Attribution',
    'Sector Comp Analysis — Enterprise SaaS',
  ]},
  { section: 'Saved prompts', items: [
    'Acme Corp FY2024 Financial Summary',
    'Create Excel Sheet with Citations',
    'GP Commitment Pacing Model',
  ]},
]

const mockSkills = [
  { section: 'My Skills', items: ['DCF Valuation Builder', 'Cap Table Analyzer'] },
  { section: 'Brightwave', items: ['Document Inventory', 'Contract Clause Extractor', 'Management Assessment'] },
]

const outputFormats = [
  { label: 'Report', icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" /></> },
  { label: 'Presentation', icon: <><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></> },
  { label: 'Table', icon: <><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M3 15h18" /><path d="M9 3v18" /><path d="M15 3v18" /></> },
  { label: 'Chart', icon: <><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></> },
  { label: 'Spreadsheet', icon: <><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M8 13h2" /><path d="M8 17h2" /><path d="M14 13h2" /><path d="M14 17h2" /></> },
  { label: 'Column in Grid View', icon: <><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M7 3v18" /><path d="M11 3v18" /><path d="M15 3v18" /><path d="M19 3v18" /></> },
]

const mockTemplates = [
  { section: 'My templates', items: [
    'PE Fund Quarterly Report',
    'Investment Committee Memo',
    'Portfolio Company Board Deck',
    'LP Data Room Checklist',
    'Deal Screening One-Pager',
    'EcoTech Solutions - Financial Model',
  ]},
  { section: 'Team templates', items: [
    'Due Diligence Tracker',
    'Sector Thesis Writeup',
  ]},
]

/* ── Subpanel components ── */

function SubApps({ onAction }: { onAction: () => void }) {
  return (
    <div style={{ ...panel, left: '100%', top: 0, marginLeft: 4, minWidth: 320 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px 6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: '0.875rem' }}>
          <I size={16}><path d="M15 7h2a5 5 0 0 1 0 10h-2m-6 0H7A5 5 0 0 1 7 7h2" /><path d="M8 12h8" /></I>
          Connected apps
        </div>

      </div>
      <div style={sHead}>Apps</div>
      {connectedApps.map(a => (
        <div key={a.name} onClick={onAction} style={{ ...row, justifyContent: 'space-between' }} onMouseEnter={hi} onMouseLeave={ho}>
          <span>{a.name} <span style={{ color: '#999', fontSize: '0.75rem', marginLeft: 4 }}>{a.url}</span></span>
          <span style={{ width: 16, height: 16, border: '1.5px solid #ccc', borderRadius: 3, flexShrink: 0 }} />
        </div>
      ))}
      <div style={searchRow}>{searchIcon} Search apps...</div>
    </div>
  )
}

function SubPrompts({ onAction }: { onAction: () => void }) {
  return (
    <div style={{ ...panel, left: '100%', top: 0, marginLeft: 4, minWidth: 300 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px 6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: '0.875rem' }}>
          <I size={16}><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></I>
          Prompts library
        </div>
      </div>
      {mockPrompts.map(g => (
        <div key={g.section}>
          <div style={sHead}>{g.section}</div>
          {g.items.map(p => <div key={p} onClick={onAction} style={row} onMouseEnter={hi} onMouseLeave={ho}>{p}</div>)}
        </div>
      ))}
      <div style={searchRow}>{searchIcon} Search prompts...</div>
    </div>
  )
}

function SubSkills({ onAction }: { onAction: () => void }) {
  return (
    <div style={{ ...panel, left: '100%', top: 0, marginLeft: 4, minWidth: 280 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px 6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: '0.875rem' }}>
          <I size={16}><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /></I>
          Skills library
        </div>

      </div>
      {mockSkills.map(g => (
        <div key={g.section}>
          <div style={sHead}>{g.section}</div>
          {g.items.length === 0
            ? <div style={{ ...row, color: '#999', cursor: 'default' }}>No skills yet</div>
            : g.items.map(s => <div key={s} onClick={onAction} style={row} onMouseEnter={hi} onMouseLeave={ho}>{s}</div>)
          }
        </div>
      ))}
      <div style={searchRow}>{searchIcon} Search skills...</div>
    </div>
  )
}

function SubOutput({ onAction }: { onAction: () => void }) {
  return (
    <div style={{ ...panel, left: '100%', top: 0, marginLeft: 4, minWidth: 230 }}>
      {outputFormats.map((f, i) => (
        <div key={f.label}>
{}
          <div onClick={onAction} style={row} onMouseEnter={hi} onMouseLeave={ho}>
            <I size={16}>{f.icon}</I>{f.label}
          </div>
        </div>
      ))}
    </div>
  )
}

function SubTemplates({ onAction }: { onAction: () => void }) {
  return (
    <div style={{ ...panel, left: '100%', top: 0, marginLeft: 4, minWidth: 320 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px 6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: '0.875rem' }}>
          <I size={16}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></I>
          Template library
        </div>

      </div>
      {mockTemplates.map(g => (
        <div key={g.section}>
          <div style={sHead}>{g.section}</div>
          {g.items.length === 0
            ? <div style={{ ...row, color: '#999', cursor: 'default' }}>No templates yet</div>
            : g.items.map(t => <div key={t} onClick={onAction} style={{ ...row, fontSize: '0.8125rem' }} onMouseEnter={hi} onMouseLeave={ho}>{t}</div>)
          }
        </div>
      ))}
      <div style={searchRow}>{searchIcon} Search templates...</div>
    </div>
  )
}

const subs: Record<string, React.FC<{ onAction: () => void }>> = {
  apps: SubApps, prompts: SubPrompts, skills: SubSkills, output: SubOutput, templates: SubTemplates,
}

/* ── Plus menu items ── */

type MenuItem = { id: string; label: string; icon: ReactNode; toggle?: boolean; sub?: boolean }

const items: MenuItem[] = [
  { id: 'upload', label: 'Upload files', icon: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M17 8l-5-5-5 5" /><path d="M12 3v12" /></> },
  { id: 'websearch', label: 'Web search', icon: <><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></>, toggle: true },
  { id: 'apps', label: 'Connected apps', icon: <><path d="M15 7h2a5 5 0 0 1 0 10h-2m-6 0H7A5 5 0 0 1 7 7h2" /><path d="M8 12h8" /></>, sub: true },
  { id: 'prompts', label: 'Prompts', icon: <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />, sub: true },
  { id: 'skills', label: 'Skills', icon: <><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /></>, sub: true },
  { id: 'output', label: 'Output formats', icon: <><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></>, sub: true },
  { id: 'templates', label: 'Templates', icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M16 13H8" /><path d="M16 17H8" /></>, sub: true },
]

/* ── Modes ── */

const modes = [
  { id: 'quick', label: 'Quick', desc: 'Fast answers' },
  { id: 'research', label: 'Research', desc: 'In-depth analysis' },
  { id: 'plan', label: 'Plan', desc: 'Align on the approach first' },
] as const

/* ── Main Component ── */

export default function HeroPrompt() {
  const [popupOpen, setPopupOpen] = useState(false)
  const [mode, setMode] = useState('research')
  const [modeOpen, setModeOpen] = useState(false)
  const [plusOpen, setPlusOpen] = useState(false)
  const [webSearch, setWebSearch] = useState(true)
  const [activeSub, setActiveSub] = useState<string | null>(null)

  const openPopup = useCallback(() => { setPopupOpen(true); setPlusOpen(false); setActiveSub(null) }, [])
  const closePopup = useCallback(() => setPopupOpen(false), [])

  useEffect(() => {
    if (!modeOpen && !plusOpen) return
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('[data-menu]')) {
        setModeOpen(false); setPlusOpen(false); setActiveSub(null)
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [modeOpen, plusOpen])

  const sel = modes.find(m => m.id === mode) || modes[1]
  const Sub = activeSub ? subs[activeSub] : null

  return (
    <>
      <div className="div-block-48">
        <div className="prompt-entry-wrapper">
          <div className="prompt-wrapper">
            <textarea placeholder="Prompt anything. @ to add context, / to use a skill" className="prompt-text-field" />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>

              {/* + button */}
              <div style={{ position: 'relative' }} data-menu>
                <div onClick={() => { setPlusOpen(v => !v); setActiveSub(null) }} role="button" tabIndex={0}
                  style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid #d9d9d9', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <I size={18} stroke="#555"><path d="M12 5v14" /><path d="M5 12h14" /></I>
                </div>
                {plusOpen && (
                  <div style={{ ...panel, bottom: '100%', left: 0, marginBottom: 6, minWidth: 220 }}>
                    {items.map((it, i) => {
                      const active = activeSub === it.id
                      return (
                        <div key={it.id}>
                          {(i === 2 || i === 5) && <div style={sep} />}
                          <div style={{ position: 'relative' }} onMouseEnter={() => it.sub ? setActiveSub(it.id) : setActiveSub(null)}>
                            <div
                              onClick={() => {
                                if (it.id === 'upload') { openPopup(); return }
                                if (it.id === 'websearch') { setWebSearch(v => !v); return }
                                if (it.sub) { setActiveSub(active ? null : it.id); return }
                                openPopup()
                              }}
                              style={{ ...row, justifyContent: 'space-between', background: active ? '#f5f5f5' : undefined }}
                              onMouseEnter={!active ? hi : undefined}
                              onMouseLeave={!active ? ho : undefined}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <I size={18} stroke={active ? '#333' : '#666'}>{it.icon}</I>
                                {it.label}
                              </div>
                              {it.toggle && (
                                <div style={{ width: 36, height: 20, borderRadius: 10, background: webSearch ? '#1a1a1a' : '#ccc', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
                                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: webSearch ? 18 : 2, transition: 'left 0.2s' }} />
                                </div>
                              )}
                              {it.sub && chevron}
                            </div>
                            {active && Sub && <Sub onAction={openPopup} />}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Right controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

                {/* Mode switcher */}
                <div style={{ position: 'relative' }} data-menu>
                  <div onClick={() => setModeOpen(v => !v)} role="button" tabIndex={0}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '6px 10px', borderRadius: 8, fontSize: '0.875rem', fontWeight: 500, color: '#333', cursor: 'pointer' }}>
                    {sel.label}
                    <I size={14} stroke="currentColor"><path d="m6 9 6 6 6-6" /></I>
                  </div>
                  {modeOpen && (
                    <div style={{ ...panel, bottom: '100%', right: 0, marginBottom: 6, minWidth: 200 }}>
                      {modes.map(m => (
                        <div key={m.id} onClick={() => { setMode(m.id); setModeOpen(false) }} role="button" tabIndex={0}
                          style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '10px 14px', cursor: 'pointer', background: m.id === mode ? '#f5f5f5' : 'transparent' }}
                          onMouseEnter={hi} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = m.id === mode ? '#f0f0f0' : 'transparent' }}>
                          <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#333' }}>{m.label}</span>
                          <span style={{ fontSize: '0.75rem', color: '#888' }}>{m.desc}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mic */}
                <div onClick={openPopup} role="button" tabIndex={0}
                  style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid #d9d9d9', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <I size={18} stroke="#555"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></I>
                </div>

                {/* Send */}
                <div onClick={openPopup} role="button" tabIndex={0}
                  style={{ width: 36, height: 36, borderRadius: 10, background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <I size={18} stroke="white"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></I>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PopupOverlay isOpen={popupOpen} onClose={closePopup} />
    </>
  )
}
