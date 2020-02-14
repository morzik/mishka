import {registerPlugins, Plugin} from '../../framework/jquery/plugins/plugins.js';

import TweenMax from 'gsap';
import ScrollMagic from 'scrollmagic';

class Scroll extends Plugin {
  constructor($element) {
    super($element);

    var controller = new ScrollMagic.Controller();
    $('.scroll').each(function(){
      var scene = new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: 0.95
      })
        .setClassToggle(this, 'scroll_in')
        .addTo(controller);
    });
  }
}

registerPlugins(
  {
    "name": "scroll",
    "Constructor": Scroll,
    "selector": ".scroll"
  }
);
