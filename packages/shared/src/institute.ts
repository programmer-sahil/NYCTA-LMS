export interface InstituteConfig {
  fullName: string
  shortName: string
  locations: readonly string[]
  district: string
  state: string
  phones: readonly string[]
  learningMode: 'hybrid'
  facilities: readonly string[]
}

export const instituteConfig = {
  fullName: 'National Youth Computer Training Center',
  shortName: 'NYCTA',
  locations: ['Bandel', 'Chandannagar'],
  district: 'Hooghly',
  state: 'West Bengal',
  phones: ['7003573290', '8583058673'],
  learningMode: 'hybrid',
  facilities: [
    'AC classrooms',
    'Digital boards for project work',
    'Recorded online videos',
    'Revision materials',
    'Practice questions',
    'Projects',
    'Interview preparation',
  ],
} as const satisfies InstituteConfig
