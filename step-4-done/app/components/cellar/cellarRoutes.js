export default function cellarRouting($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .otherwise('/cards');

  $stateProvider
  .state('cellar.cards', {
    url: '/cards',
    template: '<wine-cards wines="wines" with-input="true"></wine-cards>',
    controller: ($scope, wines) => Object.assign($scope, { wines }),
    resolve: {
      wines: ['WineService', (WineService) => WineService.loadRated()],
    },
  })
  .state('cellar.edit', {
    url: '/card/:id',
    template: '<wine-edit wine="$resolve.wines[0]" save="$ctrl.save(wine)"></wine-edit>',
    resolve: {
      wines: ['WineService', '$stateParams', (WineService, $stateParams) =>
        WineService.load($stateParams.id)],
    },
  });
}

cellarRouting.$inject = ['$stateProvider', '$urlRouterProvider'];
