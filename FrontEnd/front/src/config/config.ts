export const CONTENT_WIDTH = 1600;

export const subjects = [
  'All',
  'Math',
  'Science',
  'English',
  'Liberal Arts',
  'STEM',
  'SAT',
] as const;

export const RESPONSE_THEME = {
  XS: 0, // 모바일 최하위부터 대응
  SM: 600, // 일반적인 작은 태블릿
  MD: 900, // 일반적인 태블릿
  LG: 1280, // 노트북
  XL: 1920, // 데스크탑
};

export const GRADES = [
  '',
  'Kindergarten',
  'USA grade 1',
  'USA grade 2',
  'USA grade 3',
  'USA grade 4',
  'USA grade 5',
  'USA grade 6',
  'USA grade 7',
  'USA grade 8',
  'Algebra 1',
  'Geometry',
  'Algebra 2',
  'Trigonometry',
  'Precalculus',
  'High school statistics',
  'Statistics and probability',
  'Linear algebra',
  'Differential equations',
  'Multivariable calculus',
  'AP Calculus BC',
  'AP Calculus AB',
  'AP Statistics',
];

export const TYPES_SUBJECT = {
  All: [
    '',
    'Multiple Choice',
    'Short Answer',
    'Mathematical Modeling',
    'Learning Through Discussion',
    'STEAM',
    'Math Puzzle',
    'Math for Literacy',
    'Physics',
    'Chemistry',
    'Biology',
    'E.S.S',
    'Sentence Completion',
    'Text Completion',
    'Reading Comprehension',
    'Homeschooling',
    'School Classes',
    'Math',
    'English',
  ],

  Math: [
    '',
    'Multiple Choice',
    'Short Answer',
    'Mathematical Modeling',
    'Learning Through Discussion',
    'STEAM',
    'Math Puzzle',
    'Math for Literacy',
  ],
  Science: ['', 'Physics', 'Chemistry', 'Biology', 'E.S.S'],
  'Liberal Arts': ['Multiple Choice', 'Short Answer'],
  English: [
    '',
    'Sentence Completion',
    'Text Completion',
    'Reading Comprehension',
  ],
  STEM: ['', 'Homeschooling', 'School Classes'],
  SAT: ['', 'Math', 'English'],
};
