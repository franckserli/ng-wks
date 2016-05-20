import _ from 'lodash';

export default class WineResource {
  static $inject = ['$resource', 'wineURL'];

  constructor($resource, wineURL) {
    const baseURL = `${wineURL.WINE_API}`;

    return $resource(`${baseURL}/:id`, { id: '@id' }, {
      update: {
        method: 'PUT',
        // ne peut pas etre utilisé pour modifier les headers
        transformRequest: wine =>
          JSON.stringify(_.omit(wine, ['pic'])),
      },
      get: {
        method: 'GET',
        isArray: true,
        transformResponse: resp =>
          _.each(JSON.parse(resp),
               wine => _.extend(wine, { pic: `${wineURL.WINE_API}/${wine.pic}` })),
      },
    });
  }
}
