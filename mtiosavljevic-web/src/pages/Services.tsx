import { useSiteTheme } from '@/siteTheme'

const DELIVERY_STEPS = [
  {
    step: '01',
    title: 'Audit',
    desc: 'Review the inherited app structure and separate public CMS concerns from old admin and CRM responsibilities.',
  },
  {
    step: '02',
    title: 'Adapt',
    desc: 'Port the imported design into a cleaner public surface and align the user experience with CMS publishing instead of mixed tooling.',
  },
  {
    step: '03',
    title: 'Wire',
    desc: 'Connect live content from Supabase so the repo remains functional and not just visually refreshed.',
  },
  {
    step: '04',
    title: 'Verify',
    desc: 'Build, typecheck, and review the public flow so the deployed app behaves like the new CMS direction.',
  },
] as const

export default function Services() {
  const theme = useSiteTheme()

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-20 pt-36 lg:px-12">
        <div className="mx-auto max-w-screen-xl">
          <span className="eyebrow-cyber">Platform</span>
          <h1 className="mt-6 font-display text-white" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}>
            The CMS capabilities this repo now exposes cleanly.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-smoke-dim">
            Theme work only matters if the result stays functional. These are the CMS-first surfaces this public repo now supports.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-12">
        <div className="mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {theme.home.capabilitiesItems.map((service) => (
              <div key={service.no} className="hud-card border border-white/10 bg-ink-2 p-8">
                <div className="mb-5 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-cyan-300">
                  {service.no}
                </div>
                <h2 className="font-display text-3xl text-white">
                  {service.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-smoke-dim">
                  {service.body}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    'Secure by default',
                    'CMS scoped',
                    'Theme aware',
                    'Open-source ready',
                  ].map((badge) => (
                    <span key={`${service.no}-${badge}`} className="badge-cyber">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-2 px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-10 flex items-center gap-3">
            <span className="eyebrow">Delivery workflow</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {DELIVERY_STEPS.map((step) => (
              <div key={step.step}>
                <div className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-emerald-400/60 mb-3">
                  {step.step}
                </div>
                <h3 className="font-display text-2xl text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-smoke-dim">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
