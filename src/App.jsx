import React, { useState } from 'react';
import Menu from './components/Menu';
import Inicio from './pages/Inicio';
import Home from './pages/Home';
import Cidades from './pages/Cidades';
import Setores from './pages/Setores';
import Equipamentos from './pages/Equipamentos';
import Funcionarios from './pages/Funcionarios';
import Servicos from './pages/Servicos';

function App() {
  const [pagina, setPagina] = useState('home');
  const [mostrarInicio, setMostrarInicio] = useState(() => {
    const jaViuInicio = localStorage.getItem('jaViuInicio');
    return jaViuInicio !== 'sim';
  });

  const fecharInicio = () => {
    localStorage.setItem('jaViuInicio', 'sim');
    setMostrarInicio(false);
  };

  const abrirInicio = () => {
    setMostrarInicio(true);
  };

  return (
    <div className="container">
      {mostrarInicio && (
        <div className="fundo-popup">
          <div className="popup-inicio">
            <Inicio />
            <div className="botoes-popup">
              <button onClick={fecharInicio}>Entrar no sistema</button>
            </div>
          </div>
        </div>
      )}

      <Menu setPagina={setPagina} abrirInicio={abrirInicio} />
      <hr />

      {pagina === 'home' && <Home />}
      {pagina === 'cidades' && <Cidades />}
      {pagina === 'setores' && <Setores />}
      {pagina === 'equipamentos' && <Equipamentos />}
      {pagina === 'funcionarios' && <Funcionarios />}
      {pagina === 'servicos' && <Servicos />}
    </div>
  );
}

export default App;
