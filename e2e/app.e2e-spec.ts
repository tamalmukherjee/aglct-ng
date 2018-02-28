import { AglctNgPage } from './app.po';

describe('aglct-ng App', () => {
  let page: AglctNgPage;

  beforeEach(() => {
    page = new AglctNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
