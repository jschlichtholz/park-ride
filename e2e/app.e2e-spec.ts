import {ParkPage} from './app.po';

/**
 * Test case to check basic functionality.
 */
describe('park App', function () {
  let page: ParkPage;

  beforeEach(() => {
    page = new ParkPage();
  });

  it('should display the applications name', () => {
    ParkPage.navigateTo();
    expect(ParkPage.getNavbarBrandText()).toEqual('park&ride');
  });

  it('should display a search field', () => {
    ParkPage.navigateTo();
    expect(ParkPage.getNavbarFormInput().getAttribute('placeholder')).toEqual('Suche...');
    expect(ParkPage.getNavbarFormInput().getAttribute('type')).toEqual('search');
    expect(ParkPage.getNavbarFormInput().getAttribute('autofocus')).toBe('true');
  });

  it('should display a copyright', () => {
    ParkPage.navigateTo();
    expect(ParkPage.getFooterLeft().getText()).toEqual('© 2016 Julian Schlichtholz');
  });

  /**
   * Check if language selection works as expected.
   */
  it('should have a language selector', () => {
    ParkPage.navigateTo();

    ParkPage.getLanguageSelector('gb').click();
    expect(ParkPage.getNavbarFormInput().getAttribute('placeholder')).toEqual('Search...');

    ParkPage.getLanguageSelector('de').click();
    expect(ParkPage.getNavbarFormInput().getAttribute('placeholder')).toEqual('Suche...');
  });
});
