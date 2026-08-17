export interface LegalSection {
  heading: string
  paragraphs: string[]
}

export interface LegalDocument {
  title: string
  lastUpdated: string
  sections: LegalSection[]
}

export const privacyPolicy: LegalDocument = {
  title: 'Adatvédelmi tájékoztató',
  lastUpdated: '2026. augusztus 17.',
  sections: [
    {
      heading: 'Az adatkezelő',
      paragraphs: [
        'LuxCover (székhely: 6100 Kiskunfélegyháza, Liget utca; e-mail: luxcover.info@gmail.com; telefon: +36 30 341 0431) — a továbbiakban: Adatkezelő.',
      ],
    },
    {
      heading: 'Kezelt adatok és az adatkezelés célja',
      paragraphs: [
        'A weboldalon elérhető kapcsolatfelvételi űrlap kitöltésekor az alábbi személyes adatokat kezeljük: teljes név, telefonszám, e-mail cím, valamint az üzenet szövege.',
        'Az adatkezelés célja: az érintett megkeresésének megválaszolása, időpont- és visszahívás-egyeztetés, ajánlatkérés teljesítése.',
      ],
    },
    {
      heading: 'Az adatkezelés jogalapja',
      paragraphs: [
        'Az adatkezelés jogalapja az érintett önkéntes hozzájárulása (GDPR 6. cikk (1) bekezdés a) pont). A hozzájárulás az űrlap elküldésével adható meg, és bármikor visszavonható.',
      ],
    },
    {
      heading: 'Az adatok megőrzési ideje',
      paragraphs: [
        'A megkeresés lezárásától számított legfeljebb 1 (egy) évig őrizzük meg a személyes adatokat, ezt követően azokat töröljük.',
      ],
    },
    {
      heading: 'Adattovábbítás',
      paragraphs: [
        'Az Adatkezelő a személyes adatokat harmadik félnek nem adja át, kivéve jogszabályi kötelezettség esetén.',
      ],
    },
    {
      heading: 'Az érintett jogai',
      paragraphs: [
        'Az érintett jogosult: hozzáférni a róla kezelt adatokhoz, kérni azok helyesbítését vagy törlését, kérni az adatkezelés korlátozását, valamint adathordozhatósághoz való jogát érvényesíteni.',
        'Jogai érvényesítése érdekében az Adatkezelőhöz fordulhat a fenti elérhetőségeken, illetve panasszal élhet a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (naih.hu).',
      ],
    },
  ],
}

export const termsOfService: LegalDocument = {
  title: 'Általános Szerződési Feltételek',
  lastUpdated: '2026. augusztus 17.',
  sections: [
    {
      heading: 'Az ÁSZF tárgya',
      paragraphs: [
        'Jelen Általános Szerződési Feltételek (ÁSZF) a LuxCover és ügyfelei között, a weboldalon keresztül igénybe vett kapcsolatfelvételi és ajánlatkérési szolgáltatások igénybevételének feltételeit rögzítik.',
      ],
    },
    {
      heading: 'A szolgáltatás igénybevétele',
      paragraphs: [
        'A weboldalon elérhető kapcsolatfelvételi űrlap kizárólag ajánlatkérés és érdeklődés célját szolgálja. Az ajánlatadás és a szerződéskötés kizárólag személyesen, e-mailben vagy telefonon történik.',
      ],
    },
    {
      heading: 'Felelősség',
      paragraphs: [
        'A LuxCover fenntartja a jogot, hogy az ajánlatkérést visszautasítsa, illetve az ajánlatot módosítsa. A weboldalon megjelenő tartalmak tájékoztató jellegűek.',
      ],
    },
    {
      heading: 'Alkalmazandó jog',
      paragraphs: [
        'Jelen ÁSZF-re a magyar jog szabályai az irányadók. A felek közötti esetleges jogvitákra a magyar bíróságok rendelkeznek joghatósággal.',
      ],
    },
  ],
}
