export default function cellarRouting($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .otherwise('/cards');
}

cellarRouting.$inject = ['$stateProvider', '$urlRouterProvider'];
