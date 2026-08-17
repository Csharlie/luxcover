import {
  Building2,
  Layers,
  Shield,
  Sun,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import type { LcServicesData } from './lc-services.schema'

const iconMap: Record<string, LucideIcon> = { Sun, Layers, Shield, Building2 }
const iconAliases: Record<string, keyof typeof iconMap> = {
  sun: 'Sun', layers: 'Layers', shield: 'Shield',
  building2: 'Building2', building: 'Building2',
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
      className="bg-obsidian-950 scroll-mt-16"
    >
      {/* Section header */}
      <div className="container mx-auto px-6 pt-24 pb-16 text-center">
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
          className="text-4xl md:text-5xl font-bold text-white tracking-tight"
        >
          {title}
        </h2>
        <div className="mx-auto mt-5 h-px w-28 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </div>

      {/* Service blocks */}
      <div data-ui-id="services-blocks" data-ui-role="feature-blocks">
        {services.map((service, index) => {
          const isLeft = index % 2 === 0
          const Icon = resolveIcon(service.icon)
          const num = String(index + 1).padStart(2, '0')

          return (
            <div
              key={service.title}
              data-ui-id={`service-block-${index}`}
              data-ui-role="feature-block"
              className="relative flex items-center overflow-hidden"
              style={{ minHeight: '72vh' }}
            >
              {/* Background image — full cover */}
              {service.backgroundImage && (
                <img
                  src={service.backgroundImage}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  loading="lazy"
                  aria-hidden="true"
                />
              )}

              {/* Horizontal fade overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: isLeft
                    ? 'linear-gradient(to right, #0a0a10 0%, rgba(10,10,16,0.96) 38%, rgba(10,10,16,0.75) 58%, rgba(10,10,16,0.15) 82%, transparent 100%)'
                    : 'linear-gradient(to left, #0a0a10 0%, rgba(10,10,16,0.96) 38%, rgba(10,10,16,0.75) 58%, rgba(10,10,16,0.15) 82%, transparent 100%)',
                }}
              />

              {/* Top/bottom edge vignettes */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-obsidian-950 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-obsidian-950 to-transparent" />

              {/* Thin separator top */}
              {index > 0 && (
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
              )}

              {/* Content */}
              <div className="relative z-10 w-full container mx-auto px-6 max-w-7xl py-20">
                <div
                  className={`max-w-xl ${isLeft ? '' : 'ml-auto text-right'}`}
                  data-ui-id={`service-content-${index}`}
                  data-ui-role="feature-content"
                >
                  {/* Decorative number */}
                  <p
                    className={`font-black leading-none select-none pointer-events-none mb-0 ${isLeft ? '-ml-2' : '-mr-2'}`}
                    style={{
                      fontSize: 'clamp(80px, 14vw, 160px)',
                      color: 'rgba(196,154,26,0.06)',
                      lineHeight: 1,
                      marginBottom: '-0.25em',
                    }}
                    aria-hidden="true"
                  >
                    {num}
                  </p>

                  {/* Icon row with extending line */}
                  <div className={`flex items-center gap-4 mb-7 ${isLeft ? '' : 'flex-row-reverse'}`}>
                    <div className="p-2.5 rounded-lg bg-gold/10 border border-gold/20 flex-shrink-0">
                      <Icon className="w-6 h-6 text-gold" strokeWidth={1.5} />
                    </div>
                    <div
                      className="flex-1 h-px"
                      style={{
                        background: isLeft
                          ? 'linear-gradient(to right, rgba(196,154,26,0.5), transparent)'
                          : 'linear-gradient(to left, rgba(196,154,26,0.5), transparent)',
                      }}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    data-ui-id={`service-title-${index}`}
                    data-ui-role="feature-title"
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight"
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    data-ui-id={`service-desc-${index}`}
                    data-ui-role="feature-description"
                    className={`text-gray-300 text-base md:text-lg leading-relaxed mb-10 ${isLeft ? 'max-w-md' : 'max-w-md ml-auto'}`}
                  >
                    {service.description}
                  </p>

                  {/* CTA link */}
                  <div className={isLeft ? '' : 'flex justify-end'}>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault()
                        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      data-ui-type="link"
                      data-ui-id={`service-cta-${index}`}
                      data-ui-action="navigate"
                      data-ui-trigger="click"
                      className={`inline-flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-wider group ${isLeft ? '' : 'flex-row-reverse'}`}
                    >
                      <span>Ajánlatot kérek</span>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform duration-200 ${isLeft ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`}
                        strokeWidth={2}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
    </section>
  )
}
