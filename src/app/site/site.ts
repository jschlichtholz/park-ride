/**
 * A site.
 */
export class Site {

  /**
   * Always 'siteCms'.
   */
  type: string;

  /**
   * The state.
   */
  bundesland: string;

  /**
   * Always {@code true}.
   */
  isPublished: boolean;

  /**
   * Common information.
   */
  parkraumAusserBetriebText: string;
  parkraumAusserBetrieb_en: string;
  parkraumBahnhofName: string;
  parkraumBahnhofNummer: string;
  parkraumBemerkung: string;
  parkraumBemerkung_en: string;
  parkraumBetreiber: string;
  parkraumDisplayName: string;
  parkraumEntfernung: string;
  parkraumGeoLatitude: string;
  parkraumGeoLongitude: string;
  parkraumHausnummer: string;
  parkraumId: string;
  parkraumIsAusserBetrieb: boolean;
  parkraumIsDbBahnPark: boolean;
  parkraumIsOpenData: boolean;
  parkraumIsParktagesproduktDbFern: boolean;
  parkraumKennung: string;
  parkraumName: string;
  parkraumOeffnungszeiten: string;
  parkraumOeffnungszeiten_en: string;
  parkraumParkTypName: string;
  parkraumParkart: string;
  parkraumReservierung: string;
  parkraumSlogan: string; // Currently unused.
  parkraumSlogan_en: string; // Currently unused.
  parkraumStellplaetze: string;
  parkraumTechnik: string;
  parkraumTechnik_en: string;
  parkraumURL: string; // Currently unused.
  parkraumZufahrt: string;
  parkraumZufahrt_en: string;

  /**
   * Pricing information.
   */
  tarif1MonatAutomat: string;
  tarif1MonatDauerparken: string;
  tarif1MonatDauerparkenFesterStellplatz: string;
  tarif1Std: string;
  tarif1Tag: string;
  tarif1TagRabattDB: string;
  tarif1Woche: string;
  tarif1WocheRabattDB: string;
  tarif20Min: string;
  tarif30Min: string;
  tarifBemerkung: string;
  tarifBemerkung_en: string;
  tarifFreiparkzeit: string;
  tarifFreiparkzeit_en: string;
  tarifMonatIsDauerparken: boolean;
  tarifMonatIsParkAndRide: boolean;
  tarifMonatIsParkscheinautomat: boolean;
  tarifParkdauer: string;
  tarifParkdauer_en: string;
  tarifRabattDBIsBahnCard: boolean;
  tarifRabattDBIsParkAndRail: boolean; // Undocumented
  tarifRabattDBIsbahncomfort: boolean;
  tarifSondertarif: string;
  tarifSondertarif_en: string;
  tarifWieRabattDB: string;
  tarifWieRabattDB_en: string;
  tarifWoVorverkaufDB: string;
  tarifWoVorverkaufDB_en: string;

  /**
   * Payment information.
   */
  zahlungKundenkarten: string;
  zahlungMedien: string;
  zahlungMedien_en: string;
  zahlungMobil: string;
}
