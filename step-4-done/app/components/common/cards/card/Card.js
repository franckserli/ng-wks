import angular from 'angular';
import CardComponent from './CardComponent';
import Rating from '../../../common/rating/Rating';

export default angular.module('wine.card', [Rating.name])
                      .component('wineCard', CardComponent);
