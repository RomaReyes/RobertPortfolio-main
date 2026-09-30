'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Code2, Play, X } from 'lucide-react'
import type { Project } from '@/lib/portfolioData'

/**
 * Tarjeta de proyecto (glassmorphism).
 * Muestra `thumbnail` como portada. Si el proyecto tiene `video`, el botón "Demo"
 * reproduce el gameplay dentro de la tarjeta; si no, abre `links.demo`.
 * Toda la tarjeta abre el modal.
 */
export function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const meta = [project.role, project.year].filter(Boolean).join(' · ')
  const cardVideo = project.showDemoOnCard === false ? '' : project.video
  const hasActions = Boolean(cardVideo || project.links.demo || project.links.code)

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-card/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_40px_-12px] hover:shadow-primary/60">
      {/* ---------- Media: portada o vídeo de gameplay ---------- */}
      <div className="relative aspect-video overflow-hidden">
        {isPlaying && cardVideo ? (
          <div className="relative z-10 size-full bg-black">
            <video
              src={cardVideo}
              poster={project.thumbnail}
              controls
              autoPlay
              playsInline
              className="size-full object-contain"
            >
              <track kind="captions" />
            </video>
            <button
              type="button"
              onClick={() => setIsPlaying(false)}
              aria-label="Cerrar vídeo"
              className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full border border-white/15 bg-background/70 text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
            >
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <>
            <Image
              src={project.thumbnail || '/placeholder.svg'}
              alt={`Portada de ${project.title}`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" aria-hidden="true" />

            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-primary/40 bg-background/70 px-3 py-1 font-tech text-xs font-bold uppercase tracking-wider text-primary backdrop-blur">
                {project.engine}
              </span>
              {project.genre && (
                <span className="rounded-full border border-accent/40 bg-background/70 px-3 py-1 font-tech text-xs font-bold uppercase tracking-wider text-accent backdrop-blur">
                  {project.genre}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {/* ---------- Contenido ---------- */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-col gap-1">
          {meta && (
            <p className="font-tech text-sm font-semibold uppercase tracking-widest text-muted-foreground">{meta}</p>
          )}
          <h3 className="font-display text-2xl font-bold tracking-wide text-foreground">
            {/* El botón invisible cubre toda la tarjeta para abrir el modal */}
            <button
              type="button"
              onClick={onOpen}
              className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {project.title}
            </button>
          </h3>
        </div>

        <p className="text-pretty leading-relaxed text-muted-foreground">{project.description}</p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-4">
          <ul className="flex flex-wrap gap-2" aria-label="Tecnologías">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-xs text-foreground/80"
              >
                {tech}
              </li>
            ))}
          </ul>

          {hasActions && (
            /* z-10 para quedar por encima del botón que cubre la tarjeta */
            <div className="relative z-10 flex gap-2">
              {cardVideo ? (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  aria-pressed={isPlaying}
                  className="inline-flex items-center gap-1.5 rounded-md border border-primary/40 bg-primary/10 px-3 py-1.5 font-tech text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-background"
                >
                  <Play className="size-3.5" aria-hidden="true" />
                  Demo
                </button>
              ) : (
                project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-primary/40 bg-primary/10 px-3 py-1.5 font-tech text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-background"
                  >
                    <Play className="size-3.5" aria-hidden="true" />
                    Demo
                  </a>
                )
              )}
              {project.links.code && (
                <a
                  href={project.links.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-1.5 font-tech text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <Code2 className="size-3.5" aria-hidden="true" />
                  Código
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
