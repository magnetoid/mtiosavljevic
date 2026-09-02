import { Routes, Route } from 'react-router-dom'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import Projects from '@/pages/Projects'
import Contact from '@/pages/Contact'
import ProjectPage from '@/pages/projects/ProjectPage'
import AdminLayout from '@/admin/AdminLayout'
import AdminLanding from '@/admin/AdminLanding'
import Dashboard from '@/admin/Dashboard'
import BlogAdmin from '@/admin/BlogAdmin'
import QuoteRequests from '@/admin/QuoteRequests'
import MediaAdmin from '@/admin/MediaAdmin'
import BlogCategoriesAdmin from '@/admin/BlogCategoriesAdmin'
import ImportAdmin from '@/admin/ImportAdmin'
import TranslationsAdmin from '@/admin/TranslationsAdmin'
import PortfolioAdmin from '@/admin/PortfolioAdmin'
import HeroVideosAdmin from '@/admin/HeroVideosAdmin'
import TestimonialsAdmin from '@/admin/TestimonialsAdmin'
import SeoAdmin from '@/admin/SeoAdmin'
import CRMLauncher from '@/admin/crm/CRMLauncher'

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
      <Route path="/admin" element={<AdminLayout />}>
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
