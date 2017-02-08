/* eslint no-undef:0 */

describe('wine app homepage', () => {
  // un exemple de test
  it('should automatically redirect to /cellar/cards when requesting app root', () => {
    // on se rend sur l'adresse root de notre application
    // browser.params est défini dans le fichier de configuration protractor
    browser.get(browser.params.urlAddress);
    // on s'assure d'avoir été redirigé vers les fiches de vin
    expect(browser.getLocationAbsUrl()).toMatch('/cellar/cards');
  });


  // les scénarios peuvent être imbriqués
  describe('cellar & cards', () => {
    beforeEach(() => {
      browser.get(browser.params.urlAddress);
    });


    it('should display wine cards', () => {
      // on peut requerir par nom de directive
      // il s'agit ici de s'assurer que les 7 fiches sont bien affichées
    });

    it('should edit when you click edit icon', () => {
      // il va falloir sélectionner le bon élément et clicker dessus
      // puis vérifier que la redirection a eu lieu
    });

    describe('edit a card', () => {
      beforeEach(() => {
        browser.get(`${browser.params.urlAddress}/cellar/card/boisson`);
      });


      it('should be deep linked [edit]', () => {
        // ici, il s'agit de vérifier que nous sommes bien en édition sur une fiche
      });

      it('should have a required input name', () => {
        // nous sélectionnons le bon input et nous vérifions ses propriétés
      });
    });
  });
});
