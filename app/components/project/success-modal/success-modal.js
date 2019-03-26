import {registerPlugins, Plugin} from '../../framework/jquery/plugins/plugins.js';

class SuccessModal extends Plugin {
  constructor($element) {
    super($element);
  }
}

registerPlugins(
  {
    "name": "successModal",
    "Constructor": SuccessModal,
    "selector": ".success-modal"
  }
);
