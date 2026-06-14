const BLOCKED_TAGS = new Set(['script', 'style', 'iframe', 'object', 'embed', 'link', 'meta'])

function scrubNodeAttributes(element: Element) {
  for (const attr of Array.from(element.attributes)) {
    const name = attr.name.toLowerCase()
    const value = attr.value.trim().toLowerCase()

    if (name.startsWith('on')) {
      element.removeAttribute(attr.name)
      continue
    }

    if ((name === 'href' || name === 'src') && value.startsWith('javascript:')) {
      element.removeAttribute(attr.name)
    }
  }
}

export function sanitizeHtml(input: string | undefined): string {
  if (!input) return ''

  if (typeof window === 'undefined') {
    return input
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
      .replace(/\son\w+="[^"]*"/gi, '')
      .replace(/\son\w+='[^']*'/gi, '')
      .replace(/javascript:/gi, '')
  }

  const parser = new DOMParser()
  const doc = parser.parseFromString(input, 'text/html')

  for (const tag of BLOCKED_TAGS) {
    doc.querySelectorAll(tag).forEach((node) => node.remove())
  }

  doc.querySelectorAll('*').forEach((element) => scrubNodeAttributes(element))

  return doc.body.innerHTML
}

export function stripHtml(input: string | undefined, fallback = 'Structured content lives here.'): string {
  if (!input) return fallback

  const withoutTags = input.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  return withoutTags || fallback
}
