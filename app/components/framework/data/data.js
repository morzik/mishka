export class Data{

  /**
   * Находит в массиве первый элемент удовлетворяющий query
   * @param {Array} list
   * @param {object} query - условие поиска, пары ключ-значение, которые должны быть в искомом объекте
   * @return {*}
   */
  static find(list, query) {
    for(let i = 0; i < list.length; i++) {
      if (Data._is(list[i], query)) {
        return list[i];
      }
    }
  }


  /**
   * Находит все значения в массиве удовлетворяющие query
   * @param {Array} list
   * @param {Array} query
   */
  static select(list, query) {
    return list.filter(function (item) {
      return Data._is(item, query);
    })
  }

  /**
   * Проверяет obj1 на соответствие условиям
   * @param obj1
   * @param conditions
   * @return {boolean}
   * @private
   */
  static _is(obj1, conditions) {
    switch (typeof conditions) {
      case "object":
        for (let p in conditions) {
          if (!obj1.hasOwnProperty(p) || !Data._is(obj1[p], conditions[p])){
            return false;
          }
        }
        break;
      case "string":
      case "number":
      case "boolean":
      case "undefined":
        return obj1 === conditions;
    }
    return true;
  }
}

  // Data.prototype.find = Data.find = find;
  // Data.prototype.select = Data.select = select;
  // Data.prototype._is = Data._is = _is;



function parseSearch(str) {
  return str.split("&").reduce(function (hash, str) {
      var key_value = str.split("=");

      hash[key_value.shift()] = key_value.join("=");
      return hash;
    }, {}) || {};
}
