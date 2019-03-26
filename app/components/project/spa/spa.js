import {registerPlugins, Plugin} from '../../framework/jquery/plugins/plugins.js';

class Spa extends Plugin {
  constructor($element) {
    super($element);
  }
}

registerPlugins(
  {
    "name": "spa",
    "Constructor": Spa,
    "selector": ".spa"
  }
);
