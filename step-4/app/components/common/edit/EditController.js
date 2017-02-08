export default class EditController {
  static $inject = ['StateService'];

  constructor(StateService) {
    this.StateService = StateService;
  }

  cancel() {
    this.StateService.goToLastState();
  }
}
