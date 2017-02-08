import angular from 'angular';
import RatingComponent from './RatingComponent.js';
import RatingRangeFilter from './RatingRangeFilter';

export default angular.module('wine.card.rating', [])
                      .component('wineRating', RatingComponent)
                      .filter('range', () => RatingRangeFilter);
