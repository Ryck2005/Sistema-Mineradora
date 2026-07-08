import React, { useEffect, useState } from 'react';
import { servicoService, equipamentoService, cidadeService, funcionarioService } from '../services/api';

export default function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [equipamentos, setEquipamentos] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [equipamento, setEquipamento] = useState('');
  const [cidade, setCidade] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [status, setStatus] = useState('Pendente');
  const [pesquisa, setPesquisa] = useState('');
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    carregarServicos();
    carregarEquipamentos();
    carregarCidades();
    carregarFuncionarios();
  }, []);

  const carregarServicos = async () => {
    const resposta = await servicoService.listar();

    if (resposta.error) {
      alert('Erro ao buscar serviços');
      console.log(resposta.error);
    } else {
      setServicos(resposta.data);
    }
  };

  const carregarEquipamentos = async () => {
    const resposta = await equipamentoService.listar();

    if (resposta.error) {
      console.log(resposta.error);
    } else {
      setEquipamentos(resposta.data);
    }
  };

  const carregarCidades = async () => {
    const resposta = await cidadeService.listar();

    if (resposta.error) {
      console.log(resposta.error);
    } else {
      setCidades(resposta.data);
    }
  };

  const carregarFuncionarios = async () => {
    const resposta = await funcionarioService.listar();

    if (resposta.error) {
      console.log(resposta.error);
    } else {
      setFuncionarios(resposta.data);
    }
  };

  const salvar = async () => {
    if (descricao === '' || equipamento === '' || cidade === '' || responsavel === '' || status === '') {
      alert('Preencha todos os campos!');
      return;
    }

    const servico = {
      descricao: descricao,
      equipamento: equipamento,
      cidade: cidade,
      responsavel: responsavel,
      status: status
    };

    if (idEditando === null) {
      const resposta = await servicoService.criar(servico);

      if (resposta.error) {
        alert('Erro ao cadastrar serviço');
        console.log(resposta.error);
        return;
      }
    } else {
      const resposta = await servicoService.atualizar(idEditando, servico);

      if (resposta.error) {
        alert('Erro ao atualizar serviço');
        console.log(resposta.error);
        return;
      }
    }

    limparCampos();
    carregarServicos();
  };

  const editar = (servico) => {
    setIdEditando(servico.id);
    setDescricao(servico.descricao);
    setEquipamento(servico.equipamento);
    setCidade(servico.cidade || '');
    setResponsavel(servico.responsavel);
    setStatus(servico.status);
  };

  const excluir = async (id) => {
    const confirmar = confirm('Deseja excluir este serviço?');

    if (confirmar === false) {
      return;
    }

    const resposta = await servicoService.excluir(id);

    if (resposta.error) {
      alert('Erro ao excluir serviço');
      console.log(resposta.error);
    } else {
      carregarServicos();
    }
  };

  const limparCampos = () => {
    setIdEditando(null);
    setDescricao('');
    setEquipamento('');
    setCidade('');
    setResponsavel('');
    setStatus('Pendente');
  };

  const servicosFiltrados = servicos.filter((servico) =>
    servico.descricao.toLowerCase().includes(pesquisa.toLowerCase()) ||
    servico.equipamento.toLowerCase().includes(pesquisa.toLowerCase()) ||
    servico.responsavel.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div>
      <h2>Gestão de Serviços</h2>

      <div className="caixa-formulario">
        <h3>{idEditando === null ? 'Novo Serviço' : 'Editando Serviço'}</h3>

        <input
          type="text"
          placeholder="Descrição do serviço"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <select value={equipamento} onChange={(e) => setEquipamento(e.target.value)}>
          <option value="">Selecione o equipamento</option>
          {equipamentos.map((equipamentoItem) => (
            <option key={equipamentoItem.id} value={equipamentoItem.nome}>{equipamentoItem.nome}</option>
          ))}
        </select>

        <select value={cidade} onChange={(e) => setCidade(e.target.value)}>
          <option value="">Selecione a cidade</option>
          {cidades.map((cidadeItem) => (
            <option key={cidadeItem.id} value={cidadeItem.nome}>{cidadeItem.nome}</option>
          ))}
        </select>

        <select value={responsavel} onChange={(e) => setResponsavel(e.target.value)}>
          <option value="">Selecione o responsável</option>
          {funcionarios.map((funcionario) => (
            <option key={funcionario.id} value={funcionario.nome}>{funcionario.nome}</option>
          ))}
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pendente">Pendente</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Finalizado">Finalizado</option>
        </select>

        <button onClick={salvar}>{idEditando === null ? 'Cadastrar' : 'Salvar'}</button>
        <button onClick={limparCampos}>Limpar</button>
      </div>

      <h3>Serviços Cadastrados</h3>
      <p>Total de serviços cadastrados: {servicos.length}</p>

      <input
        type="text"
        placeholder="Pesquisar serviço, equipamento ou responsável"
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />

      {servicosFiltrados.length === 0 ? (
        <p>Nenhum serviço encontrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Equipamento</th>
              <th>Cidade</th>
              <th>Responsável</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {servicosFiltrados.map((servico) => (
              <tr key={servico.id}>
                <td>{servico.id}</td>
                <td>{servico.descricao}</td>
                <td>{servico.equipamento}</td>
                <td>{servico.cidade}</td>
                <td>{servico.responsavel}</td>
                <td>{servico.status}</td>
                <td>
                  <button onClick={() => editar(servico)}>Editar</button>
                  <button onClick={() => excluir(servico.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
