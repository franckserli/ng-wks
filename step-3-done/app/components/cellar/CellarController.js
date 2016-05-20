import _ from 'lodash';

export default class CellarController {

  static $inject = ['$log', 'wineURL', 'WineService'];

  constructor($log, wineURL, WineService) {
    this.$log = $log;
    this.wineURL = wineURL;
    this.WineService = WineService;
    this.wines = this.loadMyWines();
    this.editedWine = null;
  }

  editWine(wine) {
    this.editedWine = _.cloneDeep(wine);
  }

  cancelEdition() {
    delete this.editedWine;
  }

  loadWines() {
    return this.WineService.load();
  }

  loadMyWines() {
    return this.WineService.loadRated();
  }

  loadWine(id) {
    // Usage d'un property shortand (ES6)
    // $resource retourne une structure vide (Promises)
    return this.WineService.load({ id });
  }

  save(wine) {
    // err callback
    this.updateWine(wine).then(() => {
      this.cancelEdition();
      this.wines = this.loadMyWines();
    });
  }

  updateWine(wine) {
    return this.WineService.update(wine);
  }
}
