/**
 * Minimal architecture sketches — one per system, drawn in the margin the way a
 * diagram gets pencilled next to a notebook entry. Hairline strokes, no fills,
 * no screenshots. `--signal` marks the one part of each diagram that carries the
 * idea: the dissent branch, the guardrail, the durable store, and so on.
 */

const S = { stroke: 'currentColor', strokeWidth: 1, fill: 'none' } as const
const HEAD = 'url(#arrowhead)'

function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 200 128"
      role="img"
      aria-label={label}
      className="w-full max-w-[200px] text-smoke-faint"
    >
      <defs>
        <marker id="arrowhead" viewBox="0 0 8 8" refX="7" refY="4"
          markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0,1 L7,4 L0,7" fill="none" stroke="currentColor" strokeWidth="1" />
        </marker>
      </defs>
      {children}
    </svg>
  )
}

const T = 'font-mono' as const
const tx = { fontSize: 7, fill: 'currentColor' } as const
const txSignal = { fontSize: 7, fill: 'var(--signal)' } as const

export default function SystemSketch({ id }: { id: string }) {
  switch (id) {
    case 'quorum':
      return (
        <Frame label="Four models answer the same question; answers are clustered by meaning into one result, with a separate branch for the cases where the council disagrees.">
          {[18, 60, 102, 144].map((x, i) => (
            <g key={x}>
              <rect x={x} y={6} width={38} height={16} {...S} />
              <text x={x + 19} y={17} textAnchor="middle" className={T} {...tx}>m{i + 1}</text>
              <line x1={x + 19} y1={22} x2={100} y2={44} {...S} markerEnd={HEAD} />
            </g>
          ))}
          <rect x={58} y={46} width={84} height={18} {...S} />
          <text x={100} y={58} textAnchor="middle" className={T} {...tx}>cluster by meaning</text>
          <line x1={82} y1={64} x2={64} y2={86} {...S} markerEnd={HEAD} />
          <line x1={118} y1={64} x2={136} y2={86} {...S} markerEnd={HEAD} />
          <rect x={30} y={88} width={68} height={18} {...S} />
          <text x={64} y={100} textAnchor="middle" className={T} {...tx}>consensus</text>
          <rect x={104} y={88} width={68} height={18} stroke="var(--signal)" strokeWidth={1} fill="none" />
          <text x={138} y={100} textAnchor="middle" className={T} {...txSignal}>disputed</text>
        </Frame>
      )

    case 'janus':
      return (
        <Frame label="An agent loops between running, detecting its own faults, and rewriting itself; the rewrite step is enclosed by a guardrail boundary that bounds what it may change.">
          <rect x={10} y={14} width={180} height={100} stroke="var(--signal)" strokeWidth={1}
            fill="none" strokeDasharray="3 3" />
          <text x={100} y={9} textAnchor="middle" className={T} {...txSignal}>bounded self-modification</text>
          <rect x={26} y={34} width={50} height={18} {...S} />
          <text x={51} y={46} textAnchor="middle" className={T} {...tx}>run</text>
          <rect x={124} y={34} width={50} height={18} {...S} />
          <text x={149} y={46} textAnchor="middle" className={T} {...tx}>detect</text>
          <rect x={75} y={80} width={50} height={18} {...S} />
          <text x={100} y={92} textAnchor="middle" className={T} {...tx}>rewrite</text>
          <line x1={76} y1={43} x2={124} y2={43} {...S} markerEnd={HEAD} />
          <line x1={149} y1={52} x2={125} y2={80} {...S} markerEnd={HEAD} />
          <line x1={75} y1={89} x2={51} y2={52} {...S} markerEnd={HEAD} />
        </Frame>
      )

    case 'torsor-helper':
      return (
        <Frame label="Successive sessions each read from and write to one persistent store; a drift check sits between the sessions and the store.">
          {[14, 76, 138].map((x, i) => (
            <g key={x}>
              <rect x={x} y={8} width={48} height={18} {...S} />
              <text x={x + 24} y={20} textAnchor="middle" className={T} {...tx}>session {i + 1}</text>
              <line x1={x + 24} y1={26} x2={x + 24} y2={52} {...S} markerEnd={HEAD} />
            </g>
          ))}
          <rect x={14} y={54} width={172} height={16} stroke="var(--signal)" strokeWidth={1} fill="none" />
          <text x={100} y={65} textAnchor="middle" className={T} {...txSignal}>drift check</text>
          <line x1={100} y1={70} x2={100} y2={86} {...S} markerEnd={HEAD} />
          <rect x={14} y={88} width={172} height={26} {...S} />
          <text x={100} y={99} textAnchor="middle" className={T} {...tx}>durable store</text>
          <text x={100} y={109} textAnchor="middle" className={T} {...tx}>ranked by stability</text>
        </Frame>
      )

    case 'blob':
      return (
        <Frame label="A shared workspace in which human members and agent members are peers of equal standing.">
          <rect x={12} y={16} width={176} height={98} {...S} />
          <text x={100} y={11} textAnchor="middle" className={T} {...tx}>workspace</text>
          {[
            { x: 30, y: 36, l: 'person' }, { x: 112, y: 36, l: 'agent' },
            { x: 30, y: 76, l: 'agent' }, { x: 112, y: 76, l: 'person' },
          ].map((n, i) => (
            <g key={i}>
              <rect x={n.x} y={n.y} width={58} height={20}
                stroke={n.l === 'agent' ? 'var(--signal)' : 'currentColor'} strokeWidth={1} fill="none" />
              <text x={n.x + 29} y={n.y + 13} textAnchor="middle" className={T}
                {...(n.l === 'agent' ? txSignal : tx)}>{n.l}</text>
            </g>
          ))}
          <line x1={88} y1={46} x2={112} y2={46} {...S} />
          <line x1={88} y1={86} x2={112} y2={86} {...S} />
          <line x1={59} y1={56} x2={59} y2={76} {...S} />
          <line x1={141} y1={56} x2={141} y2={76} {...S} />
        </Frame>
      )

    case 'morpheus-os':
      return (
        <Frame label="A small commerce core surrounded by plugins, with an external AI client entering through a protocol port rather than a bespoke integration.">
          <rect x={72} y={50} width={56} height={28} {...S} />
          <text x={100} y={62} textAnchor="middle" className={T} {...tx}>core</text>
          <text x={100} y={72} textAnchor="middle" className={T} {...tx}>cart · checkout</text>
          {[[46,22],[100,14],[154,22],[46,100],[154,100]].map(([cx, cy], i) => (
            <g key={i}>
              <rect x={cx - 20} y={cy - 8} width={40} height={16} {...S} />
              <text x={cx} y={cy + 3} textAnchor="middle" className={T} {...tx}>plugin</text>
            </g>
          ))}
          <line x1={100} y1={22} x2={100} y2={50} {...S} />
          <line x1={62} y1={28} x2={80} y2={50} {...S} />
          <line x1={138} y1={28} x2={120} y2={50} {...S} />
          <line x1={62} y1={96} x2={80} y2={78} {...S} />
          <line x1={138} y1={96} x2={120} y2={78} {...S} />
          <line x1={8} y1={64} x2={70} y2={64} stroke="var(--signal)" strokeWidth={1} markerEnd={HEAD} />
          <text x={8} y={57} className={T} {...txSignal}>agent</text>
        </Frame>
      )

    case 'woopulse':
      return (
        <Frame label="A store syncs over one API, opportunities are scored, and actions are proposed; sensitive generation is routed to a local model instead of a hosted one.">
          {[['store', 12], ['sync', 62], ['score', 112], ['act', 162]].map(([l, x], i) => (
            <g key={i}>
              <rect x={Number(x)} y={30} width={38} height={18} {...S} />
              <text x={Number(x) + 19} y={42} textAnchor="middle" className={T} {...tx}>{l}</text>
              {i < 3 && <line x1={Number(x) + 38} y1={39} x2={Number(x) + 62} y2={39} {...S} markerEnd={HEAD} />}
            </g>
          ))}
          <line x1={131} y1={48} x2={131} y2={78} {...S} markerEnd={HEAD} />
          <rect x={86} y={80} width={90} height={18} stroke="var(--signal)" strokeWidth={1} fill="none" />
          <text x={131} y={92} textAnchor="middle" className={T} {...txSignal}>local model</text>
          <text x={131} y={112} textAnchor="middle" className={T} {...tx}>for private stores</text>
        </Frame>
      )

    case 'tenso':
      return (
        <Frame label="An exploration: source text compiled into a tensor graph that the language would treat as a first-class construct. Drawn provisionally because the design is not settled.">
          <rect x={16} y={16} width={54} height={18} {...S} strokeDasharray="3 3" />
          <text x={43} y={28} textAnchor="middle" className={T} {...tx}>source</text>
          <line x1={70} y1={25} x2={100} y2={25} {...S} strokeDasharray="3 3" markerEnd={HEAD} />
          <rect x={102} y={16} width={82} height={18} stroke="var(--signal)" strokeWidth={1}
            fill="none" strokeDasharray="3 3" />
          <text x={143} y={28} textAnchor="middle" className={T} {...txSignal}>tensor graph</text>
          {[[40,66],[100,66],[160,66],[70,104],[130,104]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={7} {...S} strokeDasharray="3 3" />
          ))}
          <g strokeDasharray="3 3">
            <line x1={143} y1={34} x2={100} y2={59} {...S} />
            <line x1={47} y1={66} x2={93} y2={66} {...S} />
            <line x1={107} y1={66} x2={153} y2={66} {...S} />
            <line x1={45} y1={72} x2={65} y2={98} {...S} />
            <line x1={105} y1={72} x2={125} y2={98} {...S} />
          </g>
          <text x={100} y={124} textAnchor="middle" className={T} {...tx}>exploration</text>
        </Frame>
      )

    default:
      return null
  }
}
