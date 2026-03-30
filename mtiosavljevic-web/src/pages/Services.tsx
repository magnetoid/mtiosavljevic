import { Link } from 'react-router-dom'

// Map service titles to slugs from SERVICES_DATA
const SLUG_MAP: Record<string, string> = {
  'AI & Automation': 'ai-automation',
  'Full-Stack Development': 'fullstack-dev',
  'eCommerce Architecture': 'ecommerce',
  'Performance Marketing': 'performance-marketing',
  'DevOps & Cloud': 'devops-cloud',
  'Brand Identity & Design': 'brand-identity',
}

const SERVICES = [
  {
    icon: '◈',
    title: 'AI & Automation',
    desc: 'Claude API, MCP workflows, Gemini, Ollama local LLMs, Dify, and multi-agent orchestration. From API integration to full agentic systems running on local inference hardware.',
    deliverables: ['Multi-agent system design', 'LLM integration & workflows', 'AI content pipelines', 'Dify / LobeChat deployment'],
  },
  {
    icon: '◉',
    title: 'Full-Stack Development',
    desc: 'React, Vite, TypeScript, Node.js, PHP — from simple landing pages to complex SaaS platforms. 10+ live SaaS products shipped using Supabase, Docker, and Coolify.',
    deliverables: ['SaaS MVP development', 'React / Next.js apps', 'Supabase & PostgreSQL', 'Docker & Coolify deployments'],
  },
  {
    icon: '▣',
    title: 'eCommerce Architecture',
    desc: 'WooCommerce, Shopify, BigCommerce, Medusa v2. Custom plugins, Dokan multivendor, subscriptions, BookVault POD, and 12-language international stores.',
    deliverables: ['WooCommerce custom development', 'Shopify & BigCommerce', 'Multivendor platforms', 'Custom checkout plugins'],
  },
  {
    icon: '◬',
    title: 'Performance Marketing',
    desc: 'Google Ads, Meta Ads, Amazon Ads, GA4, GTM, HubSpot. Data-driven campaigns with full funnel strategy, CRO, and attribution. 130+ businesses scaled.',
    deliverables: ['Google & Meta Ads campaigns', 'GA4 & GTM setup', 'HubSpot CRM', 'Email automation (Mailgun/Sendy)'],
  },
  {
    icon: '◫',
    title: 'DevOps & Cloud',
    desc: 'Hetzner VPS, Coolify, Docker Compose, self-hosted Supabase, Nginx, Plesk, CrowdSec security, and CI/CD pipelines. Full infrastructure design and management.',
    deliverables: ['Hetzner VPS setup', 'Coolify & Docker Compose', 'Self-hosted Supabase', 'CI/CD pipelines'],
  },
  {
    icon: '▶',
    title: 'Brand Identity & Design',
    desc: '25 years from pixel to brand system. Adobe Creative Suite, logo and brand identity design, UI/UX, print & packaging — from startup branding to full corporate identity.',
    deliverables: ['Logo & brand identity', 'Print & packaging', 'UI/UX design', 'Brand guidelines & systems'],
  },
]

const PROCESS = [
  { step: '01', title: 'Discovery', desc: 'We start with a call about your goals, stack, and timeline. No forms, no gatekeeping — just a direct conversation.' },
  { step: '02', title: 'Strategy', desc: 'I map out the full scope: architecture decisions, tech stack, timeline, and a realistic budget. All upfront.' },
  { step: '03', title: 'Build', desc: 'Focused execution with weekly updates. Code in your repo from day one. No black boxes.' },
  { step: '04', title: 'Ship & Hand Off', desc: 'Full documentation, knowledge transfer, and ongoing support as needed. You own everything.' },
]

export default function Services() {
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
            <span className="font-mono text-emerald-400 text-[0.65rem] tracking-[0.3em] uppercase">Services</span>
            <div className="h-px w-12 bg-emerald-400/40" />
          </div>
          <h1
            className="font-mono font-light text-smoke mb-4 reveal reveal-delay-1"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Work with me
          </h1>
          <p className="text-smoke-dim text-lg max-w-xl leading-relaxed reveal reveal-delay-2" style={{ fontWeight: 300 }}>
            Focused consulting and delivery engagements. I work with a small number of clients
            at a time to ensure quality over quantity.
          </p>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SERVICES.map((service) => {
            const slug = SLUG_MAP[service.title]
            return (
              <Link
                key={service.title}
                to={slug ? `/services/${slug}` : '/services'}
                className="group p-8 border border-white/5 hover:border-emerald-400/30 bg-ink-2/50 hover:bg-ink-2 transition-all duration-300 reveal block"
              >
                <div className="font-mono text-emerald-400 text-2xl mb-5 group-hover:text-cyan-400 transition-colors">
                  {service.icon}
                </div>
                <h3 className="font-mono text-smoke text-base tracking-wide mb-3">{service.title}</h3>
                <p className="text-smoke-dim text-sm leading-relaxed mb-6" style={{ fontWeight: 300 }}>
                  {service.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.deliverables.map(d => (
                    <span key={d} className="font-mono text-[0.58rem] tracking-wider uppercase px-2 py-1 border border-white/8 text-smoke-faint">
                      {d}
                    </span>
                  ))}
                </div>
                <span className="font-mono text-[0.65rem] tracking-widest uppercase text-emerald-400 group-hover:text-cyan-400 transition-colors">
                  Learn more →
                </span>
              </Link>
            )
          })}

          {/* CTA card */}
          <div className="p-8 border border-emerald-400/20 bg-emerald-400/5 flex flex-col justify-between reveal">
            <div>
              <div className="font-mono text-emerald-400 text-[0.65rem] tracking-[0.3em] uppercase mb-4">
                &gt; available for engagements
              </div>
              <h3 className="font-mono text-smoke text-base tracking-wide mb-3">
                Not sure what you need?
              </h3>
              <p className="text-smoke-dim text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                Let's have a conversation. I'll give you an honest assessment of whether and how I can help.
              </p>
            </div>
            <Link
              to="/contact"
              className="mt-8 self-start font-mono text-[0.7rem] tracking-widest uppercase px-6 py-3 bg-emerald-400 text-ink hover:bg-emerald-300 transition-colors"
            >
              Start a conversation →
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-12 bg-ink-2">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3 mb-12 reveal">
            <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-smoke-faint">How I work</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS.map((step) => (
              <div key={step.step} className="reveal">
                <div className="font-mono text-[0.6rem] tracking-widest text-emerald-400/50 mb-3">{step.step}</div>
                <h4 className="font-mono text-smoke text-sm mb-2">{step.title}</h4>
                <p className="text-smoke-dim text-sm leading-relaxed" style={{ fontWeight: 300 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
