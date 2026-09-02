import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

const LINKS = [
  { to: '/#research', label: 'Research' },
  { to: '/#systems', label: 'Systems' },
  { to: '/projects', label: 'Case studies' },
  { to: '/blog', label: 'Writing' },
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
            
            <span className="font-mono text-smoke font-light tracking-wider" style={{ fontSize: '1.05rem' }}>
              MT<span className="text-signal">.</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-10">
            {LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `font-mono text-[0.8rem] tracking-[0.1em] py-2 transition-colors ${
                    isActive && !to.includes('#') ? 'text-signal' : 'text-smoke-dim hover:text-smoke'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
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
              className="font-mono font-light text-3xl text-smoke hover:text-signal transition-colors py-1"
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  )
}


