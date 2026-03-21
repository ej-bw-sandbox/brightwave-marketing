'use client'

import { useState, type ReactNode } from 'react'

interface AccordionItemProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className={`accordion${isOpen ? ' cc-open' : ''}`}>
      <div className="accordion_toggle" onClick={() => setIsOpen(!isOpen)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsOpen(!isOpen) }}>
        <div className="c-title-5">{title}</div>
        <div className="c-svg-2 cc-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transition: 'transform 400ms',
              transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
            }}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
      <div accordion="element" className="accordion_dropdown" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
        <div style={{ overflow: 'hidden' }}>
          <div className="accordion_content">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
