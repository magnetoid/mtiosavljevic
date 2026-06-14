import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import type { ReactNode } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import About from '@/pages/About'
import Services from '@/pages/Services'
import Contact from '@/pages/Contact'

// Scroll reveal observer
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    const els = document.querySelectorAll('.reveal')
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function PublicLayout({ children }: { children: ReactNode }) {
  useScrollReveal()
  return (
    <div className="min-h-screen bg-ink text-smoke">
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      <div className="scan-line" aria-hidden="true" />
      <Nav />
      <main id="main-content" className="relative z-10">{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
      <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/admin/*" element={<Navigate to="/" replace />} />
      <Route path="/projects/*" element={<Navigate to="/services" replace />} />
      <Route path="/services/:slug" element={<Navigate to="/services" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
