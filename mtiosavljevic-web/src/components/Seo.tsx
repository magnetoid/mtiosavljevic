import { Helmet } from 'react-helmet-async'

interface SeoProps {
  title?: string
  description?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  canonicalPath?: string
  noIndex?: boolean
  structuredData?: object | object[]
  publishedTime?: string
  modifiedTime?: string
}

const SITE_NAME = 'Marko Tiosavljević'
const SITE_URL = 'https://mtiosavljevic.com'
const DEFAULT_DESC = 'AI & LLM scientist building multi-model consensus engines, self-healing agents, and agent memory systems. 38 years in software, 30 in marketing, 6 in AI/LLM research. Founder of Imba Production.'
// TODO: no og:image asset exists yet — add public/og-default.jpg (1200x630) and set this.
const DEFAULT_OG_IMAGE = ''

export default function Seo({
  title,
  description = DEFAULT_DESC,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  canonicalPath,
  noIndex = false,
  structuredData,
  publishedTime,
  modifiedTime,
}: SeoProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — AI & LLM Scientist · Developer · Marketer`
  const canonical = canonicalPath ? `${SITE_URL}${canonicalPath}` : undefined
  const schemas = structuredData
    ? Array.isArray(structuredData) ? structuredData : [structuredData]
    : []

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {noIndex
        ? <meta name="robots" content="noindex, nofollow" />
        : <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      }

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitle ?? fullTitle} />
      <meta property="og:description" content={ogDescription ?? description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImage && <meta property="og:image:width" content="1200" />}
      {ogImage && <meta property="og:image:height" content="630" />}
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:site_name" content={SITE_NAME} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content={ogImage ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={ogTitle ?? fullTitle} />
      <meta name="twitter:description" content={ogDescription ?? description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Structured data — one <script> per schema */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}
