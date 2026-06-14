import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { BlogPost } from '@/lib/supabase'
import { stripHtml } from '@/lib/sanitizeHtml'
import { ActionLink, useSiteTheme } from '@/siteTheme'

type PostFeedState =
  | { status: 'loading' }
  | { status: 'ready'; posts: BlogPost[] }
  | { status: 'error' }

function formatDate(input: string | undefined): string {
  if (!input) return 'Draft'
  return new Date(input).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function RecentPosts() {
  const theme = useSiteTheme()
  const [state, setState] = useState<PostFeedState>({ status: 'loading' })

  useEffect(() => {
    let active = true

    supabase
      .from('blog_posts')
      .select('*, blog_categories(name, slug)')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(3)
      .then(({ data, error }) => {
        if (!active) return
        if (error) {
          setState({ status: 'error' })
          return
        }

        setState({
          status: 'ready',
          posts: (data as BlogPost[] | null) ?? [],
        })
      })

    return () => {
      active = false
    }
  }, [])

  const posts = state.status === 'ready' ? state.posts : []

  return (
    <section className="px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-12 flex items-center justify-between gap-6">
          <span className="eyebrow-cyber">{theme.home.selectedWorkEyebrow}</span>
          {theme.home.selectedWorkAction && (
            <ActionLink
              href={theme.home.selectedWorkAction.href}
              to={theme.home.selectedWorkAction.to}
              className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-emerald-300 transition-colors hover:text-cyan-300"
            >
              {theme.home.selectedWorkAction.label} →
            </ActionLink>
          )}
        </div>

        {state.status === 'loading' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="hud-card border border-white/10 bg-ink-2 p-6 animate-pulse">
                <div className="mb-4 h-40 bg-white/5" />
                <div className="mb-3 h-3 w-20 bg-white/10" />
                <div className="mb-2 h-6 w-3/4 bg-white/10" />
                <div className="h-4 w-full bg-white/5" />
              </div>
            ))}
          </div>
        )}

        {state.status === 'error' && (
          <div className="hud-card border border-white/10 bg-ink-2 p-8">
            <p className="font-display text-2xl text-white mb-3">
              Published content is not available yet.
            </p>
            <p className="max-w-2xl text-smoke-dim">
              The public theme is live, but the recent-posts preview needs published CMS content to appear.
            </p>
          </div>
        )}

        {state.status === 'ready' && posts.length === 0 && (
          <div className="hud-card border border-white/10 bg-ink-2 p-8">
            <p className="font-display text-2xl text-white mb-3">
              No published posts yet.
            </p>
            <p className="max-w-2xl text-smoke-dim">
              Create and publish content in the CMS, then this section fills automatically.
            </p>
          </div>
        )}

        {posts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="hud-card holo-shimmer group border border-white/10 bg-ink-2 p-6 transition-colors hover:border-emerald-400/30"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="badge-cyber">
                    {post.blog_categories?.name ?? post.category ?? 'Article'}
                  </span>
                  <span className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-smoke-faint opacity-60">
                    {formatDate(post.published_at ?? post.created_at)}
                  </span>
                </div>
                <h3 className="font-display text-2xl leading-tight text-white transition-colors group-hover:text-emerald-300">
                  {post.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-smoke-dim">
                  {stripHtml(post.excerpt, 'Structured content, workflow metadata, and delivery-ready copy live here.')}
                </p>
                <div className="mt-6 flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-cyan-300">
                  <span>Read article</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default function Home() {
  const theme = useSiteTheme()

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-24 pt-40 lg:px-12 lg:pb-32">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 20% 10%, rgba(0,212,255,0.12) 0%, transparent 35%), radial-gradient(circle at 85% 15%, rgba(232,69,42,0.12) 0%, transparent 30%)',
          }}
        />
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-8 flex items-center gap-3 reveal">
            <span className="eyebrow-cyber">{theme.home.hero.eyebrow}</span>
            <div className="angular-divider hidden flex-1 md:block" />
          </div>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
            <div className="reveal reveal-delay-1">
              <h1 className="font-display text-white leading-[1.02]" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
                {theme.home.hero.title}
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-smoke-dim">
                {theme.home.hero.lead}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                {theme.home.hero.primaryAction && (
                  <ActionLink
                    href={theme.home.hero.primaryAction.href}
                    to={theme.home.hero.primaryAction.to}
                    className="btn btn-primary"
                  >
                    {theme.home.hero.primaryAction.label}
                  </ActionLink>
                )}
                {theme.home.hero.secondaryAction && (
                  <ActionLink
                    href={theme.home.hero.secondaryAction.href}
                    to={theme.home.hero.secondaryAction.to}
                    className="btn btn-outline"
                  >
                    {theme.home.hero.secondaryAction.label}
                  </ActionLink>
                )}
              </div>
            </div>

            <div className="hud-card holo-shimmer border border-cyan-400/20 bg-ink-2 p-8 lg:p-10 reveal reveal-delay-2">
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="badge-cyber">Public Runtime</span>
                <span className="data-readout">cms.public.ready</span>
              </div>
              <p className="font-display text-3xl text-white leading-tight">
                {theme.home.selectedWorkTitle}
              </p>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {theme.home.hero.capabilities.map((capability) => (
                  <div key={capability} className="border border-white/10 bg-white/[0.02] px-4 py-4">
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-cyan-300">
                      {capability}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink-2 px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-12 reveal">
            <span className="eyebrow">{theme.home.capabilitiesEyebrow}</span>
            <h2 className="mt-6 max-w-3xl font-display text-4xl text-white lg:text-5xl">
              {theme.home.capabilitiesTitle}
            </h2>
          </div>
          <div className="services-grid">
            {theme.home.capabilitiesItems.map((item) => (
              <div key={item.no} className="bg-ink px-6 py-8 lg:px-8 reveal">
                <div className="mb-4 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-cyan-300">
                  {item.no}
                </div>
                <h3 className="font-display text-2xl text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-smoke-dim">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RecentPosts />

      <section className="bg-ink-2 px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-screen-xl">
          <div className="hud-card border border-emerald-400/20 bg-emerald-400/[0.04] p-10 lg:p-14 reveal">
            <span className="eyebrow">{theme.home.statementEyebrow}</span>
            <p className="mt-8 max-w-4xl font-display text-3xl leading-tight text-white lg:text-5xl">
              {theme.home.statementText}{' '}
              <span className="text-smoke-dim">
                {theme.home.statementAccentText}
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-ink px-6 py-20 lg:px-12">
        <div className="mx-auto flex max-w-screen-xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="reveal">
            <p className="eyebrow-cyber mb-4">{theme.home.ctaEyebrow}</p>
            <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)' }}>
              {theme.home.ctaTitle}
            </h2>
          </div>
          {theme.home.ctaAction && (
            <ActionLink
              href={theme.home.ctaAction.href}
              to={theme.home.ctaAction.to}
              className="btn btn-primary reveal"
            >
              {theme.home.ctaAction.label}
            </ActionLink>
          )}
        </div>
      </section>
    </>
  )
}
