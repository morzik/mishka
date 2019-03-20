import {registerPlugins, Plugin} from '../../framework/jquery/plugins/plugins.js';

class Fact extends Plugin {
  constructor($element) {
    super($element);
  }
}

registerPlugins(
  {
    "name": "fact",
    "Constructor": Fact,
    "selector": ".fact"
  }
);
