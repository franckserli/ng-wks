// import pour l'effet de bord => creation d'un env es6
import 'babel-polyfill';
import angular from 'angular';
import app from './app';

angular.element(document).ready(() => {
  angular.bootstrap(document, [app.name]);
});
