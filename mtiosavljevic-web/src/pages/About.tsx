import { Link } from 'react-router-dom'
import { useSiteTheme } from '@/siteTheme'

const PLATFORM_TIMELINE = [
  {
    year: '01',
    label: 'Audit the old mixed repository and identify what belongs in a CMS public frontend versus what belongs in admin or backend systems.',
  },
  {
    year: '02',
    label: 'Port the visual shell into a dedicated public surface and remove accidental coupling to admin dashboards and CRM-style features.',
  },
  {
    year: '03',
    label: 'Reconnect the blog to live CMS content so the theme stays functional instead of becoming a static visual clone.',
  },
  {
    year: '04',
    label: 'Keep the repo focused on CMS concerns with clearer boundaries for future rollout, plugins, and hosting.',
  },
] as const

export default function About() {
  const theme = useSiteTheme()
  const stats = [
    { num: 'CMS', label: 'Scope locked' },
    { num: 'Theme', label: 'Port completed' },
    { num: 'Blog', label: 'Live content ready' },
    { num: 'Repo', label: 'Old admin removed' },
  ]

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-20 pt-36 lg:px-12">
        <div className="mx-auto max-w-screen-xl">
          <span className="eyebrow-cyber">About</span>
          <h1 className="mt-6 font-display text-white" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}>
            A CMS-first adaptation of the imported public shell.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-smoke-dim">
            {theme.brand.name} {theme.brand.accent} keeps the original visual language and rebuilds it around the new CMS direction: public routes only, live content delivery, and no old mixed admin dashboard in the deployed entrypoint.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-12">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
          <div>
            <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-emerald-400 mb-6">
              &gt; cat platform-story.txt
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-smoke-dim">
              <p>
                The original repository mixed a strong public aesthetic with admin and CRM responsibilities. This version keeps the aesthetic and removes the structural confusion.
              </p>
              <p>
                The public site now centers on branded CMS pages, recent publishing, and a cleaner user experience instead of exposing legacy admin paths through the live app shell.
              </p>
              <p>
                That gives the repo a more professional deployment target and a safer base for future CMS growth.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-emerald-400 mb-4">
                By the numbers
              </p>
              <div className="space-y-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-baseline gap-3">
                    <span className="stat-num text-2xl">{stat.num}</span>
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-smoke-faint">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-emerald-400 mb-4">
                Quick links
              </p>
              <div className="flex flex-col gap-2">
                <Link to="/services" className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-smoke-faint transition-colors hover:text-emerald-300">
                  Platform capabilities →
                </Link>
                <Link to="/blog" className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-smoke-faint transition-colors hover:text-emerald-300">
                  Read latest content →
                </Link>
                <Link to="/contact" className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-smoke-faint transition-colors hover:text-emerald-300">
                  Start a rollout →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink-2 px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-10 flex items-center gap-3">
            <span className="eyebrow">Architecture timeline</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="max-w-3xl">
            {PLATFORM_TIMELINE.map((item, index) => (
              <div key={item.year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                  {index < PLATFORM_TIMELINE.length - 1 && <div className="my-1 w-px flex-1 bg-white/10" />}
                </div>
                <div className="pb-8">
                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-cyan-300">
                    {item.year}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-smoke-dim">
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
