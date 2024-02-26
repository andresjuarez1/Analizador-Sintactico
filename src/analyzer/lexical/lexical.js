export function lex(input, tiposToken) {
  let tokens = [];
  let position = 0;

  while (input.length > 0) {
    const whitespace = input.match(/^\s+/);
    if (whitespace) {
      position += whitespace[0].length;
      input = input.slice(whitespace[0].length);
    }

    if (input.length === 0) {
      break;
    }

    let match = false;
    for (let tokenType of tiposToken) {
      const result = tokenType.regex.exec(input);
      if (result !== null) {
        match = true;
        tokens.push({ type: tokenType.token, value: result[0] });
        position += result[0].length;
        input = input.slice(result[0].length);
        break;
      }
    }

    if (!match) {
      const errorToken = input[0];
      tokens.push({
        type: "Error",
        value: `Carácter inesperado '${errorToken}' en la posición ${position}.`,
      });
      break;
    }
  }
  return tokens;
}
