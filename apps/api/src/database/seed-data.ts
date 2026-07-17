export interface SeedLesson {
  title: string
  slug: string
  estimatedMinutes: number
}

export interface SeedCourse {
  title: string
  slug: string
  shortDescription: string
  description: string
  theme: 'cyan' | 'violet' | 'emerald' | 'amber'
  icon: string
  modules: readonly string[]
}

export const officialCourseSeedData: readonly SeedCourse[] = [
  {
    title: 'Data Analytics using GenAI',
    slug: 'data-analytics-genai',
    shortDescription:
      'Build practical analytics foundations with modern AI-assisted workflows.',
    description:
      'A beginner-focused hybrid course covering data preparation, analysis, visualisation, business intelligence and responsible Generative AI support.',
    theme: 'cyan',
    icon: 'analytics',
    modules: [
      'Data Analytics Foundations',
      'Python for Data Analytics',
      'NumPy',
      'Pandas',
      'Data Visualisation',
      'Statistics Fundamentals',
      'SQL for Analytics',
      'Spreadsheet Analytics',
      'Business Intelligence',
      'Generative AI for Analytics',
      'Guided Projects',
      'Interview Preparation',
    ],
  },
  {
    title: 'Data Science & Machine Learning using Generative AI',
    slug: 'data-science-machine-learning-genai',
    shortDescription:
      'Learn the foundations of data science, machine learning and Generative AI.',
    description:
      'A guided pathway through data preparation, modelling, evaluation, deep learning foundations, deployment and capstone practice.',
    theme: 'violet',
    icon: 'data-science',
    modules: [
      'Python Revision',
      'Mathematics and Statistics',
      'Data Preparation',
      'Exploratory Data Analysis',
      'Supervised Learning',
      'Unsupervised Learning',
      'Model Evaluation',
      'Feature Engineering',
      'Deep Learning Foundations',
      'Generative AI Foundations',
      'Model Deployment',
      'Capstone Projects',
      'Interview Preparation',
    ],
  },
  {
    title: 'Modern Full Stack Web Development using AI',
    slug: 'modern-full-stack-web-development-ai',
    shortDescription:
      'Build modern web applications through a structured full-stack pathway.',
    description:
      'A practical introduction to frontend, backend, databases, testing, security, source control and deployment foundations with responsible AI assistance.',
    theme: 'emerald',
    icon: 'full-stack',
    modules: [
      'Web Foundations',
      'HTML and CSS',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js and Express',
      'MongoDB',
      'Authentication and Security',
      'Git and GitHub',
      'Testing',
      'DevOps Foundations',
      'Full-Stack Projects',
      'Interview Preparation',
    ],
  },
  {
    title: 'Python using AI',
    slug: 'python-using-ai',
    shortDescription:
      'Start programming with Python through guided practice and projects.',
    description:
      'A beginner-friendly Python course spanning language fundamentals, object-oriented programming, essential tools, data libraries and practical projects.',
    theme: 'amber',
    icon: 'python',
    modules: [
      'Python Fundamentals',
      'Control Flow',
      'Functions',
      'Data Structures',
      'Object-Oriented Programming',
      'File Handling',
      'Error Handling',
      'Linux Fundamentals',
      'NumPy',
      'Matplotlib',
      'Git and GitHub',
      'Python Projects',
      'Interview Preparation',
    ],
  },
  {
    title: 'C & C++ using AI',
    slug: 'c-cpp-using-ai',
    shortDescription:
      'Develop programming fundamentals and problem-solving skills with C and C++.',
    description:
      'A structured course covering C, C++, memory concepts, object-oriented programming, the standard library, developer tools and projects.',
    theme: 'cyan',
    icon: 'c-cpp',
    modules: [
      'Programming Foundations',
      'C Fundamentals',
      'Arrays and Strings',
      'Functions and Pointers',
      'Structures and File Handling',
      'C++ Fundamentals',
      'Object-Oriented Programming',
      'Standard Template Library',
      'Problem Solving',
      'Linux Fundamentals',
      'Git and GitHub',
      'Projects',
      'Interview Preparation',
    ],
  },
  {
    title: 'Java using AI',
    slug: 'java-using-ai',
    shortDescription:
      'Learn Java fundamentals and progress toward API development.',
    description:
      'A beginner-focused Java pathway covering core syntax, object-oriented programming, collections, persistence, Spring Boot foundations and projects.',
    theme: 'violet',
    icon: 'java',
    modules: [
      'Core Java',
      'Variables and Control Flow',
      'Methods and Arrays',
      'Object-Oriented Programming',
      'Collections Framework',
      'Exception Handling',
      'File Handling',
      'JDBC Foundations',
      'Spring Boot Foundations',
      'REST API Development',
      'Git and GitHub',
      'Java Projects',
      'Interview Preparation',
    ],
  },
] as const

export const samplePythonLessons: readonly SeedLesson[] = [
  {
    title: 'Introduction to Python',
    slug: 'introduction-to-python',
    estimatedMinutes: 20,
  },
  {
    title: 'Variables and Data Types',
    slug: 'variables-and-data-types',
    estimatedMinutes: 25,
  },
  {
    title: 'Conditional Statements',
    slug: 'conditional-statements',
    estimatedMinutes: 25,
  },
  { title: 'Loops', slug: 'loops', estimatedMinutes: 30 },
  { title: 'Functions', slug: 'functions', estimatedMinutes: 30 },
] as const

export function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/c\+\+/g, 'cpp')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
