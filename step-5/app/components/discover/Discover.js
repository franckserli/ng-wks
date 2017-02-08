import angular from 'angular';
import DiscoverComponent from './DiscoverComponent';
import discoverRoutes from './discoverRoutes';
import Cards from '../utils/cards/Cards';
import Edit from '../utils/edit/Edit';

export default angular.module('wine.discover', [Cards.name, Edit.name])
                      .component('wineDiscover', DiscoverComponent)
                      .config(discoverRoutes);

