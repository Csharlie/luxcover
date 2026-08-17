import type { SiteData, Page, Section, NavItem, CallToAction } from '@spektra/types'

export function normalizeSiteData(data: SiteData): SiteData {
  return {
    site: normalizeSiteMeta(data.site),
    navigation: normalizeNavigation(data.navigation),
    pages: data.pages.map(normalizePage),
  }
}

function normalizeSiteMeta(site: SiteData['site']): SiteData['site'] {
  return {
    name: site.name,
    description: cleanOptional(site.description),
    url: cleanOptional(site.url),
    locale: cleanOptional(site.locale),
  }
}

function normalizeNavigation(nav: SiteData['navigation']): SiteData['navigation'] {
  return {
    primary: nav.primary.filter(isRenderableNavItem),
    footer: nav.footer?.filter(isRenderableNavItem),
  }
}

function isRenderableNavItem(item: NavItem): boolean {
  return item.label.trim().length > 0 && item.href.trim().length > 0
}

function normalizePage(page: Page): Page {
  return {
    ...page,
    title: cleanOptional(page.title),
    sections: normalizeSections(page.sections),
  }
}

function normalizeSections(sections: Section[]): Section[] {
  return sections.map(normalizeSection).filter(isDefined)
}

function normalizeSection(section: Section): Section | undefined {
  const result = normalizeSectionData(section.type, section.data as Record<string, unknown>)
  if (result === undefined) return undefined
  return { ...section, data: result }
}

function normalizeSectionData(
  type: string,
  data: Record<string, unknown>,
): Record<string, unknown> | undefined {
  switch (type) {
    case 'lc-hero':
      return normalizeLcHero(data)
    case 'lc-services':
      return normalizeLcServices(data)
    case 'lc-about':
      return normalizeLcAbout(data)
    case 'lc-gallery':
      return normalizeLcGallery(data)
    case 'lc-contact':
      return normalizeLcContact(data)
    case 'lc-map':
      return normalizeLcMap(data)
    default:
      return data
  }
}

function normalizeLcHero(data: Record<string, unknown>): Record<string, unknown> | undefined {
  const result = { ...data }
  result.subtitle = cleanOptional(result.subtitle)
  result.primaryCTA = cleanCta(result.primaryCTA)
  result.secondaryCTA = cleanCta(result.secondaryCTA)
  if (!hasRenderableHero(result)) return undefined
  return result
}

function hasRenderableHero(data: Record<string, unknown>): boolean {
  if (typeof data.title === 'string' && data.title.trim().length > 0) return true
  if (typeof data.description === 'string' && data.description.trim().length > 0) return true
  if (data.primaryCTA !== undefined) return true
  if (data.secondaryCTA !== undefined) return true
  if (isRecord(data.backgroundImage) && typeof data.backgroundImage.src === 'string' && data.backgroundImage.src.trim().length > 0) return true
  return false
}

function normalizeLcServices(data: Record<string, unknown>): Record<string, unknown> | undefined {
  if (typeof data.title !== 'string' || data.title.trim().length === 0) return undefined
  const services = asTypedArray(data.services)
  const renderable = services.filter((s) => typeof s.title === 'string' && s.title.trim().length > 0)
  if (renderable.length === 0) return undefined
  return { ...data, subtitle: cleanOptional(data.subtitle), services: renderable }
}

function normalizeLcAbout(data: Record<string, unknown>): Record<string, unknown> {
  const result = { ...data }
  result.subtitle = cleanOptional(result.subtitle)
  result.cta = cleanCta(result.cta)
  const stats = asTypedArray(result.stats)
  const renderableStats = stats.filter(
    (s) => typeof s.value === 'string' && s.value.trim().length > 0 && typeof s.label === 'string' && s.label.trim().length > 0,
  )
  result.stats = renderableStats.length > 0 ? renderableStats : undefined
  return result
}

function normalizeLcGallery(data: Record<string, unknown>): Record<string, unknown> | undefined {
  const images = asTypedArray(data.images)
  const renderable = images.filter((img) => typeof img.src === 'string' && img.src.trim().length > 0)
  if (renderable.length === 0) return undefined
  return { ...data, subtitle: cleanOptional(data.subtitle), images: renderable }
}

function normalizeLcContact(data: Record<string, unknown>): Record<string, unknown> | undefined {
  const result = { ...data }
  result.subtitle = cleanOptional(result.subtitle)
  result.description = cleanOptional(result.description)
  if (isRecord(result.contactInfo)) {
    const ci = { ...result.contactInfo } as Record<string, unknown>
    ci.phone = cleanOptional(ci.phone)
    ci.email = cleanOptional(ci.email)
    ci.address = cleanOptional(ci.address)
    result.contactInfo = ci
    if (!hasRenderableContactInfo(ci)) return undefined
  } else {
    return undefined
  }
  return result
}

function hasRenderableContactInfo(ci: Record<string, unknown>): boolean {
  return typeof ci.phone === 'string' || typeof ci.email === 'string' || typeof ci.address === 'string'
}

function normalizeLcMap(data: Record<string, unknown>): Record<string, unknown> {
  return { ...data, title: cleanOptional(data.title) }
}

function cleanOptional(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

function cleanCta(value: unknown): CallToAction | undefined {
  if (!isRecord(value)) return undefined
  const text = typeof value.text === 'string' ? value.text.trim() : ''
  const href = typeof value.href === 'string' ? value.href.trim() : ''
  if (text.length === 0 || href.length === 0) return undefined
  return { text, href }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null
}

function asTypedArray(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? (value.filter(isRecord) as Record<string, unknown>[]) : []
}
