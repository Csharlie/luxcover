import type { SectionDefinition } from '@spektra/runtime'
import type { LcContactData } from './lc-contact.schema'
import { LcContact } from './lc-contact.component'

export const lcContactDefinition: SectionDefinition<LcContactData> = {
  type: 'lc-contact',
  component: LcContact,
}
