'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Code2, Play, X, Zap } from 'lucide-react'
import type { Project } from '@/lib/portfolioData'
import { cn } from '@/lib/utils'

/**
 * Modal de detalle del proyecto con:
 *  - Visor de imágenes (`gallery`) con miniaturas
 *  - Datos rápidos (`stats`) y desglose de mecánicas (`mechanics`, si existen)
 *  - Reproductor del vídeo de gameplay (`video`, si existe)
 * Se cierra con Escape, clic en el fondo o el botón X.
 */
export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-2xl border border-primary/20 bg-card/95 shadow-[0_0_60px_-15px] shadow-primary/50 sm:rounded-2xl"
          >
            {/* key reinicia la galería al cambiar de proyecto */}
            <ModalContent key={project.id} project={project} onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ModalContent({ project, onClose }: { project: Project; onClose: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = project.gallery[activeIndex] ?? project.thumbnail
  const meta = [project.role, project.year].filter(Boolean).join(' · ')

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        autoFocus
        aria-label="Cerrar detalle del proyecto"
        className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full border border-white/15 bg-background/70 text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
      >
        <X className="size-5" />
      </button>

      {/* ---------- Visor principal ---------- */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <Image
          src={activeImage || '/placeholder.svg'}
          alt={`Captura ${activeIndex + 1} de ${project.title}`}
          fill
          sizes="(min-width: 896px) 896px, 100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* ---------- Galería ---------- */}
      {project.gallery.length > 1 && (
        <div className="flex gap-3 overflow-x-auto border-b border-white/5 p-4" role="group" aria-label="Galería">
          {project.gallery.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Ver imagen ${index + 1}`}
              aria-pressed={activeIndex === index}
              className={cn(
                'relative aspect-video w-28 shrink-0 overflow-hidden rounded-md border transition-opacity',
                activeIndex === index ? 'border-primary' : 'border-white/10 opacity-60 hover:opacity-100',
              )}
            >
              <Image src={src || '/placeholder.svg'} alt="" fill sizes="112px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* ---------- Información ---------- */}
      <div className="flex flex-col gap-8 p-6 sm:p-8">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-tech text-xs font-bold uppercase tracking-wider text-primary">
              {project.engine}
            </span>
            {project.genre && (
              <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-tech text-xs font-bold uppercase tracking-wider text-accent">
                {project.genre}
              </span>
            )}
          </div>
          {meta && (
            <p className="font-tech text-sm font-semibold uppercase tracking-widest text-muted-foreground">{meta}</p>
          )}
          <h2 id="project-modal-title" className="font-display text-3xl font-black tracking-wide text-foreground">
            {project.title}
          </h2>
          <p className="text-pretty leading-relaxed text-muted-foreground">{project.longDescription}</p>
        </div>

        {project.stats.length > 0 && (
          <dl className="flex flex-wrap gap-3">
            {project.stats.map((stat) => (
              <div key={stat.label} className="min-w-32 rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <dt className="font-tech text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-display text-sm font-bold text-foreground sm:text-base">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {project.video && (
          <section className="flex flex-col gap-4" aria-labelledby="project-gameplay-title">
            <h3 id="project-gameplay-title" className="flex items-center gap-2 font-tech text-sm font-bold tracking-[0.3em] text-primary">
              <Play className="size-4 fill-current" aria-hidden="true" />
              GAMEPLAY
            </h3>
            <div className="overflow-hidden rounded-lg border border-white/10 bg-black">
              <video
                src={project.video}
                  poster={project.gallery[0] ?? project.thumbnail}
                controls
                playsInline
                preload="metadata"
                className="aspect-video w-full object-contain"
              >
                <track kind="captions" />
              </video>
            </div>
          </section>
        )}

        {project.mechanics.length > 0 && (
          <div className="flex flex-col gap-4">
            <h3 className="font-tech text-sm font-bold tracking-[0.3em] text-primary">DESGLOSE DE MECÁNICAS</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.mechanics.map((mechanic) => (
                <li key={mechanic.title} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4">
                  <Zap className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-foreground">{mechanic.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{mechanic.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-2" aria-label="Tecnologías">
            {project.tech.map((tech) => (
              <li key={tech} className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-xs text-foreground/80">
                {tech}
              </li>
            ))}
          </ul>
          {(project.links.demo || project.links.code) && (
            <div className="flex gap-2">
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-primary to-accent px-4 py-2 font-tech text-sm font-bold uppercase tracking-wider text-background"
                >
                  <Play className="size-4" aria-hidden="true" />
                  Jugar Demo
                </a>
              )}
              {project.links.code && (
                <a
                  href={project.links.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-2 font-tech text-sm font-bold uppercase tracking-wider text-foreground hover:border-accent hover:text-accent"
                >
                  <Code2 className="size-4" aria-hidden="true" />
                  Código
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
