import CellarComponent from './CellarComponent';
import Card from './card/Card';
import Edit from './edit/Edit';
import angular from 'angular';

export default angular.module('wine.cellar', [Card.name, Edit.name])
                      .component('wineCellar', CellarComponent);
