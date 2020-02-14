import {registerPlugins, Plugin} from '../../framework/jquery/plugins/plugins.js';


import {TweenMax} from 'gsap';
import ScrollMagic from 'scrollmagic';

class ParallaxBlock extends Plugin {
  constructor($element) {
    super($element);

    let controller = new ScrollMagic.Controller();

    let scene = new ScrollMagic.Scene({
      triggerElement: ".parallax-block",
      triggerHook: 0,
      duration: "200%"
    })
      .setTween(TweenMax.from(".parallax-block__img", 1 , {y:"-50%", ease:Power1.easeInOut}))
      .addTo(controller);
  }
}

registerPlugins(
  {
    "name": "parallaxBlock",
    "Constructor": ParallaxBlock,
    "selector": ".parallax-block"
  }
);
