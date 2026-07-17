export type AccentTone = 'cyan' | 'violet' | 'emerald' | 'amber'

export type HomeIcon =
  | 'air'
  | 'board'
  | 'video'
  | 'revision'
  | 'practice'
  | 'career'
  | 'roadmap'
  | 'project'
  | 'hybrid'
  | 'portfolio'

export interface HomeFeature {
  title: string
  description: string
  icon: HomeIcon
  accent: AccentTone
}

export interface JourneyStep {
  title: string
  description: string
  icon: HomeIcon
}

export interface LocationContent {
  name: string
  region: string
  phoneNumber: string
  addressPlaceholder: string
  mapUrl: null
}

export const homeContent = {
  announcement: {
    message:
      'Admissions and new hybrid batches are now open in Bandel and Chandannagar.',
    primaryAction: { label: 'View Courses', href: '/courses' },
    secondaryAction: { label: 'Call Now', href: 'tel:7003573290' },
  },
  hero: {
    eyebrow: 'Practical technology education in Hooghly',
    headline:
      'Build Job-Ready Technology Skills with Practical, AI-Assisted Learning',
    description:
      'Learn programming, data analytics, machine learning and full-stack development through classroom instruction, recorded lessons, guided practice and real-world projects.',
    primaryAction: { label: 'Explore Courses', href: '/courses' },
    secondaryAction: { label: 'Speak to an Advisor', href: 'tel:7003573290' },
    trustIndicators: [
      '6 career-focused learning paths',
      'Beginner-friendly',
      'Classroom + online learning',
      'Project-based curriculum',
    ],
  },
  categories: [
    'Data Analytics',
    'Data Science',
    'Full Stack',
    'Python',
    'C & C++',
    'Java',
  ],
  hybridLearning: {
    eyebrow: 'Hybrid learning experience',
    title: 'Classroom guidance with resources that stay with you',
    description:
      'Combine face-to-face instruction with flexible learning support for practice, revision, and project work.',
    features: [
      {
        title: 'AC classroom learning',
        description:
          'Learn in a comfortable classroom environment with direct instructor guidance.',
        icon: 'air',
        accent: 'cyan',
      },
      {
        title: 'Digital-board project sessions',
        description:
          'Follow project walkthroughs and technical explanations on digital boards.',
        icon: 'board',
        accent: 'violet',
      },
      {
        title: 'Recorded video lessons',
        description:
          'Return to recorded explanations when you need another look at a concept.',
        icon: 'video',
        accent: 'emerald',
      },
      {
        title: 'Revision materials',
        description:
          'Use organised supporting material to review topics after classroom sessions.',
        icon: 'revision',
        accent: 'amber',
      },
      {
        title: 'Practice questions and quizzes',
        description:
          'Check your understanding through guided questions and focused practice.',
        icon: 'practice',
        accent: 'cyan',
      },
      {
        title: 'Portfolio and interview preparation',
        description:
          'Prepare to present your work and discuss your skills with greater clarity.',
        icon: 'career',
        accent: 'violet',
      },
    ] satisfies readonly HomeFeature[],
  },
  courses: {
    eyebrow: 'Featured courses',
    title: 'Six focused paths for practical technology skills',
    description:
      'Explore beginner-friendly course directions supported by classroom teaching, guided practice, and projects.',
  },
  whyNycti: {
    eyebrow: 'Why choose NYCTI',
    title: 'A guided path from first lesson to presentable work',
    description:
      'The learning experience is designed to replace scattered study with clear steps, practice, and human guidance.',
    features: [
      {
        title: 'Structured beginner roadmaps',
        description:
          'Start with clear foundations and progress in an understandable order.',
        icon: 'roadmap',
        accent: 'cyan',
      },
      {
        title: 'Practical learning instead of passive watching',
        description:
          'Apply new concepts through exercises, discussion, and guided work.',
        icon: 'practice',
        accent: 'violet',
      },
      {
        title: 'Projects after major modules',
        description:
          'Use projects to connect multiple concepts and practise building complete work.',
        icon: 'project',
        accent: 'emerald',
      },
      {
        title: 'Revision and practice support',
        description:
          'Revisit lessons with recorded material, revision notes, and questions.',
        icon: 'revision',
        accent: 'amber',
      },
      {
        title: 'Hybrid flexibility',
        description:
          'Combine classroom learning with online resources for continued study.',
        icon: 'hybrid',
        accent: 'cyan',
      },
      {
        title: 'Career and interview preparation',
        description:
          'Practise explaining your work and preparing for common interview formats.',
        icon: 'career',
        accent: 'violet',
      },
    ] satisfies readonly HomeFeature[],
  },
  journey: {
    eyebrow: 'Learning journey',
    title: 'A clear progression from choice to portfolio',
    description:
      'Each stage has a distinct purpose so learners can focus on the next useful step.',
    steps: [
      {
        title: 'Choose a learning path',
        description:
          'Select the technology direction that matches your current goal.',
        icon: 'roadmap',
      },
      {
        title: 'Build fundamentals',
        description:
          'Learn the core ideas and vocabulary needed for later work.',
        icon: 'revision',
      },
      {
        title: 'Complete guided practice',
        description:
          'Reinforce lessons through instructor-supported exercises.',
        icon: 'practice',
      },
      {
        title: 'Develop projects',
        description:
          'Bring multiple concepts together in practical project work.',
        icon: 'project',
      },
      {
        title: 'Prepare for interviews',
        description:
          'Review concepts and practise communicating technical decisions.',
        icon: 'career',
      },
      {
        title: 'Build a professional portfolio',
        description:
          'Organise completed work into a presentable collection of skills.',
        icon: 'portfolio',
      },
    ] satisfies readonly JourneyStep[],
  },
  projects: {
    eyebrow: 'Project-based learning',
    title: 'Turn each stage of learning into practical work',
    description:
      'Project briefs will be added after curriculum review. These cards define the intended progression without inventing project details.',
    items: [
      {
        label: 'Beginner Project',
        description:
          'A focused first project with a clearly limited learning scope.',
        accent: 'cyan',
      },
      {
        label: 'Guided Project',
        description:
          'A structured project completed with milestones and instructor guidance.',
        accent: 'violet',
      },
      {
        label: 'Capstone Project',
        description:
          'A broader portfolio-stage project brief to be defined with the curriculum.',
        accent: 'emerald',
      },
    ] satisfies readonly {
      label: string
      description: string
      accent: AccentTone
    }[],
  },
  comparison: {
    eyebrow: 'Learning-mode comparison',
    title: 'From scattered resources to a supported learning rhythm',
    description:
      'The goal is not a shortcut or guarantee. It is a clearer structure for learning, practising, and asking for help.',
    traditional: {
      title: 'Traditional unstructured learning',
      points: [
        'Resources gathered without a clear sequence',
        'Long periods of passive watching',
        'Practice separated from learning material',
        'Limited feedback when concepts are unclear',
      ],
    },
    guided: {
      title: 'NYCTA guided hybrid learning',
      points: [
        'A structured path designed for beginners',
        'Classroom explanation supported by recordings',
        'Practice and projects connected to major modules',
        'Revision and interview preparation support',
      ],
    },
  },
  locations: {
    eyebrow: 'Our locations',
    title: 'Learn with NYCTA in Hooghly',
    description:
      'Contact the preferred centre for batch and admission information. Exact street addresses and map links remain editable placeholders.',
    items: [
      {
        name: 'Bandel',
        region: 'Hooghly, West Bengal',
        phoneNumber: '7003573290',
        addressPlaceholder: 'Exact Bandel street address to be added',
        mapUrl: null,
      },
      {
        name: 'Chandannagar',
        region: 'Hooghly, West Bengal',
        phoneNumber: '8583058673',
        addressPlaceholder: 'Exact Chandannagar street address to be added',
        mapUrl: null,
      },
    ] satisfies readonly LocationContent[],
  },
  about: {
    eyebrow: 'About the institute',
    title: 'Beginner-focused computer education with practical support',
    description:
      'National Youth Computer Training Institute provides beginner-focused computer education with classroom guidance, recorded learning materials, practice, and projects. The hybrid learning approach helps students revisit concepts, build practical work, and prepare to communicate their skills.',
  },
  finalCta: {
    eyebrow: 'Your next step',
    title: 'Start Your Technology Learning Journey',
    description:
      'Explore the available learning paths or speak directly with the institute about current hybrid batches.',
    primaryAction: { label: 'Explore Courses', href: '/courses' },
    secondaryAction: { label: 'Contact the Institute', href: '#locations' },
  },
} as const
