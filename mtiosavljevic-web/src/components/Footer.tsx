import { Link } from 'react-router-dom'

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

const SOCIAL = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/mtiosavljevic' },
  { label: 'Twitter/X', href: 'https://twitter.com/mtiosavljevic' },
  { label: 'GitHub', href: 'https://github.com/magnetoid' },
]

export default function Footer() {
  return (
    <footer className="bg-ink-3 border-t border-white/5">
      <div className="px-6 lg:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-screen-xl mx-auto">
        {/* Brand */}
        <div>
          <div className="font-mono text-smoke text-base mb-3">
            MT<span className="text-emerald-400">.</span>
          </div>
          <p className="text-sm text-smoke-dim leading-relaxed max-w-xs mb-4">
            AI researcher & technologist. Writing about AI, LLMs, data systems, and the future of technology.
          </p>
          <div className="flex flex-col gap-1">
            {SOCIAL.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.65rem] tracking-wider text-smoke-faint hover:text-emerald-400 transition-colors uppercase"
              >
                {label} →
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p className="font-mono text-[0.6rem] tracking-[0.18em] uppercase text-emerald-400 mb-4">Navigation</p>
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

        {/* Contact */}
        <div>
          <p className="font-mono text-[0.6rem] tracking-[0.18em] uppercase text-emerald-400 mb-4">Contact</p>
          <div className="flex flex-col gap-2 text-sm text-smoke-dim">
            <a href="mailto:marko.tiosavljevic@gmail.com" className="hover:text-emerald-400 transition-colors">
              marko.tiosavljevic@gmail.com
            </a>
            <p className="text-smoke-faint text-xs mt-2">
              Available for consulting, speaking,<br />
              and technical writing engagements.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5 px-6 lg:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3 max-w-screen-xl mx-auto">
        <p className="font-mono text-[0.6rem] tracking-[0.1em] text-smoke-faint/50">
          © {new Date().getFullYear()} Marko Tiosavljević. All rights reserved.
        </p>
        <Link to="/admin" className="font-mono text-[0.6rem] text-smoke-faint/30 hover:text-smoke-dim transition-colors">
          Admin
        </Link>
      </div>
    </footer>
  )
}
