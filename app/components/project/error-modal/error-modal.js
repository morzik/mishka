import {registerPlugins, Plugin} from '../../framework/jquery/plugins/plugins.js';

class ErrorModal extends Plugin {
  constructor($element) {
    super($element);
  }
}

registerPlugins(
  {
    "name": "errorModal",
    "Constructor": ErrorModal,
    "selector": ".error-modal"
  }
);
