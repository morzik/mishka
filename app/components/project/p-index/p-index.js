import {registerPlugins, Plugin} from '../../framework/jquery/plugins/plugins.js';

class PIndex extends Plugin {
  constructor($element) {
    super($element);
  }
}

registerPlugins(
  {
    "name": "pIndex",
    "Constructor": PIndex,
    "selector": ".p-index"
  }
);
