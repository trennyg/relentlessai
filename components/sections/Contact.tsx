'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Mail, Phone, MapPin } from 'lucide-react'

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#111111',
  border: '1px solid #222',
  borderRadius: '2px',
  padding: '12px 16px',
  color: '#F0EDE6',
  fontFamily: 'var(--font-dm-sans)',
  fontSize: '15px',
  outline: 'none',
  transition: 'border-color 0.2s',
}

function FormInput({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontFamily: 'var(--font-dm-mono)',
          fontSize: '12px',
          color: '#888480',
          marginBottom: '6px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        {label}
      </label>
      <input
        {...props}
        style={{
          ...inputStyle,
          borderColor: focused ? '#D4F044' : '#222',
        }}
        onFocus={(e) => {
          setFocused(true)
          props.onFocus?.(e)
        }}
        onBlur={(e) => {
          setFocused(false)
          props.onBlur?.(e)
        }}
      />
    </div>
  )
}

function FormSelect({ label, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontFamily: 'var(--font-dm-mono)',
          fontSize: '12px',
          color: '#888480',
          marginBottom: '6px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        {label}
      </label>
      <select
        {...props}
        style={{
          ...inputStyle,
          borderColor: focused ? '#D4F044' : '#222',
          cursor: 'pointer',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='%23888480' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 16px center',
          paddingRight: '40px',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <option value="" style={{ backgroundColor: '#111' }}>Select a service</option>
        <option value="brand-website" style={{ backgroundColor: '#111' }}>Brand Website</option>
        <option value="ai-dashboard" style={{ backgroundColor: '#111' }}>AI Dashboard</option>
        <option value="automation-pipeline" style={{ backgroundColor: '#111' }}>Automation Pipeline</option>
        <option value="other" style={{ backgroundColor: '#111' }}>Other</option>
      </select>
    </div>
  )
}

function FormTextarea({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontFamily: 'var(--font-dm-mono)',
          fontSize: '12px',
          color: '#888480',
          marginBottom: '6px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        {label}
      </label>
      <textarea
        {...props}
        rows={4}
        style={{
          ...inputStyle,
          borderColor: focused ? '#D4F044' : '#222',
          resize: 'vertical',
          minHeight: '120px',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  )
}

export default function Contact() {
  const shouldReduce = useReducedMotion()
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    setLoading(true)
    setError('')

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      )
      setSuccess(true)
    } catch {
      setError('Something went wrong. Please email us directly at admin@relentlessais.com')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      className="px-6 py-28 md:py-32"
      style={{ backgroundColor: '#080808' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p
              className="text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: 'var(--font-dm-mono)', color: '#D4F044' }}
            >
              Get in Touch
            </p>

            <h2
              className="mt-4"
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: '#F0EDE6',
                lineHeight: 1.15,
              }}
            >
              Let&apos;s build<br />something.
            </h2>

            <p
              className="mt-5"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '17px',
                color: '#888480',
                lineHeight: '1.7',
                maxWidth: '480px',
              }}
            >
              Whether you need a brand website, a data dashboard, or a custom automation pipeline — tell us what you&apos;re working on and we&apos;ll get back to you within 24 hours.
            </p>

            <div className="mt-10 flex flex-col gap-4">
              {[
                { icon: Mail, text: 'admin@relentlessais.com' },
                { icon: Phone, text: '6002944816' },
                { icon: MapPin, text: 'Mumbai · Available Worldwide' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon size={16} style={{ color: '#D4F044', flexShrink: 0 }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: '16px',
                      color: '#888480',
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          >
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center text-center py-20"
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontSize: '24px',
                      color: '#F0EDE6',
                      fontWeight: 700,
                    }}
                  >
                    We&apos;ll be in touch shortly.
                  </p>
                  <p
                    className="mt-3"
                    style={{
                      fontFamily: 'var(--font-dm-mono)',
                      fontSize: '14px',
                      color: '#888480',
                    }}
                  >
                    Expect a response within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col gap-5"
                >
                  <FormInput label="Name" type="text" name="from_name" required placeholder="Your name" />
                  <FormInput label="Email" type="email" name="from_email" required placeholder="your@email.com" />
                  <FormSelect label="Service" name="service" required />
                  <FormTextarea label="Message" name="message" required placeholder="Tell us about your project..." />

                  {error && (
                    <p
                      style={{
                        fontFamily: 'var(--font-dm-sans)',
                        fontSize: '14px',
                        color: '#ff6b6b',
                      }}
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 text-base font-medium rounded-sm transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      fontFamily: 'var(--font-dm-sans)',
                      backgroundColor: '#D4F044',
                      color: '#080808',
                      marginTop: '4px',
                    }}
                  >
                    {loading ? 'Sending...' : 'Send Enquiry →'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
