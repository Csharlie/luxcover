import type { SectionDefinition } from '@spektra/runtime'
import type { LcServicesData } from './lc-services.schema'
import { LcServices } from './lc-services.component'

export const lcServicesDefinition: SectionDefinition<LcServicesData> = {
  type: 'lc-services',
  component: LcServices,
}
