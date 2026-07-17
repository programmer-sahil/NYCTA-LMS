export type CourseTheme = 'cyan' | 'violet' | 'emerald' | 'amber'

export type CourseIcon =
  'analytics' | 'data-science' | 'full-stack' | 'python' | 'c-cpp' | 'java'

export type CourseCategory = 'Data & AI' | 'Web Development' | 'Programming'

export type LessonDifficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export type LearningResourceType = 'video' | 'article' | 'download' | 'link'

export interface LearningResource {
  id: string
  title: string
  description: string
  type: LearningResourceType
  url: string | null
}

export interface RevisionPoint {
  id: string
  title: string
  summary: string
  explanation: string
  question: string
  answer: string
}

interface PracticeQuestionBase {
  id: string
  prompt: string
  hint: string | null
  solution: string
  explanation: string
}

export interface MultipleChoicePracticeQuestion extends PracticeQuestionBase {
  type: 'multiple-choice'
  options: readonly string[]
  correctAnswer: string
}

export interface TrueFalsePracticeQuestion extends PracticeQuestionBase {
  type: 'true-false'
  correctAnswer: boolean
}

export interface ShortAnswerPracticeQuestion extends PracticeQuestionBase {
  type: 'short-answer'
  correctAnswer: string
}

export interface CodingPracticeQuestion extends PracticeQuestionBase {
  type: 'coding'
  language: string
  starterCode: string
  expectedOutput: string
}

export type PracticeQuestion =
  | MultipleChoicePracticeQuestion
  | TrueFalsePracticeQuestion
  | ShortAnswerPracticeQuestion
  | CodingPracticeQuestion

export interface QuizQuestion {
  id: string
  prompt: string
  options: readonly string[]
  correctAnswerIndex: number
  explanation: string
}

export interface ProjectTask {
  id: string
  title: string
  description: string
  published: boolean
}

export interface CodingPractice {
  instructions: string
  language: string
  starterCode: string
  expectedOutput: string
}

export interface Lesson {
  id: string
  title: string
  slug: string
  summary: string
  estimatedMinutes: number
  difficulty: LessonDifficulty
  youtubeUrl: string | null
  overview: string
  notes: readonly string[]
  revisionPoints: readonly RevisionPoint[]
  practiceQuestions: readonly PracticeQuestion[]
  quizQuestions: readonly QuizQuestion[]
  codeExample: string | null
  codingPractice: CodingPractice | null
  resources: readonly LearningResource[]
  previousLesson: string | null
  nextLesson: string | null
  published: boolean
}

export interface CourseModule {
  id: string
  slug: string
  title: string
  summary: string
  estimatedMinutes: number
  lessons: readonly Lesson[]
  resources: readonly LearningResource[]
  project: ProjectTask | null
  published: boolean
}

export interface CourseProjectPlaceholder {
  label: string
  description: string
}

export interface Course {
  id: string
  slug: string
  title: string
  shortTitle: string
  subtitle: string
  description: string
  icon: CourseIcon
  theme: CourseTheme
  category: CourseCategory
  level: string
  learningMode: string
  durationLabel: string
  highlights: readonly string[]
  modules: readonly CourseModule[]
  projectPlaceholder: CourseProjectPlaceholder
  interviewPreparation: boolean
  published: boolean
  beginnerSuitability: string
  learningOutcomes: readonly string[]
  learningFormat: readonly string[]
  prerequisites: readonly string[]
  toolsAndTechnologies: readonly string[]
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/c\+\+/g, 'cpp')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const lessonPlaceholder = 'Lesson content will be added by the instructor.'

