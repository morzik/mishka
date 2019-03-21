import {registerPlugins, Plugin} from '../../../framework/jquery/plugins/plugins.js';

class Video extends Plugin {
  constructor($element) {
    super($element);
  }
}

registerPlugins(
  {
    "name": "video",
    "Constructor": Video,
    "selector": ".video"
  }
);
