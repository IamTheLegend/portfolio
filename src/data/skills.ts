import type { SkillCategory } from '@/types'

export const skillCategories: SkillCategory[] = [
  {
    name: 'AI & Agentic Engineering',
    featured: true,
    description:
      'Every system I build is Agentic AI-first — AI is not a feature bolted on, it is the architecture that drives the solution.',
    skills: [
      'Claude Haiku',
      'Claude Sonnet',
      'Claude Opus',
      'Cursor',
      'Cline',
      'Kiro',
      'Amazon Q',
      'Q CLI',
      'Agentic Systems Design',
      'LLM Integration',
      'Prompt Engineering',
      'AI-First Architecture',
    ],
  },
  {
    name: 'Frontend',
    skills: ['React', 'Angular', 'TypeScript', 'JavaScript', 'Node.js', 'HTML5 / CSS3'],
  },
  {
    name: 'Backend & Distributed Systems',
    skills: ['Java', 'Python', 'C#', 'Spring Boot', 'ASP.NET', 'Express', 'FastAPI', 'Microservices', 'Event-Driven Systems'],
  },
  {
    name: 'Data & Cloud',
    skills: ['AWS', 'SQL', 'NoSQL', 'Data Warehousing', 'Elasticsearch', 'Kafka', 'Redis', 'REST APIs'],
  },
]
