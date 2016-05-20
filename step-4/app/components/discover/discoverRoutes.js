export default function discoverRouting($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .otherwise('/cards');
}

discoverRouting.$inject = ['$stateProvider', '$urlRouterProvider'];
