import CardsTemplate from './cards-template.html';
import CardsController from './CardsController';

export default {
  bindings: {
    wines: '<',
    withInput: '<',
  },
  template: CardsTemplate,
  controller: CardsController,
  transclude: true,
};

