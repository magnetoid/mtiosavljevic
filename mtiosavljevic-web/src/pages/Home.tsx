import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { BlogPost } from '@/lib/supabase'

const EXPERTISE = [
  {
    icon: '◈',
    title: 'Multi-model consensus & reasoning',
    desc: 'Getting heterogeneous models to agree reliably — semantic clustering of answers, agreement scoring, and surfacing dissent instead of hiding it behind one model\'s confidence.',
  },
  {
    icon: '◉',
    title: 'Autonomous & self-improving agents',
    desc: 'Agents that diagnose and repair themselves. The open question is safe self-modification: how much an agent may rewrite before its own guarantees stop holding.',
  },
  {
    icon: '▣',
    title: 'Agent memory, guardrails & MCP tooling',
    desc: 'Durable memory that outlives a context window, ranked by what is stable rather than what is recent, plus architectural rules an agent cannot quietly drift away from.',
  },
  {
    icon: '◫',
    title: 'Systems engineering',
    desc: 'Next.js, TypeScript, Python, Postgres, Docker. The production substrate the research runs on — 38 years of shipping software that has to stay up.',
  },
  {
    icon: '◬',
    title: 'Commerce architecture',
    desc: 'WooCommerce, Shopify, and full-stack e-commerce — the domain most of the applied agent work is grounded in.',
  },
  {
    icon: '▤',
    title: 'Marketing & AEO',
    desc: 'Offline to digital across 30 years: social, SEM, SEO, and now answer-engine optimisation. Certified analyst on Google Marketing Platform and Meta.',
  },
]

const CURRENTLY_EXPLORING = [
  'Consensus protocols across heterogeneous models',
  'Tenso — an experimental language for neural-network development',
]

const DEMO_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Architecture of Reasoning: How LLMs Think',
    slug: 'llm-reasoning-architecture',
    excerpt: 'A deep dive into chain-of-thought, tree-of-thought, and emerging reasoning paradigms in large language models.',
    published: true,
    created_at: '2026-03-15',
    published_at: '2026-03-15',
    category: 'AI/LLM',
    read_time_minutes: 12,
  },
  {
    id: '2',
    title: 'Building RAG Systems That Actually Work',
    slug: 'rag-systems-production',
    excerpt: 'Retrieval-augmented generation is not just about vector databases. Here\'s what actually matters in production.',
    published: true,
    created_at: '2026-02-28',
    published_at: '2026-02-28',
    category: 'Data Systems',
    read_time_minutes: 9,
  },
  {
    id: '3',
    title: 'AI Governance in 2026: The Regulatory Landscape',
    slug: 'ai-governance-2026',
    excerpt: 'From the EU AI Act to US executive orders — how global regulation is shaping AI development and deployment.',
    published: true,
    created_at: '2026-02-10',
    published_at: '2026-02-10',
    category: 'Policy',
    read_time_minutes: 8,
  },
]

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>(DEMO_POSTS)

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data?.length) setPosts(data)
      })
  }, [])

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-40 pb-28 px-6 lg:px-12">
        <div className="max-w-screen-xl mx-auto">
          <p className="font-mono text-smoke-dim text-sm mb-2">Marko Tiosavljević</p>
          <p className="font-mono text-[0.8rem] mb-10">
            <span className="text-emerald-400">AI &amp; LLM scientist</span>
            <span className="text-smoke-dim"> · developer · marketer</span>
          </p>

          <h1
            className="font-mono font-light leading-[1.15] mb-8 text-smoke max-w-4xl"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3.2rem)' }}
          >
            I build AI systems that reason together, repair themselves, and remember.
          </h1>

          <p className="text-smoke-dim text-lg max-w-2xl leading-relaxed mb-12" style={{ fontWeight: 300 }}>
            AI &amp; LLM research on multi-model consensus, self-developing agents, and agent
            memory — grounded in 38 years of shipping production software.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <Link
              to="/projects"
              className="font-mono text-[0.8rem] px-5 py-3 border border-emerald-400 text-emerald-400 hover:bg-emerald-400/10 transition-colors"
            >
              Research &amp; systems
            </Link>
            <a
              href="https://github.com/magnetoid"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.8rem] px-5 py-3 border border-white/20 text-smoke-dim hover:border-white/40 hover:text-smoke transition-colors"
            >
              GitHub ↗
            </a>
          </div>

          {/* Currently exploring */}
          <div className="border-l border-white/15 pl-5 max-w-xl">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-smoke-dim mb-3">
              Currently exploring
            </p>
            <ul className="flex flex-col gap-2">
              {CURRENTLY_EXPLORING.map(item => (
                <li key={item} className="text-smoke-dim text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── RESEARCH & PRACTICE ──────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12 bg-ink-2">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-mono text-[0.75rem] tracking-[0.2em] uppercase text-smoke-dim mb-12">
            Research &amp; practice
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPERTISE.map((item) => (
              <div key={item.title} className="p-6 border border-white/10 bg-ink-3/50">
                <div className="font-mono text-emerald-400 text-xl mb-4">{item.icon}</div>
                <h3 className="font-mono text-smoke text-sm leading-snug mb-3">{item.title}</h3>
                <p className="text-smoke-dim text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT POSTS ─────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-mono text-[0.75rem] tracking-[0.2em] uppercase text-smoke-dim">
              Writing
            </h2>
            <Link to="/blog" className="font-mono text-[0.75rem] text-emerald-400 hover:underline">
              All posts →
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="p-6 border border-white/10 bg-ink-2/50 hover:border-white/25 transition-colors"
              >
                {post.category && (
                  <span className="font-mono text-[0.7rem] text-emerald-400 mb-3 block">
                    {post.category}
                  </span>
                )}
                <h3 className="font-mono text-smoke text-base leading-snug mb-3">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-smoke-dim text-sm leading-relaxed line-clamp-3" style={{ fontWeight: 300 }}
                    dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                )}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
                  <span className="font-mono text-[0.7rem] text-smoke-dim">
                    {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                  </span>
                  {post.read_time_minutes && (
                    <span className="font-mono text-[0.7rem] text-smoke-dim">
                      {post.read_time_minutes} min read
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
