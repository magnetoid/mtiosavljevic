import { Link } from 'react-router-dom'

const SERVICES = [
  {
    icon: '◈',
    title: 'AI Strategy Consulting',
    desc: 'Help organizations navigate the AI landscape — from evaluating models and architectures to building AI roadmaps aligned with business goals.',
    deliverables: ['AI readiness assessment', 'Technology selection', 'Implementation roadmap', 'Risk analysis'],
  },
  {
    icon: '◉',
    title: 'LLM Integration',
    desc: 'Design and implement large language model integrations: RAG systems, agentic architectures, fine-tuning pipelines, and evaluation frameworks.',
    deliverables: ['System architecture', 'RAG pipeline design', 'Prompt engineering', 'Evaluation & benchmarking'],
  },
  {
    icon: '▣',
    title: 'Data Architecture',
    desc: 'Scalable data infrastructure design — from ingestion pipelines and lakehouse architectures to real-time analytics and data mesh patterns.',
    deliverables: ['Architecture review', 'Pipeline design', 'Scalability planning', 'Technology selection'],
  },
  {
    icon: '◬',
    title: 'AI Security Audit',
    desc: 'Security assessment for AI systems: adversarial ML, prompt injection, data poisoning, model extraction, and compliance review.',
    deliverables: ['Threat modeling', 'Penetration testing', 'Vulnerability report', 'Remediation guidance'],
  },
  {
    icon: '◫',
    title: 'Technical Writing',
    desc: 'Deep-dive technical content: whitepapers, research summaries, engineering blog posts, and documentation for complex AI and data systems.',
    deliverables: ['Whitepapers', 'Engineering posts', 'Research summaries', 'API documentation'],
  },
]

const PROCESS = [
  { step: '01', title: 'Discovery', desc: 'We start with a conversation about your goals, constraints, and technical context.' },
  { step: '02', title: 'Analysis', desc: 'I review your current architecture, stack, or content needs and identify the critical path.' },
  { step: '03', title: 'Proposal', desc: 'Clear scope, timeline, and deliverables — no vague retainers or scope creep.' },
  { step: '04', title: 'Delivery', desc: 'Focused, documented work with regular check-ins and a final handover.' },
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
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="group p-8 border border-white/5 hover:border-emerald-400/30 bg-ink-2/50 hover:bg-ink-2 transition-all duration-300 reveal"
            >
              <div className="font-mono text-emerald-400 text-2xl mb-5 group-hover:text-cyan-400 transition-colors">
                {service.icon}
              </div>
              <h3 className="font-mono text-smoke text-base tracking-wide mb-3">{service.title}</h3>
              <p className="text-smoke-dim text-sm leading-relaxed mb-6" style={{ fontWeight: 300 }}>
                {service.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.deliverables.map(d => (
                  <span key={d} className="font-mono text-[0.58rem] tracking-wider uppercase px-2 py-1 border border-white/8 text-smoke-faint">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          ))}

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