function createPlaceholderLesson(
  title: string,
  previousLesson: string | null,
  nextLesson: string | null,
): Lesson {
  const slug = toSlug(title)
  const isIntroductorySample = title === 'Introduction to Python'

  return {
    id: `data-analytics-python-${slug}`,
    title,
    slug,
    summary: lessonPlaceholder,
    estimatedMinutes: 15,
    difficulty: 'Beginner',
    youtubeUrl: null,
    overview: lessonPlaceholder,
    notes: [lessonPlaceholder],
    revisionPoints: isIntroductorySample
      ? [
          {
            id: 'python-intro-revision-placeholder',
            title: 'Lesson key point',
            summary: lessonPlaceholder,
            explanation: lessonPlaceholder,
            question: 'What should you review after this lesson?',
            answer: lessonPlaceholder,
          },
        ]
      : [],
    practiceQuestions: isIntroductorySample
      ? [
          {
            id: 'python-intro-practice-mcq',
            type: 'multiple-choice',
            prompt: 'Which lesson are you currently viewing?',
            options: ['Introduction to Python', 'Loops', 'Functions'],
            correctAnswer: 'Introduction to Python',
            hint: 'Read the lesson heading.',
            solution: 'Introduction to Python',
            explanation: lessonPlaceholder,
          },
          {
            id: 'python-intro-practice-true-false',
            type: 'true-false',
            prompt: 'This is an introductory lesson.',
            correctAnswer: true,
            hint: null,
            solution: 'True',
            explanation: lessonPlaceholder,
          },
          {
            id: 'python-intro-practice-short',
            type: 'short-answer',
            prompt: 'Type the lesson title.',
            correctAnswer: 'Introduction to Python',
            hint: 'The title appears above the video.',
            solution: 'Introduction to Python',
            explanation: lessonPlaceholder,
          },
          {
            id: 'python-intro-practice-code',
            type: 'coding',
            prompt: 'Add a Python comment to the editor.',
            language: 'python',
            starterCode: '# Write your comment here',
            expectedOutput: 'No output is required.',
            hint: 'Python comments begin with #.',
            solution: '# My first Python note',
            explanation: lessonPlaceholder,
          },
        ]
      : [],
    quizQuestions: isIntroductorySample
      ? [
          {
            id: 'python-intro-quiz-1',
            prompt: 'Which module contains this lesson?',
            options: [
              'Python for Data Analytics',
              'SQL for Analytics',
              'Business Intelligence',
            ],
            correctAnswerIndex: 0,
            explanation: lessonPlaceholder,
          },
          {
            id: 'python-intro-quiz-2',
            prompt: 'What comes after this lesson?',
            options: ['Functions', 'Variables and Data Types', 'Loops'],
            correctAnswerIndex: 1,
            explanation: lessonPlaceholder,
          },
        ]
      : [],
    codeExample: null,
    codingPractice: isIntroductorySample
      ? {
          instructions:
            'Use the editor for guided practice. Code execution is not enabled.',
          language: 'python',
          starterCode: '# Start practising here',
          expectedOutput: 'Expected output will be added by the instructor.',
        }
      : null,
    resources: [],
    previousLesson,
    nextLesson,
    published: true,
  }
}

const pythonForDataAnalyticsLessons = [
  createPlaceholderLesson(
    'Introduction to Python',
    null,
    'variables-and-data-types',
  ),
  createPlaceholderLesson(
    'Variables and Data Types',
    'introduction-to-python',
    'conditional-statements',
  ),
  createPlaceholderLesson(
    'Conditional Statements',
    'variables-and-data-types',
    'loops',
  ),
  createPlaceholderLesson('Loops', 'conditional-statements', 'functions'),
  createPlaceholderLesson('Functions', 'loops', null),
] as const

function createModules(
  courseId: string,
  titles: readonly string[],
): readonly CourseModule[] {
  return titles.map((title, index) => {
    const lessons =
      courseId === 'data-analytics-genai' &&
      title === 'Python for Data Analytics'
        ? pythonForDataAnalyticsLessons
        : []

    return {
      id: `${courseId}-module-${index + 1}`,
      slug: toSlug(title),
      title,
      summary: `A guided introduction to ${title.toLowerCase()}, with explanations and practice activities to be finalised during curriculum review.`,
      estimatedMinutes: lessons.reduce(
        (total, lesson) => total + lesson.estimatedMinutes,
        0,
      ),
      lessons,
      resources: [],
      project: {
        id: `${courseId}-${toSlug(title)}-project`,
        title: 'Module project placeholder',
        description: 'Project tasks will be added by the instructor.',
        published: false,
      },
      published: true,
    }
  })
}

