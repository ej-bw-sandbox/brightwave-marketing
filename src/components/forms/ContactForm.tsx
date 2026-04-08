'use client'

import { useState, type FormEvent } from 'react'
import type { FormConfig } from '@/lib/sanity/queries/forms'

const DEFAULT_TITLE = 'Tell us a bit about yourself'
const DEFAULT_SUBMIT_TEXT = 'Submit'
const DEFAULT_SUCCESS_MESSAGE = 'We received your message and will be in touch shortly.'
const DEFAULT_ERROR_MESSAGE = 'Network error. Please try again.'

const inputStyle: React.CSSProperties = {
  fontSize: '1.125em',
  width: '100%',
  height: '3rem',
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--lightmode--onsurface-border)',
  color: 'var(--lightmode--onsurface)',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.875em',
  color: 'var(--lightmode--onsurface-border)',
}

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: 'none',
  cursor: 'pointer',
}

interface DefaultField {
  fieldName: string
  fieldLabel: string
  fieldPlaceholder: string
  fieldType: 'text' | 'email' | 'textarea' | 'select'
  isRequired: boolean
  options?: { value: string; label: string }[]
}

const DEFAULT_FIELDS: DefaultField[] = [
  { fieldName: 'firstName', fieldLabel: 'First Name', fieldPlaceholder: 'First name', fieldType: 'text', isRequired: true },
  { fieldName: 'lastName', fieldLabel: 'Last Name', fieldPlaceholder: 'Last name', fieldType: 'text', isRequired: false },
  { fieldName: 'email', fieldLabel: 'Email', fieldPlaceholder: 'you@company.com', fieldType: 'email', isRequired: true },
  { fieldName: 'company', fieldLabel: 'Company', fieldPlaceholder: 'Company name', fieldType: 'text', isRequired: false },
  { fieldName: 'message', fieldLabel: 'Message', fieldPlaceholder: 'How can we help?', fieldType: 'textarea', isRequired: false },
]

export default function ContactForm({ formConfig }: { formConfig?: FormConfig | null } = {}) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const title = formConfig?.formTitle ?? DEFAULT_TITLE
  const subtitle = formConfig?.formSubtitle
  const submitText = formConfig?.submitButtonText ?? DEFAULT_SUBMIT_TEXT
  const successMessage = formConfig?.successMessage ?? DEFAULT_SUCCESS_MESSAGE
  const apiEndpoint = formConfig?.apiEndpoint ?? '/api/contact'
  const fields = formConfig?.fields?.length ? formConfig.fields : DEFAULT_FIELDS

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      setFormData({})
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
      {subtitle && (
        <div className="c-text-4" style={{ marginTop: '0.5rem' }}>
          {subtitle}
        </div>
      )}
      <form onSubmit={handleSubmit} hubspot-form="">
        <div className="hs-flex" style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {fields.map((field) => (
            <div
              key={field.fieldName}
              className={`hs-form-field${field.fieldType === 'textarea' ? ' hs-fieldtype-textarea' : ''}`}
              style={{ marginBottom: field.fieldType === 'textarea' ? '2em' : '1.5em' }}
            >
              <label style={labelStyle}>
                {field.fieldLabel}{field.isRequired ? ' *' : ''}
              </label>
              <div className="input" style={{ position: 'relative' }}>
                {field.fieldType === 'textarea' ? (
                  <textarea
                    name={field.fieldName}
                    placeholder={field.fieldPlaceholder ?? ''}
                    value={formData[field.fieldName] ?? ''}
                    onChange={handleChange}
                    required={field.isRequired ?? false}
                    rows={3}
                    style={{
                      ...inputStyle,
                      height: 'auto',
                      resize: 'none',
                    }}
                  />
                ) : field.fieldType === 'select' ? (
                  <select
                    name={field.fieldName}
                    value={formData[field.fieldName] ?? ''}
                    onChange={handleChange}
                    required={field.isRequired ?? false}
                    style={selectStyle}
                  >
                    <option value="">{field.fieldPlaceholder || 'Select...'}</option>
                    {(field.options ?? []).map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.fieldType || 'text'}
                    name={field.fieldName}
                    placeholder={field.fieldPlaceholder ?? ''}
                    value={formData[field.fieldName] ?? ''}
                    onChange={handleChange}
                    required={field.isRequired ?? false}
                    style={inputStyle}
                  />
                )}
              </div>
            </div>
          ))}

          {/* Referral code field (referral variant only) */}
          {formConfig?.formVariant === 'referral' && formConfig?.referralCodeField && (
            <div className="hs-form-field" style={{ marginBottom: '1.5em' }}>
              <label style={labelStyle}>
                {formConfig.referralCodeField.fieldLabel ?? 'Referral Code'}
                {formConfig.referralCodeField.isRequired ? ' *' : ''}
              </label>
              <div className="input" style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="referralCode"
                  placeholder={formConfig.referralCodeField.fieldPlaceholder ?? 'Enter your referral code'}
                  value={formData.referralCode ?? ''}
                  onChange={handleChange}
                  required={formConfig.referralCodeField.isRequired ?? false}
                  style={inputStyle}
                />
              </div>
            </div>
          )}

          {/* Partner type field (partners variant only) */}
          {formConfig?.formVariant === 'partners' && formConfig?.partnerTypeField && (
            <div className="hs-form-field" style={{ marginBottom: '1.5em' }}>
              <label style={labelStyle}>
                {formConfig.partnerTypeField.fieldLabel ?? 'Partner Type'}
                {formConfig.partnerTypeField.isRequired ? ' *' : ''}
              </label>
              <div className="input" style={{ position: 'relative' }}>
                <select
                  name="partnerType"
                  value={formData.partnerType ?? ''}
                  onChange={handleChange}
                  required={formConfig.partnerTypeField.isRequired ?? false}
                  style={selectStyle}
                >
                  <option value="">Select partner type...</option>
                  {(formConfig.partnerTypeField.options ?? []).map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

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
