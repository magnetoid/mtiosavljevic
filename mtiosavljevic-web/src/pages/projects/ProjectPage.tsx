import { Link, useParams, Navigate } from 'react-router-dom'
import Seo from '@/components/Seo'
import { PROJECTS_DATA, getProjectBySlug } from './data'

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = getProjectBySlug(slug ?? '')

  if (!project) return <Navigate to="/projects" replace />

  const others = PROJECTS_DATA.filter(p => p.slug !== project.slug)
  const accent = project.accent

  return (
    <>
      <Seo
        title={`${project.name} — Case Study`}
        description={project.hero}
        canonicalPath={`/projects/${project.slug}`}
      />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="pt-36 pb-20 px-6 lg:px-12 bg-ink relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${accent}0C 1px, transparent 1px), linear-gradient(90deg, ${accent}0C 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div
          className="absolute top-0 right-0 w-[45vw] h-full pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 70% at 100% 30%, ${accent}14 0%, transparent 65%)` }}
        />

        <div className="relative max-w-screen-xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-10 font-mono text-[0.62rem] tracking-widest uppercase">
            <Link to="/projects" className="text-smoke-faint hover:text-smoke transition-colors">Projects</Link>
            <span className="text-smoke-faint/30">→</span>
            <span style={{ color: accent }}>{project.name}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              {/* Label + meta */}
              <div className="flex flex-wrap items-center gap-4 mb-8 reveal">
                <span
                  className="font-mono text-[0.6rem] tracking-[0.22em] uppercase px-3 py-1 border"
                  style={{ color: accent, borderColor: `${accent}55` }}
                >
                  {project.category}
                </span>
                <span className="font-mono text-[0.6rem] tracking-widest uppercase text-smoke-faint">
                  {project.year}
                </span>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[0.6rem] tracking-widest uppercase text-smoke-faint hover:text-smoke transition-colors underline decoration-dotted underline-offset-4"
                >
                  Visit live ↗
                </a>
              </div>

              <h1
                className="font-mono font-light text-smoke leading-[1.05] mb-6 reveal reveal-delay-1"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4.6rem)' }}
              >
                {project.name}
              </h1>

              <p
                className="font-mono font-light leading-tight mb-10 reveal reveal-delay-2"
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.55rem)', color: accent }}
              >
                {project.tagline}
              </p>

              <p
                className="text-smoke-dim leading-relaxed max-w-3xl mb-10 reveal reveal-delay-3"
                style={{ fontSize: '1.02rem', fontWeight: 300 }}
              >
                {project.hero}
              </p>

              <div className="flex flex-wrap gap-4 reveal reveal-delay-3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[0.7rem] tracking-widest uppercase px-6 py-3 transition-colors"
                  style={{ background: accent, color: '#0A0A0B' }}
                >
                  Visit {project.name} →
                </a>
                <Link
                  to="/contact"
                  className="font-mono text-[0.7rem] tracking-widest uppercase px-6 py-3 border border-white/10 text-smoke hover:border-white/30 transition-colors"
                >
                  Work with me
                </Link>
              </div>
            </div>

            {/* Side card — role & stack */}
            <aside className="lg:col-span-4 reveal reveal-delay-2">
              <div className="p-6 border border-white/5 bg-ink-2/60 h-full">
                <div className="mb-6">
                  <div className="font-mono text-[0.58rem] tracking-[0.22em] uppercase text-smoke-faint mb-3">
                    Role
                  </div>
                  <p className="text-smoke text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                    {project.role}
                  </p>
                </div>
                <div className="h-px bg-white/5 my-6" />
                <div>
                  <div className="font-mono text-[0.58rem] tracking-[0.22em] uppercase text-smoke-faint mb-3">
                    Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map(s => (
                      <span
                        key={s}
                        className="font-mono text-[0.58rem] tracking-wider uppercase px-2 py-1 border border-white/8 text-smoke-dim"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ─────────────────────────────────────── */}
      <section className="border-y border-white/5 bg-ink">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 lg:grid-cols-4">
          {project.stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-6 lg:px-10 py-9 ${i < project.stats.length - 1 ? 'lg:border-r border-white/5' : ''} ${i < 2 ? 'border-b lg:border-b-0' : ''} ${i % 2 === 0 ? 'border-r lg:border-r' : ''}`}
            >
              <div
                className="font-mono font-light leading-none mb-2"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: accent }}
              >
                {s.num}
              </div>
              <div className="font-mono text-[0.6rem] tracking-[0.16em] uppercase text-smoke-faint leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SUMMARY ────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12 bg-ink">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 reveal">
              <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-smoke-faint">
                Overview
              </span>
              <div className="h-px flex-1 bg-white/5" />
            </div>
          </div>
          <div className="lg:col-span-8">
            <p
              className="text-smoke leading-relaxed reveal"
              style={{ fontSize: '1.2rem', fontWeight: 300 }}
            >
              {project.summary}
            </p>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12 bg-ink-2 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6 reveal">
              <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase" style={{ color: accent }}>
                01 — Problem
              </span>
            </div>
            <h2
              className="font-mono font-light text-smoke leading-tight reveal reveal-delay-1"
              style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)' }}
            >
              {project.problem.title}
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p
              className="text-smoke-dim leading-relaxed reveal reveal-delay-2"
              style={{ fontSize: '1.02rem', fontWeight: 300 }}
            >
              {project.problem.body}
            </p>
          </div>
        </div>
      </section>

      {/* ── APPROACH ───────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12 bg-ink border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3 mb-14 reveal">
            <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase" style={{ color: accent }}>
              02 — Approach
            </span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
            {project.approach.map((a, i) => (
              <div
                key={a.title}
                className="reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="font-mono text-[0.58rem] tracking-[0.22em] uppercase mb-4"
                  style={{ color: accent }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-mono text-smoke text-lg leading-snug mb-4" style={{ fontWeight: 400 }}>
                  {a.title}
                </h3>
                <p className="text-smoke-dim text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12 bg-ink-2 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3 mb-14 reveal">
            <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase" style={{ color: accent }}>
              03 — What was built
            </span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {project.features.map((f, i) => (
              <div
                key={f.title}
                className="p-6 border border-white/5 bg-ink/50 hover:bg-ink transition-colors reveal"
                style={{
                  transitionDelay: `${i * 50}ms`,
                  borderColor: `rgba(255,255,255,0.05)`,
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full mb-5"
                  style={{ background: accent }}
                />
                <h3 className="font-mono text-smoke text-sm tracking-wide mb-3" style={{ fontWeight: 400 }}>
                  {f.title}
                </h3>
                <p className="text-smoke-dim text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUTCOMES ───────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12 bg-ink border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3 mb-14 reveal">
            <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase" style={{ color: accent }}>
              04 — Outcomes
            </span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.outcomes.map((o, i) => (
              <div
                key={o.label}
                className="p-8 border border-white/5 bg-ink-2/40 reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div
                  className="font-mono font-light leading-none mb-3"
                  style={{ fontSize: '2.2rem', color: accent }}
                >
                  {o.metric}
                </div>
                <div className="text-smoke-dim text-sm leading-snug" style={{ fontWeight: 300 }}>
                  {o.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE ──────────────────────────────────────────── */}
      {project.quote && (
        <section className="py-24 px-6 lg:px-12 bg-ink-2 border-t border-white/5">
          <div className="max-w-screen-xl mx-auto max-w-3xl">
            <div className="reveal">
              <div
                className="font-mono text-[2.5rem] leading-none mb-6"
                style={{ color: accent }}
              >
                &ldquo;
              </div>
              <blockquote
                className="font-mono font-light text-smoke leading-snug mb-6"
                style={{ fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)', fontWeight: 300 }}
              >
                {project.quote.text}
              </blockquote>
              <div className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-smoke-faint">
                — {project.quote.attribution}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── LESSONS ────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12 bg-ink border-t border-white/5">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6 reveal">
              <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase" style={{ color: accent }}>
                05 — What I took away
              </span>
            </div>
            <h2
              className="font-mono font-light text-smoke leading-tight reveal reveal-delay-1"
              style={{ fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)' }}
            >
              The lessons worth carrying to the next build.
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-8">
            {project.lessons.map((l, i) => (
              <div
                key={i}
                className="flex gap-6 reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="font-mono text-[0.7rem] tracking-widest flex-shrink-0 mt-1"
                  style={{ color: `${accent}80` }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p
                  className="text-smoke-dim leading-relaxed"
                  style={{ fontSize: '1.02rem', fontWeight: 300 }}
                >
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OTHER PROJECTS ─────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12 bg-ink-2 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3 mb-12 reveal">
            <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-smoke-faint">
              Other projects
            </span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {others.map((p, i) => (
              <Link
                key={p.slug}
                to={`/projects/${p.slug}`}
                className="group p-8 border border-white/5 hover:bg-ink transition-all duration-300 reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="font-mono text-[0.58rem] tracking-[0.22em] uppercase px-2 py-1 border"
                    style={{ color: p.accent, borderColor: `${p.accent}55` }}
                  >
                    {p.category}
                  </span>
                  <span className="font-mono text-[0.58rem] tracking-widest uppercase text-smoke-faint">
                    {p.year}
                  </span>
                </div>
                <h3
                  className="font-mono font-light text-smoke text-2xl leading-tight mb-3 group-hover:opacity-90 transition-opacity"
                  style={{ fontWeight: 300 }}
                >
                  {p.name}
                </h3>
                <p className="text-smoke-dim text-sm leading-relaxed mb-5" style={{ fontWeight: 300 }}>
                  {p.tagline}
                </p>
                <span
                  className="font-mono text-[0.6rem] tracking-widest uppercase"
                  style={{ color: p.accent }}
                >
                  Read case study →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ───────────────────────────────────────── */}
      <section
        className="border-t"
        style={{ borderColor: `${accent}33`, background: `${accent}0D` }}
      >
        <div className="px-6 lg:px-12 py-16 max-w-screen-xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <div
              className="font-mono text-[0.65rem] tracking-[0.3em] uppercase mb-3"
              style={{ color: accent }}
            >
              &gt; building something similar?
            </div>
            <h2
              className="font-mono font-light text-smoke leading-tight"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
            >
              Let's talk about your version of this.
            </h2>
            <p
              className="text-smoke-dim mt-2 max-w-xl"
              style={{ fontSize: '0.95rem', fontWeight: 300 }}
            >
              If {project.name} resonates with a problem you're trying to solve, I'd be glad to hear about it. No forms, no gatekeeping — just a conversation.
            </p>
          </div>
          <Link
            to="/contact"
            className="flex-shrink-0 font-mono text-[0.7rem] tracking-widest uppercase px-6 py-3 transition-colors"
            style={{ background: accent, color: '#0A0A0B' }}
          >
            Start a conversation →
          </Link>
        </div>
      </section>
    </>
  )
}
