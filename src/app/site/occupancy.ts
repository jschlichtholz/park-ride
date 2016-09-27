/**
 * The occupancy data.
 */
export class Occupancy {

  /**
   * The {@link Site}
   */
  site: Site;

  /**
   * The {@link Allocation}.
   */
  allocation: Allocation;
}

/**
 * The site data.
 */
class Site {

  /**
   * The ID (e.g. 350).
   */
  id: number;

  /**
   * The site ID (e.g. 350).
   */
  siteId: number;

  /**
   * The site number (e.g. 350).
   */
  flaechenNummer: number;

  /**
   * The station name (e.g. 'Aschaffenburg Hbf').
   */
  stationName: string;

  /**
   * The site name (e.g. 'Parkhaus Aschaffenburg Hauptbahnhof').
   */
  siteName: string;

  /**
   * The display name (e.g. 'Aschaffenburg Hbf P1 Parkhaus').
   */
  displayName: string;
}

/**
 * The allocation data.
 */
class Allocation {

  /**
   * If the data is valid (e.g. true).
   */
  validData: boolean;

  /**
   * The timestamp (e.g. '2016-09-24T23:41:01').
   */
  timestamp: string;

  /**
   * The time segment (e.g. '2016-09-24T23:40:00').
   */
  timeSegment: string;

  /**
   * The category (e.g. 4).
   */
  category: number;

  /**
   * The number of available lots (e.g. '> 50').
   */
  text: string;
}
