import { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';

const tiposToken = [
  { regex: /^num/, token: "PalabraReservadaNum" },
  { regex: /^string/, token: "PalabraReservadaString" },
  { regex: /^float/, token: "PalabraReservadaFloat" },
  { regex: /^function/, token: "PalabraReservadaFunction" },
  { regex: /^[_a-zA-Z][_a-zA-Z0-9]*/, token: "Identificador" },
  { regex: /^"[^"]*"/, token: "Cadena" },
  { regex: /^-?[0-9]+(?:\.[0-9]+)?/, token: "Numero" },
  { regex: /^=/, token: "Asignacion" },
  { regex: /^;/, token: "PuntoYComa" },
  { regex: /^{/, token: "LlaveApertura" },
  { regex: /^}/, token: "LlaveCierre" },
  { regex: /^\(/, token: "ParentesisApertura" },
  { regex: /^\)/, token: "ParentesisCierre" },
  { regex: /^==/, token: "Igualdad" },
  { regex: /^if/, token: "PalabraReservadaIf" },
  { regex: /^else/, token: "PalabraReservadaElse" },
  { regex: /^while/, token: "PalabraReservadaWhile" },
  { regex: /^for/, token: "PalabraReservadaFor" },
];

function lex(input) {
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
      tokens.push({ type: "Error", value: `Carácter inesperado '${errorToken}' en la posición ${position}.` });
      break;
    }
  }

  return tokens;
}

function parse(tokens) {
  let currentPosition = 0;

  function nextToken() {
    currentPosition++;
    return tokens[currentPosition];
  }

  function expect(tokenType) {
    if (tokens[currentPosition].type === tokenType) {
      return nextToken();
    } else {
      throw new Error(`Error de sintaxis: Se esperaba ${tokenType} pero se encontró ${tokens[currentPosition].type}`);
    }
  }

  function parseVariableDeclaration() {
    if (
      tokens[currentPosition].type === 'PalabraReservadaNum' ||
      tokens[currentPosition].type === 'PalabraReservadaFloat' ||
      tokens[currentPosition].type === 'PalabraReservadaString'
    ) {
      const tipoVariable = tokens[currentPosition].type; // Guardar el tipo de variable

      nextToken();
      expect('Identificador');
      if (tokens[currentPosition].type === 'Asignacion') {
        nextToken();
        if (
          (tipoVariable === 'PalabraReservadaNum' && tokens[currentPosition].type === 'Numero') ||
          (tipoVariable === 'PalabraReservadaFloat' && (tokens[currentPosition].type === 'Numero' || tokens[currentPosition].type === 'Identificador')) ||
          (tipoVariable === 'PalabraReservadaString' && tokens[currentPosition].type === 'Cadena')
        ) {
          nextToken();
        } else {
          throw new Error(`Error de sintaxis: El tipo de variable '${tipoVariable}' no coincide con el valor asignado '${tokens[currentPosition].type}'`);
        }
      }
      expect('PuntoYComa');
    } else {
      throw new Error(`Error de sintaxis: Se esperaba PalabraReservadaNum, PalabraReservadaFloat o PalabraReservadaString pero se encontró ${tokens[currentPosition].type}`);
    }
  }



  function parseElseStatement() {
    expect('LlaveApertura');
    expect('LlaveCierre');
  }

  function parseFunctionDeclaration() {
    expect('PalabraReservadaFunction');
    expect('Identificador');
    expect('ParentesisApertura');
    expect('ParentesisCierre');
    expect('LlaveApertura');
    expect('LlaveCierre');
  }

  function parseExpression() {
    expect('Identificador');
    expect('Igualdad');
    expect('Identificador');
  }

  function parseProgram() {
    while (currentPosition < tokens.length) {
      const token = tokens[currentPosition];
      if (token.type === 'PalabraReservadaNum' || token.type === 'PalabraReservadaFloat' || token.type === 'PalabraReservadaString') {
        parseVariableDeclaration();
      } else if (token.type === 'PalabraReservadaFunction') {
        parseFunctionDeclaration();
      } else {
        throw new Error(`Error de sintaxis: Token inesperado ${token.type}`);
      }
    }
  }

  parseProgram();
}

function App() {
  const [codigoFuente, setCodigoFuente] = useState('');
  const [tokensGenerados, setTokensGenerados] = useState([]);
  const [error, setError] = useState('');

  const analizarCodigo = () => {
    const tokens = lex(codigoFuente);
    setTokensGenerados(tokens);
    try {
      parse(tokens);
      setError('');
      console.log('Análisis sintáctico exitoso');
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  const editorDidMount = (editor, monaco) => {
    console.log('Editor creado');
  };

  return (
    <div className='mx-8'>
      <h1 className='font-medium text-3xl my-10 text-white'>Analizador Sintáctico</h1>
      <div className='flex'>
        <MonacoEditor
          width="1000"
          height="400"
          language="plaintext"
          theme="vs-dark"
          value={codigoFuente}
          onChange={setCodigoFuente}
          editorDidMount={editorDidMount}
        />
        <div>
          <h2 className='text-white text-xl font-medium mb-4'>Tokens</h2>
          <ul>
            {tokensGenerados.map((token, index) => (
              <li key={index} className='text-[#EFFD95]'>{`${token.type} (${token.value})`}</li>
            ))}
          </ul>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
      <button onClick={analizarCodigo} className='bg-[#DCEF64] h-12 font-medium w-28 rounded-md'>Analizar</button>
    </div>
  );
}

export default App;
