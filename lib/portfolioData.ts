/**
 * ============================================================================
 *  PORTFOLIO DATA — ARCHIVO CENTRAL DE CONTENIDO
 * ============================================================================
 *  Edita este archivo para personalizar TODO el portafolio sin tocar los
 *  componentes: textos, enlaces a redes sociales, proyectos, imágenes,
 *  vídeos y habilidades.
 *
 *  - Imágenes: colócalas en /public (por ejemplo /public/projects/mi-juego.png)
 *    y referéncialas como "/projects/mi-juego.png".
 *  - Vídeos: usa un .mp4/.webm en /public (ej. "/videos/trailer.mp4") o una
 *    URL directa a un archivo de vídeo. Déjalo vacío ("") para usar la imagen.
 * ============================================================================
 */

import {
  Boxes,
  Code2,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

/* ----------------------------------------------------------------------------
 * 1. PERFIL / MARCA PERSONAL
 * ------------------------------------------------------------------------- */
export const profile = {
  /** Nombre corto que aparece en el logo de la cabecera. */
  name: 'ROBERT JIMENEZ REYES',
  /** Subtítulo que acompaña al logo. */
  tagline: 'GAME CREATOR',
  /** Iniciales mostradas dentro de la insignia del logo. */
  initials: 'RR',
  /** Texto de la píldora de estado. Pon `available: false` para ocultarla. */
  status: {
    available: true,
    label: 'Disponible para Proyectos',
  },
  /** Email usado por el botón "Contáctame". */
  email: 'robertjimenezreyes64@gmail.com',
  /** Texto breve de la sección "Sobre Mí" (pie de página). */
  about:
    'Desarrollador de videojuegos con 2 años de experiencia, Me especializo con Unreal y Unity. en gameplay programming, tambien tengo habilidades para el 3D utilizando el programa Blender. Me apasiona crear experiencias de juego emocionantes.'

  ,location: 'Santo Domingo Oeste, Republica Dominicana · Remoto',
  /**
   * Foto de la sección "Sobre Mí". Sube tu imagen a /public/profile/
   * y cambia `src` (ej. "/profile/mi-foto.jpg"). Se recorta en formato cuadrado.
   */
  photo: {
    src: '/profile/foto-perfil.png',
    alt: 'Foto de perfil de Robert, desarrollador de videojuegos',
  },
}

/* ----------------------------------------------------------------------------
 * 2. NAVEGACIÓN
 *    `href` debe coincidir con el `id` de cada sección de la página.
 * ------------------------------------------------------------------------- */
export const navLinks = [
  { label: 'Sobre Mí', href: '#sobre-mi' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: '#contacto' },
]

/* ----------------------------------------------------------------------------
 * 3. REDES SOCIALES
 *    Sustituye cada `href` por tu URL real. Para ocultar una red, elimínala
 *    del array. Iconos disponibles: github | instagram | itchio | youtube |
 *    linkedin | x
 * ------------------------------------------------------------------------- */
export type SocialIcon = 'github' | 'instagram' | 'itchio' | 'youtube' | 'linkedin' | 'x'

export const socialLinks: { name: string; href: string; icon: SocialIcon }[] = [
  { name: 'GitHub', href: 'https://github.com/tu-usuario', icon: 'github' },
  { name: 'Instagram', href: 'https://instagram.com/adder.furious', icon: 'instagram' },
  { name: 'Itch.io', href: 'https://AdderFurious.itch.io', icon: 'itchio' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/tu-usuario', icon: 'linkedin' },
]

/* ----------------------------------------------------------------------------
 * 4. PROYECTOS
 *    `engine` determina en qué filtro aparece el proyecto. Si añades una
 *    categoría nueva, agrégala también a `projectCategories`.
 * ------------------------------------------------------------------------- */
export const projectCategories = [
  'Todos',
  'Unreal Engine',
  'Unity 2D',
] as const

export type ProjectCategory = Exclude<(typeof projectCategories)[number], 'Todos'>

export interface Project {
  id: string
  title: string
  /** Tu rol en el proyecto (ej. "Lead Gameplay Programmer"). */
  role: string
  engine: ProjectCategory
  genre: string
  year: string
  /** Descripción corta para la tarjeta. */
  description: string
  /** Descripción larga para la ficha técnica (modal). */
  longDescription: string
  tech: string[]
  /** Imagen de portada de la tarjeta. */
  thumbnail: string
  /** Vídeo opcional (mp4/webm). Si existe, se reproduce en bucle en la tarjeta y en el modal. */
  video?: string
  /** Si es `false`, la tarjeta no muestra el botón "Demo" (el vídeo sigue en el modal). */
  showDemoOnCard?: boolean
  /** Imágenes extra para la galería del modal. */
  gallery: string[]
  /** Desglose de mecánicas / sistemas destacados. */
  mechanics: { title: string; detail: string }[]
  /** Datos rápidos mostrados en el modal. */
  stats: { label: string; value: string }[]
  links: { demo?: string; code?: string }
}

export const projects: Project[] = [
  {
    id: 'the-last-track-of-time',
    title: 'The Last Track Of Time',
    role: 'Proyecto grupal',
    engine: 'Unreal Engine',
    genre: 'Deducción Social',
    year: '',
    description:
      'Eres un viajero del tiempo el cual debe de ubicar a un ladrón del tiempo el cual se robó un codex de los cuales los oficiales del tiempo poseen para reestructurar las líneas temporales.',
    longDescription:
      'Eres un viajero del tiempo el cual debe de ubicar a un ladrón del tiempo el cual se robó un codex de los cuales los oficiales del tiempo poseen para reestructurar las líneas temporales.',
    tech: ['UE5'],
    thumbnail: '/projects/the-last-track-of-time/main-menu.png',
    video: '/videos/the-last-track-of-time-gameplay.mp4',
    showDemoOnCard: false,
    gallery: [
      '/projects/the-last-track-of-time/main-menu.png',
      '/projects/the-last-track-of-time/screenshot-1.png',
      '/projects/the-last-track-of-time/screenshot-2.png',
    ],
    mechanics: [],
    stats: [{ label: 'Plataforma', value: 'PC' }],
    links: {},
  },
  {
    id: 'piropeo',
    title: 'Piropeo',
    role: 'Proyecto grupal',
    engine: 'Unity 2D',
    genre: '2D y Top-Down',
    year: '',
    description:
      'Piropeo es un arcade 2.5D donde la protagonista es una mujer que debe eliminar enemigos en la calle antes de que se acabe el tiempo.',
    longDescription:
      'Piropeo es un arcade 2.5D donde la protagonista es una mujer que debe eliminar enemigos en la calle antes de que se acabe el tiempo.',
    tech: ['Unity', 'C#'],
    thumbnail: '/projects/piropeo/logo.png',
    video: '/videos/piropeo-gameplay.mp4',
    showDemoOnCard: false,
    gallery: ['/projects/piropeo/main-menu.png'],
    mechanics: [],
    stats: [{ label: 'Plataforma', value: 'PC' }],
    links: {},
  },
]

/* ----------------------------------------------------------------------------
 * 5. HABILIDADES & MOTORES (Bento Grid)
 *    `level` es opcional (0-100) y dibuja una barra de progreso.
 *    `tag` es opcional y muestra una etiqueta (ej. "Experto").
 * ------------------------------------------------------------------------- */
export interface SkillItem {
  name: string
  tag?: string
  level?: number
  detail?: string
}

export interface SkillGroup {
  id: string
  title: string
  subtitle: string
  icon: LucideIcon
  items: SkillItem[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'motores',
    title: 'Motores',
    subtitle: 'Game Engines',
    icon: Boxes,
    items: [
      { name: 'Unreal Engine 5', level: 100, detail: 'Niagara, Lumen, ' },
      { name: 'Unity 3D / 2D', level: 100, detail: 'URP/HDRP, C#' },
    ],
  },
  {
    id: 'lenguajes',
    title: 'Lenguajes',
    subtitle: 'Programming',
    icon: Code2,
    items: [
      { name: 'Blueprints', level: 100 },
      { name: 'C#', level: 100 },
    ],
  },
  {
    id: 'herramientas',
    title: 'Herramientas',
    subtitle: 'Toolchain',
    icon: Wrench,
    items: [
      { name: 'Blender', detail: 'Modelado, blockouts' },
      { name: 'Git', detail: 'Control de versiones para equipos' },
      { name:  'Figma', detail: 'Interfaz de usuario UI / UX' },
    ],
  },
]
