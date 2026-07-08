import React from 'react';

export default function Inicio() {
  return (
    <div>
      <h1>Sistema Integrado da Mineradora</h1>
      <p>Bem-vindo ao painel de controle da mineradora.</p>
      <p>Utilize o menu acima para gerenciar cidades, setores, equipamentos, funcionários e serviços.</p>

      <h3>Resumo do sistema</h3>
      <ul>
        <li>Na página Home, veja uma visão geral dos dados cadastrados.</li>
        <li>Cadastro de cidades atendidas pela mineradora.</li>
        <li>Cadastro de setores da empresa.</li>
        <li>Cadastro de equipamentos utilizados nos setores.</li>
        <li>Cadastro de funcionários com cidade selecionada.</li>
        <li>Cadastro de serviços com equipamento, cidade e responsável selecionados.</li>
      </ul>
    </div>
  );
}
