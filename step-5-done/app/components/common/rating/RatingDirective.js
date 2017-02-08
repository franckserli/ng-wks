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
    console.log(this.scope.rating);
    element.bind('click', () => {
      // alert(el.html());
    });
  }
}

