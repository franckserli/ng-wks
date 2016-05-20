import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngMessageFormat from 'angular-message-format';
import cellar from './components/cellar/Cellar';

export default angular.module('wine', [ngAnimate, ngMessageFormat, cellar.name]);
