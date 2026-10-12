export function Tag({ children, tone = 'default' }: { children: string; tone?: 'default' | 'accent' }) {
  const toneClass =
    tone === 'accent'
      ? 'border-accent/30 bg-accent-soft text-accent'
      : 'border-border text-text-secondary'
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none ${toneClass}`}
    >
      {children}
    </span>
  )
}
