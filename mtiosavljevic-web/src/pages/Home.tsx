import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { BlogPost } from '@/lib/supabase'

const EXPERTISE = [
  {
    icon: '◈',
    title: 'Artificial Intelligence',
    desc: 'Large language models, generative AI, model architecture, inference optimization, and applied AI at production scale.',
  },
  {
    icon: '◉',
    title: 'LLM Systems',
    desc: 'Prompt engineering, RAG pipelines, fine-tuning, evaluation frameworks, and agentic architectures.',
  },
  {
    icon: '▣',
    title: 'Data Systems',
    desc: 'Scalable data pipelines, real-time analytics, distributed databases, and data infrastructure design.',
  },
  {
    icon: '◬',
    title: 'Cybersecurity',
    desc: 'AI-driven threat detection, adversarial ML, security audits, and secure system architecture.',
  },
  {
    icon: '◫',
    title: 'Geopolitics & Tech',
    desc: 'Technology policy, digital sovereignty, AI governance, and the intersection of geopolitics with emerging technology.',
  },
  {
    icon: '▶',
    title: 'Applied Research',
    desc: 'Translating cutting-edge research into production systems. From paper to deployed product.',
  },
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
      <section className="pt-40 pb-28 px-6 lg:px-12 relative overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
        {/* Glow */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.06) 0%, transparent 70%)' }} />

        <div className="max-w-screen-xl mx-auto relative z-10">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8 reveal">
            <span className="font-mono text-emerald-400 text-[0.65rem] tracking-[0.3em] uppercase">
              AI Researcher &amp; Technologist
            </span>
            <div className="h-px w-12 bg-emerald-400/40" />
          </div>

          {/* Headline */}
          <h1
            className="font-mono font-light leading-[1.05] mb-8 reveal reveal-delay-1"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5rem)' }}
          >
            <span className="text-smoke">Marko</span>{' '}
            <span className="text-smoke">Tiosavljević</span>
            <br />
            <span className="text-emerald-400 text-[0.6em] tracking-widest font-mono text-[0.55em]">
              // technocrat · blogger · investor
            </span>
          </h1>

          <p
            className="text-smoke-dim text-xl max-w-2xl leading-relaxed mb-10 reveal reveal-delay-2"
            style={{ fontWeight: 300 }}
          >
            30+ years building at the edge of technology. Working at the intersection of AI, data systems,
            and applied research. Previously collaborated with{' '}
            <span className="text-smoke">Google</span>,{' '}
            <span className="text-smoke">Cloudflare</span>, and{' '}
            <span className="text-smoke">Amazon</span>.
          </p>

          <div className="flex flex-wrap gap-4 reveal reveal-delay-3">
            <Link
              to="/blog"
              className="font-mono text-[0.7rem] tracking-widest uppercase px-6 py-3 bg-emerald-400 text-ink hover:bg-emerald-300 transition-colors"
            >
              Read the blog →
            </Link>
            <Link
              to="/about"
              className="font-mono text-[0.7rem] tracking-widest uppercase px-6 py-3 border border-white/20 text-smoke-dim hover:border-white/40 hover:text-smoke transition-colors"
            >
              About me
            </Link>
          </div>
        </div>
      </section>

      {/* ── EXPERTISE ────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12 bg-ink-2">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-3 mb-12 reveal">
            <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-smoke-faint">
              Areas of expertise
            </span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPERTISE.map((item) => (
              <div
                key={item.title}
                className="group p-6 border border-white/5 hover:border-emerald-400/30 bg-ink-3/50 hover:bg-ink-3 transition-all duration-300 reveal"
              >
                <div className="font-mono text-emerald-400 text-xl mb-4 group-hover:text-cyan-400 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-mono text-smoke text-sm tracking-wide mb-2">{item.title}</h3>
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
          <div className="flex items-center justify-between mb-12 reveal">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-smoke-faint">
                Latest writing
              </span>
              <div className="h-px w-12 bg-white/5" />
            </div>
            <Link to="/blog" className="font-mono text-[0.65rem] tracking-widest uppercase text-emerald-400 hover:text-emerald-300 transition-colors">
              All posts →
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group p-6 border border-white/5 hover:border-emerald-400/30 bg-ink-2/50 hover:bg-ink-2 transition-all duration-300 reveal"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {post.category && (
                  <span className="font-mono text-[0.6rem] tracking-widest uppercase text-emerald-400 mb-3 block">
                    {post.category}
                  </span>
                )}
                <h3 className="font-mono text-smoke text-base leading-snug mb-3 group-hover:text-emerald-400 transition-colors">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-smoke-dim text-sm leading-relaxed line-clamp-3" style={{ fontWeight: 300 }}
                    dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                )}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5">
                  <span className="font-mono text-[0.6rem] tracking-wider text-smoke-faint">
                    {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                  </span>
                  {post.read_time_minutes && (
                    <span className="font-mono text-[0.6rem] tracking-wider text-smoke-faint">
                      {post.read_time_minutes} min read
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT CTA ────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-12 bg-ink-2">
        <div className="max-w-screen-xl mx-auto">
          <div className="border border-emerald-400/20 p-10 lg:p-16 relative overflow-hidden reveal">
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
              style={{ background: 'radial-gradient(circle at top right, rgba(16,185,129,0.08) 0%, transparent 60%)' }} />
            <div className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-emerald-400 mb-4">
              &gt; marko_t --whoami
            </div>
            <h2 className="font-mono text-smoke text-3xl lg:text-4xl font-light mb-6" style={{ lineHeight: 1.2 }}>
              Three decades of building<br />
              <span className="text-emerald-400">at the frontier.</span>
            </h2>
            <p className="text-smoke-dim text-lg max-w-2xl leading-relaxed mb-8" style={{ fontWeight: 300 }}>
              From early internet infrastructure to modern AI systems. I write about what I build,
              what I learn, and where technology is headed.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/about"
                className="font-mono text-[0.7rem] tracking-widest uppercase px-6 py-3 bg-emerald-400 text-ink hover:bg-emerald-300 transition-colors"
              >
                Read my story →
              </Link>
              <Link
                to="/services"
                className="font-mono text-[0.7rem] tracking-widest uppercase px-6 py-3 border border-white/20 text-smoke-dim hover:border-white/40 hover:text-smoke transition-colors"
              >
                Work with me
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
