export interface WorkEntry {
  company: string
  role: string
  period: string
  description: string
  bullets: string[]
  tags: string[]
}

export interface SkillCategory {
  name: string
  skills: string[]
  featured?: boolean
  description?: string
}
