import editTemplate from './edit-template.html';

export default {
  bindings: {
    wine: '=',
    reset: '&',
  },
  template: editTemplate,
  transclude: true,
};
