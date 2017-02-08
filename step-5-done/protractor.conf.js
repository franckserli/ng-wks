exports.config = {
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
