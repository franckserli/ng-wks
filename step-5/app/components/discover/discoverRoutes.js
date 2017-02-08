export default function discoverRouting($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .otherwise('/cards');

  $stateProvider
  .state('discover.cards', {
    url: '/cards',
    template: '<wine-cards wines="$ctrl.wines" with-input="false"></wine-cards>',
  });
}

discoverRouting.$inject = ['$stateProvider', '$urlRouterProvider'];
