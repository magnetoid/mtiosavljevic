import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Image, FileText, MessageSquare, Film, ArrowRight, ExternalLink } from 'lucide-react'
import { NavLink } from 'react-router-dom'

interface Counts {
  portfolio: number
  blog: number
  quotes: number
  heroVideos: number
}

const STATS = [
  {
    label: 'Portfolio Items',
    key: 'portfolio' as const,
    icon: Image,
    to: '/admin/portfolio',
    description: 'Published work items',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10'
  },
  {
    label: 'Blog Posts',
    key: 'blog' as const,
    icon: FileText,
    to: '/admin/blog',
    description: 'Written articles',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    label: 'Quote Requests',
    key: 'quotes' as const,
    icon: MessageSquare,
    to: '/admin/quotes',
    description: 'Client inquiries',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10'
  },
  {
    label: 'Hero Videos',
    key: 'heroVideos' as const,
    icon: Film,
    to: '/admin/hero-videos',
    description: 'Homepage slider',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10'
  },
]

export default function Dashboard() {
  const [counts, setCounts] = useState<Counts>({ portfolio: 0, blog: 0, quotes: 0, heroVideos: 0 })

  useEffect(() => {
    Promise.all([
      supabase.from('portfolio_items').select('*', { count: 'exact', head: true }),
      supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
      supabase.from('quote_requests').select('*', { count: 'exact', head: true }),
      supabase.from('hero_videos').select('*', { count: 'exact', head: true }),
    ]).then(([p, b, q, h]) =>
      setCounts({
        portfolio: p.count || 0,
        blog: b.count || 0,
        quotes: q.count || 0,
        heroVideos: h.count || 0,
      })
    )
  }, [])

  return (
    <div className="p-8 lg:p-12">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-foreground tracking-tight">CMS Dashboard</h1>
        <p className="text-muted-foreground text-base mt-2">Overview of your published content and assets.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {STATS.map(({ label, key, icon: Icon, to, description, color, bg }) => (
          <NavLink key={key} to={to} className="group block h-full">
            <Card className="h-full border-border bg-card/50 hover:bg-card hover:border-primary/40 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 ${color}`} />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-light text-foreground font-mono">{counts[key]}</div>
                  <h3 className="text-sm font-medium text-foreground">{label}</h3>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
              </CardContent>
            </Card>
          </NavLink>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-border bg-card/50 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {STATS.map(({ label, icon: Icon, to, color, bg }) => (
              <NavLink
                key={to}
                to={to}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border/50 bg-background hover:border-primary/30 hover:bg-accent/50 transition-all group"
              >
                <div className={`w-8 h-8 rounded-md ${bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`h-4 w-4 ${color}`} />
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Manage {label}</span>
              </NavLink>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
            <Image className="w-40 h-40" />
          </div>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium">External Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 relative z-10">
            <a
              href={(import.meta.env.VITE_CRM_URL as string) || '/admin/crm'}
              className="flex items-center justify-between px-4 py-4 rounded-xl border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-amber-500/20 flex items-center justify-center shrink-0">
                  <MessageSquare className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-amber-500">AI CRM Workspace</h4>
                  <p className="text-xs text-amber-500/70 mt-0.5">Manage leads and automated outreach</p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-amber-500/50 group-hover:text-amber-500 transition-colors" />
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
