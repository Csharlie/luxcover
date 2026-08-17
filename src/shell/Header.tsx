import { NavigationBar } from '@spektra/components'
import type { LayoutShellProps } from '@spektra/layouts'

export function AppHeader({ siteData }: LayoutShellProps) {
  const links = siteData.navigation.primary.map((item) => ({
    label: item.label,
    href: item.href,
    onClick: () => {
      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })
    },
  }))

  return (
    <NavigationBar
      logoText="LuxCover"
      logoClassName="font-bold tracking-tight"
      onLogoClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      links={links}
      cta={{
        text: 'Ajánlatot kérek',
        onClick: () => {
          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
        },
      }}
      variant="transparent"
      className="py-6 bg-black/70 backdrop-blur-md border-transparent"
    />
  )
}
