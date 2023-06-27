
/**
 * Organiza um conjunto de informações, sejam Strings ou Números.
 * @method dynamicSort
 * @memberof module:utils
 * @param {Object} property o objeto a ser recebido
 * @param {DateTime} valueType o tipo de valor a ser recebido. Como
 * padrão, esperam Strings como parâmetros.
 * @returns {*} A ordem dada do objeto, considerando seu tipo.
 *
 */
export function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    const param1 = a[property]
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    const param2 = b[property]
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    var result = param1 < param2 ? -1 : param1 > param2 ? 1 : 0;
    return result * sortOrder;
  };
}
