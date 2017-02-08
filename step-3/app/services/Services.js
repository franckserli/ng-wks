import angular from 'angular';
import ngResource from 'angular-resource';
import WineResource from './WineResource';

export default angular.module('wine.services', [ngResource])
                      .service('WineResource', WineResource);
