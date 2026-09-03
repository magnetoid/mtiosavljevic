import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import Projects from '@/pages/Projects'
import Contact from '@/pages/Contact'
import ProjectPage from '@/pages/projects/ProjectPage'

// Admin is behind a login and never prerendered, so it is split out of the main
// bundle — public visitors no longer download Tiptap and the CRM.
const AdminLayout = lazy(() => import('@/admin/AdminLayout'))
const AdminLanding = lazy(() => import('@/admin/AdminLanding'))
const Dashboard = lazy(() => import('@/admin/Dashboard'))
const BlogAdmin = lazy(() => import('@/admin/BlogAdmin'))
const QuoteRequests = lazy(() => import('@/admin/QuoteRequests'))
const MediaAdmin = lazy(() => import('@/admin/MediaAdmin'))
const BlogCategoriesAdmin = lazy(() => import('@/admin/BlogCategoriesAdmin'))
const ImportAdmin = lazy(() => import('@/admin/ImportAdmin'))
const TranslationsAdmin = lazy(() => import('@/admin/TranslationsAdmin'))
const PortfolioAdmin = lazy(() => import('@/admin/PortfolioAdmin'))
const HeroVideosAdmin = lazy(() => import('@/admin/HeroVideosAdmin'))
const TestimonialsAdmin = lazy(() => import('@/admin/TestimonialsAdmin'))
const SeoAdmin = lazy(() => import('@/admin/SeoAdmin'))
const CRMLauncher = lazy(() => import('@/admin/crm/CRMLauncher'))

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      <Nav />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  )
}

function AdminLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink">
      <p className="font-mono text-sm text-smoke-dim">Loading…</p>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
      <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />
      <Route path="/projects" element={<PublicLayout><Projects /></PublicLayout>} />
      <Route path="/projects/:slug" element={<PublicLayout><ProjectPage /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

      {/* Admin */}
      <Route path="/admin" element={<Suspense fallback={<AdminLoading />}><AdminLayout /></Suspense>}>
        <Route index element={<AdminLanding />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="hero-videos" element={<HeroVideosAdmin />} />
        <Route path="portfolio" element={<PortfolioAdmin />} />
        <Route path="blog" element={<BlogAdmin />} />
        <Route path="blog/categories" element={<BlogCategoriesAdmin />} />
        <Route path="testimonials" element={<TestimonialsAdmin />} />
        <Route path="media" element={<MediaAdmin />} />
        <Route path="import" element={<ImportAdmin />} />
        <Route path="quotes" element={<QuoteRequests />} />
        <Route path="translations" element={<TranslationsAdmin />} />
        <Route path="seo" element={<SeoAdmin />} />

        <Route path="crm" element={<CRMLauncher />} />
      </Route>
    </Routes>
  )
}
