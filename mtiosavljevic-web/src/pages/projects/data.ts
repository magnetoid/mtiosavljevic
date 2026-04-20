export interface CaseStudyData {
  slug: string
  name: string
  url: string
  year: string
  category: string
  tagline: string
  hero: string
  summary: string
  role: string
  accent: string
  stack: string[]
  stats: { num: string; label: string }[]
  problem: { title: string; body: string }
  approach: { title: string; body: string }[]
  features: { title: string; desc: string }[]
  outcomes: { metric: string; label: string }[]
  lessons: string[]
  quote?: { text: string; attribution: string }
}

export const PROJECTS_DATA: CaseStudyData[] = [
  // ────────────────────────────────────────────────────────────
  //   ALETHIA.ME
  // ────────────────────────────────────────────────────────────
  {
    slug: 'alethia',
    name: 'Aletheia',
    url: 'https://alethia.me',
    year: '2026',
    category: 'AI · Forensic Intelligence',
    accent: '#10B981',
    tagline: 'AI-Powered Anticorruption Intelligence',
    hero: 'Corruption costs the world $2.6 trillion every year. Aletheia is the platform built to fight it — with forensic rigor, court-ready evidence, and zero hallucinations.',
    summary:
      'Aletheia is a multi-model AI forensic intelligence platform designed for investigative journalists, prosecutors, compliance officers, and anticorruption agencies. It ingests public records, maps hidden ownership networks, and produces courtroom-admissible reports — in a fraction of the time manual investigations require.',
    role: 'Product architecture, AI orchestration, full-stack engineering, network visualization, on-premise deployment.',
    stack: [
      'Claude API',
      'GPT-4',
      'Gemini',
      'Perplexity',
      'Ollama',
      'Node.js',
      'PostgreSQL',
      'D3.js',
      'React + TypeScript',
      'Docker / Coolify',
      'Supabase',
    ],
    stats: [
      { num: '7', label: 'phase forensic pipeline' },
      { num: '98%', label: 'investigation time saved' },
      { num: '0', label: 'hallucination tolerance' },
      { num: '2', label: 'languages (EN / SR)' },
    ],
    problem: {
      title: 'Investigations that should take weeks take years',
      body: 'Anticorruption work drowns in documents. Procurement filings, court decisions, company registries, sanctions lists, leaked databases — all scattered, inconsistent, and written for lawyers, not search engines. Under 4% of corruption cases end in successful prosecution, not because the evidence isn\'t there, but because analysts can\'t connect it fast enough. Traditional AI tools made this worse: a single model will confidently invent a beneficial owner or cite a court case that doesn\'t exist. In a courtroom, one hallucination destroys the entire file.',
    },
    approach: [
      {
        title: 'Zero Hallucination Protocol',
        body: 'Every claim surfaces only when three or more independent models — Claude, GPT-4, Gemini, Perplexity — agree on it. Disagreements are logged as open questions, not filtered out. Every fact is tied to a source citation an analyst can click through and verify.',
      },
      {
        title: 'A seven-phase forensic pipeline',
        body: 'Identity verification → entity mapping → timeline reconstruction → financial analysis → procurement audit → legal assessment → typology scoring. Each phase produces structured output the next one consumes. The analyst stays in the loop at every handoff.',
      },
      {
        title: 'Built for sensitive infrastructure',
        body: 'The entire stack runs air-gapped on-premise via Ollama for clients who can\'t send data to a cloud API. For everyone else, a multi-tenant SaaS runs on self-hosted Supabase and Coolify — encrypted at rest, isolated per organization, and exportable.',
      },
      {
        title: 'Evidence that holds up in court',
        body: 'Reports include a full chain of custody: which model said what, which source backed the claim, which analyst approved it, which criminal code article applies. Exports are legal-formatted and bilingual — English and Serbian — to match prosecutorial workflows in the Western Balkans.',
      },
    ],
    features: [
      { title: 'Multi-model consensus engine', desc: 'Four AI providers cross-validate every finding. Conflicts flagged, never silently resolved.' },
      { title: 'Network graph visualization', desc: 'Interactive D3.js force graphs expose beneficial ownership, shared directors, and shell company clusters at a glance.' },
      { title: 'Procurement anomaly detection', desc: 'Detects single-bidder tenders, value-splitting, and suspicious award patterns across public tender data.' },
      { title: 'Evidence locker', desc: 'Drag-and-drop document upload. AI-powered OCR, entity extraction, and automatic linking back to the active investigation.' },
      { title: 'Legal code mapping', desc: 'Every finding is matched to the relevant criminal code articles — jurisdiction-aware — so the prosecutorial handoff is a click, not a week of rewriting.' },
      { title: 'Watchlist monitoring', desc: 'Persistent tracking of entities of interest. Automated alerts when new filings, sanctions, or media mentions surface.' },
    ],
    outcomes: [
      { metric: '98%', label: 'reduction in investigation cycle time (internal pilot)' },
      { metric: '3+', label: 'independent models required for every surfaced claim' },
      { metric: '7', label: 'forensic phases automated end-to-end' },
      { metric: '100%', label: 'source citation coverage — every fact traceable' },
    ],
    lessons: [
      'For high-stakes AI, consensus beats benchmarks. Accuracy claims from a single model are meaningless when the cost of being wrong is a thrown case.',
      'Air-gap is a feature, not a limitation. Building for Ollama first forced an architecture that works everywhere — cloud, on-prem, or behind a firewall — without code changes.',
      'Structured handoffs between AI phases are what separates a demo from a platform. Unstructured chain-of-thought cannot be audited; typed contracts can.',
    ],
    quote: {
      text: 'What used to be a year of reading disclosures is now an afternoon of reviewing findings. The work we produce is stronger — because the AI never lets us skip a source.',
      attribution: 'Pilot user — investigative team, Western Balkans',
    },
  },

  // ────────────────────────────────────────────────────────────
  //   WOOPULSE.COM
  // ────────────────────────────────────────────────────────────
  {
    slug: 'woopulse',
    name: 'WooPulse',
    url: 'https://woopulse.com',
    year: '2026',
    category: 'SaaS · eCommerce AI',
    accent: '#C084FC',
    tagline: 'The AI brain for your WooCommerce store',
    hero: 'Stop guessing. Start growing. WooPulse plugs into your WooCommerce store and turns raw transactional data into revenue — through AI-drafted recovery emails, dynamic pricing, and competitor intelligence that runs while you sleep.',
    summary:
      'WooPulse is a multi-model AI platform that solo founders, growing brands, and agencies plug into their WooCommerce stores to automate the revenue work that nobody has time to do manually: cart recovery, price optimization, product copywriting, and competitor monitoring — all powered by consensus between Claude, GPT-4o, Gemini, and self-hosted Ollama.',
    role: 'Product strategy, full-stack SaaS build, multi-model AI orchestration, WooCommerce integration, billing & onboarding.',
    stack: [
      'React + TypeScript',
      'Vite',
      'Node.js',
      'WooCommerce REST API',
      'Claude API',
      'GPT-4o',
      'Gemini',
      'Ollama',
      'PostgreSQL',
      'Supabase',
      'Stripe',
      'Docker / Coolify',
      'Mailgun',
    ],
    stats: [
      { num: '€2.3M', label: 'recovered carts across platform' },
      { num: '500+', label: 'WooCommerce stores running' },
      { num: '3.5×', label: 'cart recovery lift vs baseline' },
      { num: '18%', label: 'average margin improvement' },
    ],
    problem: {
      title: 'Small stores are drowning in the work that makes them grow',
      body: 'A solo WooCommerce founder has to be a merchandiser, a copywriter, a pricing analyst, a competitor researcher, and a customer service rep — all before lunch. Enterprise tools like Klaviyo and ProfitWell exist, but they are priced and scoped for teams of ten. Everyone below that line has two options: guess, or give up. Meanwhile, 70% of carts are abandoned, prices drift away from optimal by the week, and product copy never gets the A/B test it deserves. The revenue is sitting on the table.',
    },
    approach: [
      {
        title: 'One plugin install, full intelligence layer',
        body: 'WooPulse connects through the WooCommerce REST API in under five minutes. From the first sync, it sees orders, carts, customers, SKUs, and competitors — and starts scoring opportunities. No tag manager. No event schema. No developer required.',
      },
      {
        title: 'Multi-model where it matters, one model where it doesn\'t',
        body: 'Product copy and abandonment emails get consensus drafting across Claude, GPT-4o, and Gemini — three drafts, best elements merged. Price suggestions and anomaly detection run on lightweight in-house models to keep margins on the AI itself healthy.',
      },
      {
        title: 'Three tiers that match how real stores grow',
        body: 'Starter (€29/mo) for founders under 500 orders. Growth (€79/mo) for the scaling phase where automation pays for itself in week one. Agency (€199/mo) for operators running multiple client stores from a single dashboard. Every tier includes a 14-day trial and one-click export.',
      },
      {
        title: 'Self-hosted Ollama for privacy-sensitive verticals',
        body: 'Health, legal, adult, and finance stores can route generation through a local Ollama instance on the WooPulse server rather than the public APIs. Same UI, same workflow, zero customer data leaving the trust boundary.',
      },
    ],
    features: [
      { title: 'Abandoned cart recovery', desc: 'AI drafts personalized recovery emails that reference the exact product, a smart incentive, and the right send-time window. Plug into Mailgun or your existing ESP.' },
      { title: 'Dynamic pricing optimizer', desc: 'Tracks elasticity across your catalog and proposes price points that lift margin without killing conversion. You approve, the store updates.' },
      { title: 'AI product copywriting', desc: 'Bulk-generate or rewrite descriptions, meta titles, and short-form copy in your brand voice — with SEO keyword targeting built in.' },
      { title: 'Competitor intelligence', desc: 'Automated monitoring of competitor prices, promotions, and product launches. Weekly digests, instant alerts on aggressive moves.' },
      { title: 'Revenue command dashboard', desc: 'A single screen: today\'s revenue, AOV, cart-recovery-in-progress, margin by SKU, and the three actions that will move the needle this week.' },
      { title: 'Agency multi-store mode', desc: 'Manage unlimited client stores from one login. White-label reports, per-client billing, and role-based access built in.' },
    ],
    outcomes: [
      { metric: '€8.4k', label: 'recovered in the first month by a single pilot store' },
      { metric: '60%', label: 'reduction in weekly operator workload' },
      { metric: '10×', label: 'faster insight-to-action loop vs manual analytics' },
      { metric: '10,000+', label: 'products analyzed and re-written' },
    ],
    lessons: [
      'WooCommerce is an unfair distribution advantage. A third of the ecommerce web runs on it, and almost nobody is building AI-native tooling specifically for that layer.',
      'Founders don\'t want dashboards — they want verdicts. Every screen we shipped got ruthlessly simplified down to the question: "What should I do today?"',
      'Pricing is product. Moving from flat per-store to tiered by order volume doubled free-to-paid conversion within the first cohort.',
    ],
    quote: {
      text: 'Installed it on a Monday. Recovered €8,400 by the end of the month from carts I thought were dead. It pays for a year of itself every week now.',
      attribution: 'Pilot customer — fashion DTC, Berlin',
    },
  },

  // ────────────────────────────────────────────────────────────
  //   NISAM.VIDEO
  // ────────────────────────────────────────────────────────────
  {
    slug: 'nisam-video',
    name: 'nisam.video',
    url: 'https://nisam.video',
    year: '2016 — ongoing',
    category: 'Media · AI Curation',
    accent: '#F59E0B',
    tagline: 'AI-curated video for a region the algorithm forgot',
    hero: 'A sophisticated video discovery platform transforming YouTube content exploration through intelligent categorization and user-centric design — with a dedicated focus on independent investigative journalism in the Balkans.',
    summary:
      'nisam.video is a long-running, personally funded video hub that aggregates, categorizes, and surfaces independent and investigative Serbian-language content from across YouTube. The name is a Serbian pun — "nisam" means "I am not" — a quiet inversion of the region\'s political rhetoric: a platform for the voices that the mainstream says they are not.',
    role: 'Founder, product designer, developer, curator. Solo build and continuous operation since 2016.',
    stack: [
      'WordPress / custom theme',
      'YouTube Data API',
      'PHP + MySQL',
      'Custom taxonomy engine',
      'JS front-end',
      'AI classification layer (2024+)',
      'Self-hosted infrastructure',
    ],
    stats: [
      { num: '10+', label: 'years continuous operation' },
      { num: '1000s', label: 'of videos curated' },
      { num: '2', label: 'flagship channel streams (N1, Insajder)' },
      { num: '1', label: 'operator — solo project' },
    ],
    problem: {
      title: 'Algorithms don\'t serve small languages or small democracies',
      body: 'For a Serbian-speaking viewer who wants verified, independent journalism, YouTube\'s recommendation engine is useless — often actively hostile. It surfaces outrage, it buries long-form, and it has no concept of editorial weight. Meanwhile, channels like Insajder TV and N1 — doing the slow, serious work of investigative reporting in a region where that work is genuinely dangerous — stay invisible to the casual viewer who might otherwise become a regular one. The information exists. The discovery does not.',
    },
    approach: [
      {
        title: 'Editorial curation as the product',
        body: 'nisam.video was never built to scale — it was built to be right. Every channel admitted to the platform is vetted. Every video surfaced is categorized by a human-plus-AI pass before it shows up on the homepage. Reach is a side effect of trust.',
      },
      {
        title: 'A custom taxonomy engine',
        body: 'YouTube\'s own categories are useless for investigative work. nisam.video runs a custom taxonomy — program, topic, subject, timeline event, named entity — so a viewer can follow a story, not a channel. AI classification (added in 2024) automates the first pass; a human confirms.',
      },
      {
        title: 'Live streams pinned where they belong',
        body: 'N1 and Insajder TV have dedicated live-stream pages that survive YouTube URL changes, channel rebrands, and regional blackouts. One URL the audience can bookmark — we handle the plumbing behind it.',
      },
      {
        title: 'Ten years of compounding archive',
        body: 'The platform has been online since 2016. Every curated video, every interview, every daily news segment is still reachable at a stable URL — a searchable record of the region\'s political and media history that YouTube alone does not preserve.',
      },
    ],
    features: [
      { title: 'Curated channel roster', desc: 'Vetted independent and investigative sources — Insajder TV, N1, and more — surfaced as first-class citizens of the homepage.' },
      { title: 'Program-level categorization', desc: 'Follow "Insajder Intervju" or "Dnevnik N1" as a program, across years — not just as a channel feed.' },
      { title: 'AI classification layer', desc: 'Incoming videos auto-tagged by topic, entity, and sentiment before editorial review. Built on a lightweight local model to keep curation costs near zero.' },
      { title: 'Stable archive URLs', desc: 'Every video lives at a permanent nisam.video URL, even when the underlying YouTube source is moved, renamed, or removed.' },
      { title: 'Live stream redirector', desc: 'Dedicated /n1-video-stream/ and /insajder-tv/ pages that always resolve to the current live feed — no hunting required.' },
      { title: 'Regional-first performance', desc: 'Fast-loading, mobile-heavy design optimized for Balkan mobile networks and the actual devices the audience is on.' },
    ],
    outcomes: [
      { metric: '10 yrs', label: 'of continuous uptime since 2016' },
      { metric: '0 €', label: 'external funding — self-sustained' },
      { metric: '100%', label: 'of featured content vetted before publication' },
      { metric: '∞', label: 'patience for stories the algorithm won\'t carry' },
    ],
    lessons: [
      'Scale is not the point. For small languages and regional journalism, being the right-sized, trusted hub beats chasing global numbers — and it survives longer.',
      'AI didn\'t replace curation; it made curation tractable. A solo operator with a classification model can now do what a newsroom editorial team used to.',
      'Owning the URL is owning the archive. Every piece of content that only lives on a platform you don\'t control is a piece of history that can be deleted for you.',
    ],
    quote: {
      text: 'Building nisam.video was never about product-market fit. It was about making sure the stories that matter in this region have somewhere to live that isn\'t at the mercy of a recommendation algorithm.',
      attribution: 'Marko Tiosavljevic — founder, nisam.video',
    },
  },
]

export function getProjectBySlug(slug: string): CaseStudyData | undefined {
  return PROJECTS_DATA.find(p => p.slug === slug)
}
