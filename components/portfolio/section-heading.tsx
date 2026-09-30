import { cn } from '@/lib/utils'

/**
 * Encabezado reutilizable de sección: etiqueta pequeña + título grande.
 */
export function SectionHeading({
  tag,
  title,
  align = 'left',
  id,
}: {
  tag: string
  title: string
  align?: 'left' | 'center'
  id?: string
}) {
  return (
    <div className={cn('flex flex-col gap-3', align === 'center' && 'items-center text-center')}>
      <span className="inline-flex items-center gap-2 font-tech text-sm font-bold tracking-[0.35em] text-primary">
        <span className="h-px w-8 bg-primary" aria-hidden="true" />
        {tag}
        {align === 'center' && <span className="h-px w-8 bg-primary" aria-hidden="true" />}
      </span>
      <h2
        id={id}
        className="text-balance font-display text-3xl font-black tracking-wider text-foreground sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
    </div>
  )
}
