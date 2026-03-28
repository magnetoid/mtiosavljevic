import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { BlogPost } from '@/lib/supabase'

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

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>(DEMO_POSTS)
  const [categories, setCategories] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .then(({ data }) => {
        if (data?.length) {
          setPosts(data)
          const cats = Array.from(new Set(data.map((p: BlogPost) => p.category).filter(Boolean))) as string[]
          setCategories(cats)
        }
        setLoading(false)
      })
  }, [])

  const filtered = activeCategory === 'all' ? posts : posts.filter(p => p.category === activeCategory)

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
            <span className="font-mono text-emerald-400 text-[0.65rem] tracking-[0.3em] uppercase">Writing</span>
            <div className="h-px w-12 bg-emerald-400/40" />
          </div>
          <h1
            className="font-mono font-light text-smoke mb-4 reveal reveal-delay-1"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Blog
          </h1>
          <p className="text-smoke-dim text-lg max-w-xl reveal reveal-delay-2" style={{ fontWeight: 300 }}>
            Thinking out loud on AI, technology, data, and the future. No fluff.
          </p>
        </div>
      </section>

      {/* ── FILTER ───────────────────────────────────────────── */}
      {categories.length > 0 && (
        <section className="px-6 lg:px-12 pb-8">
          <div className="max-w-screen-xl mx-auto flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`font-mono text-[0.6rem] tracking-widest uppercase px-4 py-2 border transition-colors ${
                activeCategory === 'all'
                  ? 'border-emerald-400 text-emerald-400 bg-emerald-400/5'
                  : 'border-white/10 text-smoke-faint hover:border-white/30 hover:text-smoke-dim'
              }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-[0.6rem] tracking-widest uppercase px-4 py-2 border transition-colors ${
                  activeCategory === cat
                    ? 'border-emerald-400 text-emerald-400 bg-emerald-400/5'
                    : 'border-white/10 text-smoke-faint hover:border-white/30 hover:text-smoke-dim'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ── POSTS ────────────────────────────────────────────── */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-screen-xl mx-auto">
          {loading ? (
            <div className="flex items-center gap-3 py-12">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="font-mono text-[0.65rem] tracking-wider text-smoke-faint uppercase">Loading posts…</span>
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-smoke-dim py-12">No posts found.</p>
          ) : (
            <div className="flex flex-col divide-y divide-white/5">
              {filtered.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group py-8 flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-12 hover:bg-ink-2/30 -mx-4 px-4 transition-colors"
                >
                  {/* Date */}
                  <div className="flex-shrink-0 lg:w-32">
                    <span className="font-mono text-[0.6rem] tracking-wider text-smoke-faint">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                        : new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {post.category && (
                      <span className="font-mono text-[0.6rem] tracking-widest uppercase text-emerald-400 mb-2 block">
                        {post.category}
                      </span>
                    )}
                    <h2 className="font-mono text-smoke text-lg leading-snug mb-2 group-hover:text-emerald-400 transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-smoke-dim text-sm leading-relaxed line-clamp-2" style={{ fontWeight: 300 }}
                        dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                    )}
                  </div>

                  {/* Meta */}
                  <div className="flex-shrink-0 flex flex-col items-end gap-1">
                    {post.read_time_minutes && (
                      <span className="font-mono text-[0.6rem] tracking-wider text-smoke-faint">
                        {post.read_time_minutes} min
                      </span>
                    )}
                    <span className="font-mono text-[0.6rem] tracking-wider text-emerald-400/50 group-hover:text-emerald-400 transition-colors">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
