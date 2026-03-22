"use client"

import Link from 'next/link'
import { useState, useEffect, useRef, useCallback } from 'react'



/* ------------------------------------------------------------------ */
/*  Header Component - Mega-Menu Redesign                              */
/*  Matches reference screenshots: SOLUTIONS, FEATURES, RESOURCES      */
/*  Preserves Webflow CSS classes + React-driven dropdown interactivity*/
/* ------------------------------------------------------------------ */

/* ---- Shared inline style constants ---- */
const MEGA_BG = '#0B0C1A'
const MEGA_TEXT = '#ffffff'
const MEGA_TEXT_MUTED = '#8a8f98'
const MEGA_ACCENT = '#E7E70D'
const MEGA_BORDER = 'rgba(255,255,255,0.08)'
const MEGA_ICON_BG = 'rgba(255,255,255,0.04)'
const MEGA_ICON_BORDER = 'rgba(255,255,255,0.12)'
const MEGA_HOVER_BG = 'rgba(255,255,255,0.06)'

/* ---- Reusable SVG sub-components ---- */
const ChevronSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 10 6" fill="none" className="chevron">
    <path d="M0.525391 1L5.02539 5L9.52539 1" stroke="currentColor"></path>
  </svg>
)

/* Small inline icon for menu items (outlined style) */
function MenuIcon({ name }: { name: string }) {
  const s: React.CSSProperties = { width: 18, height: 18, flexShrink: 0, opacity: 0.7 }
  // Simple outlined SVG icons mapped by keyword
  const icons: Record<string, React.ReactNode> = {
    // Solutions - I want to...
    'influence': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8l4-4 4 4"/><path d="M7 4v12"/><path d="M21 16l-4 4-4-4"/><path d="M17 20V8"/></svg>,
    'reach': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    'inform': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    'community': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8"/><line x1="12" y1="1" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="23"/></svg>,
    'engage': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    'media': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    // Solutions - I am a...
    'journalist': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>,
    'publisher': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    'newsroom': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="15" x2="12" y2="15"/></svg>,
    'startup': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
    'writer': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
    'founder': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    // Solutions - Brightwave For...
    'business': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    'creators': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>,
    'web3': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    'health': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    'food': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
    'culture': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
    // Features top cards
    'newsletters': <svg style={{width:28,height:28,flexShrink:0}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    'webbuilder': <svg style={{width:28,height:28,flexShrink:0}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    'adnetwork': <svg style={{width:28,height:28,flexShrink:0}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="2"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="10"/></svg>,
    // Features - Content
    'editor': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    'customization': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    'ai': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
    'automations': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>,
    'polls': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>,
    'audio': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>,
    // Features - Growth
    'boosts': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    'referral': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    'forms': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>,
    'popups': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 8h.01"/><path d="M12 8h.01"/></svg>,
    'magiclinks': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
    'recommendations': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    // Features - Data
    'analytics': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    'abtesting': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    'verified': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    'api': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    'segmentation': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    'surveys': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    // Features - Earn
    'paidsubscriptions': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
    'sponsorships': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    'digitalproducts': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
    // Resources
    'blog': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    'product': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
    'developers': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    'tools': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    'partners': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    'comparisons': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    'templates': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
    'events': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
    'changelog': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>,
    'spotlight': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    'support': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    'casestudies': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    'experts': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    'glossary': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    'news': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="15" x2="12" y2="15"/></svg>,
    'releasenotes': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    'engineering': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    'knowledge': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    'partner': <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  }
  return icons[name] || <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/></svg>
}

/* Large icon in rounded square for feature cards */
function FeatureIcon({ name }: { name: string }) {
  return (
    <div style={{
      width: 48, height: 48, borderRadius: 12,
      border: `1px solid ${MEGA_ICON_BORDER}`,
      background: MEGA_ICON_BG,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
      color: '#8b9cf7',
    }}>
      <MenuIcon name={name} />
    </div>
  )
}

/* Resource card icon (rounded square with border) */
function ResourceIcon({ name }: { name: string }) {
  return (
    <div style={{
      width: 44, height: 44, borderRadius: 10,
      border: `1px solid ${MEGA_ICON_BORDER}`,
      background: MEGA_ICON_BG,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
      color: '#8b9cf7',
    }}>
      <MenuIcon name={name} />
    </div>
  )
}


interface PlatformFeature {
  title: string
  slug: string
  category: string
}

interface NavAssociation {
  title: string
  slug: string
}

interface SolutionsNavData {
  useCases: NavAssociation[]
  icpPages: NavAssociation[]
  firmTypes: NavAssociation[]
  platformFeatures: PlatformFeature[]
}

export function HeaderClient({
  caseStudyCount = 0,
  solutionsNavData = null,
}: {
  caseStudyCount?: number
  solutionsNavData?: SolutionsNavData | null
}) {
  /* ---- State ---- */
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)



  /* Close dropdown on Escape */
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpenDropdown(null)
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  /* Cleanup close timer on unmount */
  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
    }
  }, [])

  /* Read saved theme on mount & apply */
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = saved ? saved === 'dark' : prefersDark
    setIsDark(dark)
    applyTheme(dark)
  }, [])

  function applyTheme(dark: boolean) {
    const html = document.documentElement
    if (dark) {
      html.setAttribute('theme', 'dark')
      html.classList.add('u-dark-mode')
    } else {
      html.removeAttribute('theme')
      html.classList.remove('u-dark-mode')
    }
  }

  const handleToggleTheme = useCallback(() => {
    setIsDark(prev => {
      const next = !prev
      localStorage.setItem('theme', next ? 'dark' : 'light')
      applyTheme(next)
      return next
    })
  }, [])

  const toggleDropdown = useCallback((name: string) => {
    setOpenDropdown(prev => prev === name ? null : name)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev)
  }, [])

  const handleMouseEnter = useCallback((name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenDropdown(name)
  }, [])

  const handleMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150)
  }, [])

  /* Group platform features by category */
  const platformGroups: Record<string, PlatformFeature[]> = {}
  if (solutionsNavData?.platformFeatures) {
    for (const f of solutionsNavData.platformFeatures) {
      const cat = f.category || 'General'
      if (!platformGroups[cat]) platformGroups[cat] = []
      platformGroups[cat].push(f)
    }
  }

  const useCases = solutionsNavData?.useCases ?? []
  const icpPages = solutionsNavData?.icpPages ?? []
  const firmTypes = solutionsNavData?.firmTypes ?? []

  const resourceLinks = [
    { title: 'Blog', href: '/blog', icon: 'blog', desc: 'Best practices for scaling your newsletter' },
    { title: 'News', href: '/news', icon: 'news', desc: 'Regularly released product updates' },
    { title: 'Engineering Log', href: '/engineering-log', icon: 'engineering', desc: 'Technical docs and developer resources' },
    { title: 'Tools & Guides', href: '/tools-guides', icon: 'tools', desc: 'Resources and growth assets' },
    { title: 'Partner Program', href: '/partner-program', icon: 'partner', desc: 'Join our partner ecosystem' },
    { title: 'Comparisons', href: '/comparisons', icon: 'comparisons', desc: 'How Brightwave stacks up against competitors' },
    { title: 'Events', href: '/events', icon: 'events', desc: 'Live and past online events' },
    { title: 'Release Notes', href: '/release-notes', icon: 'releasenotes', desc: 'See our latest feature launches' },
    { title: 'Knowledge Base', href: '/knowledge-base', icon: 'knowledge', desc: 'In-depth guides and documentation' },
    { title: 'Support', href: '/support', icon: 'support', desc: 'Product support and documentation' },
    { title: 'Case Studies', href: '/case-studies', icon: 'casestudies', desc: 'Success stories from Brightwave customers.' },
  ]

  /* ---- Shared mega-menu panel styles ---- */
  const megaPanelStyle: React.CSSProperties = {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 'var(--nav-height, 64px)',
    background: MEGA_BG,
    borderTop: `1px solid ${MEGA_BORDER}`,
    zIndex: 9999,
    overflowY: 'auto',
    maxHeight: 'calc(100vh - var(--nav-height, 64px))',
  }

  const megaInnerStyle: React.CSSProperties = {
    maxWidth: 1400,
    margin: '0 auto',
    padding: '48px 40px',
  }

  /* Solutions dropdown items */
  const solCol1 = useCases.length > 0
    ? useCases.map(uc => ({ title: uc.title, href: `/use-cases/${uc.slug}` }))
    : [
      { title: 'Influence Public Opinion', href: '/use-cases/influence-public-opinion' },
      { title: 'Reach More Customers', href: '/use-cases/reach-more-customers' },
      { title: 'Inform Stakeholders', href: '/use-cases/inform-stakeholders' },
      { title: 'Connect My Local Community', href: '/use-cases/connect-my-local-community' },
      { title: 'Engage My Audience', href: '/use-cases/engage-my-audience' },
      { title: 'Build A Media Brand', href: '/use-cases/build-a-media-brand' },
    ]
  const solCol1Icons = ['influence', 'reach', 'inform', 'community', 'engage', 'media']

  const solCol2 = icpPages.length > 0
    ? icpPages.map(icp => ({ title: icp.title, href: `/i-am-a/${icp.slug}` }))
    : [
      { title: 'Independent Journalist', href: '/i-am-a/independent-journalist' },
      { title: 'Publisher', href: '/i-am-a/publisher' },
      { title: 'Newsroom', href: '/i-am-a/newsroom' },
      { title: 'Startup', href: '/i-am-a/startup' },
      { title: 'Writer', href: '/i-am-a/writer' },
      { title: 'Founder', href: '/i-am-a/founder' },
    ]
  const solCol2Icons = ['journalist', 'publisher', 'newsroom', 'startup', 'writer', 'founder']

  const solCol3 = firmTypes.length > 0
    ? firmTypes.map(ft => ({ title: ft.title, href: `/firm-types/${ft.slug}` }))
    : [
      { title: 'Business', href: '/firm-types/business' },
      { title: 'Content Creators', href: '/firm-types/content-creators' },
      { title: 'Web 3 & Crypto', href: '/firm-types/web3-crypto' },
      { title: 'Health & Fitness', href: '/firm-types/health-fitness' },
      { title: 'Food', href: '/firm-types/food' },
      { title: 'Pop Culture', href: '/firm-types/pop-culture' },
    ]
  const solCol3Icons = ['business', 'creators', 'web3', 'health', 'food', 'culture']

  /* Feature items grouped by category */
  const featureCategories = Object.keys(platformGroups).length > 0
    ? Object.entries(platformGroups)
      .filter(([category]) => category.toLowerCase() !== 'general')
      .map(([category, features]) => ({
      title: category,
      href: `/features#${category.toLowerCase().replace(/\s+/g, '-')}`,
      items: features.map(f => ({ title: f.title, href: `/features/${f.slug}` })),
    }))
    : [
      {
        title: 'Content',
        href: '/features#content',
        items: [
          { title: 'Editor', href: '/features/editor' },
          { title: 'Customization', href: '/features/customization' },
          { title: 'Brightwave AI', href: '/features/ai' },
          { title: 'Automations', href: '/features/automations' },
          { title: 'Polls', href: '/features/polls' },
          { title: 'Audio', href: '/features/audio' },
        ],
      },
      {
        title: 'Growth',
        href: '/features#growth',
        items: [
          { title: 'Boosts', href: '/features/boosts' },
          { title: 'Referral Program', href: '/features/referral-program' },
          { title: 'Subscribe Forms', href: '/features/subscribe-forms' },
          { title: 'Pop-ups', href: '/features/pop-ups' },
          { title: 'Magic Links', href: '/features/magic-links' },
          { title: 'Recommendations', href: '/features/recommendations' },
        ],
      },
      {
        title: 'Data',
        href: '/features#data',
        items: [
          { title: 'Analytics', href: '/features/analytics' },
          { title: 'A/B Testing', href: '/features/ab-testing' },
          { title: 'Verified Clicks', href: '/features/verified-clicks' },
          { title: 'API & Integrations', href: '/features/api-integrations' },
          { title: 'Segmentation', href: '/features/segmentation' },
          { title: 'Surveys', href: '/features/surveys' },
        ],
      },
      {
        title: 'Earn',
        href: '/features#earn',
        items: [
          { title: 'Ad Network', href: '/features/ad-network' },
          { title: 'Paid Subscriptions', href: '/features/paid-subscriptions' },
          { title: 'Boosts', href: '/features/boosts-earn' },
          { title: 'Direct Sponsorships', href: '/features/direct-sponsorships' },
          { title: 'Digital Products', href: '/features/digital-products' },
        ],
      },
    ]

  /* Category item icon mapping */
  const catIconMap: Record<string, string[]> = {
    'Content': ['editor', 'customization', 'ai', 'automations', 'polls', 'audio'],
    'Growth': ['boosts', 'referral', 'forms', 'popups', 'magiclinks', 'recommendations'],
    'Data': ['analytics', 'abtesting', 'verified', 'api', 'segmentation', 'surveys'],
    'Earn': ['adnetwork', 'paidsubscriptions', 'boosts', 'sponsorships', 'digitalproducts'],
  }



  /* ---- Reusable item row for Solutions ---- */
  function SolItem({ title, href, icon }: { title: string; href: string; icon: string }) {
    return (
      <Link href={href} style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '8px 0', color: MEGA_TEXT,
        textDecoration: 'none', fontSize: 14, fontWeight: 400,
        transition: 'opacity 0.15s',
      }}
        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '0.7')}
        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '1')}
        onClick={() => setOpenDropdown(null)}
      >
        <MenuIcon name={icon} />
        <span>{title}</span>
      </Link>
    )
  }

  /* ---- Reusable item row for Features categories ---- */
  function CatItem({ title, href, icon }: { title: string; href: string; icon: string }) {
    return (
      <Link href={href} style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '6px 0', color: MEGA_TEXT,
        textDecoration: 'none', fontSize: 14, fontWeight: 400,
        transition: 'opacity 0.15s',
      }}
        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '0.7')}
        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '1')}
        onClick={() => setOpenDropdown(null)}
      >
        <MenuIcon name={icon} />
        <span>{title}</span>
      </Link>
    )
  }


  return (
    <>
      <div ref={navRef} data-w-id="146090b3-a797-0b71-5c03-2ee27e68f65a" data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="nav w-nav">
        <div id="cio-banner" className="cio-banner"></div>
        <div className="c-container cc-nav">
          <div className="nav_flex">
            <div className="nav-abso">
              <div className="nav-asbo_flex">
                {/* ---- LOGO ---- */}
                <a href="/" aria-current="page" className="nav_logo w-nav-brand w--current">
                  <div className="svg cc-onsurface-fill cc-logo w-embed"><svg width={150} height={28} viewBox="0 0 150 28" fill="none" xmlns="http://www.w3.org/2000/svg">
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

                {/* ---- NAV MENU ---- */}
                <nav role="navigation" className="nav_menu w-nav-menu" {...(mobileMenuOpen ? { 'data-nav-menu-open': '' } : {})}>
                  <div className="nav_links">

                    {/* ==================== PLATFORM DROPDOWN (Desktop) ==================== */}
                    <div data-hover="false" data-delay="500" className={`nav_dropdown cc-desktop w-dropdown${openDropdown === 'platform' ? ' w--open' : ''}`} onMouseEnter={() => handleMouseEnter('platform')} onMouseLeave={handleMouseLeave}>
                      <div className="nav_toggle w-dropdown-toggle" onClick={() => toggleDropdown('platform')} aria-expanded={openDropdown === 'platform'} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && toggleDropdown('platform')}>
                        <div className="text-overflow">
                          <div className="c-text-link cc-nav">Platform</div>
                          <div className="nav_line"></div>
                        </div>
                        <ChevronSvg />
                      </div>
                      <nav a-dm="" className={`nav_list w-dropdown-list${openDropdown === 'platform' ? ' w--open' : ''}`} onMouseEnter={() => handleMouseEnter('platform')} onMouseLeave={handleMouseLeave}>
                        {/* ---- FEATURES MEGA MENU ---- */}
                        <div style={megaPanelStyle}>
                          <div style={megaInnerStyle}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40 }}>
                              {/* Left: Category columns */}
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 40 }}>
                              {featureCategories.map((cat, ci) => {
                                const icons = catIconMap[cat.title] || []
                                return (
                                  <div key={ci}>
                                    <Link href={cat.href} style={{
                                      display: 'flex', alignItems: 'center', gap: 6,
                                      fontSize: 14, fontWeight: 600, color: MEGA_TEXT,
                                      textDecoration: 'none', marginBottom: 16,
                                    }} onClick={() => setOpenDropdown(null)}>
                                      {cat.title} <span style={{ fontSize: 16 }}>&rarr;</span>
                                    </Link>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                      {cat.items.map((item, ii) => (
                                        <CatItem key={ii} title={item.title} href={item.href} icon={icons[ii] || 'editor'} />
                                      ))}
                                    </div>
                                  </div>
                                )
                              })}
                            </div>

                              {/* Right sidebar - featured card */}
                              <div style={{
                                borderLeft: `1px solid ${MEGA_BORDER}`,
                                paddingLeft: 40,
                                minWidth: 280,
                                maxWidth: 320,
                              }}>
                                {/* Product screenshot placeholder */}
                                <div style={{
                                  width: '100%', height: 180, borderRadius: 12,
                                  background: 'linear-gradient(135deg, #1a1b3a 0%, #2d2e5e 100%)',
                                  border: `1px solid ${MEGA_ICON_BORDER}`,
                                  marginBottom: 20,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  overflow: 'hidden',
                                }}>
                                  <div style={{ color: MEGA_TEXT_MUTED, fontSize: 13, textAlign: 'center', padding: 20 }}>
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ opacity: 0.5, marginBottom: 8, display: 'block', margin: '0 auto 8px' }}><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                                    Product Dashboard
                                  </div>
                                </div>
                                <div style={{ fontSize: 18, fontWeight: 600, color: MEGA_TEXT, marginBottom: 8 }}>
                                  Take a tour of Brightwave
                                </div>
                                <div style={{ fontSize: 13, color: MEGA_TEXT_MUTED, marginBottom: 20, lineHeight: 1.5 }}>
                                  Explore the features and capabilities of Brightwave
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                  <Link href="/features" style={{ color: MEGA_ACCENT, fontSize: 14, fontWeight: 500, textDecoration: 'none' }} onClick={() => setOpenDropdown(null)}>Product Overview &rarr;</Link>
                                  <Link href="/features/api-integrations" style={{ color: MEGA_ACCENT, fontSize: 14, fontWeight: 500, textDecoration: 'none' }} onClick={() => setOpenDropdown(null)}>Integrations &rarr;</Link>
                                  <Link href="/features" style={{ color: MEGA_ACCENT, fontSize: 14, fontWeight: 500, textDecoration: 'none' }} onClick={() => setOpenDropdown(null)}>View all features &rarr;</Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </nav>
                    </div>

                    {/* ==================== SOLUTIONS DROPDOWN (Desktop) ==================== */}
                    <div data-hover="false" data-delay="500" className={`nav_dropdown cc-desktop w-dropdown${openDropdown === 'solutions' ? ' w--open' : ''}`} onMouseEnter={() => handleMouseEnter('solutions')} onMouseLeave={handleMouseLeave}>
                      <div className="nav_toggle w-dropdown-toggle" onClick={() => toggleDropdown('solutions')} aria-expanded={openDropdown === 'solutions'} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && toggleDropdown('solutions')}>
                        <div className="text-overflow">
                          <div className="c-text-link cc-nav">Solutions</div>
                          <div className="nav_line"></div>
                        </div>
                        <ChevronSvg />
                      </div>
                      <nav a-dm="" className={`nav_list w-dropdown-list${openDropdown === 'solutions' ? ' w--open' : ''}`} onMouseEnter={() => handleMouseEnter('solutions')} onMouseLeave={handleMouseLeave}>
                        {/* ---- SOLUTIONS MEGA MENU ---- */}
                        <div style={megaPanelStyle}>
                          <div style={{ ...megaInnerStyle, padding: '48px 40px 40px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 60 }}>
                              {/* Column 1: I want to... */}
                              <div>
                                <div style={{
                                  fontSize: 18, fontWeight: 600, color: MEGA_TEXT,
                                  fontStyle: 'italic', marginBottom: 20,
                                  fontFamily: 'Georgia, "Times New Roman", serif',
                                }}>
                                  I want to...
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                  {solCol1.map((item, i) => (
                                    <SolItem key={i} title={item.title} href={item.href} icon={solCol1Icons[i] || 'influence'} />
                                  ))}
                                </div>
                                <Link href="/use-cases" style={{
                                  display: 'inline-block', marginTop: 16,
                                  fontSize: 13, color: MEGA_TEXT_MUTED, textDecoration: 'none',
                                }} onClick={() => setOpenDropdown(null)}>View all &rarr;</Link>
                              </div>

                              {/* Column 2: I am a... */}
                              <div>
                                <div style={{
                                  fontSize: 18, fontWeight: 600, color: MEGA_TEXT,
                                  fontStyle: 'italic', marginBottom: 20,
                                  fontFamily: 'Georgia, "Times New Roman", serif',
                                }}>
                                  I am a...
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                  {solCol2.map((item, i) => (
                                    <SolItem key={i} title={item.title} href={item.href} icon={solCol2Icons[i] || 'journalist'} />
                                  ))}
                                </div>
                                <Link href="/i-am-a" style={{
                                  display: 'inline-block', marginTop: 16,
                                  fontSize: 13, color: MEGA_TEXT_MUTED, textDecoration: 'none',
                                }} onClick={() => setOpenDropdown(null)}>View all &rarr;</Link>
                              </div>

                              {/* Column 3: Brightwave For... */}
                              <div>
                                <div style={{
                                  fontSize: 18, fontWeight: 600, color: MEGA_TEXT,
                                  fontStyle: 'italic', marginBottom: 20,
                                  fontFamily: 'Georgia, "Times New Roman", serif',
                                }}>
                                  Brightwave For...
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                  {solCol3.map((item, i) => (
                                    <SolItem key={i} title={item.title} href={item.href} icon={solCol3Icons[i] || 'business'} />
                                  ))}
                                </div>
                                <Link href="/firm-types" style={{
                                  display: 'inline-block', marginTop: 16,
                                  fontSize: 13, color: MEGA_TEXT_MUTED, textDecoration: 'none',
                                }} onClick={() => setOpenDropdown(null)}>View all &rarr;</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </nav>
                    </div>

                    {/* ==================== CUSTOMERS (Direct Link) ==================== */}
                    <a href="/case-studies" className="nav_link w-inline-block">
                      <div className="c-text-link cc-nav">Customers</div>
                      <div className="nav_line"></div>
                    </a>

                    {/* ==================== RESOURCES DROPDOWN (Desktop) ==================== */}
                    <div data-hover="false" data-delay="500" className={`nav_dropdown cc-desktop w-dropdown${openDropdown === 'resources' ? ' w--open' : ''}`} onMouseEnter={() => handleMouseEnter('resources')} onMouseLeave={handleMouseLeave}>
                      <div className="nav_toggle w-dropdown-toggle" onClick={() => toggleDropdown('resources')} aria-expanded={openDropdown === 'resources'} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && toggleDropdown('resources')}>
                        <div className="text-overflow">
                          <div className="c-text-link cc-nav">Resources</div>
                          <div className="nav_line"></div>
                        </div>
                        <ChevronSvg />
                      </div>
                      <nav a-dm="" className={`nav_list w-dropdown-list${openDropdown === 'resources' ? ' w--open' : ''}`} onMouseEnter={() => handleMouseEnter('resources')} onMouseLeave={handleMouseLeave}>
                        {/* ---- RESOURCES MEGA MENU ---- */}
                        <div style={megaPanelStyle}>
                          <div style={megaInnerStyle}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48 }}>
                              {/* Left: Resource grid (3 columns) */}
                              <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '28px 36px',
                              }}>
                                {resourceLinks.map((link, i) => (
                                  <Link key={i} href={link.href} style={{
                                    display: 'flex', alignItems: 'flex-start', gap: 14,
                                    textDecoration: 'none', color: MEGA_TEXT,
                                    padding: '8px 0',
                                    transition: 'opacity 0.15s',
                                  }}
                                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '0.7')}
                                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '1')}
                                    onClick={() => setOpenDropdown(null)}
                                  >
                                    <ResourceIcon name={link.icon} />
                                    <div>
                                      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{link.title}</div>
                                      <div style={{ fontSize: 13, color: MEGA_TEXT_MUTED, lineHeight: 1.5 }}>{link.desc}</div>
                                    </div>
                                  </Link>
                                ))}
                              </div>

                              {/* Right sidebar: Featured content */}
                              <div style={{
                                borderLeft: `1px solid ${MEGA_BORDER}`,
                                paddingLeft: 40,
                                minWidth: 300,
                                maxWidth: 360,
                              }}>
                                {/* Featured image placeholder */}
                                <div style={{
                                  width: '100%', aspectRatio: '3/4', maxHeight: 380,
                                  borderRadius: 12,
                                  background: 'linear-gradient(135deg, #0d0e2a 0%, #1a1b4a 50%, #0d0e2a 100%)',
                                  border: `1px solid ${MEGA_ICON_BORDER}`,
                                  marginBottom: 24,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  overflow: 'hidden',
                                  position: 'relative',
                                }}>
                                  <div style={{
                                    textAlign: 'center', color: MEGA_TEXT,
                                    padding: 32,
                                  }}>
                                    <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                                      THE STATE OF AI IN<br />PRIVATE EQUITY
                                    </div>
                                    <div style={{
                                      marginTop: 20,
                                      fontSize: 48, fontWeight: 800,
                                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                      WebkitBackgroundClip: 'text',
                                      WebkitTextFillColor: 'transparent',
                                    }}>
                                      2026
                                    </div>
                                  </div>
                                </div>
                                <div style={{ fontSize: 18, fontWeight: 600, color: MEGA_TEXT, marginBottom: 8 }}>
                                  State of AI in Private Equity
                                </div>
                                <div style={{ fontSize: 13, color: MEGA_TEXT_MUTED, marginBottom: 20, lineHeight: 1.5 }}>
                                  Brightwave&apos;s annual research report on how AI is transforming the private equity industry.
                                </div>
                                <Link href="/state-of-ai-in-private-equity" style={{
                                  color: MEGA_ACCENT, fontSize: 14, fontWeight: 500, textDecoration: 'none',
                                }} onClick={() => setOpenDropdown(null)}>
                                  Read the Report &rarr;
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </nav>
                    </div>

                    {/* ==================== PRICING (Direct Link) ==================== */}
                    <a href="/pricing" className="nav_link w-inline-block">
                      <div className="c-text-link cc-nav">Pricing</div>
                      <div className="nav_line"></div>
                    </a>

                    {/* ==================== MOBILE ACCORDIONS ==================== */}

                    {/* Mobile: Platform */}
                    <div accordion="" className="nav_dropdown cc-mobile">
                      <div className="nav_toggle">
                        <div className="c-text-link cc-nav">Platform</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 10 6" fill="none" chevron="" className="chevron">
                          <path d="M0.525391 1L5.02539 5L9.52539 1" stroke="currentColor"></path>
                        </svg>
                        <input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                      </div>
                      <div accordion="element" className="nav_list">
                        <div mask-height="element">
                          <div className="mobile_items">
                            {Object.keys(platformGroups).length > 0 ? (
                              Object.entries(platformGroups)
                                .filter(([category]) => category.toLowerCase() !== 'general')
                                .map(([category, features]) =>
                                features.slice(0, 4).map((f, i) => (
                                  <a key={`mob-plat-${category}-${i}`} href={`/features/${f.slug}`} className="c-title-4">{f.title}</a>
                                ))
                              ).flat()
                            ) : (
                              <>
                                <a href="/features" className="c-title-4">Investment Intelligence Engine</a>
                                <a href="/security" className="c-title-4">Enterprise Security &amp; Compliance</a>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile: Solutions */}
                    <div accordion="" className="nav_dropdown cc-mobile">
                      <div className="nav_toggle">
                        <div className="c-text-link cc-nav">Solutions</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 10 6" fill="none" chevron="" className="chevron">
                          <path d="M0.525391 1L5.02539 5L9.52539 1" stroke="currentColor"></path>
                        </svg>
                        <input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                      </div>
                      <div accordion="element" className="nav_list">
                        <div mask-height="element">
                          <div className="mobile_items">
                            {useCases.map((uc, i) => (
                              <a key={`mob-uc-${i}`} href={`/use-cases/${uc.slug}`} className="c-title-4">{uc.title}</a>
                            ))}
                            {icpPages.map((icp, i) => (
                              <a key={`mob-icp-${i}`} href={`/i-am-a/${icp.slug}`} className="c-title-4">{icp.title}</a>
                            ))}
                            {firmTypes.map((ft, i) => (
                              <a key={`mob-ft-${i}`} href={`/firm-types/${ft.slug}`} className="c-title-4">{ft.title}</a>
                            ))}
                            <a href="/products/private-markets" className="c-title-4">Private Markets</a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile: Resources */}
                    <div accordion="" className="nav_dropdown cc-mobile">
                      <div className="nav_toggle">
                        <div className="c-text-link cc-nav">Resources</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 10 6" fill="none" chevron="" className="chevron">
                          <path d="M0.525391 1L5.02539 5L9.52539 1" stroke="currentColor"></path>
                        </svg>
                        <input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                      </div>
                      <div accordion="element" className="nav_list">
                        <div mask-height="element">
                          <div className="mobile_items">
                            {resourceLinks.map((link, i) => (
                              <a key={`mob-res-${i}`} href={link.href} className="c-title-4">{link.title}</a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </nav>

                {/* ---- CTAs ---- */}
                <div className="nav_ctas">
                  <div className="nav_btns">
                    <div data-w-id="faefcd5e-5b3c-824a-01c6-d01116acb6bc" className="toggle" onClick={handleToggleTheme} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && handleToggleTheme()} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
                      {isDark ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                      )}
                    </div>
                    <a stagger-text-btn="" href="https://app.brightwave.io/login" className="cta-sec cc-fill w-inline-block">
                      <div stagger-link-text="light" className="c-text-link cc-stagger">Login</div>
                    </a>
                    <a stagger-text-btn="" href="/contact" className="cta-sec w-inline-block">
                      <div stagger-link-text="dark" className="c-text-link cc-stagger">Get Started</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ---- HAMBURGER ---- */}
            <div className={`hamburger w-nav-button${mobileMenuOpen ? ' w--open' : ''}`} onClick={toggleMobileMenu} aria-label="Toggle mobile menu" role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && toggleMobileMenu()}>
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

      {/* Backdrop overlay when mega menu is open */}
      {openDropdown && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: 'var(--nav-height, 64px)',
            background: 'rgba(0,0,0,0.4)',
            zIndex: 9998,
          }}
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </>
  )
}