const sharedLearningFormat = [
  'Instructor-led classroom sessions in Bandel or Chandannagar',
  'Recorded lessons and revision material for supported review',
  'Guided practice, questions, quizzes, and project checkpoints',
] as const

const sharedPrerequisites = [
  'No prior professional technology experience is required',
  'Comfort with basic computer use is helpful',
  'A willingness to practise regularly between guided sessions',
] as const

const courseRegistrySource = [
  {
    id: 'course-data-analytics-genai',
    slug: 'data-analytics-genai',
    title: 'Data Analytics using GenAI',
    shortTitle: 'Data Analytics',
    subtitle:
      'Build practical foundations for analysing and communicating data.',
    description:
      'A beginner-friendly path through Python, spreadsheets, SQL, statistics, visualisation, business intelligence, and responsible Generative AI support for analytics work.',
    icon: 'analytics',
    theme: 'cyan',
    category: 'Data & AI',
    level: 'Beginner-friendly',
    learningMode: 'Hybrid: classroom + online support',
    durationLabel: 'Duration to be confirmed',
    highlights: [
      'Python and SQL foundations',
      'Visual analysis and BI',
      'Guided analytics projects',
    ],
    modules: createModules('data-analytics-genai', [
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
    ]),
    projectPlaceholder: {
      label: 'Analytics project brief coming soon',
      description:
        'The final project scope and datasets will be published after curriculum review.',
    },
    interviewPreparation: true,
    published: true,
    beginnerSuitability:
      'Designed for learners beginning their analytics journey. Concepts progress from data handling fundamentals to guided analytical workflows.',
    learningOutcomes: [
      'Prepare and explore structured datasets',
      'Create clear visual and business-focused summaries',
      'Use analytics tools and AI assistance with informed judgement',
    ],
    learningFormat: sharedLearningFormat,
    prerequisites: sharedPrerequisites,
    toolsAndTechnologies: [
      'Python',
      'NumPy',
      'Pandas',
      'SQL',
      'Spreadsheets',
      'BI tools',
      'Generative AI tools',
    ],
  },
  {
    id: 'course-data-science-machine-learning-genai',
    slug: 'data-science-machine-learning-genai',
    title: 'Data Science & Machine Learning using Generative AI',
    shortTitle: 'Data Science & ML',
    subtitle:
      'Progress from prepared data to evaluated machine-learning models.',
    description:
      'A structured introduction to statistics, data preparation, machine learning, deep learning foundations, Generative AI concepts, deployment, and capstone practice.',
    icon: 'data-science',
    theme: 'violet',
    category: 'Data & AI',
    level: 'Beginner to intermediate',
    learningMode: 'Hybrid: classroom + online support',
    durationLabel: 'Duration to be confirmed',
    highlights: [
      'Statistics and data preparation',
      'Machine-learning foundations',
      'Capstone project guidance',
    ],
    modules: createModules('data-science-machine-learning-genai', [
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
    ]),
    projectPlaceholder: {
      label: 'Data science capstone brief coming soon',
      description:
        'Project themes, datasets, and evaluation criteria will be added after curriculum review.',
    },
    interviewPreparation: true,
    published: true,
    beginnerSuitability:
      'The path begins with Python revision and mathematical foundations before introducing models, evaluation, and deployment concepts.',
    learningOutcomes: [
      'Prepare data for exploratory and modelling workflows',
      'Understand core supervised and unsupervised approaches',
      'Evaluate and communicate model behaviour responsibly',
    ],
    learningFormat: sharedLearningFormat,
    prerequisites: sharedPrerequisites,
    toolsAndTechnologies: [
      'Python',
      'Pandas',
      'NumPy',
      'Visualisation libraries',
      'Machine-learning libraries',
      'Generative AI tools',
    ],
  },
  {
    id: 'course-modern-full-stack-web-development-ai',
    slug: 'modern-full-stack-web-development-ai',
    title: 'Modern Full Stack Web Development using AI',
    shortTitle: 'Full Stack Development',
    subtitle: 'Learn to build modern web experiences from interface to server.',
    description:
      'A practical web-development path covering HTML, CSS, JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB, security, testing, and delivery foundations.',
    icon: 'full-stack',
    theme: 'emerald',
    category: 'Web Development',
    level: 'Beginner-friendly',
    learningMode: 'Hybrid: classroom + online support',
    durationLabel: 'Duration to be confirmed',
    highlights: [
      'Frontend and backend foundations',
      'Modern TypeScript stack',
      'Full-stack project practice',
    ],
    modules: createModules('modern-full-stack-web-development-ai', [
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
    ]),
    projectPlaceholder: {
      label: 'Full-stack project brief coming soon',
      description:
        'Application requirements and milestone details will be added after curriculum review.',
    },
    interviewPreparation: true,
    published: true,
    beginnerSuitability:
      'Starts with how the web works and introduces each part of the stack in sequence before combining them in guided applications.',
    learningOutcomes: [
      'Build responsive frontend interfaces',
      'Create and connect server-side application features',
      'Use version control, testing, and deployment foundations',
    ],
    learningFormat: sharedLearningFormat,
    prerequisites: sharedPrerequisites,
    toolsAndTechnologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'Express',
      'MongoDB',
      'Git',
    ],
  },
  {
    id: 'course-python-using-ai',
    slug: 'python-using-ai',
    title: 'Python using AI',
    shortTitle: 'Python',
    subtitle: 'Build clear programming fundamentals through Python practice.',
    description:
      'A beginner-oriented programming course covering logic, functions, data structures, object-oriented programming, files, errors, Linux, foundational libraries, Git, and projects.',
    icon: 'python',
    theme: 'amber',
    category: 'Programming',
    level: 'Beginner-friendly',
    learningMode: 'Hybrid: classroom + online support',
    durationLabel: 'Duration to be confirmed',
    highlights: [
      'Programming logic',
      'Object-oriented foundations',
      'Guided Python projects',
    ],
    modules: createModules('python-using-ai', [
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
    ]),
    projectPlaceholder: {
      label: 'Python project brief coming soon',
      description:
        'The guided project specification will be published after curriculum review.',
    },
    interviewPreparation: true,
    published: true,
    beginnerSuitability:
      'Built for first-time programmers, with a gradual path from basic syntax and logic to reusable programs and practical work.',
    learningOutcomes: [
      'Write readable programs using core Python constructs',
      'Organise logic with functions, classes, and data structures',
      'Use development tools to practise and present Python work',
    ],
    learningFormat: sharedLearningFormat,
    prerequisites: sharedPrerequisites,
    toolsAndTechnologies: [
      'Python',
      'NumPy',
      'Matplotlib',
      'Linux command line',
      'Git',
      'GitHub',
      'AI coding assistants',
    ],
  },
  {
    id: 'course-c-cpp-using-ai',
    slug: 'c-cpp-using-ai',
    title: 'C & C++ using AI',
    shortTitle: 'C & C++',
    subtitle: 'Strengthen programming and problem-solving foundations.',
    description:
      'A structured course in C and C++ fundamentals, memory concepts, object-oriented programming, the standard library, Linux, version control, problem solving, and projects.',
    icon: 'c-cpp',
    theme: 'cyan',
    category: 'Programming',
    level: 'Beginner-friendly',
    learningMode: 'Hybrid: classroom + online support',
    durationLabel: 'Duration to be confirmed',
    highlights: [
      'C and C++ foundations',
      'Memory and OOP concepts',
      'Problem-solving practice',
    ],
    modules: createModules('c-cpp-using-ai', [
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
    ]),
    projectPlaceholder: {
      label: 'C and C++ project brief coming soon',
      description:
        'Project requirements and assessment guidance will be added after curriculum review.',
    },
    interviewPreparation: true,
    published: true,
    beginnerSuitability:
      'Introduces programming step by step while building a careful understanding of syntax, memory, problem solving, and object-oriented ideas.',
    learningOutcomes: [
      'Write and reason about structured C programs',
      'Apply object-oriented concepts with C++',
      'Use standard tools to solve and review programming problems',
    ],
    learningFormat: sharedLearningFormat,
    prerequisites: sharedPrerequisites,
    toolsAndTechnologies: [
      'C',
      'C++',
      'Standard Template Library',
      'Linux command line',
      'Compiler toolchain',
      'Git',
      'GitHub',
    ],
  },
  {
    id: 'course-java-using-ai',
    slug: 'java-using-ai',
    title: 'Java using AI',
    shortTitle: 'Java',
    subtitle: 'Learn object-oriented application development with Java.',
    description:
      'A progressive Java course covering core syntax, object-oriented programming, collections, exceptions, files, JDBC, Spring Boot foundations, REST APIs, Git, and projects.',
    icon: 'java',
    theme: 'violet',
    category: 'Programming',
    level: 'Beginner-friendly',
    learningMode: 'Hybrid: classroom + online support',
    durationLabel: 'Duration to be confirmed',
    highlights: [
      'Core Java and OOP',
      'Collections and JDBC',
      'REST API foundations',
    ],
    modules: createModules('java-using-ai', [
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
    ]),
    projectPlaceholder: {
      label: 'Java project brief coming soon',
      description:
        'The application brief and project milestones will be published after curriculum review.',
    },
    interviewPreparation: true,
    published: true,
    beginnerSuitability:
      'Begins with core language concepts and steadily develops the object-oriented and application foundations needed for guided Java projects.',
    learningOutcomes: [
      'Write Java programs using core language features',
      'Model application logic with object-oriented concepts',
      'Understand the foundations of database and REST API development',
    ],
    learningFormat: sharedLearningFormat,
    prerequisites: sharedPrerequisites,
    toolsAndTechnologies: [
      'Java',
      'JDK',
      'JDBC',
      'Spring Boot',
      'REST APIs',
      'Git',
      'GitHub',
      'AI coding assistants',
    ],
  },
] satisfies readonly Course[]

