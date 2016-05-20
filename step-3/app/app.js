import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngMessageFormat from 'angular-message-format';
import Cellar from './components/cellar/Cellar';
import Services from './services/Services';
import Constants from './constants/Constants';

export default angular.module('wine', [ngAnimate, ngMessageFormat,
               Cellar.name, Services.name, Constants.name]);
