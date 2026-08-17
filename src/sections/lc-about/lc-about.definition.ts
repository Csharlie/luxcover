import type { SectionDefinition } from '@spektra/runtime'
import type { LcAboutData } from './lc-about.schema'
import { LcAbout } from './lc-about.component'

export const lcAboutDefinition: SectionDefinition<LcAboutData> = {
  type: 'lc-about',
  component: LcAbout,
}
