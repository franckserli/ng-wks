export default class CellarController {

  static $inject = ['$http', '$log'];

  constructor($http, $log) {
    this.$log = $log;
    this.$http = $http;
    this.loadWines().then(wines => {
      this.wines = wines.data;
    });
  }

  editWine(wine) {
    this.editedWine = wine;
  }

  getEditedWine() {
    return this.editedWine;
  }

  loadWines() {
    const { $http } = this;
    return $http.get('./data/wines.json', {
      // Angular parse normalement, nous devons le faire à sa place
      transformResponse: (resp) => JSON.parse(resp).map(this.convertApiWine),
    });
  }

  convertApiWine(apiWine) {
    return {
      id: apiWine.id,
      name: apiWine.name,
      region: apiWine.appellation.region,
      date: Math.floor(Math.random() * (2015 - 1940) + 1940),
      rating: Math.floor(Math.random() * (5 - 1) + 1),
      pic: `img/wines/${apiWine.id}.png`,
    };
  }
}
