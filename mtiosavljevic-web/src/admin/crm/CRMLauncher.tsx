import { useEffect } from 'react'
import { ExternalLink, Loader2 } from 'lucide-react'

const CRM_URL = (import.meta.env.VITE_CRM_URL as string) || ''

/**
 * The AI CRM is served centrally by the imba-crm deployment and updates
 * automatically. This launcher replaces the old in-app CRM screens: when
 * VITE_CRM_URL is set, it sends the operator straight to the central CRM.
 */
export default function CRMLauncher() {
  useEffect(() => {
    if (CRM_URL) {
      const t = setTimeout(() => { window.location.href = CRM_URL }, 600)
      return () => clearTimeout(t)
    }
  }, [])

  if (!CRM_URL) {
    return (
      <div className="p-10 max-w-xl">
        <h1 className="text-lg font-semibold text-foreground mb-2">CRM not configured</h1>
        <p className="text-sm text-muted-foreground">
          Set <code className="font-mono text-amber-500">VITE_CRM_URL</code> to the central
          imba-crm deployment and rebuild. The CRM is served centrally and updates automatically.
        </p>
      </div>
    )
  }

  return (
    <div className="p-10 flex flex-col items-start gap-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Opening the AI CRM…</span>
      </div>
      <a
        href={CRM_URL}
        className="inline-flex items-center gap-2 text-sm font-medium text-amber-500 hover:text-amber-400"
      >
        Open the AI CRM <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  )
}
