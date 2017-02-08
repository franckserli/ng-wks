import CellarComponent from './CellarComponent';
import Card from './card/Card';
import angular from 'angular';

export default angular.module('wine.cellar', [Card.name])
                      .component('wineCellar', CellarComponent);
