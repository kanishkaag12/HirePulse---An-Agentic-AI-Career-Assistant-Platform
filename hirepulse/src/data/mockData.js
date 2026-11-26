export const DEMO_RESUME_NAME = 'Alex_Morgan_Resume.pdf';

export const DEFAULT_PROFILE = {
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  headline: 'Frontend Developer',
  location: 'Bengaluru, India',
  avatar: null,
  memberSince: '2026-01-15T00:00:00.000Z',
};

export const DEFAULT_SETTINGS = {
  theme: 'light',
  defaultSort: 'newest',
  emailUpdates: true,
  productTips: false,
  sidebarCollapsed: false,
};

export const NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'Analysis complete',
    message: 'Software Engineer · Microsoft scored 89%.',
    time: '3 days ago',
    link: '/app/results/demo-1',
    read: false,
  },
  {
    id: 'n2',
    title: 'Tip: add measurable outcomes',
    message: 'Quantified results make your experience easier to evaluate.',
    time: '1 week ago',
    link: '/app/analyze',
    read: false,
  },
  {
    id: 'n3',
    title: 'Welcome to HirePulse',
    message: 'Your history is saved locally in this browser.',
    time: '2 weeks ago',
    link: '/app/history',
    read: true,
  },
];

// Skills the demo can recognise in a pasted job description.
export const SKILL_LIBRARY = [
  { name: 'JavaScript', aliases: ['es6'] },
  { name: 'TypeScript' },
  { name: 'React', aliases: ['react.js', 'reactjs'] },
  { name: 'Angular' },
  { name: 'Vue.js', aliases: ['vue'] },
  { name: 'Next.js', aliases: ['nextjs'] },
  { name: 'HTML', aliases: ['html5'] },
  { name: 'CSS', aliases: ['css3'] },
  { name: 'Tailwind CSS', aliases: ['tailwind'] },
  { name: 'Redux' },
  { name: 'Node.js', aliases: ['nodejs'] },
  { name: 'Express.js', aliases: ['expressjs'] },
  { name: 'Java' },
  { name: 'Spring Boot', aliases: ['spring'] },
  { name: 'Python' },
  { name: 'Django' },
  { name: 'FastAPI' },
  { name: 'C#', aliases: ['.net', 'dotnet'] },
  { name: 'SQL', aliases: ['mysql', 'postgresql', 'postgres'] },
  { name: 'MongoDB', aliases: ['mongo'] },
  { name: 'REST APIs', aliases: ['rest api', 'restful'] },
  { name: 'GraphQL' },
  { name: 'Git', aliases: ['github', 'gitlab'] },
  { name: 'Docker' },
  { name: 'Kubernetes', aliases: ['k8s'] },
  { name: 'AWS', aliases: ['amazon web services'] },
  { name: 'Azure' },
  { name: 'GCP', aliases: ['google cloud'] },
  { name: 'CI/CD', aliases: ['continuous integration', 'jenkins', 'github actions'] },
  { name: 'Jest' },
  { name: 'Unit Testing', aliases: ['unit tests', 'junit', 'testing library'] },
  { name: 'Microservices', aliases: ['microservice'] },
  { name: 'Agile', aliases: ['scrum'] },
  { name: 'Linux' },
  { name: 'Data Structures', aliases: ['algorithms'] },
  { name: 'Figma' },
  { name: 'Accessibility', aliases: ['a11y', 'wcag'] },
];

export const KEYWORD_LIBRARY = [
  'scalable',
  'responsive design',
  'performance',
  'code review',
  'collaboration',
  'cross-functional',
  'architecture',
  'debugging',
  'optimization',
  'documentation',
  'deployment',
  'security',
  'user experience',
  'mentoring',
  'stakeholders',
  'problem-solving',
  'state management',
  'production',
  'reliability',
  'design systems',
];

// Used when the pasted text contains too few recognisable skills.
export const FALLBACK_SKILLS = {
  required: ['Java', 'React', 'JavaScript', 'SQL', 'Git', 'REST APIs'],
  preferred: ['Docker', 'AWS', 'CI/CD', 'Kubernetes'],
};

export const FALLBACK_KEYWORDS = ['scalable', 'performance', 'code review', 'collaboration', 'debugging', 'documentation'];

function buildJobDescription({ title, company, intro, responsibilities, requirements, preferred }) {
  return [
    `${title} – ${company}`,
    '',
    intro,
    '',
    'Responsibilities:',
    ...responsibilities.map((item) => `- ${item}`),
    '',
    'Requirements:',
    ...requirements.map((item) => `- ${item}`),
    '',
    'Preferred qualifications:',
    ...preferred.map((item) => `- ${item}`),
  ].join('\n');
}

export const SAMPLE_JOB_DESCRIPTION = buildJobDescription({
  title: 'Frontend Developer',
  company: 'Nimbus Pay',
  intro:
    'Nimbus Pay is looking for a Frontend Developer to build fast, accessible and reliable web experiences for millions of customers. You will work closely with designers, backend engineers and product managers in a collaborative, cross-functional team.',
  responsibilities: [
    'Build responsive, accessible user interfaces using React and TypeScript',
    'Integrate REST APIs and manage complex client-side state',
    'Improve performance and reliability of customer-facing pages',
    'Participate in code review and contribute to our design systems',
    'Write documentation and unit tests for the features you ship',
  ],
  requirements: [
    '3+ years of professional experience in frontend development',
    'Strong knowledge of JavaScript, HTML and CSS',
    'Hands-on experience with React and Redux',
    'Experience working with REST APIs and Git',
    'Familiarity with Jest or similar testing tools',
  ],
  preferred: [
    'Experience with Next.js and GraphQL',
    'Exposure to Docker, AWS and CI/CD pipelines',
    'Understanding of WCAG accessibility guidelines',
  ],
});

