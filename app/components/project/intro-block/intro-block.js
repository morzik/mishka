import {registerPlugins, Plugin} from '../../framework/jquery/plugins/plugins.js';

class IntroBlock extends Plugin {
  constructor($element) {
    super($element);
  }
}

registerPlugins(
  {
    "name": "introBlock",
    "Constructor": IntroBlock,
    "selector": ".intro-block"
  }
);
