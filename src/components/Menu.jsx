import React from 'react';

export default function Menu({ setPagina, abrirInicio }) {
  return (
    <nav className="menu">
      <button onClick={abrirInicio}>Início</button>
      <button onClick={() => setPagina('home')}>Home</button>
      <button onClick={() => setPagina('cidades')}>Cidades</button>
      <button onClick={() => setPagina('setores')}>Setores</button>
      <button onClick={() => setPagina('equipamentos')}>Equipamentos</button>
      <button onClick={() => setPagina('funcionarios')}>Funcionários</button>
      <button onClick={() => setPagina('servicos')}>Serviços</button>
    </nav>
  );
}
