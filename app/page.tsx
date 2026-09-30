import { AboutSection } from '@/components/portfolio/about-section'
import { ProjectsSection } from '@/components/portfolio/projects-section'
import { SiteFooter } from '@/components/portfolio/site-footer'
import { SiteHeader } from '@/components/portfolio/site-header'
import { SkillsSection } from '@/components/portfolio/skills-section'

/**
 * Página principal del portafolio.
 * Para editar contenidos, modifica lib/portfolioData.ts.
 * Para reordenar secciones, cambia el orden de los componentes abajo.
 */
export default function Home() {
  return (
    <div id="top" className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
      </main>
      <SiteFooter />
    </div>
  )
}
