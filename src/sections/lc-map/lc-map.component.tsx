import type { LcMapData } from './lc-map.schema'

export function LcMap({ title, query, height = 500, zoom = 14 }: LcMapData) {
  const encodedQuery = encodeURIComponent(query)

  return (
    <section
      id="map"
      data-ui-id="section-lc-map"
      data-ui-component="lc-map"
      data-ui-role="map"
      className="bg-obsidian-950 text-foreground border-t-4 border-b-4 border-gold/40 scroll-mt-16"
    >
      {title && (
        <h2
          data-ui-id="map-title"
          data-ui-role="section-title"
          className="sr-only"
        >
          {title}
        </h2>
      )}
      <iframe
        title={title ?? 'Térkép'}
        src={`https://www.google.com/maps?q=${encodedQuery}&z=${zoom}&output=embed`}
        width="100%"
        height={height}
        style={{ border: 0, display: 'block' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  )
}
