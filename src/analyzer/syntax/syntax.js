export function parse(tokens) {
  let currentPosition = 0;

  function nextToken() {
    currentPosition++;
    return tokens[currentPosition];
  }

  function expect(tokenType) {
    if (tokens[currentPosition].type === tokenType) {
      return nextToken();
    } else {
      throw new Error(
        `Error de sintaxis: Se esperaba ${tokenType} pero se encontró ${tokens[currentPosition].type}`
      );
    }
  }

  function parseVariableDeclaration() {
    if (
      tokens[currentPosition].type === "PalabraReservadaNum" ||
      tokens[currentPosition].type === "PalabraReservadaFloat" ||
      tokens[currentPosition].type === "PalabraReservadaString"
    ) {
      const tipoVariable = tokens[currentPosition].type;

      nextToken();
      expect("Identificador");
      if (tokens[currentPosition].type === "Asignacion") {
        nextToken();
        if (
          (tipoVariable === "PalabraReservadaNum" &&
            tokens[currentPosition].type === "Numero") ||
          (tipoVariable === "PalabraReservadaFloat" &&
            (tokens[currentPosition].type === "Numero" ||
              tokens[currentPosition].type === "Identificador")) ||
          (tipoVariable === "PalabraReservadaString" &&
            tokens[currentPosition].type === "Cadena")
        ) {
          nextToken();
        } else {
          throw new Error(
            `Error de sintaxis: El tipo de variable '${tipoVariable}' no coincide con el valor asignado '${tokens[currentPosition].type}'`
          );
        }
      }
      expect("PuntoYComa");
    } else {
      throw new Error(
        `Error de sintaxis: Se esperaba PalabraReservadaNum, PalabraReservadaFloat o PalabraReservadaString pero se encontró ${tokens[currentPosition].type}`
      );
    }
  }

  function parseFunctionDeclaration() {
    expect("PalabraReservadaFunction");
    expect("Identificador");
    expect("ParentesisApertura");
    expect("ParentesisCierre");
    expect("LlaveApertura");
    while (tokens[currentPosition].type !== "LlaveCierre") {
      if (tokens[currentPosition].type === "PalabraReservadaFor") {
        parseForDeclaration();
      } else if (tokens[currentPosition].type === "PalabraReservadaWhile") {
        parseWhileDeclaration();
      } else if (tokens[currentPosition].type === "PalabraReservadaIf") {
        parseIfDeclaration();
      } else if (
        tokens[currentPosition].type === "PalabraReservadaNum" ||
        tokens[currentPosition].type === "PalabraReservadaFloat" ||
        tokens[currentPosition].type === "PalabraReservadaString"
      ) {
        parseVariableDeclaration();
      } else {
        throw new Error(
          `Error de sintaxis: Token inesperado ${tokens[currentPosition].type}`
        );
      }
    }
    expect("LlaveCierre");
  }

  function parseIfDeclaration() {
    expect("PalabraReservadaIf");
    expect("ParentesisApertura");
    expect("Identificador");
    expect("Igualdad");
    expect("Identificador");
    expect("ParentesisCierre");
    expect("LlaveApertura");
    while (tokens[currentPosition].type !== "LlaveCierre") {
      if (tokens[currentPosition].type === "PalabraReservadaFor") {
        parseForDeclaration();
      } else if (tokens[currentPosition].type === "PalabraReservadaWhile") {
        parseWhileDeclaration();
      } else if (tokens[currentPosition].type === "PalabraReservadaFunction") {
        parseFunctionDeclaration();
      } else if (
        tokens[currentPosition].type === "PalabraReservadaNum" ||
        tokens[currentPosition].type === "PalabraReservadaFloat" ||
        tokens[currentPosition].type === "PalabraReservadaString"
      ) {
        parseVariableDeclaration();
      } else {
        throw new Error(
          `Error de sintaxis: Token inesperado ${tokens[currentPosition].type}`
        );
      }
    }
    expect("LlaveCierre");
    expect("PalabraReservadaElse");
    expect("LlaveApertura");
    while (tokens[currentPosition].type !== "LlaveCierre") {
      if (tokens[currentPosition].type === "PalabraReservadaFor") {
        parseForDeclaration();
      } else if (tokens[currentPosition].type === "PalabraReservadaWhile") {
        parseWhileDeclaration();
      } else if (tokens[currentPosition].type === "PalabraReservadaFunction") {
        parseFunctionDeclaration();
      } else if (
        tokens[currentPosition].type === "PalabraReservadaNum" ||
        tokens[currentPosition].type === "PalabraReservadaFloat" ||
        tokens[currentPosition].type === "PalabraReservadaString"
      ) {
        parseVariableDeclaration();
      } else {
        throw new Error(
          `Error de sintaxis: Token inesperado ${tokens[currentPosition].type}`
        );
      }
    }
    expect("LlaveCierre");
  }

  function parseWhileDeclaration() {
    expect("PalabraReservadaWhile");
    expect("ParentesisApertura");
    expect("Identificador");
    expect("Igualdad");
    expect("Identificador");
    expect("ParentesisCierre");
    expect("LlaveApertura");
    while (tokens[currentPosition].type !== "LlaveCierre") {
      if (tokens[currentPosition].type === "PalabraReservadaFor") {
        parseForDeclaration();
      } else if (tokens[currentPosition].type === "PalabraReservadaIf") {
        parseIfDeclaration();
      } else if (tokens[currentPosition].type === "PalabraReservadaFunction") {
        parseFunctionDeclaration();
      } else if (
        tokens[currentPosition].type === "PalabraReservadaNum" ||
        tokens[currentPosition].type === "PalabraReservadaFloat" ||
        tokens[currentPosition].type === "PalabraReservadaString"
      ) {
        parseVariableDeclaration();
      } else {
        throw new Error(
          `Error de sintaxis: Token inesperado ${tokens[currentPosition].type}`
        );
      }
    }
    expect("LlaveCierre");
  }

  function parseForDeclaration() {
    expect("PalabraReservadaFor");
    expect("ParentesisApertura");
    expect("Identificador");
    expect("Igualdad");
    expect("Identificador");
    expect("ParentesisCierre");
    expect("LlaveApertura");

    while (tokens[currentPosition].type !== "LlaveCierre") {
      if (tokens[currentPosition].type === "PalabraReservadaWhile") {
        parseWhileDeclaration();
      } else if (tokens[currentPosition].type === "PalabraReservadaIf") {
        parseIfDeclaration();
      } else if (tokens[currentPosition].type === "PalabraReservadaFunction") {
        parseFunctionDeclaration();
      } else if (
        tokens[currentPosition].type === "PalabraReservadaNum" ||
        tokens[currentPosition].type === "PalabraReservadaFloat" ||
        tokens[currentPosition].type === "PalabraReservadaString"
      ) {
        parseVariableDeclaration();
      } else {
        throw new Error(
          `Error de sintaxis: Token inesperado ${tokens[currentPosition].type}`
        );
      }
    }

    expect("LlaveCierre");
  }

  function parseProgram() {
    while (currentPosition < tokens.length) {
      const token = tokens[currentPosition];
      if (
        token.type === "PalabraReservadaNum" ||
        token.type === "PalabraReservadaFloat" ||
        token.type === "PalabraReservadaString"
      ) {
        parseVariableDeclaration();
      } else if (token.type === "PalabraReservadaFunction") {
        parseFunctionDeclaration();
      } else if (token.type === "PalabraReservadaIf") {
        parseIfDeclaration();
      } else if (token.type === "PalabraReservadaWhile") {
        parseWhileDeclaration();
      } else if (token.type === "PalabraReservadaFor") {
        parseForDeclaration();
      } else {
        throw new Error(`Error de sintaxis: Token inesperado ${token.type}`);
      }
    }
  }
  parseProgram();
}
