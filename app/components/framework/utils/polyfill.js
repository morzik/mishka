(function (factory) {
  factory(window)
}(function (window) {

  //array
  (function(p){

    extend(p, {
      slice: slice,
      map: map,
      forEach: forEach
    });


    /**
     * @param begin {number}
     * @param end {number}
     * @returns {Array}
     */
    function slice(begin, end) {
      var res = [];
      if (typeof end == "undefined") end = this.length;
      for (var i = begin; i <= end; i++){
        res.push(this[i]);
      }

      return res;
    }

    /**
     * @param cb {Function}
     * @returns {Array}
     */
    function map(cb) {
      var arr = [];
      for (var i = 0; typeof cb === "function" && i < this.length; i++){
        arr[i] = cb(this[i], i, this);
      }

      return arr;
    }


    /**
     * @param cb {Function}
     * @returns {forEach}
     */
    function forEach(cb) {
      for (var i = 0; typeof cb === "function" && i < this.length; i++) {
        cb(this[i]);
      }
      return this;
    }






    function extend(proto, extend) {
      for (var p in extend) {
        if (extend.hasOwnProperty(p) && typeof proto[p] == "undefined" ) {
          proto[p] = extend[p]
        }
      }
    }
  })(Array.prototype);

  //console
  (function () {
    var log = ["log", "debug", "info", "assert", "clear", "count", "dir", "dirxml", "error", "exception", "group", "trace", "warn"];
    if (!window.console) window.console = {};
    for (var i = 0; i < log.length; i++) {
      if (!window.console[log[i]]) {
        window.console[log[i]] = _void;
      }
    }

    function _void(){}
  })();

  //Uint8ClampedArray
  (function(p, Array){
    if (p && p.slice === undefined) {
      p.slice = Array.slice;
    }
  })(window.Uint8ClampedArray && window.Uint8ClampedArray.prototype, Array.prototype);

  //requestAnimationFrame
  (function(window) {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
        || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function () {
            callback(currTime + timeToCall);
          },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }


    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
      };
    }
  }(window));

  //location
  (function(location){
    if (!location.origin) {
      location.origin = location.protocol + "//" + location.host;
    }
  }(window.location))

}));
