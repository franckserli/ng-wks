import CardsComponent from './CardsComponent';
import Card from './card/Card';
import angular from 'angular';

export default angular.module('wine.cards', [Card.name])
                      .component('wineCards', CardsComponent);
