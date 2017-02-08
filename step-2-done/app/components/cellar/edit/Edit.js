import angular from 'angular';
import EditComponent from './EditComponent';
import Rating from '../rating/Rating';

export default angular.module('wine.cellar.edit', [Rating.name])
                      .component('wineEdit', EditComponent);
