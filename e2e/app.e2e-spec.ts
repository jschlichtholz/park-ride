import { ParkPage } from './app.po';

describe('park App', function() {
  let page: ParkPage;

  beforeEach(() => {
    page = new ParkPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
