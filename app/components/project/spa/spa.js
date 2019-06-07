import {registerPlugins, Plugin} from '../../framework/jquery/plugins/plugins.js';

class Spa extends Plugin {
  constructor($element) {
    super($element);
    let prevClass = 'custom-page_index';
    $('.custom-menu__item-link').on('click', function () {
      $('.custom-page').removeClass(prevClass);
      let dataId =  $(this).attr('data-id');
      $('.custom-page').addClass('custom-page_'+dataId);
      prevClass = 'custom-page_'+dataId;
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
