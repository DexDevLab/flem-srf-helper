
/**
 * Máscara de capitalização de nome, convertendo uma String no formato "JOAO DA SILVA"
 * ou "joao da silva" em "Joao da Silva".
 * Utiliza uma lista de exceções que pode ser modificada, compreendendo todos os pronomes
 * comuns ou trechos que não devem ser capitalizados.
 * @method maskCapitalize
 * @memberof module:masks
 * @param {String} string Objeto tipo String contendo o texto a ser capitalizado
 * @returns {String} String devidamente formatada
 */
export const maskCapitalize = (string) => {
  const exceptions = [
    "do",
    "da",
    "de",
    "dos",
    "das",
    "em",
    "na",
    "no",
    "nas",
    "nos",
    "e",
    "a",
    "o",
  ];
  if (string && string.match("[a-zA-Z]")) {
    const strInput = string.toLowerCase().split(" ");
    const strCheckExceptions = strInput.map((str) => {
      for (let i = 0; i < exceptions.length; i++) {
        if (str === exceptions[i]) {
          return str;
        }
      }
      return str.toString().charAt(0).toUpperCase() + str.substring(1);
    });
    const strOutput = strCheckExceptions.join(" ");
    return strOutput;
  } else {
    return "";
  }
};
