export const DIFFICULTIES = [
  'easy',
  'medium',
  'hard',
];

export const LANGUAGES = [
  'javascript',
  'python',
  'java',
  'cpp',
  'go',
];

export const DIFFICULTY_COLORS = {
  easy:
    'text-green-400 bg-green-400/10 border-green-400/30',

  medium:
    'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',

  hard:
    'text-red-400 bg-red-400/10 border-red-400/30',
};

export const EMPTY_FORM = {
  title: '',
  difficulty: 'easy',
  description: '',

  examples: [
    {
      input: '',
      output: '',
      explanation: '',
    },
  ],

  constraints: [''],

  starterCode: {
    javascript: '',
    python: '',
    java: '',
    cpp: '',
    go: '',
  },

  testCases: [
    {
      input: '',
      expected: '',
    },
  ],

  hiddenTestCases: [
    {
      input: '',
      expected: '',
    },
  ],

  tags: '',

  timeLimitMs: 2000,

  memoryLimitMb: 128,
};