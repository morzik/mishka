import $ from 'jquery';
import {registerPlugins, Plugin} from '../../../framework/jquery/plugins/plugins.js';

import Flickity from 'flickity';
Flickity.setJQuery( $ );

// для смены через fade `npm install flickity-fade` и `import 'flickity-fade'`
// Flickity.prototype.fadeSlides - переопределение стандартной функции, что бы прозрачность не проседала
/*
import 'flickity-fade';
Flickity.prototype.fadeSlides = function() {
  if ( this.slides.length < 2 ) {
    return;
  }
  // get slides to fade-in & fade-out
  let indexes = this.getFadeIndexes();
  let fadeSlideA = this.slides[ indexes.a ];
  let fadeSlideB = this.slides[ indexes.b ];
  let distance = this.wrapDifference( fadeSlideA.target, fadeSlideB.target );
  let progress = this.wrapDifference( fadeSlideA.target, -this.x );
  progress = progress / distance;

  fadeSlideA.setOpacity( Math.cos(Math.PI / 2 * (progress)) );
  fadeSlideB.setOpacity( Math.sin(Math.PI / 2 * (progress)) );

  // hide previous slide
  let fadeHideIndex = indexes.a;
  if ( this.isDragging ) {
    fadeHideIndex = progress > 0.5 ? indexes.a : indexes.b;
  }
  let isNewHideIndex = this.fadeHideIndex !== undefined &&
    this.fadeHideIndex !== fadeHideIndex &&
    this.fadeHideIndex !== indexes.a &&
    this.fadeHideIndex !== indexes.b;
  if ( isNewHideIndex ) {
    // new fadeHideSlide set, hide previous
    this.slides[ this.fadeHideIndex ].setOpacity( 0 );
  }
  this.fadeHideIndex = fadeHideIndex;
};
*/

const PRESETS = {
  "default": {
    cellSelector: '.carousel__item',
    pageDots: false,
    prevNextButtons: false,

    // friction: 0.48,
    // selectedAttraction: 0.017,
    // autoPlay: 2000,
    // pauseAutoPlayOnHover: false,

    // fade: true,


    wrapAround: false,
    setGallerySize: false
  },
  "free_scroll": {
    freeScroll: true,
    cellAlign: 'left',
    contain: true,
  }
};

export class Carousel extends Plugin {
  constructor($element) {
    super($element);
    let data = $element.data('carousel');
    if (typeof data === 'string') {
      data = PRESETS[data];
    }

    let carousel = this.carousel = new Flickity(
      $element.get(0),
      $.extend({}, PRESETS.default, data)
    );

    let $nav = $element.find('.carousel__nav');

    initOnChange();
    initNavButtons();

    function initNavButtons() {
      $nav.on('click',function (e) {
        e.preventDefault();
        if ($(this).hasClass('carousel__nav_prev')) {
          carousel.previous();
        } else {
          carousel.next();
        }
      });

    }
    function initOnChange() {
      $element
        .on( 'change.flickity', checkCarousel);
      checkCarousel();
    }

    function checkCarousel( event, index ) {
      $nav
        .each(function () {
          let $t = $(this);
          let isInactive = $t.hasClass('carousel__nav_next') && carousel.selectedIndex === carousel.cells.length - 1
            || $t.hasClass('carousel__nav_prev') && carousel.selectedIndex === 0;
          $t.toggleClass('carousel__nav_inactive', isInactive);
        });
    }
  }

  reset(){
    if (this.carousel) {
      this.carousel.select(0);
    }
  }

}

registerPlugins(
  {
    'name': 'carousel',
    'Constructor': Carousel,
    'selector': '.carousel'
  }
);
