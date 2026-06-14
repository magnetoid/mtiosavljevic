import { ActionLink, useSiteTheme } from '@/siteTheme'

export default function Footer() {
  const theme = useSiteTheme()

  return (
    <footer className="bg-ink-2 border-t border-white/5">
      <div className="px-6 lg:px-12 py-14 grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-10 max-w-screen-xl mx-auto">
        <div>
          <div className="font-display text-smoke text-base mb-3">
            {theme.brand.name}
            <span className="text-emerald-400">.</span>
            <span className="ml-2 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-white/45">
              {theme.brand.accent}
            </span>
          </div>
          <p className="text-sm text-smoke-dim leading-relaxed max-w-xs mb-4">
            {theme.footer.platformNote}
          </p>
        </div>

        {theme.footer.columns.map((column) => (
          <div key={column.heading}>
            <p className="font-mono text-[0.6rem] tracking-[0.18em] uppercase text-emerald-400 mb-4">
              {column.heading}
            </p>
            <div className="flex flex-col gap-2">
              {column.links.map((link) => (
                <ActionLink
                  key={`${link.href ?? link.to ?? link.label}-${link.label}`}
                  href={link.href}
                  to={link.to}
                  className="text-sm text-smoke-dim hover:text-smoke transition-colors"
                >
                  {link.label}
                </ActionLink>
              ))}
            </div>
          </div>
        ))}

        <div>
          <p className="font-mono text-[0.6rem] tracking-[0.18em] uppercase text-emerald-400 mb-4">Contact</p>
          <a href={`mailto:${theme.footer.contactEmail}`} className="text-sm text-white hover:text-emerald-300 transition-colors">
            {theme.footer.contactEmail}
          </a>
          <p className="text-smoke-dim text-sm mt-3">
            {theme.footer.title}
          </p>
        </div>
      </div>

      <div className="border-t border-white/5 px-6 lg:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3 max-w-screen-xl mx-auto">
        <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-smoke-faint opacity-50">
          © {new Date().getFullYear()} {theme.footer.copyright}
        </p>
        <p className="font-mono text-[0.6rem] tracking-[0.12em] uppercase text-smoke-faint opacity-40">
          {theme.footer.eyebrow}
        </p>
      </div>
    </footer>
  )
}
