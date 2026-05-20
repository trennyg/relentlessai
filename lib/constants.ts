export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
]

export interface Service {
  icon: string
  title: string
  body: string
  forList: string[]
}

export const SERVICES: Service[] = [
  {
    icon: 'ArrowUpRight',
    title: 'Brand Websites',
    body: "Cinematic, story-driven websites built to convert and impress. We design and build the kind of site your competitors don't have.",
    forList: ['Musicians', 'D2C Brands', 'Creative Professionals'],
  },
  {
    icon: 'LayoutGrid',
    title: 'AI Dashboards',
    body: "Custom intelligence tools that turn your operational data into real-time decisions. Built for teams that can't afford blind spots.",
    forList: ['Fintech', 'Wealth Management', 'Ops-Heavy Businesses'],
  },
  {
    icon: 'RefreshCw',
    title: 'Automation Pipelines',
    body: 'OCR, document processing, and workflow automation that eliminates manual work and scales with your business.',
    forList: ['Lenders', 'Compliance Teams', 'Financial Institutions'],
  },
]

export interface Project {
  image: string
  tag: string
  title: string
  description: string
  stack: string[]
  link?: string
  badge?: string
}

export const PROJECTS: Project[] = [
  {
    image: '/images/ron-ashton.jpg',
    tag: 'ENTERTAINMENT',
    title: 'Ron Ashton Music',
    description: "A premium artist website for one of Mumbai's most sought-after musicians. Cinematic scroll animations, GSAP Flip transitions, multi-service pages, and a live booking system.",
    stack: ['Next.js', 'GSAP', 'Framer Motion'],
    link: 'https://ron-pereira.vercel.app',
  },
  {
    image: '/images/ares-dashboard.jpg',
    tag: 'FINTECH',
    title: 'Portfolio Intelligence Dashboard',
    description: 'A real-time wealth management operations tool — live trade tracking across asset classes, GPT-4o AI portfolio analysis, multi-currency cash balances, settlement monitoring, and interactive P&L charts.',
    stack: ['React', 'GPT-4o', 'Recharts'],
    link: '#',
  },
  {
    image: '/images/jaan-perfumes.jpg',
    tag: 'D2C · E-COMMERCE',
    title: 'JAAN Perfumes',
    description: 'A bilingual Hindi/English storefront for a premium Indian fragrance brand. Product catalog, cart functionality, gifting collections, and a strong brand voice built to convert.',
    stack: ['Next.js', 'Tailwind', 'E-commerce'],
    link: 'https://jaan-pied.vercel.app',
  },
  {
    image: '/images/ddr-pipeline.jpg',
    tag: 'FINTECH · AUTOMATION',
    title: 'Loan Applicant Due Diligence Pipeline',
    description: "An OCR-powered document extraction and automated report generation system for a lending firm's background verification process. In production, with positive client reviews.",
    stack: ['OCR', 'Python', 'Automation'],
    badge: '✓ IN PRODUCTION',
  },
]

export interface Testimonial {
  quote: string
  name: string
  role: string
  tag: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: '[REPLACE WITH REAL QUOTE — DDR Pipeline Client]',
    name: '[Client Name]',
    role: '[Role], [Company]',
    tag: 'DUE DILIGENCE PIPELINE',
  },
  {
    quote: '[REPLACE WITH REAL QUOTE — Ron Ashton]',
    name: 'Ron Ashton',
    role: 'Musician · Performer · Educator',
    tag: 'BRAND WEBSITE',
  },
  {
    quote: '[REPLACE WITH REAL QUOTE — JAAN Perfumes]',
    name: '[Client Name]',
    role: 'Founder, JAAN Perfumes',
    tag: 'E-COMMERCE WEBSITE',
  },
]

export interface Stat {
  number: string
  label: string
}

export const STATS: Stat[] = [
  { number: '04', label: 'Projects live' },
  { number: '03', label: 'Client reviews' },
  { number: '03', label: 'Industries served' },
  { number: '100%', label: 'Built with AI' },
]

export const CONTACT = {
  email: 'admin@relentlessais.com',
  phone: '6002944816',
  location: 'Mumbai · Available Worldwide',
}
