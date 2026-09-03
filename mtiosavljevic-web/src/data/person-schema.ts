/**
 * JSON-LD Person schema for the homepage.
 *
 * `sameAs` carries only profiles that were actually supplied. The personal
 * Upwork profile URL is not known — see the TODO below. A guessed URL in
 * sameAs is worse than an absent one, because search engines use it to merge
 * entity records.
 */
export const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Marko Tiosavljević',
  alternateName: 'Marko Tiosavljevic',
  jobTitle: 'AI & LLM Scientist',
  url: 'https://mtiosavljevic.com',
  email: 'marko@mtiosavljevic.com',
  description:
    'AI & LLM scientist working on multi-model consensus, self-developing agents, and agent memory systems. 38 years in software development, 30 in marketing, 6 in AI and LLM research.',
  sameAs: [
    'https://github.com/magnetoid',
    // TODO: add the personal Upwork profile URL once confirmed. The only Upwork
    // link found in this repo was the Imba Production company page, not a profile.
  ],
  knowsAbout: [
    'Large language models',
    'Multi-model consensus',
    'Autonomous agents',
    'Agent memory systems',
    'Model Context Protocol',
    'Full-stack e-commerce',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Imba Production LLC',
    foundingDate: '2005',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Belgrade',
    addressCountry: 'RS',
  },
}
