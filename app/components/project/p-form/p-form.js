import {registerPlugins, Plugin} from '../../framework/jquery/plugins/plugins.js';

class PForm extends Plugin {
  constructor($element) {
    super($element);
  }
}

registerPlugins(
  {
    "name": "pForm",
    "Constructor": PForm,
    "selector": ".p-form"
  }
);
