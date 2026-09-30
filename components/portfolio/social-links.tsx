import { socialLinks } from '@/lib/portfolioData'
import { cn } from '@/lib/utils'
import { BrandIcon } from './brand-icon'

/**
 * Barra de iconos de redes sociales.
 * Los enlaces se editan en `socialLinks` dentro de lib/portfolioData.ts.
 */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn('flex items-center gap-1.5', className)}>
      {socialLinks.map((social) => (
        <li key={social.name}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            title={social.name}
            className="flex size-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary hover:shadow-[0_0_16px_-2px] hover:shadow-primary/50"
          >
            <BrandIcon icon={social.icon} className="size-4" />
          </a>
        </li>
      ))}
    </ul>
  )
}
