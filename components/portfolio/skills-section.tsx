'use client'

import { motion } from 'framer-motion'
import { skillGroups, type SkillGroup } from '@/lib/portfolioData'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

/**
 * Sección "HABILIDADES & MOTORES" en formato Bento Grid.
 * El layout asigna tamaños por posición (1ª tarjeta ancha, 3ª a ancho completo).
 * Los contenidos se editan en `skillGroups` dentro de lib/portfolioData.ts.
 */
const BENTO_SPANS = ['md:col-span-2', 'md:col-span-1', 'md:col-span-3']

export function SkillsSection() {
  return (
    <section
      id="habilidades"
      aria-labelledby="habilidades-title"
      className="scroll-mt-20 border-t border-white/5 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="habilidades-title"
          tag="ARSENAL TECNOLÓGICO"
          title="HABILIDADES & MOTORES"
          align="center"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={BENTO_SPANS[index % BENTO_SPANS.length]}
            >
              <SkillCard group={group} wide={BENTO_SPANS[index % BENTO_SPANS.length] === 'md:col-span-2'} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillCard({ group, wide }: { group: SkillGroup; wide: boolean }) {
  const Icon = group.icon
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-card/60 p-6 backdrop-blur-md transition-colors hover:border-primary/40 sm:p-8">
      <div
        className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-accent/20 opacity-0 blur-3xl transition-opacity group-hover:opacity-100"
        aria-hidden="true"
      />

      <header className="relative flex items-center gap-4">
        <span className="flex size-12 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary shadow-[0_0_20px_-6px] shadow-primary">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-display text-xl font-bold tracking-wide text-foreground">{group.title}</h3>
          <p className="font-tech text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            {group.subtitle}
          </p>
        </div>
      </header>

      <ul className={cn('relative mt-6 grid flex-1 auto-rows-fr gap-3', wide && 'sm:grid-cols-2', wide && group.items.length === 3 && 'lg:grid-cols-3')}>
        {group.items.map((item) => (
          <li key={item.name} className="flex flex-col gap-2 rounded-lg border border-white/5 bg-white/[0.03] p-4">
            <div className="flex items-start justify-between gap-2">
              <span className="font-semibold text-foreground">{item.name}</span>
              {item.tag && (
                <span className="shrink-0 rounded border border-accent/40 bg-accent/10 px-2 py-0.5 font-tech text-[11px] font-bold uppercase tracking-wider text-accent">
                  {item.tag}
                </span>
              )}
            </div>
            {item.detail && <p className="text-sm leading-relaxed text-muted-foreground">{item.detail}</p>}
            {typeof item.level === 'number' && (
              <div
                className="mt-auto h-1.5 overflow-hidden rounded-full bg-white/10"
                role="progressbar"
                aria-valuenow={item.level}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Nivel en ${item.name}`}
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </article>
  )
}
