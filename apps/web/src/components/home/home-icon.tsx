import {
  BriefcaseBusiness,
  CirclePlay,
  CodeXml,
  Fan,
  ListChecks,
  MonitorSmartphone,
  NotebookText,
  PanelsTopLeft,
  Presentation,
  Route,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import type { HomeIcon as HomeIconName } from '@/content/home'

const homeIcons: Record<HomeIconName, LucideIcon> = {
  air: Fan,
  board: Presentation,
  video: CirclePlay,
  revision: NotebookText,
  practice: ListChecks,
  career: BriefcaseBusiness,
  roadmap: Route,
  project: CodeXml,
  hybrid: MonitorSmartphone,
  portfolio: PanelsTopLeft,
}

interface HomeIconProps {
  name: HomeIconName
  className?: string
}

export function HomeIcon({ name, className }: HomeIconProps) {
  const Icon = homeIcons[name]

  return <Icon className={className} aria-hidden="true" />
}

export function getHomeIcon(name: HomeIconName): LucideIcon {
  return homeIcons[name]
}
