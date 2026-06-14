import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export interface SiteLink {
  label: string
  to?: string
  href?: string
}

export interface SiteAction extends SiteLink {
  label: string
}

export interface SiteService {
  no: string
  title: string
  body: string
}

export interface SiteFooterColumn {
  heading: string
  links: SiteLink[]
}

export interface SiteTheme {
  brand: {
    name: string
    accent: string
    homePath: string
  }
  navLinks: SiteLink[]
  navCta?: SiteAction
  footer: {
    eyebrow: string
    title: string
    contactEmail: string
    columns: SiteFooterColumn[]
    copyright: string
    platformNote: string
  }
  home: {
    hero: {
      eyebrow: string
      title: string
      lead: string
      primaryAction?: SiteAction
      secondaryAction?: SiteAction
      capabilities: string[]
    }
    selectedWorkEyebrow: string
    selectedWorkTitle: string
    selectedWorkAction?: SiteAction
    statementEyebrow: string
    statementText: string
    statementAccentText: string
    capabilitiesEyebrow: string
    capabilitiesTitle: string
    capabilitiesItems: SiteService[]
    ctaEyebrow: string
    ctaTitle: string
    ctaAction?: SiteAction
  }
}

const NAV_LINKS: SiteLink[] = [
  { label: 'About', to: '/about' },
  { label: 'Platform', to: '/services' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

const PLATFORM_PILLARS: SiteService[] = [
  {
    no: '01',
    title: 'Content Operations',
    body: 'Structured authoring, publishing states, and a cleaner editorial surface for teams shipping through one CMS.',
  },
  {
    no: '02',
    title: 'Theme System',
    body: 'A reusable public frontend that keeps the imported aesthetic while staying configurable and CMS-scoped.',
  },
  {
    no: '03',
    title: 'Plugin Runtime',
    body: 'Composable platform features with clearer boundaries so the public site does not inherit old admin responsibilities.',
  },
  {
    no: '04',
    title: 'Self-Hosted Delivery',
    body: 'Public content comes from Supabase cleanly, ready for Git-driven deployment and separate runtime evolution.',
  },
]

const FOOTER_COLUMNS: SiteFooterColumn[] = [
  {
    heading: 'Platform',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Capabilities', to: '/services' },
      { label: 'Blog', to: '/blog' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    heading: 'Profiles',
    links: [
      { label: 'GitHub', href: 'https://github.com/magnetoid' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/mtiosavljevic' },
    ],
  },
]

const SITE_THEME: SiteTheme = {
  brand: {
    name: 'MT',
    accent: 'CMS',
    homePath: '/',
  },
  navLinks: NAV_LINKS,
  navCta: {
    label: 'Start Build',
    to: '/contact',
  },
  footer: {
    eyebrow: 'CMS-first public frontend',
    title: 'Ported from the original shell and rebuilt as a dedicated CMS experience.',
    contactEmail: 'marko.tiosavljevic@gmail.com',
    columns: FOOTER_COLUMNS,
    copyright: 'Marko Tiosavljevic',
    platformNote: 'This repo now serves the CMS-aligned public experience only. The old mixed admin and CRM shell is removed from the live entrypoint.',
  },
  home: {
    hero: {
      eyebrow: 'Headless CMS · Themes · Plugins',
      title: 'The imported Marko shell, rebuilt as a real CMS public frontend.',
      lead: 'This repository now carries the CMS-only public layer: branded pages, live blog delivery, and a cleaner separation from old admin and CRM responsibilities.',
      primaryAction: {
        label: 'Explore capabilities',
        to: '/services',
      },
      secondaryAction: {
        label: 'Read the blog',
        to: '/blog',
      },
      capabilities: ['CMS-only scope', 'Live blog delivery', 'Theme-driven UX', 'Safer public runtime'],
    },
    selectedWorkEyebrow: 'Latest publishing',
    selectedWorkTitle: 'Fresh content from the CMS, surfaced directly on the public site.',
    selectedWorkAction: {
      label: 'View all posts',
      to: '/blog',
    },
    statementEyebrow: 'Why this repo changed',
    statementText: 'The visual system stays,',
    statementAccentText: 'but the public app now behaves like a CMS frontend instead of a mixed admin/CRM starter.',
    capabilitiesEyebrow: 'Platform pillars',
    capabilitiesTitle: 'A cleaner CMS surface with stronger architecture behind it.',
    capabilitiesItems: PLATFORM_PILLARS,
    ctaEyebrow: 'Need a custom rollout?',
    ctaTitle: 'Adapt the theme, connect the content model, and ship a branded public experience without bringing back the old mixed stack.',
    ctaAction: {
      label: 'Talk about the build',
      to: '/contact',
    },
  },
}

export function useSiteTheme(): SiteTheme {
  return SITE_THEME
}

export function ActionLink({
  href,
  to,
  className,
  children,
  onClick,
}: {
  href?: string
  to?: string
  className: string
  children: ReactNode
  onClick?: () => void
}) {
  if (href) {
    return (
      <a href={href} className={className} onClick={onClick} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }

  return (
    <Link to={to ?? '/'} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}
