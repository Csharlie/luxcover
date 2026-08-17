import type { LcHeroData } from './lc-hero.schema'

export function LcHero({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
}: LcHeroData) {
  return (
    <section
      id="hero"
      data-ui-id="section-lc-hero"
      data-ui-component="lc-hero"
      data-ui-role="hero"
      data-ui-state="default"
      data-ui-variant="primary"
      className="relative min-h-screen pt-20 pb-20 flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {backgroundImage && (
          <img
            src={backgroundImage.src}
            alt={backgroundImage.alt ?? ''}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {/* Dark overlay — heavy left, lighter right */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,10,16,0.95),rgba(10,10,16,0.82),rgba(10,10,16,0.60))]" />
        {/* Gold shimmer at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      </div>

      {/* Content — left-aligned */}
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          {eyebrow && (
            <p
              className="text-xs md:text-sm font-semibold text-gold uppercase tracking-[0.25em] mb-10"
              data-ui-id="hero-eyebrow"
              data-ui-role="hero-eyebrow"
            >
              {eyebrow}
            </p>
          )}

          {/* Subtitle */}
          {subtitle && (
            <p
              className="text-sm font-medium text-gold uppercase tracking-[0.2em] mb-8"
              data-ui-id="hero-subtitle"
              data-ui-role="hero-subtitle"
            >
              {subtitle}
            </p>
          )}

          {/* Title */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-10 leading-tight tracking-tight [text-shadow:0_4px_24px_rgba(0,0,0,0.9),0_2px_8px_rgba(0,0,0,0.7)]"
            data-ui-id="hero-title"
            data-ui-role="hero-title"
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className="text-lg md:text-xl text-gray-200 mb-12 leading-relaxed max-w-2xl"
            data-ui-id="hero-description"
            data-ui-role="hero-description"
          >
            {description}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4"
            data-ui-id="hero-cta-group"
            data-ui-role="hero-cta-group"
          >
            {primaryCTA && (
              <a
                href={primaryCTA.href}
                onClick={(e) => {
                  if (primaryCTA.href.startsWith('#')) {
                    e.preventDefault()
                    document.querySelector(primaryCTA.href)?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                data-ui-type="link"
                data-ui-id="hero-primary-cta"
                data-ui-action="navigate"
                data-ui-trigger="click"
                data-ui-role="primary-cta"
                className="inline-flex items-center justify-center px-8 py-4 text-obsidian-950 font-bold text-base rounded transition-all bg-gold hover:bg-gold-light"
              >
                {primaryCTA.text}
              </a>
            )}

            {secondaryCTA && (
              <a
                href={secondaryCTA.href}
                onClick={(e) => {
                  if (secondaryCTA.href.startsWith('#')) {
                    e.preventDefault()
                    document.querySelector(secondaryCTA.href)?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                data-ui-type="link"
                data-ui-id="hero-secondary-cta"
                data-ui-action="navigate"
                data-ui-trigger="click"
                data-ui-role="secondary-cta"
                className="inline-flex items-center justify-center px-8 py-4 text-gray-300 font-normal text-base rounded transition-all border border-gray-600 hover:border-gold/60 hover:text-white"
              >
                {secondaryCTA.text}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        data-ui-role="scroll-indicator"
      >
        <div className="w-6 h-10 border-2 border-gold/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
