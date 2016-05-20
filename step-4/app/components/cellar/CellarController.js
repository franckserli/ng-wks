export default class CellarController {

  static $inject = ['$log', 'wineURL', 'WineService', '$state'];

  constructor($log, wineURL, WineService, $state) {
    this.$log = $log;
    this.wineURL = wineURL;
    this.WineService = WineService;
    this.$state = $state;
  }

  loadWines() {
    return this.WineService.load();
  }

  loadMyWines() {
    return this.WineService.loadRated();
  }

  loadWine(id) {
    // Usage d'un property shortand (ES6)
    return this.WineService.load({ id });
  }

  save(wine) {
    this.updateWine(wine).then(() => {
      this.$state.go('cellar.cards');
    });
  }

  updateWine(wine) {
    return this.WineService.update(wine);
  }
}
