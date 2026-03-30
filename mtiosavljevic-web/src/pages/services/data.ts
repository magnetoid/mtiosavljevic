export interface ServiceData {
  slug: string
  key: string
  icon: string
  label: string
  tagline: string
  color: string
  heroDesc: string
  stats: { num: string; label: string }[]
  features: { title: string; desc: string }[]
  process: { n: string; title: string; desc: string }[]
  faq: { q: string; a: string }[]
}

export const SERVICES_DATA: ServiceData[] = [
  {
    slug: 'ai-automation',
    key: 'ai',
    icon: '◈',
    label: 'AI & Automation',
    tagline: 'Intelligent systems that work while you sleep',
    color: '#10B981',
    heroDesc: 'Claude API, MCP workflows, Gemini, Ollama local LLMs, Dify, and multi-agent orchestration. From API integration to full agentic systems running on local inference hardware. I build AI solutions that integrate seamlessly with your existing stack and deliver measurable productivity gains.',
    stats: [
      { num: '5×', label: 'productivity gains with AI workflows' },
      { num: '130+', label: 'businesses transformed' },
      { num: '48h', label: 'typical proof-of-concept delivery' },
      { num: '10+', label: 'LLM integrations deployed' },
    ],
    features: [
      { title: 'Multi-agent Systems', desc: 'Design and deploy orchestrated AI agents that collaborate on complex tasks — from research automation to content pipelines and customer support workflows.' },
      { title: 'LLM Integration', desc: 'Connect Claude, GPT-4, Gemini, or local models (Ollama, LM Studio) to your existing applications via clean APIs and robust error handling.' },
      { title: 'AI Content Pipelines', desc: 'Automated content generation, editing, and publishing workflows that maintain brand voice while dramatically increasing output volume.' },
      { title: 'Dify Deployment', desc: 'Self-hosted Dify instances for no-code AI app building. Full setup, customization, and integration with your data sources.' },
      { title: 'Ollama Local', desc: 'Privacy-first AI with locally-running open-source models. No data leaves your infrastructure. Perfect for sensitive industries.' },
      { title: 'MCP Workflows', desc: 'Model Context Protocol implementations connecting AI assistants to your tools, databases, and business systems for contextual automation.' },
    ],
    process: [
      { n: '01', title: 'Discovery Call', desc: 'We discuss your current workflows, pain points, and automation opportunities. I identify where AI can deliver the highest ROI for your specific situation.' },
      { n: '02', title: 'Architecture Design', desc: 'I map out the full solution: which models, which APIs, how they connect to your stack, and what infrastructure you\'ll need. Clear scope and timeline.' },
      { n: '03', title: 'Build & Test', desc: 'Rapid development with weekly demos. You see working prototypes early, not just at the end. Iterative refinement based on real usage.' },
      { n: '04', title: 'Deploy & Handoff', desc: 'Full deployment to your infrastructure, documentation, training, and ongoing support options. You own everything.' },
    ],
    faq: [
      { q: 'Which AI models do you work with?', a: 'I work across the full spectrum: Claude (Anthropic), GPT-4 (OpenAI), Gemini (Google), and open-source models via Ollama and LM Studio. The right choice depends on your use case, budget, and privacy requirements.' },
      { q: 'Can AI automation work with my existing tools?', a: 'Yes. Most projects involve integrating AI capabilities into existing workflows — your CRM, content management, customer support tools, or internal applications. I build bridges, not replacements.' },
      { q: 'What\'s the typical timeline for an AI project?', a: 'Proof-of-concept in 1-2 weeks. Full production deployment in 4-8 weeks depending on scope. I prioritize getting working software in your hands quickly for feedback.' },
      { q: 'Do I need technical staff to maintain AI systems?', a: 'I design for maintainability. Most solutions require minimal technical oversight once deployed. For complex systems, I offer ongoing support retainers or can train your team.' },
    ],
  },

  {
    slug: 'fullstack-dev',
    key: 'dev',
    icon: '◉',
    label: 'Full-Stack Development',
    tagline: 'From idea to production, shipped fast',
    color: '#10B981',
    heroDesc: 'React, Vite, TypeScript, Node.js, PHP — from simple landing pages to complex SaaS platforms. 10+ live SaaS products shipped using Supabase, Docker, and Coolify. I write clean, maintainable code that scales with your business.',
    stats: [
      { num: '10+', label: 'SaaS products shipped' },
      { num: '5 years', label: 'React & TypeScript focus' },
      { num: '48h', label: 'MVP prototype turnaround' },
      { num: '3×', label: 'faster than agency timelines' },
    ],
    features: [
      { title: 'SaaS MVP', desc: 'Rapid MVP development for startup ideas. Auth, payments, dashboards, and core features — shipped in weeks, not months. Built to scale when you find product-market fit.' },
      { title: 'React/Next.js', desc: 'Modern React applications with TypeScript, Vite or Next.js, Tailwind CSS, and best-practice architecture. Server components, streaming, and edge deployment when it makes sense.' },
      { title: 'Supabase & PostgreSQL', desc: 'Full backend on Supabase: auth, database, storage, edge functions, and real-time subscriptions. Self-hosted or cloud, with proper security and performance optimization.' },
      { title: 'Docker & Coolify', desc: 'Containerized deployments with Coolify for simple, self-hosted PaaS. Zero-downtime deployments, easy rollbacks, and full infrastructure ownership.' },
      { title: 'Custom APIs', desc: 'REST and GraphQL APIs built with Node.js, Express, or serverless functions. Clean documentation, proper versioning, and robust error handling.' },
      { title: 'Performance Optimization', desc: 'Lighthouse scores in the 90s, sub-second load times, optimized bundles, and smart caching strategies. Fast sites convert better.' },
    ],
    process: [
      { n: '01', title: 'Discovery Call', desc: 'We discuss your product vision, target users, and business model. I help identify the minimal feature set to validate your idea quickly.' },
      { n: '02', title: 'Architecture Design', desc: 'Tech stack decisions, database schema, API design, and deployment strategy. You get a clear technical roadmap before any code is written.' },
      { n: '03', title: 'Build & Test', desc: 'Agile sprints with weekly deployments to a staging environment. You see progress continuously and can adjust priorities based on what you learn.' },
      { n: '04', title: 'Deploy & Handoff', desc: 'Production deployment, monitoring setup, documentation, and knowledge transfer. Code lives in your repo from day one — you own everything.' },
    ],
    faq: [
      { q: 'What tech stack do you recommend for a new SaaS?', a: 'For most projects: React + TypeScript + Vite for the frontend, Supabase for backend (auth, database, storage), and Coolify on Hetzner for hosting. Fast to build, cheap to run, scales well.' },
      { q: 'Can you work with my existing codebase?', a: 'Yes. I regularly join projects mid-stream to add features, fix performance issues, or help teams ship faster. I\'ll do a codebase audit first to understand what I\'m working with.' },
      { q: 'How do you handle project communication?', a: 'Weekly video calls, async updates in Slack or your preferred tool, and continuous access to staging environments. You\'re never in the dark about progress.' },
      { q: 'Do you offer ongoing maintenance?', a: 'Yes. After launch, I offer support retainers for bug fixes, updates, and feature development. Many clients keep me on part-time indefinitely.' },
    ],
  },

  {
    slug: 'ecommerce',
    key: 'ecom',
    icon: '▣',
    label: 'eCommerce Architecture',
    tagline: 'Stores that scale with your ambition',
    color: '#10B981',
    heroDesc: 'WooCommerce, Shopify, BigCommerce, Medusa v2. Custom plugins, Dokan multivendor, subscriptions, BookVault POD, and 12-language international stores. I build commerce infrastructure that handles complexity without breaking.',
    stats: [
      { num: '12', label: 'language stores deployed' },
      { num: '50+', label: 'custom plugins built' },
      { num: '99.9%', label: 'uptime on managed stores' },
      { num: '3×', label: 'conversion lift from optimization' },
    ],
    features: [
      { title: 'WooCommerce Custom Dev', desc: 'Custom plugins, theme development, checkout modifications, and performance optimization. WooCommerce can handle enterprise scale with the right architecture.' },
      { title: 'Shopify & BigCommerce', desc: 'Theme customization, app development, and headless implementations. When hosted platforms make sense, I build on them properly.' },
      { title: 'Multivendor Platforms', desc: 'Dokan, WCFM, and custom multivendor solutions. Vendor dashboards, commission structures, and marketplace features built to your spec.' },
      { title: 'Custom Checkout', desc: 'Checkout flow optimization, custom fields, payment gateway integrations, and subscription billing. The checkout is where revenue happens — get it right.' },
      { title: 'International Stores', desc: 'Multi-language, multi-currency stores with proper localization. Tax compliance, shipping rules, and payment methods that work in each market.' },
      { title: 'Subscription Systems', desc: 'Recurring billing, subscription boxes, membership sites, and digital access products. Proper churn handling and lifecycle automation included.' },
    ],
    process: [
      { n: '01', title: 'Discovery Call', desc: 'We map your product catalog, business model, fulfillment requirements, and growth plans. I recommend the right platform and architecture for your specific needs.' },
      { n: '02', title: 'Architecture Design', desc: 'Platform selection, hosting strategy, payment and shipping integrations, and development timeline. Full technical spec before we start building.' },
      { n: '03', title: 'Build & Test', desc: 'Iterative development with regular demos. Thorough testing of checkout flows, payment processing, and edge cases before launch.' },
      { n: '04', title: 'Deploy & Handoff', desc: 'Launch coordination, staff training, documentation, and post-launch monitoring. Ongoing support available for updates and optimization.' },
    ],
    faq: [
      { q: 'WooCommerce or Shopify — which should I use?', a: 'WooCommerce if you need deep customization, own your data, or have complex requirements. Shopify if you want simplicity and don\'t mind platform fees. I\'ll give you an honest recommendation for your situation.' },
      { q: 'Can you migrate my existing store?', a: 'Yes. Full migration including products, customers, orders, and SEO preservation. I\'ve moved stores between all major platforms without losing search rankings.' },
      { q: 'How do you handle payment gateway integration?', a: 'I integrate with Stripe, PayPal, Square, Authorize.net, and most regional payment providers. PCI compliance considerations are built into every implementation.' },
      { q: 'What about inventory and fulfillment?', a: 'Integrations with major fulfillment providers, print-on-demand services (BookVault, Printful), and inventory management systems. The store is part of a larger operations system.' },
    ],
  },

  {
    slug: 'performance-marketing',
    key: 'marketing',
    icon: '◬',
    label: 'Performance Marketing',
    tagline: 'Data-driven growth, not guesswork',
    color: '#10B981',
    heroDesc: 'Google Ads, Meta Ads, Amazon Ads, GA4, GTM, HubSpot. Data-driven campaigns with full funnel strategy, CRO, and attribution. 130+ businesses scaled with measurable, profitable advertising.',
    stats: [
      { num: '130+', label: 'businesses scaled' },
      { num: '5×', label: 'average ROAS achieved' },
      { num: '40%', label: 'typical CPA reduction' },
      { num: '10 years', label: 'paid media experience' },
    ],
    features: [
      { title: 'Google & Meta Ads', desc: 'Full-funnel campaigns across Search, Display, YouTube, Facebook, and Instagram. Proper structure, creative testing, and bid strategy optimization.' },
      { title: 'GA4 & GTM', desc: 'Complete analytics implementation: enhanced ecommerce, custom events, cross-domain tracking, and server-side GTM. Data you can actually trust and act on.' },
      { title: 'HubSpot CRM', desc: 'CRM setup, pipeline configuration, lead scoring, and marketing automation. Connect your ads to your sales process for full-funnel visibility.' },
      { title: 'Email Automation', desc: 'Transactional emails, nurture sequences, and promotional campaigns with Mailgun, Sendy, or HubSpot. Proper deliverability and segmentation from day one.' },
      { title: 'Attribution', desc: 'Multi-touch attribution modeling that tells you which channels actually drive revenue. Cut waste, double down on winners.' },
      { title: 'CRO', desc: 'Landing page optimization, A/B testing, and conversion funnel analysis. Small improvements compound into significant revenue gains.' },
    ],
    process: [
      { n: '01', title: 'Discovery Call', desc: 'We review your current marketing, analytics setup, and business goals. I identify quick wins and long-term opportunities.' },
      { n: '02', title: 'Strategy Design', desc: 'Channel selection, budget allocation, targeting strategy, and KPI framework. You know exactly what we\'re doing and why.' },
      { n: '03', title: 'Build & Test', desc: 'Campaign launch with proper tracking, creative testing, and optimization cycles. Weekly reporting on what\'s working and what\'s not.' },
      { n: '04', title: 'Scale & Handoff', desc: 'Once we find profitable campaigns, we scale spend and systematize operations. Full documentation and optional ongoing management.' },
    ],
    faq: [
      { q: 'What\'s a realistic ad budget to start?', a: 'For most B2B or high-ticket products, $3-5K/month minimum to get statistically significant data. eCommerce can start lower. I\'ll be honest if your budget doesn\'t match your goals.' },
      { q: 'How do you measure success?', a: 'Revenue and profit, not vanity metrics. We track cost per acquisition, return on ad spend, and customer lifetime value. Clicks and impressions are inputs, not outcomes.' },
      { q: 'Can you work with my existing marketing team?', a: 'Yes. I often work alongside in-house teams, handling specific channels or providing strategic oversight. I integrate with your existing reporting and workflows.' },
      { q: 'Do you do organic/SEO as well?', a: 'My focus is paid media and analytics. For SEO, I can recommend specialists I trust and ensure your technical SEO foundation is solid.' },
    ],
  },

  {
    slug: 'devops-cloud',
    key: 'devops',
    icon: '◫',
    label: 'DevOps & Cloud',
    tagline: 'Infrastructure that just works',
    color: '#10B981',
    heroDesc: 'Hetzner VPS, Coolify, Docker Compose, self-hosted Supabase, Nginx, Plesk, CrowdSec security, and CI/CD pipelines. Full infrastructure design and management for teams that want reliability without cloud complexity.',
    stats: [
      { num: '99.9%', label: 'uptime across managed infrastructure' },
      { num: '70%', label: 'cost reduction vs AWS/GCP' },
      { num: '24h', label: 'incident response time' },
      { num: '50+', label: 'servers under management' },
    ],
    features: [
      { title: 'Hetzner VPS', desc: 'High-performance European hosting at a fraction of AWS prices. Server provisioning, hardening, and ongoing management included.' },
      { title: 'Coolify Deployments', desc: 'Self-hosted PaaS for painless container deployments. Git push to deploy, automatic SSL, and simple scaling without Kubernetes complexity.' },
      { title: 'Self-hosted Supabase', desc: 'Full Supabase stack on your own infrastructure. Database, auth, storage, and edge functions with complete data ownership and no per-request pricing.' },
      { title: 'Security (CrowdSec)', desc: 'Proactive security with CrowdSec, fail2ban, and proper firewall configuration. Regular security audits and rapid response to threats.' },
      { title: 'CI/CD Pipelines', desc: 'GitHub Actions, GitLab CI, or custom pipelines for automated testing and deployment. Ship confidently with proper staging environments.' },
      { title: 'Monitoring', desc: 'Uptime monitoring, log aggregation, and alerting with Grafana, Prometheus, or simple solutions that fit your scale. Know about problems before your users do.' },
    ],
    process: [
      { n: '01', title: 'Discovery Call', desc: 'We audit your current infrastructure, identify pain points, and discuss reliability and scaling requirements.' },
      { n: '02', title: 'Architecture Design', desc: 'Server topology, deployment strategy, backup procedures, and security hardening plan. Clear documentation of the target state.' },
      { n: '03', title: 'Build & Test', desc: 'Infrastructure provisioning with proper staging environments. Load testing and failure scenario validation before go-live.' },
      { n: '04', title: 'Deploy & Handoff', desc: 'Production migration with rollback procedures, monitoring setup, and runbook documentation. Optional ongoing management retainer.' },
    ],
    faq: [
      { q: 'Why Hetzner instead of AWS or GCP?', a: 'For most projects, Hetzner offers 5-10× better price-performance than hyperscalers. Simpler pricing, excellent hardware, and GDPR compliance built in. I recommend AWS/GCP when specific managed services justify the cost.' },
      { q: 'What about Kubernetes?', a: 'Kubernetes is often overkill. Docker Compose with Coolify handles most scaling needs at a fraction of the complexity. I deploy K8s when the use case genuinely requires it, not as a default.' },
      { q: 'How do you handle backups?', a: 'Automated daily backups with off-site storage, tested restore procedures, and documented recovery time objectives. Backups that aren\'t tested aren\'t backups.' },
      { q: 'Can you manage infrastructure I didn\'t build?', a: 'Yes. I regularly take over existing servers and infrastructure. First step is always an audit to understand what\'s there and what needs attention.' },
    ],
  },

  {
    slug: 'brand-identity',
    key: 'brand',
    icon: '▶',
    label: 'Brand Identity & Design',
    tagline: 'Visual systems that tell your story',
    color: '#10B981',
    heroDesc: '25 years from pixel to brand system. Adobe Creative Suite, logo and brand identity design, UI/UX, print & packaging — from startup branding to full corporate identity. I create visual identities that work across every touchpoint.',
    stats: [
      { num: '25', label: 'years of design experience' },
      { num: '200+', label: 'brand identities created' },
      { num: '48h', label: 'initial concepts delivered' },
      { num: '100%', label: 'ownership of all files' },
    ],
    features: [
      { title: 'Logo Design', desc: 'Distinctive, memorable logos that work at any size and in any context. Multiple concepts, refinement rounds, and final delivery in all formats.' },
      { title: 'Brand Identity Systems', desc: 'Complete visual identity including logo, color palette, typography, imagery style, and usage guidelines. Everything needed for consistent brand expression.' },
      { title: 'UI/UX Design', desc: 'User interface design for web and mobile applications. Wireframes, high-fidelity mockups, and interactive prototypes that developers can implement directly.' },
      { title: 'Print & Packaging', desc: 'Business cards, letterheads, packaging design, and print collateral. Press-ready files with proper color management and production specs.' },
      { title: 'Brand Guidelines', desc: 'Comprehensive documentation of your visual identity. Logo usage rules, color specifications, typography hierarchy, and application examples.' },
      { title: 'Visual Language', desc: 'Photography direction, illustration style, iconography, and motion design principles. A cohesive visual system that extends beyond the logo.' },
    ],
    process: [
      { n: '01', title: 'Discovery Call', desc: 'We discuss your business, values, target audience, and competitive landscape. I understand who you are before designing how you look.' },
      { n: '02', title: 'Concept Development', desc: 'Multiple distinct creative directions presented as mood boards and initial logo concepts. We explore before we commit.' },
      { n: '03', title: 'Refinement', desc: 'Selected direction developed into a full brand identity. Iterative refinement based on your feedback until it\'s exactly right.' },
      { n: '04', title: 'Delivery & Handoff', desc: 'Complete file package, brand guidelines document, and all assets in formats ready for web, print, and application. You own everything.' },
    ],
    faq: [
      { q: 'How many logo concepts do you present?', a: 'Typically 3-5 distinct directions in the first round. Each is a genuine exploration, not variations of one idea. You choose the direction, then we refine.' },
      { q: 'What files do I receive?', a: 'Everything: vector source files (AI, EPS, SVG), raster exports (PNG, JPG at multiple sizes), PDF for print, and favicon/social media variants. Full ownership, no licensing restrictions.' },
      { q: 'Can you match an existing brand style?', a: 'Yes. For brand extensions or sub-brands, I work within your existing guidelines while creating something that feels both fresh and consistent.' },
      { q: 'Do you do one-off design tasks?', a: 'For existing clients, yes. For new clients, I prefer to start with at least a logo project to understand your brand before taking on smaller tasks.' },
    ],
  },
]

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES_DATA.find(s => s.slug === slug)
}
