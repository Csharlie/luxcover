import type { CallToAction, Media } from '@spektra/types'

export interface LcAboutStat {
  value: string
  label: string
}

export interface LcAboutData {
  title: string
  subtitle?: string
  content: string[]
  image?: Media
  stats?: LcAboutStat[]
  cta?: CallToAction
}
