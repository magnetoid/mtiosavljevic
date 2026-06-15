import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { LayoutDashboard, ArrowRight, Users, Sparkles, Database, ShieldCheck } from 'lucide-react'

export default function AdminLanding() {
  const navigate = useNavigate()
  const [counts, setCounts] = useState({ blog: 0, quotes: 0, portfolio: 0 })

  useEffect(() => {
    Promise.all([
      supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
      supabase.from('quote_requests').select('*', { count: 'exact', head: true }).eq('status', 'new'),
      supabase.from('portfolio_items').select('*', { count: 'exact', head: true }),
    ]).then(([b, q, p]) =>
      setCounts({
        blog: b.count || 0,
        quotes: q.count || 0,
        portfolio: p.count || 0,
      })
    )
  }, [])

  return (
    <div className="p-8 lg:p-12 min-h-full bg-gradient-to-br from-background to-accent/30 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-4 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="text-[0.65rem] font-mono text-primary tracking-widest uppercase">imba.admin workspace</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">Command Center</h1>
          <p className="text-muted-foreground text-lg mt-3 font-light max-w-xl mx-auto">
            Select an environment to manage your digital presence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* CMS Module */}
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="group relative text-left rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 p-8 overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
              <Database className="w-48 h-48" />
            </div>
            
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-8 shadow-inner">
              <LayoutDashboard className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Content Management</h2>
            <p className="text-muted-foreground text-sm mb-10 leading-relaxed max-w-sm">
              Manage your portfolio, publish blog posts, organize your media library, and fine-tune SEO settings.
            </p>
            
            <div className="flex gap-6 mb-8">
              <div className="flex flex-col">
                <span className="text-3xl font-mono text-foreground font-light">{counts.portfolio}</span>
                <span className="text-[0.65rem] font-mono tracking-widest uppercase text-muted-foreground mt-1">Projects</span>
              </div>
              <div className="w-px bg-border/60"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-mono text-foreground font-light">{counts.blog}</span>
                <span className="text-[0.65rem] font-mono tracking-widest uppercase text-muted-foreground mt-1">Articles</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              Enter CMS <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
            </div>
          </button>

          {/* CRM Module */}
          <button
            onClick={() => navigate('/admin/crm')}
            className="group relative text-left rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-500 p-8 overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 text-amber-500">
              <Users className="w-48 h-48" />
            </div>

            <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center mb-8 shadow-inner">
              <Sparkles className="h-7 w-7 text-amber-500" />
            </div>
            
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-2xl font-semibold text-foreground">AI CRM</h2>
              {counts.quotes > 0 && (
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-medium flex items-center gap-2 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  {counts.quotes} New Leads
                </span>
              )}
            </div>
            
            <p className="text-muted-foreground text-sm mb-10 leading-relaxed max-w-sm">
              Review inbound quote requests, orchestrate AI-assisted outreach, and manage client lifecycles centrally.
            </p>

            <div className="mt-auto pt-14 flex items-center gap-2 text-sm font-medium text-amber-500">
              Launch AI CRM <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
