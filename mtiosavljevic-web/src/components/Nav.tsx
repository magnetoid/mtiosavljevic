import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

const LINKS = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 nav-blur border-b transition-all duration-500 ${
          scrolled ? 'py-3 border-white/5' : 'py-5 border-transparent'
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="font-mono text-emerald-400 text-xs tracking-wider opacity-60 group-hover:opacity-100 transition-all duration-300 select-none">
              &gt;_
            </div>
            <span className="font-mono text-smoke font-light tracking-wider" style={{ fontSize: '1.1rem' }}>
              MT<span className="text-emerald-400 group-hover:text-cyan-400 transition-colors duration-300">.</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-10">
            {LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `font-mono text-[0.65rem] tracking-[0.18em] uppercase transition-colors ${
                    isActive ? 'text-emerald-400' : 'text-smoke-dim hover:text-smoke'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="font-mono text-[0.6rem] text-smoke-faint tracking-widest opacity-40 select-none">
              <TimecodeDisplay />
            </div>
            <Link
              to="/contact"
              className="font-mono text-[0.65rem] tracking-widest uppercase px-4 py-2 border border-emerald-400/40 text-emerald-400 hover:bg-emerald-400/10 hover:border-emerald-400 transition-all duration-200"
            >
              Get in touch
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="lg:hidden flex flex-col gap-[6px] p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span className={`block h-px w-6 bg-smoke transition-all ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block h-px w-6 bg-smoke transition-all ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-6 bg-smoke transition-all ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 nav-blur flex flex-col justify-center px-8 transition-all duration-500 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-8">
          {LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="font-mono font-light text-4xl text-smoke hover:text-emerald-400 transition-colors"
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="self-start mt-4 font-mono text-[0.65rem] tracking-widest uppercase px-4 py-2 border border-emerald-400/40 text-emerald-400 hover:bg-emerald-400/10 transition-all"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </>
  )
}

function TimecodeDisplay() {
  const [time, setTime] = useState(formatTimecode())
  useEffect(() => {
    const t = setInterval(() => setTime(formatTimecode()), 1000)
    return () => clearInterval(t)
  }, [])
  return <>{time}</>
}

function formatTimecode() {
  const n = new Date()
  const pad = (x: number) => String(x).padStart(2, '0')
  return `${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}`
}
