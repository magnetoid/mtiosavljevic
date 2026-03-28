import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { BlogPost } from '@/lib/supabase'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [prev, setPrev] = useState<BlogPost | null>(null)
  const [next, setNext] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single()
      .then(async ({ data }) => {
        if (data) {
          setPost(data)
          // Get prev/next
          const [prevRes, nextRes] = await Promise.all([
            supabase.from('blog_posts').select('id,title,slug,published_at').eq('published', true)
              .lt('published_at', data.published_at || data.created_at)
              .order('published_at', { ascending: false }).limit(1),
            supabase.from('blog_posts').select('id,title,slug,published_at').eq('published', true)
              .gt('published_at', data.published_at || data.created_at)
              .order('published_at', { ascending: true }).limit(1),
          ])
          if (prevRes.data?.[0]) setPrev(prevRes.data[0])
          if (nextRes.data?.[0]) setNext(nextRes.data[0])
        }
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="pt-40 pb-24 px-6 lg:px-12 max-w-screen-xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="font-mono text-[0.65rem] tracking-wider text-smoke-faint uppercase">Loading…</span>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="pt-40 pb-24 px-6 lg:px-12 max-w-screen-xl mx-auto">
        <p className="font-mono text-smoke-dim">Post not found.</p>
        <Link to="/blog" className="font-mono text-[0.65rem] tracking-widest uppercase text-emerald-400 hover:text-emerald-300 mt-4 inline-block">
          ← Back to blog
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* ── HEADER ───────────────────────────────────────────── */}
      <section className="pt-36 pb-12 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(16,185,129,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
        <div className="max-w-3xl mx-auto relative z-10">
          <Link to="/blog" className="font-mono text-[0.65rem] tracking-widest uppercase text-smoke-faint hover:text-emerald-400 transition-colors mb-8 inline-block">
            ← Blog
          </Link>
          {post.category && (
            <div className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-emerald-400 mb-4">
              {post.category}
            </div>
          )}
          <h1
            className="font-mono font-light text-smoke leading-snug mb-6"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
          >
            {post.title}
          </h1>
          <div className="flex items-center gap-6 font-mono text-[0.6rem] tracking-wider text-smoke-faint">
            {post.published_at && (
              <span>
                {new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            )}
            {post.read_time_minutes && <span>{post.read_time_minutes} min read</span>}
          </div>
        </div>
      </section>

      {/* ── CONTENT ──────────────────────────────────────────── */}
      <section className="pb-20 px-6 lg:px-12">
        <div
          className="max-w-3xl mx-auto prose prose-invert prose-lg prose-headings:font-mono prose-headings:font-light prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:text-emerald-300 prose-code:text-cyan-400 prose-code:bg-ink-3 prose-code:px-1 prose-code:rounded prose-pre:bg-ink-3 prose-pre:border prose-pre:border-white/10"
          dangerouslySetInnerHTML={{ __html: post.body || '' }}
        />
      </section>

      {/* ── NAV ──────────────────────────────────────────────── */}
      <section className="py-12 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between gap-6">
          {prev ? (
            <Link to={`/blog/${prev.slug}`} className="group flex flex-col gap-1">
              <span className="font-mono text-[0.6rem] tracking-widest uppercase text-smoke-faint">← Previous</span>
              <span className="font-mono text-sm text-smoke group-hover:text-emerald-400 transition-colors line-clamp-2">
                {prev.title}
              </span>
            </Link>
          ) : <div />}
          {next ? (
            <Link to={`/blog/${next.slug}`} className="group flex flex-col gap-1 sm:text-right">
              <span className="font-mono text-[0.6rem] tracking-widest uppercase text-smoke-faint">Next →</span>
              <span className="font-mono text-sm text-smoke group-hover:text-emerald-400 transition-colors line-clamp-2">
                {next.title}
              </span>
            </Link>
          ) : <div />}
        </div>
      </section>
    </>
  )
}
