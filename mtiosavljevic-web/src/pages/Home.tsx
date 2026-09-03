import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '@/components/Seo'
import { RESEARCH_AREAS } from '@/data/research'
import { SYSTEMS } from '@/data/systems'
import SystemSketch from '@/components/SystemSketch'
import { PERSON_SCHEMA } from '@/data/person-schema'
import { supabase } from '@/lib/supabase'
import type { BlogPost } from '@/lib/supabase'
import { getSsrData } from '@/lib/ssr-data'

/**
 * The homepage list is scoped to the AI category so the front page of a research
 * profile does not lead with the video-production and politics posts that also
 * live in the archive. The full archive is at /blog.
 *
 * NOTE: "Inteligence" is misspelt in the database, not here. Fix it there and this
 * constant has to change with it — or better, recategorise and widen this list.
 */
const AI_CATEGORY = 'Artificial Inteligence'

const CURRENTLY_EXPLORING = [
  'Consensus protocols across heterogeneous models',
  'Tenso — an experimental language for neural-network development',
]

const CREDENTIALS = [
  {
    label: 'Imba Production LLC',
    body: 'Founded 2005, Wyoming-registered. Custom omnichannel CRM and marketing applications, and autonomous agents running lead generation and affiliate systems.',
  },
  {
    label: 'Upwork',
    body: 'Top Rated Plus with a 100% Job Success Score since 2011, across 130+ clients.',
  },
  {
    label: 'Commerce stack',
    body: 'Anthropic/Claude API, Next.js, WooCommerce, Shopify, full-stack e-commerce.',
  },
  {
    label: 'Marketing',
    body: 'Offline through digital — social, SEM, SEO, now AEO. Certified analyst on Google Marketing Platform and Meta. Mostly e-commerce and SaaS.',
  },
  {
    label: 'Cloud Industry LLC',
    body: 'Co-founded 2014, Delaware.',
  },
]

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>(
    () => (getSsrData().posts ?? []).filter(p => p.category === AI_CATEGORY).slice(0, 5)
  )

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('id,title,slug,published_at')
      .eq('published', true)
      .eq('category', AI_CATEGORY)
      .order('published_at', { ascending: false })
      .limit(5)
      .then(({ data }) => { if (data?.length) setPosts(data as BlogPost[]) })
  }, [])

  return (
    <>
      <Seo canonicalPath="/" structuredData={PERSON_SCHEMA} />

      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <section className="pt-40 pb-28 px-6 lg:px-12">
        <div className="max-w-screen-xl mx-auto">
          <p
            className="font-mono font-light text-smoke mb-4"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5rem)', lineHeight: 1.05 }}
          >
            Marko Tiosavljević
          </p>
          <p
            className="font-mono mb-12"
            style={{ fontSize: 'clamp(1rem, 1.7vw, 1.4rem)', lineHeight: 1.5 }}
          >
            <span className="text-signal">AI &amp; LLM scientist</span>
            <span className="text-smoke-dim"> · developer · marketer · tech consultant</span>
          </p>

          <h1
            className="font-mono font-light leading-[1.25] mb-8 text-smoke max-w-3xl"
            style={{ fontSize: 'clamp(1.35rem, 2.4vw, 1.95rem)' }}
          >
            I build AI systems that reason together, repair themselves, and remember.
          </h1>

          <p className="text-smoke-dim text-lg max-w-2xl leading-relaxed mb-12">
            AI &amp; LLM research on multi-model consensus, self-developing agents, and agent
            memory — grounded in 38 years of shipping production software.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <a
              href="#systems"
              className="font-mono text-[0.85rem] px-5 py-3 border border-signal text-signal hover:bg-signal/10 transition-colors"
            >
              Research &amp; systems
            </a>
            <a
              href="https://github.com/magnetoid"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.85rem] px-5 py-3 border border-white/25 text-smoke-dim hover:border-white/50 hover:text-smoke transition-colors"
            >
              GitHub ↗
            </a>
          </div>

          <div className="border-l border-white/20 pl-5 max-w-xl">
            <p className="font-mono text-[0.78rem] text-smoke-faint mb-3">
              Currently exploring
            </p>
            <ul className="flex flex-col gap-2">
              {CURRENTLY_EXPLORING.map(item => (
                <li key={item} className="text-smoke-dim text-sm leading-relaxed" style={{ fontSize: '0.95rem' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 2. RESEARCH AREAS ────────────────────────────────── */}
      <section id="research" className="py-24 px-6 lg:px-12 bg-ink-2 border-t border-white/10">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-mono text-smoke text-xl mb-8">Research areas</h2>

          <div className="max-w-3xl flex flex-col gap-5 text-smoke-dim leading-relaxed mb-16">
            <p>
              Three questions organise the work: how heterogeneous models can be made to agree
              reliably; how far an agent can safely modify itself; and what durable memory and
              guardrails look like once a context window is no longer enough.
            </p>
            <p>
              Six years of that research sit on top of 38 years writing software and 30 years in
              marketing — which is mostly useful for knowing which parts of a system break first
              once real users arrive.
            </p>
            <p>
              I run <span className="text-smoke">Imba Production LLC</span>, operating since 2005,
              where the same work pays rent as custom CRM and marketing systems and autonomous
              agents for clients.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-12">
            {RESEARCH_AREAS.map(area => (
              <div key={area.id} className="flex flex-col border-t border-smoke-faint/40 pt-5">
                <h3 className="font-mono text-smoke text-sm leading-snug mb-4">{area.title}</h3>
                <p className="text-smoke-dim leading-relaxed mb-5 flex-1" style={{ fontSize: '0.95rem' }}>
                  {area.thesis}
                </p>
                <a
                  href={area.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[0.78rem] text-signal underline underline-offset-4 decoration-signal/40 hover:decoration-signal break-all py-1"
                >
                  {area.repoLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. SYSTEMS & EXPERIMENTS ─────────────────────────── */}
      <section id="systems" className="py-24 px-6 lg:px-12 border-t border-white/10">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-mono text-smoke text-xl mb-4">Systems &amp; experiments</h2>
          <p className="text-smoke-dim text-sm mb-16 max-w-2xl">
            Problem, approach, and current status for each. Longer write-ups live in{' '}
            <Link to="/projects" className="text-signal underline underline-offset-4 decoration-signal/40 hover:decoration-signal">case studies</Link>.
          </p>

          <ul className="flex flex-col">
            {SYSTEMS.map(sys => (
              <li
                key={sys.id}
                className="grid lg:grid-cols-12 gap-x-10 gap-y-6 py-10 border-t border-smoke-faint/40 last:border-b last:border-smoke-faint/40"
              >
                <div className="lg:col-span-3">
                  <h3 className="font-mono text-smoke text-lg mb-1">{sys.name}</h3>
                  <p className="font-mono text-[0.78rem] text-smoke-dim leading-snug">{sys.kind}</p>
                </div>

                <div className="lg:col-span-6 flex flex-col gap-4">
                  <Field label="Problem" value={sys.problem} />
                  <Field label="Approach" value={sys.approach} />
                  <Field label="Status" value={sys.status} />

                  {sys.repoUrl && (
                    <a
                      href={sys.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[0.8rem] text-signal underline underline-offset-4 decoration-signal/40 hover:decoration-signal break-all py-1 self-start"
                    >
                      {sys.repoLabel}
                    </a>
                  )}
                </div>

                <div className="lg:col-span-3">
                  <SystemSketch id={sys.id} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 4. WRITING / NOTES ───────────────────────────────── */}
      <section id="writing" className="py-24 px-6 lg:px-12 bg-ink-2 border-t border-white/10">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-mono text-smoke text-xl mb-4">Writing / notes</h2>
          <p className="text-smoke-dim text-sm mb-12 max-w-2xl">
            Notes on models, agents, and the systems around them. The wider archive also
            covers security, policy, and earlier commercial work.
          </p>

          {posts.length > 0 ? (
            <ul className="flex flex-col divide-y divide-smoke-faint/40 border-y border-smoke-faint/40">
              {posts.map(post => (
                <li key={post.id}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="py-5 flex flex-wrap items-baseline gap-x-6 gap-y-1 group"
                  >
                    <span className="font-mono text-[0.78rem] text-smoke-faint w-24 shrink-0">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
                        : ''}
                    </span>
                    <span className="text-smoke-dim group-hover:text-smoke transition-colors flex-1">
                      {post.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-smoke-dim max-w-2xl">
              Posts are served from the CMS — open the archive to read them.
            </p>
          )}

          <Link to="/blog" className="inline-block mt-8 font-mono text-[0.8rem] text-signal underline underline-offset-4 decoration-signal/40 hover:decoration-signal py-1">
            All writing
          </Link>
        </div>
      </section>

      {/* ── 5. APPLIED WORK & CREDENTIALS ────────────────────── */}
      <section id="applied" className="py-24 px-6 lg:px-12 border-t border-white/10">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-mono text-smoke text-xl mb-12">Applied work &amp; credentials</h2>

          <dl className="max-w-4xl grid grid-cols-1 md:grid-cols-[10rem_1fr] gap-x-8 gap-y-5">
            {CREDENTIALS.map(c => (
              <div key={c.label} className="contents">
                <dt className="font-mono text-[0.8rem] text-smoke pt-0.5">{c.label}</dt>
                <dd className="text-smoke-dim text-sm leading-relaxed mb-4 md:mb-0">
                  {c.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 6. CONTACT ───────────────────────────────────────── */}
      <section id="contact" className="py-24 px-6 lg:px-12 bg-ink-2 border-t border-white/10">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-mono text-smoke text-xl mb-8">Contact</h2>
          <ul className="flex flex-col gap-3 font-mono text-[0.9rem]">
            <li>
              <a href="mailto:marko.tiosavljevic@gmail.com" className="text-signal underline underline-offset-4 decoration-signal/40 hover:decoration-signal">
                marko.tiosavljevic@gmail.com
              </a>
            </li>
            <li>
              <a href="https://github.com/magnetoid" target="_blank" rel="noopener noreferrer"
                className="text-signal underline underline-offset-4 decoration-signal/40 hover:decoration-signal">
                github.com/magnetoid ↗
              </a>
            </li>
            {/* TODO: add the Upwork profile link here once the URL is known. Listing it
                without a working href, or pointing it at upwork.com, is worse than omitting it. */}
          </ul>
        </div>
      </section>
    </>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid sm:grid-cols-[6rem_1fr] gap-x-4 gap-y-1">
      <span className="font-mono text-[0.78rem] text-smoke-faint pt-1">{label}</span>
      <p className="text-smoke-dim leading-relaxed" style={{ fontSize: '0.95rem' }}>{value}</p>
    </div>
  )
}
