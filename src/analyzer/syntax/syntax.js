export function parse(tokens) {
  let currentPosition = 0;
  let variables = {};
  let variablesString = '';

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
      const nombreVariable = tokens[currentPosition].value;
      expect("Identificador");
      if (tokens[currentPosition].type === "Asignacion") {
        nextToken();
        let valor;
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
        variables[nombreVariable] = { nombre: nombreVariable, valor: valor };
        nextToken();
      }
      expect("PuntoYComa");
    } else {
      throw new Error(
        `Error de sintaxis: Se esperaba PalabraReservadaNum, PalabraReservadaFloat o PalabraReservadaString pero se encontró ${tokens[currentPosition].type}`
      );
    }
    for (const variableName in variables) {
      if (variables.hasOwnProperty(variableName)) {
        console.log(`Nombre: ${variables[variableName].nombre}, Valor: ${variables[variableName].valor}`);
      }
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
      } else if (tokens[currentPosition].type === "PalabraReservadaPrint") {
        parsePrintDeclaration();
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


  function parsePrintDeclaration() {
    expect("PalabraReservadaPrint");
    expect("ParentesisApertura");
    expect("Cadena")
    expect("ParentesisCierre");
    expect("PuntoYComa")
  }

  function parseLlamadaFuncionDeclaration() {
    expect("PalabraReservadaLlamadaFuncion");
    expect("Identificador")
    expect("ParentesisApertura");
    expect("ParentesisCierre");
    expect("PuntoYComa")
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
      } else if (tokens[currentPosition].type === "PalabraReservadaPrint") {
        parsePrintDeclaration();
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
      } else if (tokens[currentPosition].type === "PalabraReservadaPrint") {
        parsePrintDeclaration();
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
      } else if (tokens[currentPosition].type === "PalabraReservadaPrint") {
        parsePrintDeclaration();
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
    expect("Numero");
    expect("ParentesisCierre");
    expect("LlaveApertura");
    while (tokens[currentPosition].type !== "LlaveCierre") {
      if (tokens[currentPosition].type === "PalabraReservadaWhile") {
        parseWhileDeclaration();
      } else if (tokens[currentPosition].type === "PalabraReservadaIf") {
        parseIfDeclaration();
      } else if (tokens[currentPosition].type === "PalabraReservadaFunction") {
        parseFunctionDeclaration();
      } else if (tokens[currentPosition].type === "PalabraReservadaPrint") {
        parsePrintDeclaration();
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
      } else if (token.type === "PalabraReservadaPrint") {
        parsePrintDeclaration();
      } else if (token.type === "PalabraReservadaWhile") {
        parseWhileDeclaration();
      } else if (token.type === "PalabraReservadaFor") {
        parseForDeclaration();
      } else if (token.type === "PalabraReservadaLlamadaFuncion") {
        parseLlamadaFuncionDeclaration();
      } else {
        throw new Error(`Error de sintaxis: Token inesperado ${token.type}`);
      }
    }

  }
  parseProgram();
}