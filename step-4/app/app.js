import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngMessageFormat from 'angular-message-format';
import uirouter from 'angular-ui-router';
import * as routeConfig from './appRoutes';
import Menu from './components/menu/Menu';
import Cellar from './components/cellar/Cellar';
import Food from './components/food/Food';
import Discover from './components/discover/Discover';
import Services from './services/Services';
import Constants from './constants/Constants';

export default angular
.module('wine', [ngAnimate, ngMessageFormat, uirouter,
              Menu.name, Cellar.name, Food.name, Discover.name, Services.name, Constants.name])
.config(routeConfig.routing)
.run(routeConfig.statechange);

