import type { SiteData } from '@spektra/types'

export const siteData: SiteData = {
  site: {
    name: 'LuxCover',
    description: 'Professzionális autó- és épületfóliázás Kiskunfélegyházán. Ablakfólia, wrap, PPF.',
    url: 'https://luxcover.hu',
    locale: 'hu',
  },

  navigation: {
    primary: [
      { label: 'Szolgáltatások', href: '#services' },
      { label: 'Rólunk', href: '#about' },
      { label: 'Galéria', href: '#gallery' },
      { label: 'Kapcsolat', href: '#contact' },
    ],
    footer: [
      { label: 'Szolgáltatások', href: '#services' },
      { label: 'Rólunk', href: '#about' },
      { label: 'Galéria', href: '#gallery' },
      { label: 'Kapcsolat', href: '#contact' },
      { label: 'Adatvédelem', href: '#privacy' },
      { label: 'ÁSZF', href: '#terms' },
    ],
  },

  pages: [
    {
      slug: 'home',
      title: 'Főoldal',
      meta: {
        title: 'LuxCover | Autó- és épületfóliázás – Ablakfólia, Wrap, PPF – Kiskunfélegyháza',
        description:
          'LuxCover – Karcálló karosszériavédelem (PPF), öngyógyuló fóliák, hő- és UV-blokkoló üvegfóliák, teljes autó wrap és épületfóliázás. Professzionális kivitelezés Kiskunfélegyházán.',
      },
      sections: [
        // ---------------------------------------------------------------
        // 1. lc-hero
        // ---------------------------------------------------------------
        {
          id: 'hero-1',
          type: 'lc-hero',
          data: {
            eyebrow: 'ABLAKFÓLIA · WRAP · PPF · ÉPÜLETFÓLIA',
            title: 'Védd, amit építettél.',
            description:
              'Karcálló karosszériavédelem, hő- és UV-blokkoló üvegfóliák, teljes karosszéria wrap. Professzionális kivitelezés, minőségi anyagok, tartós végeredmény – ez a LuxCover.',
            primaryCTA: { text: 'Szolgáltatásaink', href: '#services' },
            secondaryCTA: { text: 'Ajánlatot kérek', href: '#contact' },
            backgroundImage: {
              src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&auto=format&fit=crop&q=80',
              alt: 'Autófóliázás professzionálisan',
            },
          },
        },

        // ---------------------------------------------------------------
        // 2. lc-services
        // ---------------------------------------------------------------
        {
          id: 'services-1',
          type: 'lc-services',
          data: {
            title: 'Fóliázás járműre és épületre',
            subtitle: 'Szolgáltatásaink',
            services: [
              {
                title: 'Ablakfólia',
                icon: 'Sun',
                description:
                  'Hő- és UV-blokkoló üvegfóliák járműre és épületre. Csökkenti a belső hőmérsékletet, védi a kárpitot és az egészséget, fokozza a magánszférát – látványos, diszkrét megjelenéssel.',
                backgroundImage:
                  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600&auto=format&fit=crop&q=80',
              },
              {
                title: 'Wrap – Színfóliázás',
                icon: 'Layers',
                description:
                  'Teljes karosszériaszín-csere fóliával. Védi az eredeti festéket, bármikor visszaállítható, széles színpaletta. Tökéletes autótuninghoz, flottabranding-hez és frissítéshez.',
                backgroundImage:
                  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&auto=format&fit=crop&q=80',
              },
              {
                title: 'PPF – Karosszériavédelem',
                icon: 'Shield',
                description:
                  'Karcálló, öngyógyuló paint protection film. Láthatatlan védelem a kavicssérülések, karcok és kémiai hatások ellen. Megőrzi az autó értékét és fényét éveken át.',
                backgroundImage:
                  'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1600&auto=format&fit=crop&q=80',
              },
              {
                title: 'Épületfóliázás',
                icon: 'Building2',
                description:
                  'Energiatakarékos és dekoratív üvegfóliák irodákba, lakásokba és kereskedelmi terekbe. UV-szűrés, hővédelem és diszkrét árnyékolás egyben.',
                backgroundImage:
                  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=80',
              },
            ],
          },
        },

        // ---------------------------------------------------------------
        // 3. lc-about
        // ---------------------------------------------------------------
        {
          id: 'about-1',
          type: 'lc-about',
          data: {
            title: 'Prémium fóliázás, megbízható szakértelemmel',
            subtitle: 'LuxCover',
            content: [
              'A LuxCover autó- és épületfóliázásra specializálódott műhely Kiskunfélegyházán. Karcálló és öngyógyuló karosszériavédő fóliákat (PPF), hő- és UV-blokkoló üvegfóliákat, valamint teljes karosszéria wrap munkákat vállalunk.',
              'Minden munkánál minőségi anyagokat és precíz kivitelezést alkalmazunk – legyen szó egyetlen ablaklapról vagy egy teljes autó fóliázásáról. Tartós végeredmény, elégedett ügyfél.',
            ],
            image: {
              src: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=80',
              alt: 'LuxCover fóliázás',
            },
            stats: [
              { value: 'PPF · Wrap · Ablakfólia', label: 'Specializált szaktudás' },
              { value: 'Kiskunfélegyháza', label: 'Helyi jelenlét, személyes kiszolgálás' },
              { value: 'Tartós', label: 'Minőségi anyagok, precíz kivitelezés' },
            ],
            cta: { text: 'Kapcsolatfelvétel', href: '#contact' },
          },
        },

        // ---------------------------------------------------------------
        // 4. lc-gallery
        // ---------------------------------------------------------------
        {
          id: 'gallery-1',
          type: 'lc-gallery',
          data: {
            title: 'Munkáink',
            subtitle: 'Galéria',
            showCategories: true,
            images: [
              {
                src: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop&q=80',
                alt: 'PPF karosszériavédelem',
                category: 'PPF',
                caption: 'Teljes elő karosszéria PPF',
              },
              {
                src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
                alt: 'Fekete wrap',
                category: 'Wrap',
                caption: 'Teljes autó fekete wrap',
              },
              {
                src: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&auto=format&fit=crop&q=80',
                alt: 'Wrap fóliázás',
                category: 'Wrap',
                caption: 'Karosszéria wrap részlet',
              },
              {
                src: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop&q=80',
                alt: 'Prémium autó ablakfólia',
                category: 'Ablakfólia',
                caption: 'Ablakfóliázás – oldalsó ablakok',
              },
              {
                src: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop&q=80',
                alt: 'Autó részlet fóliázás után',
                category: 'PPF',
                caption: 'PPF – ajtóél védelem',
              },
              {
                src: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format&fit=crop&q=80',
                alt: 'Sportautó wrap',
                category: 'Wrap',
                caption: 'Sportautó teljes wrap',
              },
              {
                src: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&auto=format&fit=crop&q=80',
                alt: 'Üvegfólia felhelyezés',
                category: 'Ablakfólia',
                caption: 'Üvegfólia felhelyezése',
              },
              {
                src: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=80',
                alt: 'PPF eredmény',
                category: 'PPF',
                caption: 'PPF – teljes front',
              },
            ],
          },
        },

        // ---------------------------------------------------------------
        // 5. lc-contact
        // ---------------------------------------------------------------
        {
          id: 'contact-1',
          type: 'lc-contact',
          data: {
            title: 'Kérjen ajánlatot',
            subtitle: 'Kapcsolat',
            description: 'Írjon nekünk, és hamarosan felvesszük Önnel a kapcsolatot.',
            contactInfo: {
              phone: '+36 30 341 0431',
              email: 'luxcover.info@gmail.com',
              address: 'Liget utca, Kiskunfélegyháza, 6100',
            },
          },
        },

        // ---------------------------------------------------------------
        // 6. lc-map
        // ---------------------------------------------------------------
        {
          id: 'map-1',
          type: 'lc-map',
          data: {
            title: 'LuxCover – Kiskunfélegyháza',
            query: 'Liget utca, Kiskunfélegyháza, 6100',
            height: 500,
            zoom: 14,
          },
        },
      ],
    },
  ],
}
