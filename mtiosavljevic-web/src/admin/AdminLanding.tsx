import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { LayoutDashboard, FileText, MessageSquare, Image, ArrowRight } from 'lucide-react'

export default function AdminLanding() {
  const navigate = useNavigate()
  const [counts, setCounts] = useState({ blog: 0, quotes: 0 })

  useEffect(() => {
    Promise.all([
      supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
      supabase.from('quote_requests').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    ]).then(([b, q]) =>
      setCounts({
        blog: b.count || 0,
        quotes: q.count || 0,
      })
    )
  }, [])

  const modules = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      desc: 'Overview and stats',
      path: '/admin/dashboard',
      badge: null,
    },
    {
      icon: FileText,
      label: 'Blog Posts',
      desc: `${counts.blog} posts`,
      path: '/admin/blog',
      badge: null,
    },
    {
      icon: MessageSquare,
      label: 'Contact Requests',
      desc: counts.quotes > 0 ? `${counts.quotes} new` : 'No new requests',
      path: '/admin/quotes',
      badge: counts.quotes > 0 ? counts.quotes : null,
    },
    {
      icon: Image,
      label: 'Media',
      desc: 'Images & files',
      path: '/admin/media',
      badge: null,
    },
  ]

  return (
    <div className="p-8 min-h-full">
      <div className="mb-10">
        <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-2">mtiosavljevic.com</p>
        <h1 className="text-3xl font-semibold text-foreground">Admin Panel</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your content.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map(({ icon: Icon, label, desc, path, badge }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            className="group relative text-left rounded-lg border border-border bg-card hover:border-primary/40 transition-all duration-200 p-6"
          >
            {badge !== null && (
              <span className="absolute top-3 right-3 min-w-[1.4rem] h-6 px-1 rounded-full bg-primary text-[0.6rem] font-mono text-primary-foreground flex items-center justify-center">
                {badge}
              </span>
            )}
            <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center mb-4">
              <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <h3 className="font-semibold text-foreground text-sm mb-1">{label}</h3>
            <p className="text-muted-foreground text-xs">{desc}</p>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors mt-3" />
          </button>
        ))}
      </div>
    </div>
  )
}
