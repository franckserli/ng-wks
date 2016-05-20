import ConstantsUrl from './ConstantsUrl';
import angular from 'angular';

export default angular.module('wine.constants', [])
                      .constant('wineURL', ConstantsUrl);

