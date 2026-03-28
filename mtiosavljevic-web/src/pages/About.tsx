import { Link } from 'react-router-dom'

const TIMELINE = [
  { year: '1990s', label: 'Early internet infrastructure and systems programming' },
  { year: '2000s', label: 'Distributed systems, database architecture, enterprise software' },
  { year: '2010s', label: 'Cloud infrastructure, DevOps, big data systems' },
  { year: '2015–', label: 'Collaboration with Google, Cloudflare, and Amazon' },
  { year: '2020–', label: 'Deep focus on AI/ML, LLMs, and applied artificial intelligence' },
  { year: 'Now', label: 'AI research, consulting, writing, and investing in frontier tech' },
]

const FOCUS_AREAS = [
  'Large Language Models',
  'AI Systems Architecture',
  'Data Engineering',
  'Cybersecurity',
  'Tech Geopolitics',
  'Applied AI Research',
  'AI Governance',
  'Distributed Systems',
]

export default function About() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-36 pb-20 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(16,185,129,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
        <div className="max-w-screen-xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-6 reveal">
            <span className="font-mono text-emerald-400 text-[0.65rem] tracking-[0.3em] uppercase">About</span>
            <div className="h-px w-12 bg-emerald-400/40" />
          </div>
          <h1
            className="font-mono font-light text-smoke mb-4 reveal reveal-delay-1"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Marko Tiosavljević
          </h1>
          <p className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-smoke-faint reveal reveal-delay-2">
            AI Researcher · Technologist · Blogger · Investor
          </p>
        </div>
      </section>

      {/* ── BIO ──────────────────────────────────────────────── */}
      <section className="pb-20 px-6 lg:px-12">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Main bio */}
          <div className="lg:col-span-3">
            <div className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-emerald-400 mb-6">
              &gt; cat about.txt
            </div>
            <div className="flex flex-col gap-5 text-smoke-dim text-lg leading-relaxed" style={{ fontWeight: 300 }}>
              <p>
                Hello — I'm Marko T., an AI researcher and technologist with a long-standing focus
                on data-driven systems, scalable architectures, and applied artificial intelligence.
              </p>
              <p>
                My work is rooted in more than three decades of hands-on experience with software
                and computational technologies. I have collaborated with{' '}
                <span className="text-smoke">Google</span>,{' '}
                <span className="text-smoke">Cloudflare</span>, and{' '}
                <span className="text-smoke">Amazon</span>.
              </p>
              <p>
                My background combines deep technical expertise with product and growth strategy.
                I'm particularly interested in the interplay between AI capabilities and the
                societal, geopolitical, and security implications of those capabilities.
              </p>
              <p>
                I write to think — and to share what I learn. This blog is my public notebook:
                honest, technical, occasionally opinionated.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-10">
              <Link
                to="/contact"
                className="font-mono text-[0.7rem] tracking-widest uppercase px-6 py-3 bg-emerald-400 text-ink hover:bg-emerald-300 transition-colors"
              >
                Get in touch →
              </Link>
              <Link
                to="/services"
                className="font-mono text-[0.7rem] tracking-widest uppercase px-6 py-3 border border-white/20 text-smoke-dim hover:border-white/40 hover:text-smoke transition-colors"
              >
                Work with me
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            {/* Focus areas */}
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-emerald-400 mb-4">Focus areas</p>
              <div className="flex flex-wrap gap-2">
                {FOCUS_AREAS.map(area => (
                  <span
                    key={area}
                    className="font-mono text-[0.6rem] tracking-wider uppercase px-3 py-1 border border-white/10 text-smoke-dim"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-emerald-400 mb-4">Find me online</p>
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

      {/* ── TIMELINE ─────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12 bg-ink-2">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3 mb-12 reveal">
            <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-smoke-faint">Timeline</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="flex flex-col gap-0 max-w-2xl">
            {TIMELINE.map((item, i) => (
              <div key={i} className="flex gap-8 reveal" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-1 flex-shrink-0" />
                  {i < TIMELINE.length - 1 && <div className="w-px flex-1 bg-white/10 my-1" />}
                </div>
                <div className="pb-8">
                  <span className="font-mono text-[0.6rem] tracking-widest uppercase text-emerald-400 block mb-1">
                    {item.year}
                  </span>
                  <p className="text-smoke-dim text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
