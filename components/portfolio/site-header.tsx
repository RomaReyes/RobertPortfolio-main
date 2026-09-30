'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail, Menu, X } from 'lucide-react'
import { navLinks, profile } from '@/lib/portfolioData'

/**
 * Cabecera fija con:
 *  - Logo / insignia (izquierda)
 *  - Navegación (centro)
 *  - Estado y CTA (derecha)
 *  - Menú desplegable en móvil
 * Todo el texto sale de `profile` y `navLinks` en lib/portfolioData.ts.
 */
export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* ---------- Logo / insignia ---------- */}
        <a href="#top" className="flex items-center gap-3" aria-label={`${profile.name} - inicio`}>
          <span className="relative flex size-9 items-center justify-center rounded-md border border-primary/50 bg-primary/10 font-display text-xs font-bold text-primary shadow-[0_0_18px_-4px] shadow-primary">
            {profile.initials}
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-sm font-bold tracking-widest text-foreground">{profile.name}</span>
            <span className="font-tech text-[11px] font-semibold tracking-[0.3em] text-primary">
              {profile.tagline}
            </span>
          </span>
        </a>

        {/* ---------- Navegación central (escritorio) ---------- */}
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-md px-3 py-2 font-tech text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ---------- Lado derecho ---------- */}
        <div className="flex items-center gap-3">
          {profile.status.available && <StatusPill className="hidden 2xl:inline-flex" />}
          <a
            href={`mailto:${profile.email}`}
            className="hidden items-center gap-2 rounded-md bg-gradient-to-r from-primary to-accent px-4 py-2 font-tech text-sm font-bold uppercase tracking-wider text-background shadow-[0_0_24px_-6px] shadow-primary transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            <Mail className="size-4" aria-hidden="true" />
            Contáctame
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="flex size-9 items-center justify-center rounded-md border border-white/10 text-foreground lg:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* ---------- Menú móvil ---------- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/5 bg-background/95 lg:hidden"
          >
            <div className="flex flex-col gap-5 px-4 py-6 sm:px-6">
              <nav aria-label="Móvil">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-md px-3 py-2 font-tech text-base font-semibold uppercase tracking-wider text-muted-foreground hover:bg-white/5 hover:text-primary"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              {profile.status.available && <StatusPill className="inline-flex self-start" />}
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-primary to-accent px-4 py-2.5 font-tech text-sm font-bold uppercase tracking-wider text-background"
              >
                <Mail className="size-4" aria-hidden="true" />
                Contáctame
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

/** Píldora de estado con punto pulsante. */
function StatusPill({ className = '' }: { className?: string }) {
  return (
    <span
      className={`items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-tech text-xs font-semibold tracking-wide text-emerald-300 ${className}`}
    >
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
      </span>
      {profile.status.label}
    </span>
  )
}
