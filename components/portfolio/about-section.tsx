import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { profile } from '@/lib/portfolioData'
import { SectionHeading } from './section-heading'

/**
 * Sección "SOBRE MÍ" con foto de perfil.
 * Cambia la foto en `profile.photo` dentro de lib/portfolioData.ts.
 */
export function AboutSection() {
  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-title" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20 lg:px-8">
        <div className="relative mx-auto w-full max-w-sm">
          <div
            className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-primary/40 via-transparent to-accent/40 blur-2xl"
            aria-hidden="true"
          />
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-primary/30 bg-card shadow-[0_0_40px_-10px] shadow-primary/40">
            <Image
              src={profile.photo.src || '/placeholder-user.jpg'}
              alt={profile.photo.alt}
              fill
              priority
              sizes="(min-width: 768px) 384px, 90vw"
              className="object-cover"
            />
          </div>
          <span
            className="absolute -left-2 -top-2 size-6 border-l-2 border-t-2 border-primary"
            aria-hidden="true"
          />
          <span
            className="absolute -bottom-2 -right-2 size-6 border-b-2 border-r-2 border-accent"
            aria-hidden="true"
          />
        </div>

        <div className="flex flex-col gap-6">
          <SectionHeading id="sobre-mi-title" tag="PLAYER ONE" title="SOBRE MÍ" />
          <p className="max-w-prose text-pretty text-lg leading-relaxed text-muted-foreground">{profile.about}</p>
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4 text-accent" aria-hidden="true" />
            {profile.location}
          </p>
        </div>
      </div>
    </section>
  )
}
