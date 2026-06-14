import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Loader2, Upload, Download, FileText } from 'lucide-react'

const IMAGE_EXT_RE = /\.(jpg|jpeg|png|gif|webp|svg|avif)(\?.*)?$/i

function fileNameFromUrl(url: string) {
  try {
    const u = new URL(url)
    const raw = u.pathname.split('/').filter(Boolean).pop() || `image-${Date.now()}.jpg`
    return raw.replace(/[^a-zA-Z0-9._-]/g, '-')
  } catch {
    return `image-${Date.now()}.jpg`
  }
}

function mimeFromFilename(filename: string) {
  const lower = filename.toLowerCase()
  if (lower.endsWith('.png')) return 'image/png'
  if (lower.endsWith('.gif')) return 'image/gif'
  if (lower.endsWith('.webp')) return 'image/webp'
  if (lower.endsWith('.svg')) return 'image/svg+xml'
  if (lower.endsWith('.avif')) return 'image/avif'
  return 'image/jpeg'
}

type MigrationStats = {
  attempted: number
  uploaded: number
  reused: number
  failed: Array<{ url: string; reason: string }>
}

async function migrateImageToMedia(
  url: string,
  slug: string,
  cache: Map<string, string>,
  stats?: MigrationStats,
  dryRun = false,
): Promise<string> {
  const normalized = (url || '').trim()
  if (!normalized) return url
  if (cache.has(normalized)) {
    stats && (stats.reused += 1)
    return cache.get(normalized)!
  }

  stats && (stats.attempted += 1)

  if (dryRun) {
    const predicted = `/supabase/storage/v1/object/public/media/wp-import/${slug || 'post'}-${fileNameFromUrl(normalized)}`
    cache.set(normalized, predicted)
    return predicted
  }

  const res = await fetch(normalized)
  if (!res.ok) throw new Error(`Failed image fetch (${res.status}) for ${normalized}`)

  const blob = await res.blob()
  const original = fileNameFromUrl(normalized)
  const storagePath = `wp-import/${slug || 'post'}-${Date.now()}-${original}`
  const contentType = blob.type || mimeFromFilename(original)

  const { data: uploadData, error: uploadErr } = await supabase.storage
    .from('media')
    .upload(storagePath, blob, { contentType, upsert: true })

  if (uploadErr) throw new Error(`Failed image upload for ${normalized}: ${uploadErr.message}`)

  const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(uploadData.path)

  await supabase.from('media_files').upsert([{
    filename: uploadData.path,
    original_name: original,
    mime_type: contentType,
    size: blob.size,
    url: publicUrl,
  }], { onConflict: 'filename' })

  cache.set(normalized, publicUrl)
  stats && (stats.uploaded += 1)
  return publicUrl
}

