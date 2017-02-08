import editTemplate from './edit-template.html';
import EditController from './EditController.js';

export default {
  bindings: {
    wine: '<',
    save: '&',
  },
  template: editTemplate,
  controller: EditController,
  transclude: true,
};
