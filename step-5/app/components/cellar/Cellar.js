import angular from 'angular';
import CellarComponent from './CellarComponent';
import Cards from '../utils/cards/Cards';
import Edit from '../utils/edit/Edit';
import cellarRoutes from './cellarRoutes';

export default angular.module('wine.cellar', [Cards.name, Edit.name])
                      .component('wineCellar', CellarComponent)
                      .config(cellarRoutes);
