(function (factory) {
  if (typeof exports === 'object') {
    module.exports = factory(
      require('jquery'),
      require('../../framework/jquery/plugins/plugins.js')
    );
  } else {
    factory(jQuery, peppers.plugins);
  }
}(function ($, plugins) {
  plugins.registerPlugins(
    {
      "name": "customHeader",
      "Constructor": CustomHeader,
      "selector": ".custom-header"
    }
  );

  function CustomHeader($element) {
    this.init = function(params){
      
    };
  }
}));