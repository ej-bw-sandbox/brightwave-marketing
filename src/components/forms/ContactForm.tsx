'use client'

import { useState, type FormEvent } from 'react'

interface ContactFormConfig {
  formTitle?: string
  formSubtitle?: string
  submitButtonText?: string
  successMessage?: string
  errorMessage?: string
  apiEndpoint?: string
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  company: string
  message: string
}

const DEFAULT_TITLE = 'Tell us a bit about yourself'
const DEFAULT_SUBMIT_TEXT = 'Submit'
const DEFAULT_SUCCESS_MESSAGE = 'We received your message and will be in touch shortly.'
const DEFAULT_ERROR_MESSAGE = 'Network error. Please try again.'

export default function ContactForm({ formConfig }: { formConfig?: ContactFormConfig | null } = {}) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const title = formConfig?.formTitle ?? DEFAULT_TITLE
  const submitText = formConfig?.submitButtonText ?? DEFAULT_SUBMIT_TEXT
  const successMessage = formConfig?.successMessage ?? DEFAULT_SUCCESS_MESSAGE
  const apiEndpoint = formConfig?.apiEndpoint ?? '/api/contact'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus('error')
        setErrorMsg(data.error || formConfig?.errorMessage || 'Something went wrong.')
        return
      }
      setStatus('success')
      setFormData({ firstName: '', lastName: '', email: '', company: '', message: '' })
    } catch {
      setStatus('error')
      setErrorMsg(formConfig?.errorMessage ?? DEFAULT_ERROR_MESSAGE)
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
          {successMessage}
        </div>
      </div>
    )
  }

  return (
    <div className="v-40">
      <div className="eyebrow-flex">
        <div className="block"></div>
        <div className="c-title-5">{title}</div>
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
              value={status === 'loading' ? 'Sending...' : submitText}
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
