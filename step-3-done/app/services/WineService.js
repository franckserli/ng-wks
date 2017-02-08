export default class WineService {
  static $inject = ['WineResource'];

  constructor(WineResource) {
    this.WineResource = WineResource;
  }

  load(id) {
    return this.WineResource.get({ id });
  }

  loadRated() {
    return this.WineResource.get({ rated: true });
  }

  update(wine) {
    // on retourne $promise pour pouvoir chainer (then)
    return this.WineResource.update(wine).$promise;
  }
}
