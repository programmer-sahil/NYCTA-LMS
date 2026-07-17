export interface NavigationItem {
  label: string
  href: string
  emphasis?: boolean
}

export interface SocialLinkPlaceholder {
  label: string
  href: null
}

export const siteConfig = {
  name: 'National Youth Computer Training Academy',
  shortName: 'NYCTA',
  description:
    'Hybrid computer education with practical projects, revision support, and career preparation.',
  locations: ['Bandel', 'Chandannagar'],
  district: 'Hooghly',
  state: 'West Bengal',
  phoneNumbers: ['7003573290', '8583058673'],
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/courses' },
    { label: 'Roadmaps', href: '/#learning-journey' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Learn', href: '/#hybrid-learning' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#locations' },
    { label: 'Student Login', href: '/student/login', emphasis: true },
  ] satisfies readonly NavigationItem[],
  socialLinks: [
    { label: 'Facebook', href: null },
    { label: 'Instagram', href: null },
    { label: 'YouTube', href: null },
    { label: 'LinkedIn', href: null },
  ] satisfies readonly SocialLinkPlaceholder[],
  email: 'Email address coming soon',
  whatsappNumber: '917003573290',
  openingHours: 'Opening hours will be published soon',
} as const
