import type { SectionDefinition } from '@spektra/runtime'
import type { LcGalleryData } from './lc-gallery.schema'
import { LcGallery } from './lc-gallery.component'

export const lcGalleryDefinition: SectionDefinition<LcGalleryData> = {
  type: 'lc-gallery',
  component: LcGallery,
}
