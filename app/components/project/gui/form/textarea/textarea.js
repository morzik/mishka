import {registerPlugins, Plugin} from '../../../../framework/jquery/plugins/plugins.js';

class Textarea extends Plugin {
  constructor($element) {
    super($element);
  }
}

registerPlugins(
  {
    "name": "textarea",
    "Constructor": Textarea,
    "selector": ".textarea"
  }
);
