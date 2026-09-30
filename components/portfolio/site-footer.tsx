import { Mail } from 'lucide-react'
import { profile } from '@/lib/portfolioData'
import { SocialLinks } from './social-links'

/**
 * Pie de página compacto que sirve como destino del enlace
 * "Contacto" (#contacto) de la navegación.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-background/60 backdrop-blur">
      <div
        id="contacto"
        className="mx-auto flex max-w-7xl scroll-mt-20 flex-col items-center gap-5 px-4 py-14 text-center sm:px-6 lg:px-8"
      >
        <h2 className="font-tech text-sm font-bold tracking-[0.3em] text-primary">CONTACTO</h2>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 font-display text-lg font-bold text-foreground transition-colors hover:text-primary sm:text-xl"
        >
          <Mail className="size-5 text-primary" aria-hidden="true" />
          {profile.email}
        </a>
        <SocialLinks />
      </div>
      <p className="border-t border-white/5 py-6 text-center font-tech text-xs tracking-widest text-muted-foreground">
        {'© '}
        {new Date().getFullYear()} {profile.name} · {profile.tagline}
      </p>
    </footer>
  )
}