export const courses = parseCourseRegistry(courseRegistrySource)

export const publishedCourses = courses.filter((course) => course.published)

export const courseCategories: readonly ('All courses' | CourseCategory)[] = [
  'All courses',
  ...new Set(publishedCourses.map((course) => course.category)),
]

export function getCourseBySlug(slug: unknown) {
  if (!isSafeSlug(slug)) {
    return undefined
  }

  return publishedCourses.find((course) => course.slug === slug)
}

export function getModuleBySlug(course: Course, slug: unknown) {
  if (!isSafeSlug(slug)) {
    return undefined
  }

  return course.modules.find(
    (courseModule) => courseModule.published && courseModule.slug === slug,
  )
}

export function getLessonBySlug(courseModule: CourseModule, slug: unknown) {
  if (!isSafeSlug(slug)) {
    return undefined
  }

  return courseModule.lessons.find(
    (lesson) => lesson.published && lesson.slug === slug,
  )
}

export function getAdjacentCourses(slug: string) {
  const index = publishedCourses.findIndex((course) => course.slug === slug)

  if (index === -1) {
    return { previous: undefined, next: undefined }
  }

  return {
    previous:
      publishedCourses[
        (index - 1 + publishedCourses.length) % publishedCourses.length
      ],
    next: publishedCourses[(index + 1) % publishedCourses.length],
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === 'string'
}

function isSafeOptionalUrl(value: unknown): value is string | null {
  if (value === null) return true
  if (typeof value !== 'string') return false

  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

function isStringArray(value: unknown): value is readonly string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function isSafeSlug(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.length > 0 &&
    value.length <= 120 &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
  )
}

function isLearningResource(value: unknown): value is LearningResource {
  if (!isRecord(value)) return false

  return (
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.title) &&
    typeof value.description === 'string' &&
    ['video', 'article', 'download', 'link'].includes(String(value.type)) &&
    isSafeOptionalUrl(value.url)
  )
}

