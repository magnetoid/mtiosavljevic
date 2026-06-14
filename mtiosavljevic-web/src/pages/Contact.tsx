import { Link } from 'react-router-dom'
import { useSiteTheme } from '@/siteTheme'

export default function Contact() {
  const theme = useSiteTheme()

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-16 pt-36 lg:px-12">
        <div className="mx-auto max-w-screen-xl">
          <span className="eyebrow-cyber">Contact</span>
          <h1 className="mt-6 font-display text-white" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}>
            Start a CMS rollout without reintroducing CRM coupling.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-smoke-dim">
            The old app embedded a public-side submission flow. This version keeps the UX intent but removes the CRM-style write path from the public theme so the repo stays focused on CMS concerns.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-12">
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
          <div className="hud-card border border-white/10 bg-ink-2 p-8 lg:p-10">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-emerald-400 mb-5">
              Recommended next step
            </p>
            <h2 className="font-display text-3xl text-white">
              Use the CMS admin for content and a dedicated backend for enquiries.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-smoke-dim">
              If you want a contact workflow later, it should be implemented intentionally through backend logic or a CMS feature, not as ad hoc public CRM logic in the theme.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={`mailto:${theme.footer.contactEmail}`} className="btn btn-primary">
                Email {theme.footer.contactEmail}
              </a>
              <Link to="/services" className="btn btn-outline">
                Review capabilities
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <div className="hud-card border border-cyan-400/20 bg-cyan-400/[0.04] p-6">
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-cyan-300 mb-3">
                What this repo now does
              </p>
              <ul className="space-y-3 text-sm leading-relaxed text-smoke-dim">
                <li>Runs as a dedicated public CMS frontend.</li>
                <li>Uses a consistent theme system and CMS-aligned navigation.</li>
                <li>Shows live blog content through the public runtime.</li>
                <li>Keeps public pages focused on CMS concerns only.</li>
              </ul>
            </div>

            <div className="hud-card border border-white/10 bg-ink-2 p-6">
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-emerald-400 mb-3">
                Public runtime notes
              </p>
              <p className="text-sm leading-relaxed text-smoke-dim">
                The site theme can now evolve independently from admin features, and future lead or enquiry flows can be added properly through backend integrations instead of public-side inserts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
