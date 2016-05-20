# Etape 5 - Tests e2e avec Protractor
Nous allons à présent découvrir `Protractor`, le framework de tests e2e de choix pour les applications Angular.

## Installation

Nous avons ajouté la dépendance `"protractor": "3.3.0"` dans le `package.json`.
L'installation de Protractor comprend celle de webdriver-manager, qui permet entre autres de lancer un serveur Selenium.

Vous allez installer également Protractor en global pour pouvoir lancer le serveur Selenium dans un écran de console dédié.

```
npm install -g protractor@3.3.0
```

Créez un fichier de configuration pour protractor, `protractor.conf.js` à la racine du projet.

```javascript
exports.config = {
  //adresse par défaut du serveur selenium
  seleniumAddress: 'http://localhost:4444/wd/hub',
  allScriptsTimeout: 1000000,
  specs: ['./e2e-tests/*.spec.js'],
  capabilities: {
    browserName: 'chrome',
  },
  params: {
    urlAddress: "http://localhost:8880"
  },
  onPrepare: () => {
    // ajout d'un reporter spécifique
    const SpecReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new SpecReporter());

    // désactiver les animations pour accélérer les tests
    const disableNgAnimate = () => {
      angular.module('disableNgAnimate', []).run(['$animate', ($animate) => {
        $animate.enabled(false);
      }]);
    };
    browser.addMockModule('disableNgAnimate', disableNgAnimate);
  },
};
```
Comme indiqué dans la configuration, nous installons un reporter spécifique pour une meilleure lecture des résultats de test.

A cette fin, nous avons ajouté la dépendance `"jasmine-spec-reporter": "2.4.0"` dans le `package.json`.

Ajoutez deux nouveaux scripts dans le fichier `package.json` :

```json
"scripts": {
  ...
  "pree2e-test": "webdriver-manager update",
  "e2e-test": "protractor protractor.conf.js"
}
```

Le premier de ces scripts installe ou met à jour Selenium et le driver pour Chrome.
Le second lance Protractor.

Protractor nécessite que l'application soit lancée : dans le cadre de ce workshop, nous nous contenterons de laisser `webpack-dev-server` tourner, avec :
```
npm start
```

Il vous reste à lancer le serveur Selenium dans une console dédiée, par la commande :
```
webdriver-manager start
```

Quand vous aurez écrit vos premiers tests vous pourrez les lancer avec la commande :
```
  npm run e2e-test
```

## Ecriture d'un test

L'écriture des tests ressemble à celle des tests unitaires. Cela vient de ce que nous utilisons également Jasmine.

L'API de Protractor apporte en particulier deux outils dont nous allons nous servir :

* element : permet de récupérer des éléments du DOM et d'en obtenir des informations
* browser : expose des actions, en particulier de navigation

À l'aide de ces deux outils, nous pouvons nous assurer de l'affichage correct de notre UI et valider la navigation au sein de l'application.

Créez le fichier `e2e-tests/scenarios.spec.js` :
```javascript
/* eslint no-undef:0 */
'use strict';

describe('wine app homepage', () => {


  // un exemple de test
  it('should automatically redirect to /cellar/cards when requesting app root', () => {
    // on se rend sur l'adresse root de notre application
    // browser.params est défini dans le fichier de configuration protractor
    browser.get(browser.params.urlAddress);
    // on s'assure d'avoir été redirigé vers les fiches de vin
    expect(browser.getLocationAbsUrl()).toMatch("/cellar/cards");
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
        browser.get(`${browser.params.urlAddress}/cellar/card/boisson`)
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

```
À l'aide de l'[API Protractor](http://www.protractortest.org/#/api) renseignez les tests correspondants aux différents scénarios.
```

## Déjà la fin !

Une fois cette étape terminée, vous pouvez aller consulter la [version corrigée](../step-5-done).
