import editTemplate from './edit-template.html';

export default {
  bindings: {
    // ne fonctionne que pour les primitives
    wine: '<',
    save: '&',
    cancel: '&',
  },
  template: editTemplate,
  transclude: true,
};
