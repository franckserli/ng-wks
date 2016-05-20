export default function discoverRouting($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .otherwise('/cards');

  $stateProvider
  .state('discover.cards', {
    url: '/cards',
    template: '<wine-cards wines="wines" with-input="false"></wine-cards>',
    controller: ($scope, wines) => Object.assign($scope, { wines }),
    resolve: {
      WineService: 'WineService',
      wines: ['WineService', (WineService) => WineService.loadAll()],
    },
  });
}

discoverRouting.$inject = ['$stateProvider', '$urlRouterProvider'];
