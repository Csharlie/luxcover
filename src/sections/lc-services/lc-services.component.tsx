import {
  Building2,
  Layers,
  Shield,
  Sun,
  type LucideIcon,
} from 'lucide-react'
import type { LcServicesData } from './lc-services.schema'

const iconMap: Record<string, LucideIcon> = {
  Sun,
  Layers,
  Shield,
  Building2,
}

const iconAliases: Record<string, keyof typeof iconMap> = {
  sun: 'Sun',
  layers: 'Layers',
  shield: 'Shield',
  building2: 'Building2',
  building: 'Building2',
}

function resolveIcon(name: string): LucideIcon {
  if (iconMap[name]) return iconMap[name]
  const key = iconAliases[name.trim().toLowerCase()]
  return key ? (iconMap[key] ?? Sun) : Sun
}

export function LcServices({ title, subtitle, services }: LcServicesData) {
  return (
    <section
      id="services"
      data-ui-id="section-lc-services"
      data-ui-component="lc-services"
      data-ui-role="features-section"
      className="bg-obsidian-900 py-24 scroll-mt-16"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          {subtitle && (
            <p
              data-ui-id="services-subtitle"
              data-ui-role="section-subtitle"
              className="text-xs font-semibold text-gold uppercase tracking-[0.25em] mb-3"
            >
              {subtitle}
            </p>
          )}
          <h2
            data-ui-id="services-title"
            data-ui-role="section-title"
            className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            {title}
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        </div>

        <div
          data-ui-id="services-grid"
          data-ui-role="feature-grid"
          className={`grid gap-6 ${services.length <= 2 ? 'md:grid-cols-2' : services.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'}`}
        >
          {services.map((service, index) => {
            const Icon = resolveIcon(service.icon)
            return (
              <div
                key={service.title}
                data-ui-id={`service-card-${index}`}
                data-ui-role="feature-card"
                className="relative overflow-hidden bg-obsidian-900 border border-obsidian-700 p-8 rounded-xl hover:border-gold/40 transition-all group"
              >
                {/* Background icon — large, faded */}
                <div className="absolute -top-3 -right-3 opacity-[0.06] group-hover:opacity-[0.10] transition-opacity">
                  <Icon className="w-28 h-28 text-gold" />
                </div>

                {/* Gold accent bar */}
                <div className="w-10 h-1 bg-gold rounded-full mb-6 group-hover:w-16 transition-all duration-300" />

                <div className="relative z-10">
                  <div className="mb-4">
                    <Icon className="w-8 h-8 text-gold" strokeWidth={1.5} />
                  </div>
                  <h3
                    data-ui-id={`services-item-title-${index}`}
                    data-ui-role="item-title"
                    className="text-xl font-bold text-white mb-4"
                  >
                    {service.title}
                  </h3>
                  <p
                    data-ui-id={`services-item-desc-${index}`}
                    data-ui-role="item-description"
                    className="text-gray-300 leading-relaxed text-sm"
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
