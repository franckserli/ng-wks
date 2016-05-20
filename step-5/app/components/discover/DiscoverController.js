export default class DiscoverController {

  static $inject = ['$scope', '$log', 'WineService'];

  constructor($scope, $log, WineService) {
    this.$scope = $scope;
    this.$log = $log;
    this.WineService = WineService;
  }
}