async function migrateHtmlImages(
  html: string,
  slug: string,
  cache: Map<string, string>,
  stats?: MigrationStats,
  dryRun = false,
): Promise<string> {
  if (!html || !html.includes('<img')) return html
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const imgs = Array.from(doc.querySelectorAll('img'))

  for (const img of imgs) {
    const src = img.getAttribute('src') || ''
    if (!src || src.startsWith('data:') || src.startsWith('blob:')) continue
    if (!/^https?:\/\//i.test(src)) continue
    if (!IMAGE_EXT_RE.test(src) && !src.includes('/uploads/')) continue

    try {
      const newSrc = await migrateImageToMedia(src, slug, cache, stats, dryRun)
      img.setAttribute('src', newSrc)
      const srcset = img.getAttribute('srcset')
      if (srcset) img.removeAttribute('srcset')
    } catch (e: any) {
      const reason = e?.message || 'unknown error'
      stats?.failed.push({ url: src, reason })
      console.warn('Image migration failed, keeping original URL:', src, e)
    }
  }

  return doc.body.innerHTML
}

interface ParsedPost {
  title: string
  slug: string
  excerpt: string
  body: string
  featured_image_url?: string
  cover_image_url?: string
  published: boolean
  created_at: string
  category: string
  tags: string[]
}

function toSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function parseWPXml(xmlText: string): ParsedPost[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlText, 'text/xml')
  const items = Array.from(doc.querySelectorAll('item'))
  
  function safeDate(dateStr: string | null | undefined): string {
    if (!dateStr || dateStr.startsWith('0000-00-00')) return new Date().toISOString();
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
  }

  function htmlToText(html: string): string {
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    return (tmp.textContent || tmp.innerText || '').replace(/\s+/g, ' ').trim()
  }

  function firstImageFromHtml(html: string): string | undefined {
    const m = html.match(/<img[^>]+src=["']([^"']+)["']/i)
    return m?.[1]
  }

  return items
    .filter(item => {
      const postType = item.getElementsByTagName('wp:post_type')[0]?.textContent || item.querySelector('post_type')?.textContent;
      return postType === 'post';
    })
    .map(item => {
      const title = item.querySelector('title')?.textContent || '';
      const slug = item.getElementsByTagName('wp:post_name')[0]?.textContent || item.querySelector('post_name')?.textContent || toSlug(title);
      
      const contentNodes = item.getElementsByTagName('content:encoded');
      const content = contentNodes.length > 0 ? contentNodes[0].textContent : item.querySelector('encoded')?.textContent;
      
      const excerptNodes = item.getElementsByTagName('excerpt:encoded');
      const excerptRaw = excerptNodes.length > 0 ? excerptNodes[0].textContent : null;
      const excerpt = (excerptRaw && excerptRaw.trim())
        ? excerptRaw
        : htmlToText(content || '').substring(0, 320)

      const statusNodes = item.getElementsByTagName('wp:status');
      const status = statusNodes.length > 0 ? statusNodes[0].textContent : item.querySelector('status')?.textContent;

      const dateNodes = item.getElementsByTagName('wp:post_date');
      const postDate = dateNodes.length > 0 ? dateNodes[0].textContent : item.querySelector('post_date')?.textContent;
      const extractedFromBody = firstImageFromHtml(content || '')

      return {
        title,
        slug: slug || toSlug(title),
        excerpt: excerpt.substring(0, 300),
        body: content || '',
        featured_image_url: extractedFromBody,
        cover_image_url: extractedFromBody,
        published: status === 'publish',
        created_at: safeDate(postDate),
        category: item.querySelector('category[domain="category"]')?.textContent || '',
        tags: Array.from(item.querySelectorAll('category[domain="post_tag"]'))
          .map(t => t.textContent || '')
          .filter(Boolean),
      }
    })
}

