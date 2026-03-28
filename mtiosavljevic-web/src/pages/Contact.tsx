import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Contact() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    company: '',
    service_type: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.full_name || !form.email || !form.message) {
      setError('Please fill in name, email, and message.')
      return
    }
    setSubmitting(true)
    setError('')
    const { error: err } = await supabase.from('quote_requests').insert([form])
    setSubmitting(false)
    if (err) {
      setError('Something went wrong. Please email me directly.')
    } else {
      setSubmitted(true)
    }
  }

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-36 pb-16 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(16,185,129,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
        <div className="max-w-screen-xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-6 reveal">
            <span className="font-mono text-emerald-400 text-[0.65rem] tracking-[0.3em] uppercase">Contact</span>
            <div className="h-px w-12 bg-emerald-400/40" />
          </div>
          <h1
            className="font-mono font-light text-smoke mb-4 reveal reveal-delay-1"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Get in touch
          </h1>
          <p className="text-smoke-dim text-lg max-w-xl reveal reveal-delay-2" style={{ fontWeight: 300 }}>
            I'm available for consulting, technical writing, speaking, and interesting collaborations.
          </p>
        </div>
      </section>

      {/* ── FORM + INFO ──────────────────────────────────────── */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-start gap-6 py-12">
                <div className="w-12 h-12 border border-emerald-400/40 flex items-center justify-center">
                  <span className="font-mono text-emerald-400 text-xl">✓</span>
                </div>
                <div>
                  <h2 className="font-mono font-light text-2xl text-smoke mb-3">
                    Message received.
                  </h2>
                  <p className="text-smoke-dim text-base" style={{ fontWeight: 300 }}>
                    I'll respond within 24–48 hours. In the meantime, you can read the{' '}
                    <a href="/blog" className="text-emerald-400 hover:text-emerald-300 transition-colors">blog</a>.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-emerald-400 mb-2">
                  &gt; send_message --init
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-mono text-[0.6rem] tracking-widest uppercase text-smoke-faint block mb-2">
                      Name *
                    </label>
                    <input
                      className="w-full bg-ink-2 border border-white/10 focus:border-emerald-400/50 text-smoke px-4 py-3 font-mono text-sm outline-none transition-colors"
                      type="text"
                      placeholder="Your name"
                      value={form.full_name}
                      onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[0.6rem] tracking-widest uppercase text-smoke-faint block mb-2">
                      Email *
                    </label>
                    <input
                      className="w-full bg-ink-2 border border-white/10 focus:border-emerald-400/50 text-smoke px-4 py-3 font-mono text-sm outline-none transition-colors"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[0.6rem] tracking-widest uppercase text-smoke-faint block mb-2">
                    Company / Organization
                  </label>
                  <input
                    className="w-full bg-ink-2 border border-white/10 focus:border-emerald-400/50 text-smoke px-4 py-3 font-mono text-sm outline-none transition-colors"
                    type="text"
                    placeholder="Optional"
                    value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="font-mono text-[0.6rem] tracking-widest uppercase text-smoke-faint block mb-2">
                    What are you looking for?
                  </label>
                  <select
                    className="w-full bg-ink-2 border border-white/10 focus:border-emerald-400/50 text-smoke-dim px-4 py-3 font-mono text-sm outline-none transition-colors"
                    value={form.service_type}
                    onChange={e => setForm(f => ({ ...f, service_type: e.target.value }))}
                  >
                    <option value="">Select (optional)</option>
                    <option>AI Strategy Consulting</option>
                    <option>LLM Integration</option>
                    <option>Data Architecture</option>
                    <option>AI Security Audit</option>
                    <option>Technical Writing</option>
                    <option>Speaking / Podcast</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[0.6rem] tracking-widest uppercase text-smoke-faint block mb-2">
                    Message *
                  </label>
                  <textarea
                    className="w-full bg-ink-2 border border-white/10 focus:border-emerald-400/50 text-smoke px-4 py-3 font-mono text-sm outline-none transition-colors resize-none"
                    rows={6}
                    placeholder="Tell me about what you're working on…"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  />
                </div>

                {error && (
                  <p className="font-mono text-xs text-red-400">{error}</p>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="font-mono text-[0.7rem] tracking-widest uppercase px-6 py-3 bg-emerald-400 text-ink hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {submitting ? 'Sending…' : 'Send message →'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-emerald-400 mb-4">Direct contact</p>
              <a href="mailto:marko.tiosavljevic@gmail.com"
                className="font-mono text-sm text-smoke hover:text-emerald-400 transition-colors block">
                marko.tiosavljevic@gmail.com
              </a>
            </div>

            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-emerald-400 mb-4">Response time</p>
              <p className="text-smoke-dim text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                I respond to all enquiries within <span className="text-smoke">24–48 hours</span>, Monday to Friday.
              </p>
            </div>

            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-emerald-400 mb-4">Profiles</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'LinkedIn', href: 'https://linkedin.com/in/mtiosavljevic' },
                  { label: 'Twitter/X', href: 'https://twitter.com/mtiosavljevic' },
                  { label: 'GitHub', href: 'https://github.com/magnetoid' },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[0.65rem] tracking-wider uppercase text-smoke-faint hover:text-emerald-400 transition-colors"
                  >
                    {label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