export const SEED_ANALYSES = [
  {
    jobTitle: 'Software Engineer',
    company: 'Microsoft',
    score: 89,
    daysAgo: 3,
    jobDescription: buildJobDescription({
      title: 'Software Engineer',
      company: 'Microsoft',
      intro: 'Join a team building scalable cloud services used by millions of developers.',
      responsibilities: [
        'Design, build and maintain scalable cloud services',
        'Participate in code review and architecture discussions',
        'Collaborate with cross-functional teams to ship features',
        'Improve performance, reliability and security of services',
      ],
      requirements: [
        '4+ years of experience building production software',
        'Strong skills in Java or C# and data structures',
        'Experience designing REST APIs and microservices',
        'Proficiency with SQL databases and Git',
      ],
      preferred: ['Experience with Azure and CI/CD pipelines', 'Familiarity with Docker and Kubernetes'],
    }),
  },
  {
    jobTitle: 'Frontend Developer',
    company: 'Google',
    score: 82,
    daysAgo: 9,
    jobDescription: buildJobDescription({
      title: 'Frontend Developer',
      company: 'Google',
      intro: 'Help us craft fast and accessible interfaces for products used around the world.',
      responsibilities: [
        'Build responsive design systems and user interfaces',
        'Optimize performance across devices and browsers',
        'Partner with designers using Figma to deliver great user experience',
        'Write documentation and participate in code review',
      ],
      requirements: [
        '3+ years of experience with JavaScript, React and TypeScript',
        'Solid understanding of HTML and CSS',
        'Experience integrating REST APIs and state management with Redux',
        'Comfortable with Git and unit testing using Jest',
      ],
      preferred: ['Experience with Next.js and GraphQL', 'Knowledge of WCAG accessibility standards'],
    }),
  },
  {
    jobTitle: 'Java Developer',
    company: 'Infosys',
    score: 76,
    daysAgo: 16,
    jobDescription: buildJobDescription({
      title: 'Java Developer',
      company: 'Infosys',
      intro: 'Work on enterprise applications for global clients in an Agile delivery team.',
      responsibilities: [
        'Develop and maintain backend modules for enterprise applications',
        'Write unit tests with JUnit and resolve production issues',
        'Work with stakeholders to clarify requirements',
        'Contribute to debugging and performance optimization',
      ],
      requirements: [
        '2+ years of experience with Java and Spring Boot',
        'Good knowledge of SQL and relational databases',
        'Experience building REST APIs',
        'Familiarity with Git and Agile ways of working',
      ],
      preferred: ['Exposure to microservices, Docker and AWS', 'Experience with CI/CD tools such as Jenkins'],
    }),
  },
  {
    jobTitle: 'React Developer',
    company: 'Amazon',
    score: 71,
    daysAgo: 24,
    jobDescription: buildJobDescription({
      title: 'React Developer',
      company: 'Amazon',
      intro: 'Build customer-facing experiences at scale for a high-traffic retail platform.',
      responsibilities: [
        'Develop scalable React components for customer-facing pages',
        'Own state management and API integration for key flows',
        'Collaborate with cross-functional partners on deployment and monitoring',
        'Improve reliability and performance in production',
      ],
      requirements: [
        '3+ years of experience with React and JavaScript',
        'Experience with Redux',
        'Strong HTML/CSS skills',
        'Experience with REST APIs and Git',
      ],
      preferred: ['Experience with AWS, Docker and CI/CD', 'TypeScript and Node.js experience'],
    }),
  },
  {
    jobTitle: 'Full Stack Developer',
    company: 'Flipkart',
    score: 64,
    daysAgo: 33,
    jobDescription: buildJobDescription({
      title: 'Full Stack Developer',
      company: 'Flipkart',
      intro: 'Own features end-to-end across our web platform and services.',
      responsibilities: [
        'Build features across frontend and backend services',
        'Design scalable architecture for new services',
        'Participate in code review and mentoring',
        'Monitor production systems and improve reliability',
      ],
      requirements: [
        '2-4 years of experience with Node.js, Express.js and React',
        'Experience with MongoDB and SQL',
        'Understanding of REST APIs and microservices',
      ],
      preferred: ['Experience with Kubernetes, Docker and GCP', 'Familiarity with GraphQL'],
    }),
  },
  {
    jobTitle: 'UI Engineer',
    company: 'Atlassian',
    score: 58,
    daysAgo: 45,
    jobDescription: buildJobDescription({
      title: 'UI Engineer',
      company: 'Atlassian',
      intro: 'Shape the building blocks of products used by teams everywhere.',
      responsibilities: [
        'Build and maintain components in our design systems',
        'Champion accessibility and user experience',
        'Collaborate with designers and engineers across teams',
        'Write documentation for shared components',
      ],
      requirements: [
        '3+ years of experience with TypeScript, React and CSS',
        'Strong eye for user experience and accessibility',
        'Experience with Jest unit testing',
      ],
      preferred: ['Experience with Figma and Tailwind CSS', 'Exposure to CI/CD and performance tooling'],
    }),
  },
];