export default function ImportAdmin() {
  const [parsedPosts, setParsedPosts] = useState<ParsedPost[]>([])
  const [importing, setImporting] = useState(false)
  const [importProgress, setImportProgress] = useState(0)
  const [importDone, setImportDone] = useState(false)
  const [importError, setImportError] = useState('')
  const [exporting, setExporting] = useState(false)
  const [migrateImages, setMigrateImages] = useState(true)
  const [dryRun, setDryRun] = useState(true)
  const [report, setReport] = useState<MigrationStats | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setParsedPosts([])
    setImportDone(false)
    setImportError('')
    const reader = new FileReader()
    reader.onload = ev => {
      const text = ev.target?.result as string
      try {
        const posts = parseWPXml(text)
        setParsedPosts(posts)
      } catch (err) {
        setImportError('Failed to parse XML file.')
        console.error(err)
      }
    }
    reader.readAsText(file)
  }

  async function handleImport() {
    if (!parsedPosts.length) return
    setImporting(true)
    setImportProgress(0)
    setImportError('')
    setImportDone(false)
    setReport(null)

    try {
      console.log('Starting import process...', parsedPosts.length, 'posts');
      
      const imageStats: MigrationStats = { attempted: 0, uploaded: 0, reused: 0, failed: [] }

      // Collect unique categories
      const categoryNames = [...new Set(parsedPosts.map(p => p.category).filter(Boolean))]
      const categoryMap: Record<string, string> = {}

      if (!dryRun) {
        for (const name of categoryNames) {
          const slug = toSlug(name)
          // Upsert category
          const { data: existing, error: existingError } = await supabase
            .from('blog_categories')
            .select('id')
            .eq('slug', slug)
            .maybeSingle()

          if (existingError) {
            console.warn(`Error checking category ${name}:`, existingError)
          }

          if (existing) {
            categoryMap[name] = existing.id
          } else {
            const { error: insertError } = await supabase
              .from('blog_categories')
              .insert([{ name, slug }])

            if (insertError) {
              const msg = insertError.message || insertError.details || insertError.hint || insertError.code || 'Unknown insert error (check RLS policies)'
              console.error(`Failed to create category ${name}:`, { message: insertError.message, details: insertError.details, hint: insertError.hint, code: insertError.code })
              throw new Error(`Failed to create category "${name}": ${msg}`)
            }

            const { data: created, error: fetchError } = await supabase
              .from('blog_categories')
              .select('id')
              .eq('slug', slug)
              .single()

            if (fetchError || !created) {
              console.error(`Category "${name}" inserted but not found:`, fetchError)
              throw new Error(`Failed to create category "${name}": inserted but could not read back — check RLS SELECT policy`)
            }
            categoryMap[name] = created.id
          }
        }
      }

      // Import posts in batches of 10
      const imageCache = new Map<string, string>()
      const BATCH = 10
      let done = 0
      for (let i = 0; i < parsedPosts.length; i += BATCH) {
        const batch = parsedPosts.slice(i, i + BATCH)
        const payload: any[] = []

        for (const p of batch) {
          let migratedBody = p.body || ''
          let migratedFeatured = p.featured_image_url || p.cover_image_url || null

          if (migrateImages) {
            migratedBody = await migrateHtmlImages(migratedBody, p.slug, imageCache, imageStats, dryRun)

            if (migratedFeatured && /^https?:\/\//i.test(migratedFeatured)) {
              try {
                migratedFeatured = await migrateImageToMedia(migratedFeatured, p.slug, imageCache, imageStats, dryRun)
              } catch (e: any) {
                imageStats.failed.push({ url: migratedFeatured, reason: e?.message || 'unknown error' })
                console.warn('Featured image migration failed, keeping original URL:', migratedFeatured, e)
              }
            }
          }

          payload.push({
            title: p.title || 'Untitled',
            slug: p.slug || toSlug(p.title || `post-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`),
            excerpt: p.excerpt || '',
            body: migratedBody,
            cover_image_url: migratedFeatured,
            featured_image_url: migratedFeatured,
            published: p.published,
            published_at: p.published ? p.created_at : null,
            created_at: p.created_at,
            category: p.category || null,
            category_id: (p.category && categoryMap[p.category]) ? categoryMap[p.category] : null,
            tags: p.tags || [],
            status: p.published ? 'published' : 'draft',
          })
        }

        console.log(`Importing batch ${i/BATCH + 1}...`, payload.map(p => p.slug));

        if (!dryRun) {
          const { error: err } = await supabase.from('blog_posts').upsert(payload, { onConflict: 'slug' })
          if (err) {
            console.error("Batch insert error:", err)
            throw new Error(`Failed to import batch: ${err.message}`)
          }
        }
        done += batch.length
        setImportProgress(Math.round((done / parsedPosts.length) * 100))
      }

      console.log('Import completed successfully!');
      setReport(imageStats)
      setImportDone(true)
    } catch (err: any) {
      console.error("Import failed:", err)
      setImportError(err.message || "An unexpected error occurred during import. Check console for details.")
    } finally {
      setImporting(false)
    }
  }

  async function handleExport() {
    setExporting(true)
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    const json = JSON.stringify(data || [], null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `blog-posts-export-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    setExporting(false)
  }

  // Unique category count
  const uniqueCategories = [...new Set(parsedPosts.map(p => p.category).filter(Boolean))]
  const allTags = [...new Set(parsedPosts.flatMap(p => p.tags))]

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Import / Export</h1>
        <p className="text-muted-foreground text-sm mt-1">Import from WordPress XML or export blog posts as JSON</p>
      </div>

      {/* IMPORT SECTION */}
      <section className="mb-10">
        <h2 className="text-lg font-medium text-foreground mb-4">WordPress XML Import</h2>

        <div
          className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors mb-4"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Click to select a WordPress export XML file</p>
          <p className="text-xs text-muted-foreground/60 mt-1">File → Export in WordPress admin</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".xml"
          className="hidden"
          onChange={handleFileChange}
        />

        {parsedPosts.length > 0 && (
          <div className="border border-border rounded-lg p-4 mb-4 bg-card">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">Preview</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-semibold text-foreground">{parsedPosts.length}</div>
                <div className="text-xs text-muted-foreground">Posts</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-foreground">{uniqueCategories.length}</div>
                <div className="text-xs text-muted-foreground">Categories</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-foreground">{allTags.length}</div>
                <div className="text-xs text-muted-foreground">Unique tags</div>
              </div>
            </div>
            {uniqueCategories.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-muted-foreground mb-1">Categories found:</p>
                <div className="flex flex-wrap gap-1.5">
                  {uniqueCategories.map(c => (
                    <span key={c} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{c}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {importing && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">Importing... {importProgress}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{ width: `${importProgress}%` }}
              />
            </div>
          </div>
        )}

        {importDone && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-md">
            <p className="text-sm text-green-600 dark:text-green-400">
              {dryRun
                ? `Dry run complete. ${parsedPosts.length} posts analyzed (no DB writes).`
                : `Import complete! ${parsedPosts.length} posts processed.`}
            </p>
          </div>
        )}

        {report && migrateImages && (
          <div className="mb-4 p-3 bg-muted/40 border border-border rounded-md text-sm">
            <p><strong>Image migration report</strong></p>
            <p>Attempted: {report.attempted} · Uploaded: {report.uploaded} · Reused: {report.reused} · Failed: {report.failed.length}</p>
            {report.failed.length > 0 && (
              <div className="mt-2 max-h-32 overflow-auto text-xs">
                {report.failed.slice(0, 20).map((f, idx) => (
                  <div key={`${f.url}-${idx}`}>• {f.url} — {f.reason}</div>
                ))}
                {report.failed.length > 20 && <div>…and {report.failed.length - 20} more</div>}
              </div>
            )}
          </div>
        )}

        {importError && (
          <p className="text-destructive text-sm mb-4">{importError}</p>
        )}

        <label className="flex items-center gap-2 mb-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={migrateImages}
            onChange={(e) => setMigrateImages(e.target.checked)}
          />
          Migrate image files to local media library (recommended)
        </label>

        <label className="flex items-center gap-2 mb-4 text-sm text-foreground">
          <input
            type="checkbox"
            checked={dryRun}
            onChange={(e) => setDryRun(e.target.checked)}
          />
          Dry run only (analyze + report, no DB writes)
        </label>

        <Button
          onClick={handleImport}
          disabled={!parsedPosts.length || importing}
          className="w-full"
        >
          {importing ? (
            <><Loader2 className="h-4 w-4 animate-spin mr-2" />Importing {importProgress}%...</>
          ) : (
            <><Upload className="h-4 w-4 mr-2" />Import {parsedPosts.length > 0 ? `${parsedPosts.length} posts` : 'posts'}</>
          )}
        </Button>
      </section>

      <Separator />

      {/* EXPORT SECTION */}
      <section className="mt-10">
        <h2 className="text-lg font-medium text-foreground mb-2">Export Blog Posts</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Download all blog posts as a JSON file for backup or migration.
        </p>
        <Button variant="outline" onClick={handleExport} disabled={exporting}>
          {exporting ? (
            <><Loader2 className="h-4 w-4 animate-spin mr-2" />Exporting...</>
          ) : (
            <><Download className="h-4 w-4 mr-2" />Export as JSON</>
          )}
        </Button>
      </section>
    </div>
  )
}

