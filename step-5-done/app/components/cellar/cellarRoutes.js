export default function cellarRouting($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .otherwise('/cards');

  $stateProvider
  .state('cellar.cards', {
    url: '/cards',
    template: '<wine-cards wines="wines" with-input="true"></wine-cards>',
    controller: ($scope, wines) => Object.assign($scope, { wines }),
    resolve: {
      WineService: 'WineService',
      wines: ['WineService', (WineService) => WineService.loadRated()],
    },
  })
  .state('cellar.edit', {
    url: '/card/:id',
    template: '<wine-edit wine="wines[0]" save="$ctrl.save(wines[0])"></wine-edit>',
    controller: ($scope, wines) => Object.assign($scope, { wines }),
    resolve: {
      WineService: 'WineService',
      wines: ['WineService', '$stateParams', (WineService, $stateParams) =>
        WineService.load($stateParams.id)],
    },
  });
}

cellarRouting.$inject = ['$stateProvider', '$urlRouterProvider'];
