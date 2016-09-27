import {Occupancy} from './occupancy';

describe('Occupancy', () => {
  it('should create be readable from JSON', () => {
    let json = {
      'site': {
        'id': 350,
        'siteId': 350,
        'flaechenNummer': 350,
        'stationName': 'Aschaffenburg Hbf',
        'siteName': 'Parkhaus Aschaffenburg Hauptbahnhof',
        'displayName': 'Aschaffenburg Hbf P1 Parkhaus'
      },
      'allocation': {
        'validData': true,
        'timestamp': '2016-09-24T23:41:01',
        'timeSegment': '2016-09-24T23:40:00',
        'category': 4,
        'text': '> 50'
      }
    };

    let occupancy: Occupancy = json as Occupancy;

    expect(occupancy.site.id).toEqual(350);
    expect(occupancy.site.siteId).toEqual(350);
    expect(occupancy.site.flaechenNummer).toEqual(350);
    expect(occupancy.site.stationName).toEqual('Aschaffenburg Hbf');
    expect(occupancy.site.siteName).toEqual('Parkhaus Aschaffenburg Hauptbahnhof');
    expect(occupancy.site.displayName).toEqual('Aschaffenburg Hbf P1 Parkhaus');

    expect(occupancy.allocation.validData).toEqual(true);
    expect(occupancy.allocation.timestamp).toEqual('2016-09-24T23:41:01');
    expect(occupancy.allocation.timeSegment).toEqual('2016-09-24T23:40:00');
    expect(occupancy.allocation.category).toEqual(4);
    expect(occupancy.allocation.text).toEqual('> 50');
  });
});
