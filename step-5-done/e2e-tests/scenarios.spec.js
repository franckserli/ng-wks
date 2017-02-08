/* eslint no-undef:0 */

describe('wine app homepage', () => {
  it('should automatically redirect to /cellar/cards when requesting app root', () => {
    // browser.params est défini dans le fichier de configuration protractor
    browser.get(browser.params.urlAddress);
    expect(browser.getLocationAbsUrl()).toMatch('/cellar/cards');
  });


  describe('cellar & cards', () => {
    beforeEach(() => {
      browser.get(browser.params.urlAddress);
    });


    it('should display wine cards', () => {
      // on peut requerir par nom de directive
      expect(element(by.tagName('wine-card')).isPresent()).toBe(true);
      expect(element.all(by.tagName('wine-card')).count()).toBeGreaterThan(1);
      expect(element.all(by.tagName('wine-card')).count()).toEqual(7);
    });

    it('should edit when you click edit icon', () => {
      const linkToEdit = element.all(by.className('fa-pencil-square-o')).first();
      expect(linkToEdit.isPresent()).toBe(true);
      linkToEdit.click();
      expect(browser.getLocationAbsUrl()).toMatch('/cellar/card/');
    });

    describe('edit a card', () => {
      beforeEach(() => {
        browser.get(`${browser.params.urlAddress}/cellar/card/boisson`);
      });


      it('should be deep linked [edit]', () => {
        expect(element(by.tagName('form')).isPresent()).toBe(true);
      });

      it('should have a required input name', () => {
        const nameInput = element(by.model('$ctrl.wine.name'));
        // let nameInput = element(by.name('name'));
        expect(nameInput.getAttribute('required')).toBeTruthy();
        expect(nameInput).not.toBeUndefined();
      });
    });
  });
});
