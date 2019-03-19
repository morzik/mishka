export default class CamelCase {
  static to(str, isClassName) {
    return str.split(/_|-/g).map(function (itm, index) {
      if (index > 0 || isClassName) itm = itm.substr(0, 1).toUpperCase() + itm.substr(1);
      return itm;
    }).join("");
  }

  static from(str) {
    return str.replace(/[A-ZА-Я]/g, l=>`-${l.toLowerCase()}`);
  }
}
