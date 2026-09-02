export interface SystemEntry {
  id: string
  name: string
  kind: string
  problem: string
  approach: string
  status: string
  repoUrl?: string
  repoLabel?: string
  /** Set when the entry could not be fully sourced from supplied facts. */
  todo?: string
}

/**
 * Systems & experiments, written as a publications list: Problem -> Approach -> Status.
 * Entries carry only what is verifiable from the repositories and the supplied facts.
 * Where a repository URL was not supplied, `todo` records it rather than guessing one.
 */
export const SYSTEMS: SystemEntry[] = [
  {
    id: 'quorum',
    name: 'Quorum',
    kind: 'Multi-LLM consensus reasoning engine',
    problem:
      'A single language model is a single point of failure, and the dangerous failure is not refusal but confident invention. Betting a workflow on one model also bets it on one vendor.',
    approach:
      'Convene a council of models on the same question and treat the answers as votes. Cluster them semantically with embeddings so paraphrase counts as agreement, score the level of agreement, and escalate to more expensive tiers only when the cheap ones fail to converge. Where the council genuinely splits, the split is reported rather than resolved.',
    status: 'Open source, Apache-2.0. Active.',
    repoUrl: 'https://github.com/magnetoid/Quorum',
    repoLabel: 'github.com/magnetoid/Quorum',
  },
  {
    id: 'janus',
    name: 'Janus',
    kind: 'Self-developing, self-healing AI agent',
    problem:
      'Agents fail in ways their authors did not anticipate, and every recovery path someone writes by hand is a path someone has to maintain. An agent that cannot modify itself needs a human for every repair; one that can modify itself can also damage its own guarantees.',
    approach:
      'Give the agent the ability to diagnose its own failures and rewrite its own behaviour, then constrain that ability — the research interest is in where the boundary of safe self-modification sits, not in removing it.',
    status: 'In development.',
    repoUrl: 'https://github.com/magnetoid/janus',
    repoLabel: 'github.com/magnetoid/janus',
    todo: 'Expand Approach with the actual self-modification boundary and repair loop once the design is settled.',
  },
  {
    id: 'torsor-helper',
    name: 'torsor-helper',
    kind: 'Local-first MCP server for agent memory and guardrails',
    problem:
      'A new session is a blank slate, long sessions drift, and agents optimise for what was said recently rather than what is durably true. They rebuild code that already exists and reintroduce patterns that were explicitly rejected, with no audit trail.',
    approach:
      'An external memory the agent re-reads at session start, ranked by stability rather than recency, fused from vector and full-text search. Architectural decisions are captured as enforceable rules with a drift check, so a rejected pattern fails the build instead of quietly returning. Markdown is the source of truth, which keeps the agent\'s memory reviewable and diffable like the rest of the repository.',
    status: 'Open source, MIT. Local-first — no API key required to run the memory layer.',
    repoUrl: 'https://github.com/magnetoid/torsor-helper',
    repoLabel: 'github.com/magnetoid/torsor-helper',
  },
  {
    id: 'blob',
    name: 'Blob',
    kind: 'Agentic-first AI team workspace',
    problem:
      'Collaboration tools were designed for teams of people who occasionally use AI, not for teams where agents are participants with their own state, permissions, and work in progress.',
    approach:
      'Treat the agent as a first-class member of the workspace rather than a feature bolted onto a chat window.',
    status: 'In development.',
    todo: 'Needs a real Problem/Approach from the project itself, plus a repo or product URL if one should be public.',
  },
  {
    id: 'morpheus-os',
    name: 'Morpheus OS',
    kind: 'AI-native commerce operating system',
    problem:
      'Commerce platforms consume an AI API as an afterthought. Neither a rules engine nor a chatbot is a tool-using agent that can read a store and act on it, and monoliths make extension risky enough that most never try.',
    approach:
      'A deliberately small core — catalog, cart, checkout, fulfilment — with everything else as a plugin under a modularity contract that tears down cleanly when a plugin is disabled. Agents are treated as a first-class audience: a merchant assistant in the core, an agent kernel with capability scopes, and audience-scoped protocol endpoints so external AI clients can transact without a bespoke integration.',
    status: 'Running in production.',
    todo: 'Add the public repository URL if Morpheus OS is open source.',
  },
  {
    id: 'woopulse',
    name: 'WooPulse',
    kind: 'AI-powered WooCommerce command center',
    problem:
      'A solo store operator has to be a merchandiser, a copywriter, a pricing analyst, and a competitor researcher at once. The tooling that does this well is priced and scoped for teams of ten.',
    approach:
      'Connect over the WooCommerce REST API and score opportunities from the first sync. Consensus drafting across several models where judgement matters — copy and outreach — and cheap local models where it does not, so the economics of the AI layer stay sane. Privacy-sensitive stores can route generation through a local model instead of a hosted API.',
    status: 'Live.',
    todo: 'Add the public repository URL if one exists.',
  },
  {
    id: 'tenso',
    name: 'Tenso',
    kind: 'Experimental language for neural-network development',
    problem:
      'General-purpose languages describe neural networks through library calls, which leaves the structure of a model implicit in the host language rather than expressible in its own terms.',
    approach:
      'An exploration of what a language designed for neural-network development would make first-class.',
    status: 'Exploration. Not a product.',
    todo: 'Needs a real Problem/Approach once the language design has a position, plus a repo if it becomes public.',
  },
]