function isRevisionPoint(value: unknown): value is RevisionPoint {
  return (
    isRecord(value) &&
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.title) &&
    typeof value.summary === 'string' &&
    typeof value.explanation === 'string' &&
    isNonEmptyString(value.question) &&
    typeof value.answer === 'string'
  )
}

function hasPracticeBase(value: Record<string, unknown>) {
  return (
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.prompt) &&
    isNullableString(value.hint) &&
    typeof value.solution === 'string' &&
    typeof value.explanation === 'string'
  )
}

function isPracticeQuestion(value: unknown): value is PracticeQuestion {
  if (!isRecord(value) || !hasPracticeBase(value)) return false

  switch (value.type) {
    case 'multiple-choice':
      return (
        isStringArray(value.options) &&
        value.options.length >= 2 &&
        isNonEmptyString(value.correctAnswer) &&
        value.options.includes(value.correctAnswer)
      )
    case 'true-false':
      return typeof value.correctAnswer === 'boolean'
    case 'short-answer':
      return isNonEmptyString(value.correctAnswer)
    case 'coding':
      return (
        isNonEmptyString(value.language) &&
        typeof value.starterCode === 'string' &&
        typeof value.expectedOutput === 'string'
      )
    default:
      return false
  }
}

function isCodingPractice(value: unknown): value is CodingPractice {
  return (
    isRecord(value) &&
    isNonEmptyString(value.instructions) &&
    isNonEmptyString(value.language) &&
    typeof value.starterCode === 'string' &&
    typeof value.expectedOutput === 'string'
  )
}

