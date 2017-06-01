import { CogTalentManagerPage } from './app.po';

describe('cog-talent-manager App', () => {
  let page: CogTalentManagerPage;

  beforeEach(() => {
    page = new CogTalentManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
