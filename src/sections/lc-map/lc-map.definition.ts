import type { SectionDefinition } from '@spektra/runtime'
import type { LcMapData } from './lc-map.schema'
import { LcMap } from './lc-map.component'

export const lcMapDefinition: SectionDefinition<LcMapData> = {
  type: 'lc-map',
  component: LcMap,
}
