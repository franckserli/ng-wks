export function routing($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider
  .when('/', '/cellar')
  .when('/cellar', '/cellar/cards')
  .when('/discover', '/discover/cards')
  .otherwise('/cellar');

  $stateProvider
  .state('cellar', {
    url: '/cellar',
    template: '<wine-cellar></wine-cellar>',
  })
  .state('discover', {
    url: '/discover',
    template: '<wine-discover></wine-discover>',
  })
  .state('food', {
    url: '/food/:id',
    template: '<wine-food wines="wines"></wine-food>',
    controller: ($scope, wines) => Object.assign($scope, { wines }),
    resolve: {
      WineService: 'WineService',
      wines: ['WineService', '$stateParams', (WineService, $stateParams) =>
        WineService.load($stateParams.id)],
    },
  });
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
