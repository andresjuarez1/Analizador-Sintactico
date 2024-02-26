import { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { tiposToken } from './tokens/tokens'
import { parse } from './analyzer/syntax/syntax';
import { lex } from './analyzer/lexical/lexical'

function App() {
  const [codigoFuente, setCodigoFuente] = useState('');
  const [tokensGenerados, setTokensGenerados] = useState([]);
  const [error, setError] = useState('');

  const analizarCodigo = () => {
    const tokens = lex(codigoFuente, tiposToken);
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
      <h1 className='font-medium text-3xl my-10 text-white'>Analizador</h1>
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
