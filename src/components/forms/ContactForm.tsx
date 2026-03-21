'use client'

import { useState, type FormEvent } from 'react'

interface FormData {
  firstName: string
  lastName: string
  email: string
  company: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong.')
        return
      }
      setStatus('success')
      setFormData({ firstName: '', lastName: '', email: '', company: '', message: '' })
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="v-40">
        <div className="eyebrow-flex">
          <div className="block"></div>
          <div className="c-title-5">Thank you!</div>
        </div>
        <div className="c-text-3" style={{ marginTop: '1rem' }}>
          We received your message and will be in touch shortly.
        </div>
      </div>
    )
  }

  return (
    <div className="v-40">
      <div className="eyebrow-flex">
        <div className="block"></div>
        <div className="c-title-5">Tell us a bit about yourself</div>
      </div>
      <form onSubmit={handleSubmit} hubspot-form="">
        <div className="hs-flex" style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          <div className="hs-form-field" style={{ marginBottom: '1.5em' }}>
            <label style={{ fontSize: '0.875em', color: 'var(--lightmode--onsurface-border)' }}>First Name *</label>
            <div className="input" style={{ position: 'relative' }}>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                required
                style={{
                  fontSize: '1.125em',
                  width: '100%',
                  height: '3rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--lightmode--onsurface-border)',
                  color: 'var(--lightmode--onsurface)',
                  outline: 'none',
                }}
              />
            </div>
          </div>
          <div className="hs-form-field" style={{ marginBottom: '1.5em' }}>
            <label style={{ fontSize: '0.875em', color: 'var(--lightmode--onsurface-border)' }}>Last Name</label>
            <div className="input" style={{ position: 'relative' }}>
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                style={{
                  fontSize: '1.125em',
                  width: '100%',
                  height: '3rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--lightmode--onsurface-border)',
                  color: 'var(--lightmode--onsurface)',
                  outline: 'none',
                }}
              />
            </div>
          </div>
          <div className="hs-form-field" style={{ marginBottom: '1.5em' }}>
            <label style={{ fontSize: '0.875em', color: 'var(--lightmode--onsurface-border)' }}>Email *</label>
            <div className="input" style={{ position: 'relative' }}>
              <input
                type="email"
                name="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  fontSize: '1.125em',
                  width: '100%',
                  height: '3rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--lightmode--onsurface-border)',
                  color: 'var(--lightmode--onsurface)',
                  outline: 'none',
                }}
              />
            </div>
          </div>
          <div className="hs-form-field" style={{ marginBottom: '1.5em' }}>
            <label style={{ fontSize: '0.875em', color: 'var(--lightmode--onsurface-border)' }}>Company</label>
            <div className="input" style={{ position: 'relative' }}>
              <input
                type="text"
                name="company"
                placeholder="Company name"
                value={formData.company}
                onChange={handleChange}
                style={{
                  fontSize: '1.125em',
                  width: '100%',
                  height: '3rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--lightmode--onsurface-border)',
                  color: 'var(--lightmode--onsurface)',
                  outline: 'none',
                }}
              />
            </div>
          </div>
          <div className="hs-form-field hs-fieldtype-textarea" style={{ marginBottom: '2em' }}>
            <label style={{ fontSize: '0.875em', color: 'var(--lightmode--onsurface-border)' }}>Message</label>
            <div className="input" style={{ position: 'relative' }}>
              <textarea
                name="message"
                placeholder="How can we help?"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                style={{
                  fontSize: '1.125em',
                  width: '100%',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--lightmode--onsurface-border)',
                  color: 'var(--lightmode--onsurface)',
                  outline: 'none',
                  resize: 'none',
                }}
              />
            </div>
          </div>
          {status === 'error' && (
            <div style={{ color: '#CC8A6E', marginBottom: '1em', fontSize: '0.875em' }}>{errorMsg}</div>
          )}
          <div className="hs_submit" style={{ paddingTop: '1rem' }}>
            <input
              type="submit"
              value={status === 'loading' ? 'Sending...' : 'Submit'}
              disabled={status === 'loading'}
              style={{
                border: '1px solid transparent',
                backgroundColor: '#ffff25',
                padding: '0.95rem 1.25rem 0.85rem',
                color: 'black',
                cursor: status === 'loading' ? 'wait' : 'pointer',
                fontWeight: 700,
                fontSize: '1em',
                opacity: status === 'loading' ? 0.7 : 1,
              }}
            />
          </div>
        </div>
      </form>
    </div>
  )
}
