/* eslint no-unused-vars:0 */

export function routing($stateProvider, $urlRouterProvider, $locationProvider) {
  // use the HTML5 History API
  $locationProvider.html5Mode(true);
}

routing.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

export function statechange($rootScope, $log) {
  $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
    $log.debug(`Error while routing: ${error}`);
  });
}

statechange.$inject = ['$rootScope', '$log'];
