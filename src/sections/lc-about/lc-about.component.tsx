import type { LcAboutData } from './lc-about.schema'

export function LcAbout({ title, subtitle, content, image, stats, cta }: LcAboutData) {
  return (
    <section
      id="about"
      data-ui-id="section-lc-about"
      data-ui-component="lc-about"
      data-ui-role="about"
      className="bg-obsidian-950 text-foreground py-24 scroll-mt-16"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Text Content */}
          <div>
            {subtitle && (
              <p
                data-ui-id="about-subtitle"
                data-ui-role="section-subtitle"
                className="text-xs font-semibold text-gold uppercase tracking-[0.25em] mb-3"
              >
                {subtitle}
              </p>
            )}
            <h2
              data-ui-id="about-title"
              data-ui-role="section-title"
              className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
            >
              {title}
            </h2>
            <div className="w-12 h-0.5 bg-gold mb-8" />

            <div className="space-y-4 text-gray-300 leading-relaxed mb-8">
              {content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {cta && (
              <a
                href={cta.href}
                onClick={(e) => {
                  if (cta.href.startsWith('#')) {
                    e.preventDefault()
                    document.querySelector(cta.href)?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                data-ui-type="link"
                data-ui-id="about-cta"
                data-ui-action="navigate"
                data-ui-trigger="click"
                className="inline-flex items-center justify-center px-8 py-3 text-obsidian-950 font-bold rounded bg-gold hover:bg-gold-light transition-colors"
              >
                {cta.text}
              </a>
            )}
          </div>

          {/* Image */}
          {image && (
            <div className="relative h-[480px] rounded-xl overflow-hidden border border-obsidian-700">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Gold corner accent */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold/60 rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold/60 rounded-br-xl" />
            </div>
          )}
        </div>

        {stats && stats.length > 0 && (
          <div
            data-ui-id="about-stats"
            data-ui-role="stats-grid"
            className={`grid gap-8 pt-12 border-t border-obsidian-800 ${stats.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-lg md:text-xl font-bold text-gold mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 whitespace-pre-line">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
