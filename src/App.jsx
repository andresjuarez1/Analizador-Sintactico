import { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';

const tiposToken = [
  { regex: /^=/, token: "Igual" },
  { regex: /^;/, token: "PuntoYComa" },
  { regex: /^_/, token: "GuionBajo" },
  { regex: /^{/, token: "LlaveApertura" },
  { regex: /^}/, token: "LlaveFinal" },
  { regex: /^\[/, token: "CorcheteApertura" },
  { regex: /^\]/, token: "CorcheteCierre" },
  { regex: /^\"/, token: "ComillasDobles" },
  { regex: /^\(/, token: "ParentesisApertura" },
  { regex: /^\)/, token: "ParentesisCierre" },
  { regex: /^\d+/, token: "Digitos" },
  { regex: /^function/, token: "PalabraReservadaFunction" },
  { regex: /^for/, token: "PalabraReservadaFor" },
  { regex: /^if/, token: "PalabraReservadaIf" },
  { regex: /^else/, token: "PalabraReservadaElse" },
  { regex: /^while/, token: "PalabraReservadaWhile" },
  { regex: /^num/, token: "PalabraReservadaNum" },
  { regex: /^float/, token: "PalabraReservadaFloat" },
  { regex: /^string/, token: "PalabraReservadaString" },
  { regex: /^\+\+/, token: "Incremento" },
  { regex: /^--/, token: "Decremento" },
  { regex: /^>/, token: "OperadorMayor" },
  { regex: /^</, token: "OperadorMenor" },
  { regex: /^>=/, token: "OperadorIgualMayor" },
  { regex: /^<=/, token: "OperadorIgualMenor" },
  { regex: /^==/, token: "OperadorIgualdad" },
  { regex: /^[a-zA-Z]+/, token: "Letras" },
];

// Función para realizar el análisis léxico
function lex(input) {
  let tokens = [];
  let position = 0;  // Seguimiento de la posición para mensajes de error más informativos.

  while (input.length > 0) {
    // Ignora espacios y saltos de línea al principio de la cadena de entrada.
    const whitespace = input.match(/^\s+/);
    if (whitespace) {
      position += whitespace[0].length;  // Actualiza la posición.
      input = input.slice(whitespace[0].length);  // Elimina los espacios de la entrada.
    }

    if(input.length === 0) {
      break;  // Si solo quedan espacios en blanco, termina el bucle.
    }

    let match = false;
    for (let tokenType of tiposToken) {
      const result = tokenType.regex.exec(input);
      if (result !== null) {
        // Se ha encontrado un token
        match = true;
        tokens.push({ type: tokenType.token, value: result[0] });
        position += result[0].length; 
        input = input.slice(result[0].length);
        break;
      }
    }

    // Si no se encuentra ningún token, se agrega un token de error.
    if (!match) {
      const errorToken = input[0];
      tokens.push({ type: "Error", value: `Carácter inesperado '${errorToken}' en la posición ${position}.` });
      break;
    }
  }

  return tokens;
}

function App() {
  const [codigoFuente, setCodigoFuente] = useState('');
  const [tokensGenerados, setTokensGenerados] = useState([]);

  // Función para analizar el código fuente y generar los tokens
  const analizarCodigo = () => {
    const tokens = lex(codigoFuente);
    setTokensGenerados(tokens);
  };

  // Función ejecutada al montar el editor
  const editorDidMount = (editor, monaco) => {
    console.log('Editor created');
  };

  return (
    <div className='mx-8'>
      <h1 className='font-medium text-3xl my-10 text-white'>Analizador Lexico</h1>
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
        </div>
      </div>
      <button onClick={analizarCodigo} className='bg-[#DCEF64] h-12 font-medium w-28 rounded-md'>Analizar</button>
    </div>
  );
}

export default App;