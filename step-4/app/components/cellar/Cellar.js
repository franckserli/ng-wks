import angular from 'angular';
import CellarComponent from './CellarComponent';
import Cards from '../common/cards/Cards';
import Edit from '../common/edit/Edit';
import cellarRoutes from './cellarRoutes';

export default angular.module('wine.cellar', [Cards.name, Edit.name])
                      .component('wineCellar', CellarComponent)
                      .config(cellarRoutes);
