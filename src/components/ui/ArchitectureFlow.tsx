import type { ArchitectureStep } from '../../data/types'

export function ArchitectureFlow({ steps }: { steps: ArchitectureStep[] }) {
  return (
    <ol className="relative">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1
        return (
          <li key={step.label} className="relative flex gap-4 pb-7 last:pb-0">
            <div className="flex flex-col items-center">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border-strong bg-bg-elevated font-mono text-[11px] text-accent">
                {index + 1}
              </span>
              {!isLast && (
                <span className="mt-1 w-px flex-1 bg-border-strong" aria-hidden="true" />
              )}
            </div>
            <div className="pt-0.5">
              <p className="font-medium text-text">{step.label}</p>
              {step.detail && (
                <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                  {step.detail}
                </p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