function isLesson(value: unknown): value is Lesson {
  if (!isRecord(value)) return false

  return (
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.title) &&
    isSafeSlug(value.slug) &&
    typeof value.summary === 'string' &&
    typeof value.estimatedMinutes === 'number' &&
    Number.isFinite(value.estimatedMinutes) &&
    value.estimatedMinutes >= 0 &&
    ['Beginner', 'Intermediate', 'Advanced'].includes(
      String(value.difficulty),
    ) &&
    isSafeOptionalUrl(value.youtubeUrl) &&
    typeof value.overview === 'string' &&
    isStringArray(value.notes) &&
    Array.isArray(value.revisionPoints) &&
    value.revisionPoints.every(isRevisionPoint) &&
    Array.isArray(value.practiceQuestions) &&
    value.practiceQuestions.every(isPracticeQuestion) &&
    Array.isArray(value.quizQuestions) &&
    value.quizQuestions.every(
      (question) =>
        isRecord(question) &&
        isNonEmptyString(question.id) &&
        isNonEmptyString(question.prompt) &&
        isStringArray(question.options) &&
        typeof question.correctAnswerIndex === 'number' &&
        Number.isInteger(question.correctAnswerIndex) &&
        question.correctAnswerIndex >= 0 &&
        question.correctAnswerIndex < question.options.length &&
        typeof question.explanation === 'string',
    ) &&
    isNullableString(value.codeExample) &&
    (value.codingPractice === null || isCodingPractice(value.codingPractice)) &&
    Array.isArray(value.resources) &&
    value.resources.every(isLearningResource) &&
    (value.previousLesson === null || isSafeSlug(value.previousLesson)) &&
    (value.nextLesson === null || isSafeSlug(value.nextLesson)) &&
    typeof value.published === 'boolean'
  )
}

export function isValidLessonData(value: unknown): value is Lesson {
  return isLesson(value)
}

