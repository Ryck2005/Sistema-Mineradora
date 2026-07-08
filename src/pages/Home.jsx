import React, { useEffect, useState } from 'react';
import { cidadeService, setorService, equipamentoService, funcionarioService, servicoService } from '../services/api';

export default function Home() {
  const [cidades, setCidades] = useState([]);
  const [setores, setSetores] = useState([]);
  const [equipamentos, setEquipamentos] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    const respostaCidades = await cidadeService.listar();
    const respostaSetores = await setorService.listar();
    const respostaEquipamentos = await equipamentoService.listar();
    const respostaFuncionarios = await funcionarioService.listar();
    const respostaServicos = await servicoService.listar();

    if (respostaCidades.error) {
      console.log(respostaCidades.error);
    } else {
      setCidades(respostaCidades.data);
    }

    if (respostaSetores.error) {
      console.log(respostaSetores.error);
    } else {
      setSetores(respostaSetores.data);
    }

    if (respostaEquipamentos.error) {
      console.log(respostaEquipamentos.error);
    } else {
      setEquipamentos(respostaEquipamentos.data);
    }

    if (respostaFuncionarios.error) {
      console.log(respostaFuncionarios.error);
    } else {
      setFuncionarios(respostaFuncionarios.data);
    }

    if (respostaServicos.error) {
      console.log(respostaServicos.error);
    } else {
      setServicos(respostaServicos.data);
    }
  };

  const servicosPendentes = servicos.filter((servico) => servico.status === 'Pendente').length;
  const servicosAndamento = servicos.filter((servico) => servico.status === 'Em andamento').length;
  const servicosFinalizados = servicos.filter((servico) => servico.status === 'Finalizado').length;

  const equipamentosDisponiveis = equipamentos.filter((equipamento) => equipamento.status === 'Disponível').length;
  const equipamentosUso = equipamentos.filter((equipamento) => equipamento.status === 'Em uso').length;
  const equipamentosManutencao = equipamentos.filter((equipamento) => equipamento.status === 'Em manutenção').length;

  const cidadesComOperacao = [];

  funcionarios.forEach((funcionario) => {
    if (funcionario.cidade && !cidadesComOperacao.includes(funcionario.cidade)) {
      cidadesComOperacao.push(funcionario.cidade);
    }
  });

  servicos.forEach((servico) => {
    if (servico.cidade && !cidadesComOperacao.includes(servico.cidade)) {
      cidadesComOperacao.push(servico.cidade);
    }
  });

  return (
    <div>
      <div className="titulo-home">
        <div>
          <h2> Visão Geral</h2>
        </div>
        <button onClick={carregarDados}>Atualizar dados</button>
      </div>

      <div className="home-cards-linha">
        <div className="card-home">
          <h3>{cidades.length}</h3>
          <p>Cidades</p>
        </div>

        <div className="card-home">
          <h3>{cidadesComOperacao.length}</h3>
          <p>Cidades com operação</p>
        </div>

        <div className="card-home">
          <h3>{setores.length}</h3>
          <p>Setores</p>
        </div>

        <div className="card-home">
          <h3>{funcionarios.length}</h3>
          <p>Funcionários</p>
        </div>

        <div className="card-home">
          <h3>{equipamentos.length}</h3>
          <p>Equipamentos</p>
        </div>

        <div className="card-home">
          <h3>{servicos.length}</h3>
          <p>Serviços</p>
        </div>
      </div>

      <div className="home-duas-colunas">
        <div className="caixa-resumo destaque-servicos">
          <h3>Serviços:</h3>

          <div className="linha-status">
            <span>Pendentes</span>
            <strong>{servicosPendentes}</strong>
          </div>

          <div className="linha-status">
            <span>Em andamento</span>
            <strong>{servicosAndamento}</strong>
          </div>

          <div className="linha-status">
            <span>Finalizados</span>
            <strong>{servicosFinalizados}</strong>
          </div>
        </div>

        <div className="caixa-resumo destaque-equipamentos">
          <h3>Equipamentos: </h3>

          <div className="linha-status">
            <span>Disponíveis</span>
            <strong>{equipamentosDisponiveis}</strong>
          </div>

          <div className="linha-status">
            <span>Em uso</span>
            <strong>{equipamentosUso}</strong>
          </div>

          <div className="linha-status">
            <span>Em manutenção</span>
            <strong>{equipamentosManutencao}</strong>
          </div>
        </div>
      </div>

      <div className="caixa-resumo">
        <h3>Cidades em que a mineradora está presente</h3>
        {cidadesComOperacao.length === 0 ? (
          <p>Nenhuma cidade com operação cadastrada.</p>
        ) : (
          <div className="lista-cidades-home">
            {cidadesComOperacao.map((cidade) => (
              <span key={cidade}>{cidade}</span>
            ))}
          </div>
        )}
      </div>

      <div className="caixa-resumo">
        <h3>Dados dos Equipamentos</h3>
        {equipamentos.length === 0 ? (
          <p>Nenhum equipamento cadastrado.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Setor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {equipamentos.map((equipamento) => (
                <tr key={equipamento.id}>
                  <td>{equipamento.nome}</td>
                  <td>{equipamento.setor}</td>
                  <td>{equipamento.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
