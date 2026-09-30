'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projectCategories, projects, type Project } from '@/lib/portfolioData'
import { cn } from '@/lib/utils'
import { ProjectCard } from './project-card'
import { ProjectModal } from './project-modal'
import { SectionHeading } from './section-heading'

type Category = (typeof projectCategories)[number]

/**
 * Sección "PROYECTOS DESTACADOS":
 *  - Filtros por motor / categoría
 *  - Grid de 2 columnas con tarjetas animadas
 *  - Modal de ficha técnica al hacer clic en una tarjeta
 * Los proyectos se editan en `projects` dentro de lib/portfolioData.ts.
 */
export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const visibleProjects =
    activeCategory === 'Todos' ? projects : projects.filter((p) => p.engine === activeCategory)

  return (
    <section id="proyectos" aria-labelledby="proyectos-title" className="scroll-mt-20 border-t border-white/5 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="proyectos-title" tag="GAME CREATOR" title="PROYECTOS DESTACADOS" />

          {/* ---------- Filtros ---------- */}
          <div role="group" aria-label="Filtrar proyectos por motor" className="flex flex-wrap gap-2 lg:max-w-2xl lg:justify-end">
            {projectCategories.map((category) => {
              const isActive = category === activeCategory
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className={cn(
                    'relative rounded-md border px-4 py-2 font-tech text-sm font-semibold uppercase tracking-wider transition-colors',
                    isActive
                      ? 'border-primary/70 text-background'
                      : 'border-white/10 bg-white/[0.03] text-muted-foreground hover:border-primary/40 hover:text-foreground',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-filter"
                      className="absolute inset-0 rounded-md bg-primary shadow-[0_0_20px_-4px] shadow-primary"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{category}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ---------- Grid de proyectos ---------- */}
        <motion.ul layout className="mt-12 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <motion.li
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} onOpen={() => setSelectedProject(project)} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {visibleProjects.length === 0 && (
          <p className="mt-12 rounded-lg border border-dashed border-white/10 p-10 text-center text-muted-foreground">
            Todavía no hay proyectos en esta categoría.
          </p>
        )}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
