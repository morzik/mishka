import {registerPlugins, Plugin} from '../../framework/jquery/plugins/plugins.js';

class Footer extends Plugin {
  constructor($element) {
    super($element);
  }
}

registerPlugins(
  {
    "name": "footer",
    "Constructor": Footer,
    "selector": ".footer"
  }
);
