import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { ActionLink, useSiteTheme } from '@/siteTheme'

export default function Nav() {
  const theme = useSiteTheme()
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
          <Link to={theme.brand.homePath} className="flex items-center gap-3 group">
            <div className="font-mono text-cyan-300 text-xs tracking-wider opacity-70 group-hover:opacity-100 transition-all duration-300 select-none">
              &gt;_
            </div>
            <span className="font-display text-smoke font-light tracking-wider" style={{ fontSize: '1.1rem' }}>
              {theme.brand.name}
              <span className="text-emerald-400 group-hover:text-cyan-400 transition-colors duration-300">.</span>
            </span>
            <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/45 sm:inline">
              {theme.brand.accent}
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-10">
            {theme.navLinks.map(({ to, label }) => (
              <NavLink
                key={`${to ?? label}-${label}`}
                to={to ?? '/'}
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
            {theme.navCta && (
              <ActionLink
                href={theme.navCta.href}
                to={theme.navCta.to}
                className="font-mono text-[0.65rem] tracking-widest uppercase px-4 py-2 border border-emerald-400/40 text-emerald-300 hover:bg-emerald-400/10 hover:border-emerald-300 transition-all duration-200"
              >
                {theme.navCta.label}
              </ActionLink>
            )}
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
          {theme.navLinks.map(({ to, label }) => (
            <NavLink
              key={`${to ?? label}-${label}`}
              to={to ?? '/'}
              onClick={() => setOpen(false)}
              className="font-display font-light text-4xl text-smoke hover:text-emerald-400 transition-colors"
            >
              {label}
            </NavLink>
          ))}
          {theme.navCta && (
            <ActionLink
              href={theme.navCta.href}
              to={theme.navCta.to}
              onClick={() => setOpen(false)}
              className="self-start mt-4 font-mono text-[0.65rem] tracking-widest uppercase px-4 py-2 border border-emerald-400/40 text-emerald-300 hover:bg-emerald-400/10 transition-all"
            >
              {theme.navCta.label}
            </ActionLink>
          )}
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
