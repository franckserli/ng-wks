import ratingTemplate from './rating-template.html';

export default class RatingDirective {
  constructor() {
    this.restrict = 'E';
    this.template = ratingTemplate;
    // this.restrict = 'E';
    this.bindToController = {
      rating: '=',
    };
    this.controllerAs = '$ctrl';
  }

  link(scope, element) {
    element.bind('click', () => {
    });
  }
}
