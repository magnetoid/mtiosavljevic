import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { BlogPost } from '@/lib/supabase'
import { getSsrData } from '@/lib/ssr-data'

const catOf = (p: BlogPost) => p.blog_categories?.name || p.category
const uniqueCats = (rows: BlogPost[]) => Array.from(new Set(rows.map(catOf).filter(Boolean))) as string[]

export default function Blog() {
  // Seeded from the prerendered payload so the archive is in the static HTML.
  const seeded = getSsrData().posts ?? []
  const [posts, setPosts] = useState<BlogPost[]>(seeded)
  const [categories, setCategories] = useState<string[]>(uniqueCats(seeded))
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [loading, setLoading] = useState(seeded.length === 0)

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('*, blog_categories(name, slug)')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .then(({ data }) => {
        if (data?.length) {
          setPosts(data as BlogPost[])
          const cats = uniqueCats(data as BlogPost[])
          setCategories(cats)
        }
        setLoading(false)
      })
  }, [])

  const filtered = activeCategory === 'all' ? posts : posts.filter(p => catOf(p) === activeCategory)

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-36 pb-16 px-6 lg:px-12 relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-signal text-[0.65rem] tracking-[0.3em] uppercase">Writing</span>
            <div className="h-px w-12 bg-signal/40" />
          </div>
          <h1
            className="font-mono font-light text-smoke mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Blog
          </h1>
          <p className="text-smoke-dim text-lg max-w-xl" style={{ fontWeight: 300 }}>
            Notes on multi-model consensus, self-developing agents, and agent memory — plus what breaks when they meet production.
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
                  ? 'border-signal text-signal bg-signal/5'
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
                    ? 'border-signal text-signal bg-signal/5'
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
              <div className="w-2 h-2 bg-signal rounded-full animate-pulse" />
              <span className="font-mono text-[0.65rem] tracking-wider text-smoke-faint uppercase">Loading posts…</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 max-w-xl">
              <p className="text-smoke-dim mb-3">Nothing published yet.</p>
              <p className="text-smoke-dim">
                Write-ups are planned on the consensus work, safe self-modification, and
                durable agent memory. In the meantime the systems themselves are described
                on the <Link to="/" className="text-signal underline underline-offset-4 decoration-signal/40 hover:decoration-signal">front page</Link>.
              </p>
            </div>
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
                    {catOf(post) ? (
                      <span className="font-mono text-[0.6rem] tracking-widest uppercase text-signal mb-2 block">
                        {catOf(post)}
                      </span>
                    ) : null}
                    <h2 className="font-mono text-smoke text-lg leading-snug mb-2 group-hover:text-signal transition-colors">
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
                    <span className="font-mono text-[0.6rem] tracking-wider text-signal/50 group-hover:text-signal transition-colors">
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
