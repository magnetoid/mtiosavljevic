import { Link } from 'react-router-dom'

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

const PROFILES = [
  { label: 'GitHub', href: 'https://github.com/magnetoid' },
  // TODO: confirm the personal Upwork profile URL. The only Upwork link found in this
  // repo is the Imba Production *company* page, not a personal profile.
  { label: 'Upwork', href: 'https://www.upwork.com/' },
]

export default function Footer() {
  return (
    <footer className="bg-ink-3 border-t border-white/10">
      <div className="px-6 lg:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-screen-xl mx-auto">
        {/* Brand */}
        <div>
          <p className="font-mono text-smoke text-sm mb-3">Marko Tiosavljević</p>
          <p className="text-sm text-smoke-dim leading-relaxed max-w-xs mb-4" style={{ fontWeight: 300 }}>
            AI &amp; LLM research on multi-model consensus, self-developing agents, and agent
            memory. Founder of Imba Production LLC.
          </p>
          <div className="flex flex-col gap-2">
            {PROFILES.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.75rem] text-smoke-dim hover:text-signal transition-colors"
              >
                {label} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p className="font-mono text-[0.75rem] tracking-[0.18em] uppercase text-smoke-dim mb-4">Navigation</p>
          <ul className="flex flex-col gap-2">
            {LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="text-sm text-smoke-dim hover:text-smoke transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact — the single work-with-me CTA lives here */}
        <div>
          <p className="font-mono text-[0.75rem] tracking-[0.18em] uppercase text-smoke-dim mb-4">Contact</p>
          <div className="flex flex-col gap-3 text-sm text-smoke-dim">
            <a href="mailto:marko.tiosavljevic@gmail.com" className="hover:text-signal transition-colors">
              marko.tiosavljevic@gmail.com
            </a>
            <Link
              to="/contact"
              className="self-start font-mono text-[0.75rem] px-4 py-2 border border-signal text-signal hover:bg-signal/10 transition-colors"
            >
              Work with me
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 px-6 lg:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3 max-w-screen-xl mx-auto">
        <p className="font-mono text-[0.7rem] text-smoke-dim">
          © {new Date().getFullYear()} Marko Tiosavljević
        </p>
        <Link to="/admin" className="font-mono text-[0.7rem] text-smoke-dim hover:text-smoke transition-colors">
          Admin
        </Link>
      </div>
    </footer>
  )
}
