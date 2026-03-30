import { Link, useParams, Navigate } from 'react-router-dom'
import { SERVICES_DATA, getServiceBySlug } from './data'
import Seo from '@/components/Seo'
import { useQuoteModal } from '@/contexts/QuoteModalContext'

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const service = getServiceBySlug(slug ?? '')
  const { openModal } = useQuoteModal()

  if (!service) return <Navigate to="/services" replace />

  const otherServices = SERVICES_DATA.filter(s => s.slug !== service.slug).slice(0, 3)

  return (
    <>
      <Seo
        title={`${service.label} | Tech Consulting Services`}
        description={service.heroDesc}
        canonicalPath={`/services/${service.slug}`}
      />

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="pt-36 pb-20 px-6 lg:px-12 bg-ink relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(16,185,129,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
        <div className="relative max-w-screen-xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 font-mono text-[0.62rem] tracking-widest uppercase">
            <Link to="/services" className="text-smoke-faint hover:text-smoke transition-colors">Services</Link>
            <span className="text-smoke-faint/30">→</span>
            <span className="text-emerald-400">{service.label}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              {/* Icon + service label */}
              <div className="flex items-center gap-3 mb-6 reveal">
                <div className="w-10 h-10 border border-emerald-400/40 flex items-center justify-center text-lg text-emerald-400">
                  {service.icon}
                </div>
                <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-emerald-400">
                  {service.label}
                </span>
              </div>

              <h1 className="font-mono font-light text-smoke leading-tight mb-6 reveal reveal-delay-1"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
                {service.tagline}
              </h1>

              <p className="text-smoke-dim leading-relaxed mb-8 reveal reveal-delay-2" style={{ fontSize: '0.95rem', fontWeight: 300 }}>
                {service.heroDesc}
              </p>

              <div className="flex flex-wrap gap-4 reveal reveal-delay-3">
                <button
                  onClick={() => openModal(service.label)}
                  className="font-mono text-[0.7rem] tracking-widest uppercase px-6 py-3 bg-emerald-400 text-ink hover:bg-emerald-300 transition-colors cursor-pointer"
                >
                  Get a Quote →
                </button>
                <Link to="/contact" className="font-mono text-[0.7rem] tracking-widest uppercase px-6 py-3 border border-white/10 text-smoke hover:border-emerald-400/30 transition-colors">
                  Start a conversation
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="reveal reveal-delay-2">
              <div className="grid grid-cols-2 gap-4">
                {service.stats.map(({ num, label }) => (
                  <div key={label} className="p-6 border border-white/5 bg-ink-2/50">
                    <div className="font-mono font-light text-emerald-400 leading-none mb-2" style={{ fontSize: '2rem' }}>
                      {num}
                    </div>
                    <div className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-smoke-faint leading-snug">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12 bg-ink">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3 mb-12 reveal">
            <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-smoke-faint">What I deliver</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map(({ title, desc }, i) => (
              <div key={title}
                className="p-6 border border-white/5 hover:border-emerald-400/30 bg-ink-2/50 transition-all duration-300 reveal"
                style={{ transitionDelay: `${i * 50}ms` }}>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mb-4" />
                <h3 className="font-mono text-smoke text-sm tracking-wide mb-3">{title}</h3>
                <p className="text-smoke-dim text-sm leading-relaxed" style={{ fontWeight: 300 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12 bg-ink-2">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3 mb-12 reveal">
            <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-smoke-faint">How I work</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map(({ n, title, desc }, i) => (
              <div key={n} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="font-mono text-[0.6rem] tracking-widest text-emerald-400/50 mb-3">{n}</div>
                <h3 className="font-mono text-smoke text-sm mb-2">{title}</h3>
                <p className="text-smoke-dim text-sm leading-relaxed" style={{ fontWeight: 300 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12 bg-ink">
        <div className="max-w-screen-xl mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-12 reveal">
            <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-smoke-faint">Common questions</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="space-y-0">
            {service.faq.map(({ q, a }, i) => (
              <div key={q}
                className="border-b border-white/5 py-7 reveal"
                style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="flex gap-5">
                  <span className="font-mono text-[0.65rem] text-emerald-400/50 mt-1 min-w-[1.5rem] flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-mono text-smoke text-sm tracking-wide mb-3">{q}</h3>
                    <p className="text-smoke-dim text-sm leading-relaxed" style={{ fontWeight: 300 }}>{a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OTHER SERVICES ─────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12 bg-ink-2 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3 mb-12 reveal">
            <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-smoke-faint">Other services</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.map((s, i) => (
              <Link key={s.slug} to={`/services/${s.slug}`}
                className="group p-6 border border-white/5 hover:border-emerald-400/30 bg-ink/50 transition-all duration-300 reveal"
                style={{ transitionDelay: `${i * 50}ms` }}>
                <div className="font-mono text-emerald-400 text-2xl mb-4 group-hover:text-cyan-400 transition-colors">
                  {s.icon}
                </div>
                <h3 className="font-mono text-smoke text-sm tracking-wide mb-2">{s.label}</h3>
                <p className="text-smoke-dim text-xs leading-relaxed mb-4" style={{ fontWeight: 300 }}>{s.tagline}</p>
                <span className="font-mono text-[0.6rem] tracking-widest uppercase text-emerald-400 group-hover:text-cyan-400 transition-colors">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ───────────────────────────────────────── */}
      <section className="border-t border-emerald-400/20 bg-emerald-400/5">
        <div className="px-6 lg:px-12 py-16 max-w-screen-xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <div className="font-mono text-emerald-400 text-[0.65rem] tracking-[0.3em] uppercase mb-3">
              &gt; available for engagements
            </div>
            <h2 className="font-mono font-light text-smoke leading-tight"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
              Ready to start?
            </h2>
            <p className="text-smoke-dim mt-2" style={{ fontSize: '0.9rem', fontWeight: 300 }}>
              Let's have a conversation. I'll give you an honest assessment of how I can help.
            </p>
          </div>
          <Link
            to="/contact"
            className="flex-shrink-0 font-mono text-[0.7rem] tracking-widest uppercase px-6 py-3 bg-emerald-400 text-ink hover:bg-emerald-300 transition-colors"
          >
            Start a conversation →
          </Link>
        </div>
      </section>
    </>
  )
}
