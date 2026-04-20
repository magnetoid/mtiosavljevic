import { Link } from 'react-router-dom'
import Seo from '@/components/Seo'
import { PROJECTS_DATA } from './projects/data'

export default function Projects() {
  return (
    <>
      <Seo
        title="Projects — Selected Case Studies"
        description="Selected case studies: Aletheia, WooPulse, nisam.video. AI platforms, SaaS products, and curation engines built end-to-end."
        canonicalPath="/projects"
      />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-36 pb-20 px-6 lg:px-12 bg-ink relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(16,185,129,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.03) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3 mb-6 reveal">
            <span className="font-mono text-emerald-400 text-[0.65rem] tracking-[0.3em] uppercase">
              Selected work
            </span>
            <div className="h-px w-12 bg-emerald-400/40" />
          </div>

          <h1
            className="font-mono font-light text-smoke leading-[1.05] mb-6 reveal reveal-delay-1"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
          >
            Things I built.<br />
            <span className="text-smoke-dim">Stories I can tell.</span>
          </h1>

          <p
            className="text-smoke-dim max-w-2xl leading-relaxed reveal reveal-delay-2"
            style={{ fontSize: '1.05rem', fontWeight: 300 }}
          >
            Three long-form case studies. An AI forensic platform fighting corruption.
            An ecommerce AI brain for WooCommerce. A curation hub that has outlived a decade
            of algorithm changes. All shipped, all live, all mine end-to-end.
          </p>
        </div>
      </section>

      {/* ── PROJECT LIST ─────────────────────────────────────── */}
      <section className="pb-24 px-6 lg:px-12 bg-ink">
        <div className="max-w-screen-xl mx-auto space-y-6">
          {PROJECTS_DATA.map((p, i) => (
            <Link
              key={p.slug}
              to={`/projects/${p.slug}`}
              className="group block relative border border-white/5 bg-ink-2/40 hover:bg-ink-2 transition-all duration-300 reveal overflow-hidden"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Accent stripe */}
              <div
                className="absolute top-0 left-0 w-1 h-full transition-all duration-300 group-hover:w-1.5"
                style={{ background: p.accent }}
              />

              <div className="grid lg:grid-cols-12 gap-8 p-8 lg:p-10">
                {/* Left: index + category */}
                <div className="lg:col-span-2 flex lg:flex-col gap-4 lg:gap-6 items-start">
                  <div
                    className="font-mono text-[0.65rem] tracking-[0.2em] uppercase"
                    style={{ color: p.accent }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="font-mono text-[0.58rem] tracking-widest uppercase text-smoke-faint">
                    {p.year}
                  </div>
                </div>

                {/* Middle: content */}
                <div className="lg:col-span-7">
                  <div
                    className="font-mono text-[0.6rem] tracking-[0.22em] uppercase mb-4"
                    style={{ color: p.accent }}
                  >
                    {p.category}
                  </div>
                  <h2
                    className="font-mono font-light text-smoke leading-tight mb-3"
                    style={{ fontSize: 'clamp(1.9rem, 3.4vw, 2.8rem)', fontWeight: 300 }}
                  >
                    {p.name}
                  </h2>
                  <p
                    className="mb-5"
                    style={{ fontSize: '1.05rem', color: p.accent, fontWeight: 300 }}
                  >
                    {p.tagline}
                  </p>
                  <p
                    className="text-smoke-dim leading-relaxed mb-6 max-w-2xl"
                    style={{ fontSize: '0.95rem', fontWeight: 300 }}
                  >
                    {p.hero}
                  </p>
                  <div className="flex items-center gap-6">
                    <span
                      className="font-mono text-[0.65rem] tracking-widest uppercase transition-colors"
                      style={{ color: p.accent }}
                    >
                      Read case study →
                    </span>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="font-mono text-[0.65rem] tracking-widest uppercase text-smoke-faint hover:text-smoke transition-colors underline decoration-dotted underline-offset-4"
                    >
                      Visit live ↗
                    </a>
                  </div>
                </div>

                {/* Right: headline stats */}
                <div className="lg:col-span-3 grid grid-cols-2 gap-3">
                  {p.stats.slice(0, 4).map(s => (
                    <div
                      key={s.label}
                      className="p-3 border border-white/5 bg-ink/40"
                    >
                      <div
                        className="font-mono font-light leading-none mb-1.5"
                        style={{ fontSize: '1.15rem', color: p.accent }}
                      >
                        {s.num}
                      </div>
                      <div className="font-mono text-[0.5rem] tracking-[0.14em] uppercase text-smoke-faint leading-tight">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA BAND ─────────────────────────────────────────── */}
      <section className="border-t border-emerald-400/20 bg-emerald-400/5">
        <div className="px-6 lg:px-12 py-16 max-w-screen-xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <div className="font-mono text-emerald-400 text-[0.65rem] tracking-[0.3em] uppercase mb-3">
              &gt; available for engagements
            </div>
            <h2
              className="font-mono font-light text-smoke leading-tight"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
            >
              Have a project that belongs on this list?
            </h2>
            <p
              className="text-smoke-dim mt-2 max-w-xl"
              style={{ fontSize: '0.95rem', fontWeight: 300 }}
            >
              I take on a small number of product builds a year — AI platforms, SaaS MVPs, ecommerce infrastructure. Let's talk.
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
