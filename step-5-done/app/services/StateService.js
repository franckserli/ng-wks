export default class StateService {
  static $inject = ['$rootScope', '$state'];

  constructor($rootScope, $state) {
    this.$rootScope = $rootScope;
    this.$state = $state;

    // notre home
    this.lastState = 'cellar';
    this.lastParams = {};

    $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
      this.lastState = fromState.name;
      this.lastParams = fromParams;
    });
  }

  goToLastState() {
    this.$state.go(this.lastState || 'cellar', this.lastParams || {});
  }
}
