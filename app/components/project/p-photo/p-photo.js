import {registerPlugins, Plugin} from '../../framework/jquery/plugins/plugins.js';

class PPhoto extends Plugin {
  constructor($element) {
    super($element);
  }
}

registerPlugins(
  {
    "name": "pPhoto",
    "Constructor": PPhoto,
    "selector": ".p-photo"
  }
);
