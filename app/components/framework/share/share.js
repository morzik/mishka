import $ from 'jquery';
import {registerPlugins} from '../jquery/plugins/plugins.js';
import {popup} from '../utils/window';

class Share {
  constructor($element) {
    this.$element = $element;

    $element.on("click", $event => {
      $event.preventDefault();

      popup(this.link);
    });
  }

  getSoc(){return {soc: this.soc};}

  init(action, ...args){
    if (action && typeof this[action] === 'function') {
      return this[action].apply(this, args);
    }

    let socialName = this.soc = this.$element.data("share");
    let link = typeof action === 'string' ? action : action && action.link;
    this.$element.attr("href", this.link = getShareLinks(link, socialName, ...args) );
  };

  destroy(){

  }
}

registerPlugins(
  {
    "name": "share",
    "Constructor": Share,
    "selector": ".share"
  }
);




export function getShareLinks(link, social, text) {
  if (text === false) {
    text = '';
  } else if (!text) {
    switch (social) {
      case 'tg':
      case 'wa':
        text = $('meta[property="og:description"]').attr("content") + "\r\n";
        break;
      case 'tw':
        text = $('meta[name="twitter_text"]').add('meta[property="og:description"]').eq(0).attr('content');
        break;
      default:
        text = '';
        break;
    }
  }

  return initLink(link || location.href, social, text || '');
}

function initLink(link, social, text) {
  link = encodeURIComponent(extendLink(link, social));
  text = encodeURIComponent(text);

  let links = {
    vk: `http://vk.com/share.php?url=${link}`,
    fb: `http://www.facebook.com/sharer.php?u=${link}`,
    ok: `https://connect.ok.ru/offer?url=${link}`,
    tw: `https://twitter.com/intent/tweet?text=${text}&url=${link}`,

    whatsapp: `whatsapp://send?text=${link}`,
    wa: `https://wa.me?text=${ text }${ link }`,

    // tg:`tg://msg?text=${ text } ${ link }`,
    // tg:`tg://share?url=${ link }&text=${ text }`,
    tg:`https://telegram.me/share/url?url=${ link }&text=${ text }`,
  };

  return social ? (links.hasOwnProperty(social) ? links[social] : links) : links;
}

function extendLink(link, social) {
  return link.replace(/^([^?]+)(\?[^#]+)?/, ($0, $1, $2)=>{
    let query = '?';
    if ($2) {
      query += $2.substr(1).split('&').filter(itm => itm.split('=').pop() !== 'utm_source').join('&') + '&';
    }
    return `${$1}${query}utm_source=${social}_share`
  });
}
