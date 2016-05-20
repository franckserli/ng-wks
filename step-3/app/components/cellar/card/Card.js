import CardComponent from './CardComponent';
import Rating from '../rating/Rating';
import angular from 'angular';

export default angular.module('wine.card', [Rating.name])
                      .component('wineCard', CardComponent);
