import { Take2Page } from './app.po';

describe('take2 App', () => {
  let page: Take2Page;

  beforeEach(() => {
    page = new Take2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
