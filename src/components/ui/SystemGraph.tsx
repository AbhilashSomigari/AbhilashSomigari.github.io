import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const nodes = [
  { id: 'interface', label: 'Interface', x: 60, y: 30 },
  { id: 'api', label: 'API Layer', x: 230, y: 110 },
  { id: 'services', label: 'Services', x: 60, y: 190 },
  { id: 'data', label: 'Data / Models', x: 230, y: 270 },
  { id: 'result', label: 'Result', x: 60, y: 350 },
]

const edges: [string, string][] = [
  ['interface', 'api'],
  ['api', 'services'],
  ['services', 'data'],
  ['data', 'result'],
]

function nodeById(id: string) {
  return nodes.find((n) => n.id === id)!
}

export function SystemGraph() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <svg
      viewBox="0 0 300 390"
      className="h-auto w-full max-w-sm"
      role="img"
      aria-label="Diagram showing a layered engineering system: interface, API layer, services, data and models, and result"
    >
      {edges.map(([fromId, toId]) => {
        const from = nodeById(fromId)
        const to = nodeById(toId)
        return (
          <line
            key={`${fromId}-${toId}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="var(--color-border-strong)"
            strokeWidth={1.5}
          />
        )
      })}

      {!reducedMotion &&
        edges.map(([fromId, toId], index) => {
          const from = nodeById(fromId)
          const to = nodeById(toId)
          return (
            <motion.circle
              key={`pulse-${fromId}-${toId}`}
              r={3}
              fill="var(--color-accent)"
              initial={{ cx: from.x, cy: from.y, opacity: 0 }}
              animate={{
                cx: [from.x, to.x],
                cy: [from.y, to.y],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatDelay: 2.4,
                delay: index * 0.5,
                ease: 'easeInOut',
              }}
            />
          )
        })}

      {nodes.map((node) => (
        <g key={node.id}>
          <circle
            cx={node.x}
            cy={node.y}
            r={7}
            fill="var(--color-bg-elevated)"
            stroke="var(--color-accent)"
            strokeWidth={1.5}
          />
          <text
            x={node.x + (node.x < 150 ? 16 : -16)}
            y={node.y + 4}
            textAnchor={node.x < 150 ? 'start' : 'end'}
            fontFamily="var(--font-mono)"
            fontSize={12}
            fill="var(--color-text-secondary)"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
