import type { SectionDefinition } from '@spektra/runtime'
import type { LcHeroData } from './lc-hero.schema'
import { LcHero } from './lc-hero.component'

export const lcHeroDefinition: SectionDefinition<LcHeroData> = {
  type: 'lc-hero',
  component: LcHero,
}