function isCourseModule(value: unknown): value is CourseModule {
  if (!isRecord(value)) return false

  const projectIsValid =
    value.project === null ||
    (isRecord(value.project) &&
      isNonEmptyString(value.project.id) &&
      isNonEmptyString(value.project.title) &&
      typeof value.project.description === 'string' &&
      typeof value.project.published === 'boolean')

  return (
    isNonEmptyString(value.id) &&
    isSafeSlug(value.slug) &&
    isNonEmptyString(value.title) &&
    typeof value.summary === 'string' &&
    typeof value.estimatedMinutes === 'number' &&
    Number.isFinite(value.estimatedMinutes) &&
    value.estimatedMinutes >= 0 &&
    Array.isArray(value.lessons) &&
    value.lessons.every(isLesson) &&
    Array.isArray(value.resources) &&
    value.resources.every(isLearningResource) &&
    projectIsValid &&
    typeof value.published === 'boolean'
  )
}

function isCourse(value: unknown): value is Course {
  if (!isRecord(value)) return false

  return (
    isNonEmptyString(value.id) &&
    isSafeSlug(value.slug) &&
    isNonEmptyString(value.title) &&
    isNonEmptyString(value.shortTitle) &&
    isNonEmptyString(value.subtitle) &&
    isNonEmptyString(value.description) &&
    [
      'analytics',
      'data-science',
      'full-stack',
      'python',
      'c-cpp',
      'java',
    ].includes(String(value.icon)) &&
    ['cyan', 'violet', 'emerald', 'amber'].includes(String(value.theme)) &&
    ['Data & AI', 'Web Development', 'Programming'].includes(
      String(value.category),
    ) &&
    isNonEmptyString(value.level) &&
    isNonEmptyString(value.learningMode) &&
    isNonEmptyString(value.durationLabel) &&
    isStringArray(value.highlights) &&
    Array.isArray(value.modules) &&
    value.modules.every(isCourseModule) &&
    isRecord(value.projectPlaceholder) &&
    isNonEmptyString(value.projectPlaceholder.label) &&
    typeof value.projectPlaceholder.description === 'string' &&
    typeof value.interviewPreparation === 'boolean' &&
    typeof value.published === 'boolean' &&
    isNonEmptyString(value.beginnerSuitability) &&
    isStringArray(value.learningOutcomes) &&
    isStringArray(value.learningFormat) &&
    isStringArray(value.prerequisites) &&
    isStringArray(value.toolsAndTechnologies)
  )
}

function parseCourseRegistry(value: unknown): readonly Course[] {
  if (!Array.isArray(value) || !value.every(isCourse)) {
    throw new Error('Invalid course registry content')
  }

  const courseSlugs = new Set<string>()

  for (const course of value) {
    if (courseSlugs.has(course.slug)) {
      throw new Error(`Duplicate course slug: ${course.slug}`)
    }
    courseSlugs.add(course.slug)

    const moduleSlugs = new Set<string>()

    for (const courseModule of course.modules) {
      if (moduleSlugs.has(courseModule.slug)) {
        throw new Error(`Duplicate module slug: ${courseModule.slug}`)
      }
      moduleSlugs.add(courseModule.slug)

      const lessonSlugs = new Set(
        courseModule.lessons.map((lesson) => lesson.slug),
      )

      if (lessonSlugs.size !== courseModule.lessons.length) {
        throw new Error(`Duplicate lesson slug in module: ${courseModule.slug}`)
      }

      for (const lesson of courseModule.lessons) {
        if (
          (lesson.previousLesson && !lessonSlugs.has(lesson.previousLesson)) ||
          (lesson.nextLesson && !lessonSlugs.has(lesson.nextLesson))
        ) {
          throw new Error(`Invalid lesson navigation in: ${lesson.slug}`)
        }
      }
    }
  }

  return value
}

export type CourseRegistryParseResult =
  { success: true; data: readonly Course[] } | { success: false; error: string }

export function safeParseCourseRegistry(
  value: unknown,
): CourseRegistryParseResult {
  try {
    return { success: true, data: parseCourseRegistry(value) }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Invalid course registry content',
    }
  }
}
