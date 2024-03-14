export function parse(tokens) {
  let currentPosition = 0;
  let variables = {};

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

  function parsePrintStatement() {
    expect("ParentesisApertura");
    expect("Identificador");
    const variableName = tokens[currentPosition].value;
    expect("ParentesisCierre");
    expect("PuntoYComa");
    if (variables.hasOwnProperty(variableName)) {
      console.log(variables[variableName]);
    } else {
      throw new Error(
        `Error: La variable '${variableName}' no está definida.`
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
      const nombreVariable = tokens[currentPosition].value;
      expect("Identificador");
      if (tokens[currentPosition].type === "Asignacion") {
        nextToken();
        let valor;
        // Verificar que el tipo de valor asignado coincida con el tipo de variable
        if (tipoVariable === "PalabraReservadaNum") {
          if (tokens[currentPosition].type === "Numero") {
            valor = tokens[currentPosition].value;
          } else {
            throw new Error(
              `Error de sintaxis: Se esperaba un número para la variable '${nombreVariable}'`
            );
          }
        } else if (tipoVariable === "PalabraReservadaFloat") {
          if (
            tokens[currentPosition].type === "Numero" ||
            tokens[currentPosition].type === "Identificador"
          ) {
            valor = tokens[currentPosition].value;
          } else {
            throw new Error(
              `Error de sintaxis: Se esperaba un número o identificador para la variable '${nombreVariable}'`
            );
          }
        } else if (tipoVariable === "PalabraReservadaString") {
          if (tokens[currentPosition].type === "Cadena") {
            valor = tokens[currentPosition].value;
          } else {
            throw new Error(
              `Error de sintaxis: Se esperaba una cadena para la variable '${nombreVariable}'`
            );
          }
        }
        // Almacena la variable y su valor si la validación es correcta
        variables[nombreVariable] = valor;
        nextToken();
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
      if (token.type === "PalabraReservadaPrint") {
        parsePrintStatement();
      } else if (
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
    console.log("Variables guardadas:");
    console.log(variables);
  }
  parseProgram();
}