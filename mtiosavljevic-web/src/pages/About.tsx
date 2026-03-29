import { Link } from 'react-router-dom'

const TIMELINE = [
  { year: '1999–2003', label: 'Graphic Designer — print & brand design, logos, brochures, packaging, pre-press and colour management' },
  { year: '2003–2007', label: 'Web Designer / Developer — HTML/CSS sites, early CMS platforms; Imba Production founded 2005' },
  { year: '2007–2012', label: 'Digital Marketing Specialist — early SEO, Google AdWords, first eCommerce builds, video production' },
  { year: '2012–2016', label: 'WordPress / WooCommerce Expert — custom themes at scale, Facebook Ads, 50+ clients across EU and US' },
  { year: '2016–2020', label: 'Full-Stack eCommerce Architect — WooCommerce, Shopify, performance funnels, brand films, eLearning' },
  { year: '2020–2022', label: 'Cloud / DevOps & SaaS Pivot — Docker, Hetzner, Coolify, Supabase; SaaS ideation and MVP development' },
  { year: '2022–2024', label: 'SaaS Developer & AI Integrator — WooPulse, Torsor, Alethia; Claude API, Gemini, Ollama, Dify, MCP' },
  { year: 'Now', label: 'AI-Native Product Builder — multi-agent systems, vibe coding, 10+ live SaaS products and applications' },
]

const FOCUS_AREAS = [
  'AI & Automation',
  'Full-Stack Development',
  'eCommerce Architecture',
  'Performance Marketing',
  'DevOps & Cloud',
  'Brand Identity Design',
  'SaaS Product Building',
  'Technical SEO',
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
            Senior Digital Consultant · Full-Stack Developer · AI Specialist · Founder
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
                Multi-disciplinary digital professional with{' '}
                <span className="text-smoke">25+ years of hands-on experience</span>{' '}
                spanning graphic design, brand identity, web and software development,
                performance marketing, video production, and AI automation.
              </p>
              <p>
                Started in print and brand design in the late 1990s, evolved through the full arc
                of the web — from static HTML through CMS platforms, eCommerce, SaaS, and now
                AI-native product development.
              </p>
              <p>
                Founder of{' '}
                <span className="text-smoke">Imba Production</span>{' '}
                (video & digital agency, est. 2005) and architect of multiple live SaaS products.
                Proven record of scaling{' '}
                <span className="text-smoke">130+ businesses</span>{' '}
                with a 100% Job Success Score on Upwork across 15+ years.
              </p>
              <p>
                Operates across the entire product lifecycle: brand identity and UI/UX design,
                full-stack engineering, cloud infrastructure, paid media, analytics,
                and go-to-market strategy.
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
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-emerald-400 mb-4">Core expertise</p>
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

            {/* Key stats */}
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-emerald-400 mb-4">By the numbers</p>
              <div className="flex flex-col gap-3">
                {[
                  { num: '25+', label: 'Years experience' },
                  { num: '130+', label: 'Businesses scaled' },
                  { num: '10+', label: 'Live SaaS products' },
                  { num: '100%', label: 'Upwork Job Success Score' },
                ].map(({ num, label }) => (
                  <div key={label} className="flex items-baseline gap-3">
                    <span className="font-mono text-emerald-400 text-lg">{num}</span>
                    <span className="font-mono text-[0.6rem] tracking-wider uppercase text-smoke-faint">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-emerald-400 mb-4">Find me online</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'LinkedIn', href: 'https://linkedin.com/in/markotiosavljevic' },
                  { label: 'Imba Production', href: 'https://imbaproduction.com' },
                  { label: 'GitHub', href: 'https://github.com/magnetoid' },
                  { label: 'Upwork', href: 'https://upwork.com' },
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
            <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-smoke-faint">25-Year Career Timeline</span>
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
