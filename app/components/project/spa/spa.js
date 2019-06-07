import {registerPlugins, Plugin} from '../../framework/jquery/plugins/plugins.js';

class Spa extends Plugin {
  constructor($element) {
    super($element);
    $('.custom-menu__item-link').on('click', function () {
      let dataId =  $(this).attr('data-id');
      $('.custom-page').toggleClass('custom-page_'+dataId);
    })
  }

}

registerPlugins(
  {
    "name": "spa",
    "Constructor": Spa,
    "selector": ".spa"
  }
);
