export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}) {
  return (
    <div className={align === 'center' ? 'text-center' : 'text-left'}>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-text sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed text-text-secondary ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
