import editTemplate from './edit-template.html';

export default {
  bindings: {
    wine: '=',
  },
  template: editTemplate,
  transclude: true,
};
