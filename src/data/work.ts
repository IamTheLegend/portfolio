import type { WorkEntry } from '@/types'

export const workEntries: WorkEntry[] = [
  {
    company: 'Amazon',
    role: 'Software Development Engineer II',
    period: 'Aug 2024 – Present',
    description:
      'Building Agentic AI-first full-stack systems for AWS Partner Central — a multi-billion-dollar partner ecosystem — and leading org-wide agentic AI adoption as an AI Ambassador.',
    bullets: [
      'Served as AI Ambassador, driving agentic AI adoption across ~450 engineers through seminars, R&D initiatives, and hands-on guidance — achieving 98% uptake in 4 months',
      'Architected and delivered Agentic AI-first full-stack solutions for Partner Central 3.0, leading UX and backend integration for a ~$5B program',
      'Independently owned and delivered the Partner Account Matching pilot — an Agentic AI-driven initiative built from concept to launch, projected to generate $3.5B in value over 3 years',
      'Led a 5-member team to deliver the Partner Account Connection experience within AWS Partner Central, enabling seamless AI-assisted partner collaboration across a ~$1.5B initiative',
    ],
    tags: ['Agentic AI', 'React', 'TypeScript', 'AWS', 'Microservices', 'Full-Stack'],
  },
  {
    company: 'Tesla',
    role: 'Senior Software Developer',
    period: 'Feb 2023 – Jul 2024',
    description:
      'Designed and delivered web-based HR operating system services that streamlined workflows for 1M+ active employees, eliminating third-party dependencies.',
    bullets: [
      'Led a 5-member team to architect HROS — web-based operating system services for employee and HR workflows',
      'Architected full-stack applications for employee training, recognition, and profiles used by 1M+ active users, saving $750K annually by removing third-party tool dependencies',
      'Planned and executed optimisation of 3,000+ APIs across 5 applications, improving performance by ~30% in turn-around time',
    ],
    tags: ['React', 'Node.js', 'TypeScript', 'REST APIs', 'Performance', 'Full-Stack'],
  },
  {
    company: 'Intel Corporation',
    role: 'Graduate Compilers Intern',
    period: 'May 2022 – Dec 2022',
    description:
      'Graduate research internship focused on compiler quality engineering — automated bug discovery and built intelligent diagnostic tooling for production compilers.',
    bullets: [
      'Conceptualised and built Project Eva to automate 10+ manual bug-discovery tasks, reducing testing and discovery effort by 500% (from 4–5 hrs to 45 min–1.5 hrs)',
      'Eva surfaced 70+ bugs early in production, significantly improving compiler release quality',
      'Designed an intelligent logging system that reduced per-run log size from 25 MB to 10 MB while preserving all critical compiler diagnostics',
    ],
    tags: ['Python', 'Compilers', 'Automation', 'Testing', 'Logging'],
  },
  {
    company: 'Western Digital',
    role: 'Senior Software Development Engineer',
    period: 'Aug 2017 – Jul 2021',
    description:
      'Architected and delivered enterprise self-service BI and finance platforms serving executive decision-makers, replacing proprietary tools with scalable internal solutions.',
    bullets: [
      'Led an 8-member team to build KIOSK and ROIC — self-service BI and finance platforms that replaced proprietary tools and drove $4M+ in savings through scalable analytics',
      'Architected an Angular-based custom component library for large-scale chart generation, reducing code size by 35% (8.6 MB → 5.4 MB) and improving load time by 40% (6.5 s → 3.5 s)',
      'Designed and architected Data Warehouses hosting ~25 TB of data generated from memory card testing and JIRA',
    ],
    tags: ['Angular', 'TypeScript', 'SQL', 'Data Warehousing', 'BI', 'Analytics'],
  },
]
