export function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-text-secondary">
      {children}
    </span>
  )
}
