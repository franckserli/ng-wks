import angular from 'angular';
import ngResource from 'angular-resource';
import WineResource from './WineResource';
import WineService from './WineService';

export default angular.module('wine.services', [ngResource])
                      .service('WineResource', WineResource)
                      .service('WineService', WineService);
