import { createSectionRegistry, registerSections } from '@spektra/runtime'
import type { AnySectionDefinition } from '@spektra/runtime'

import { lcHeroDefinition } from './sections/lc-hero'
import { lcServicesDefinition } from './sections/lc-services'
import { lcAboutDefinition } from './sections/lc-about'
import { lcGalleryDefinition } from './sections/lc-gallery'
import { lcContactDefinition } from './sections/lc-contact'
import { lcMapDefinition } from './sections/lc-map'

const lcSections: readonly AnySectionDefinition[] = [
  lcHeroDefinition,
  lcServicesDefinition,
  lcAboutDefinition,
  lcGalleryDefinition,
  lcContactDefinition,
  lcMapDefinition,
]

export const registry = createSectionRegistry()
registerSections(registry, lcSections)
