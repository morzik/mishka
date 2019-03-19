
import $ from 'jquery';
import {registerPlugins} from '../jquery/plugins/plugins';
import TemplateEngine from '../template-engine/template-engine';
import {modal} from "tingle.js";
import '../../project/utils/prevent-overscroll/prevent-overscroll';


let $root = $(document.documentElement);
let $body = $(document.body);


initClick();

class ModalInstance extends modal{
  constructor(template, info){
    let $content = $(template(info || {}));

    let data = {
      closeMethods: [], //overlay - закрывать по клику вне попапа, button - закрывать по клику на кнопку, escape - закрывать нажатием на Esc
      cssClass: ModalInstance.getModalCSSClasses($content),
      onOpen: ()=>this.onOpen(),
      onClose: ()=>this.onClose(),
      beforeClose: ()=>this.beforeClose()
    };

    super(data);

    this.$content = $content;

    $(this.modal)
      .on("content:resize", this.checkOverflow.bind(this))
      .closest('.tingle-modal')
      .preventOverscroll();

    $content
      .on("click", "[data-modal-close]", ()=>this.close())
      .on("modal:close-request", ()=>this.close());

    this.setContent( $content.get(0) );
    $body.append(this.modal);
    this.open();

    $content.initPlugins(info);
    $content.data("modal", this);
  }
  static getModalCSSClasses($content){
    let cssClass = $content.data("tingleClass");
    return cssClass ? cssClass.split(" ") : [];
  }

  close(){
    super.close();
    // checkModal();
  }

  onOpen(){}
  onClose(){
    this.destroy();

    checkModal(this.modal);
  }
  beforeClose(){
    /**
     * @event Modal#modal:close
     */
    let $event = $.Event("modal:close");
    this.$content.trigger($event);

    if (!$event.isDefaultPrevented()) {
      this.$content.off();
      // closeButton.off();
    }
    return !$event.isDefaultPrevented();
  }

  destroy() {
    super.destroy();

    if (this.$content) {
      this.$content.destroyPlugins();
      delete this.$content;
    }
  }
}

class ModalTemplate {
  /**
   *
   * @param {jQuery} $element
   * @fires Modal#modal:close
   * @listens Modal#content:resize
   * @listens Modal#modal:close-request
   * @constructor
   */
  constructor($element) {
    this.template = TemplateEngine.compile($element.html());
  }

  init(info) {
    return new ModalInstance(this.template, info).$content;
  }
}



registerPlugins(
  {
    "name": "modal",
    "Constructor": ModalTemplate,
    "selector": false
  }
);


function checkModal(modal){
  $body.toggleClass('tingle-enabled', $(".tingle-modal").not(modal).length > 0);
}

function initClick() {
  $root.on("click", "[data-modal]", function (event) {
    let modal = $(this).data("modal");
    if(modal===undefined||modal===""){
      return;
    }
    if (event.isDefaultPrevented()) {
      return;
    }
    event.preventDefault();

    let params = $(this).data("modalParams");
    let jQuery = $;
    /**
     * Показать модальное окно в родительском окне, если страница открыта в iframe
     */
    // if (modal === "#feedback" && window !== top) {
    //   jQuery = top.$;
    // }
    jQuery(modal).modal(params);
  });
}
