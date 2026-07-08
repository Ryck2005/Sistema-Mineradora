import React, { useEffect, useState } from 'react';
import { equipamentoService, setorService } from '../services/api';

export default function Equipamentos() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [setores, setSetores] = useState([]);
  const [nome, setNome] = useState('');
  const [setor, setSetor] = useState('');
  const [status, setStatus] = useState('Disponível');
  const [pesquisa, setPesquisa] = useState('');
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    carregarEquipamentos();
    carregarSetores();
  }, []);

  const carregarEquipamentos = async () => {
    const resposta = await equipamentoService.listar();

    if (resposta.error) {
      alert('Erro ao buscar equipamentos');
      console.log(resposta.error);
    } else {
      setEquipamentos(resposta.data);
    }
  };

  const carregarSetores = async () => {
    const resposta = await setorService.listar();

    if (resposta.error) {
      console.log(resposta.error);
    } else {
      setSetores(resposta.data);
    }
  };

  const salvar = async () => {
    if (nome === '' || setor === '' || status === '') {
      alert('Preencha todos os campos!');
      return;
    }

    const equipamento = {
      nome: nome,
      setor: setor,
      status: status
    };

    if (idEditando === null) {
      const resposta = await equipamentoService.criar(equipamento);

      if (resposta.error) {
        alert('Erro ao cadastrar equipamento');
        console.log(resposta.error);
        return;
      }
    } else {
      const resposta = await equipamentoService.atualizar(idEditando, equipamento);

      if (resposta.error) {
        alert('Erro ao atualizar equipamento');
        console.log(resposta.error);
        return;
      }
    }

    limparCampos();
    carregarEquipamentos();
  };

  const editar = (equipamento) => {
    setIdEditando(equipamento.id);
    setNome(equipamento.nome);
    setSetor(equipamento.setor);
    setStatus(equipamento.status);
  };

  const excluir = async (id) => {
    const confirmar = confirm('Deseja excluir este equipamento?');

    if (confirmar === false) {
      return;
    }

    const resposta = await equipamentoService.excluir(id);

    if (resposta.error) {
      alert('Erro ao excluir equipamento');
      console.log(resposta.error);
    } else {
      carregarEquipamentos();
    }
  };

  const limparCampos = () => {
    setIdEditando(null);
    setNome('');
    setSetor('');
    setStatus('Disponível');
  };

  const equipamentosFiltrados = equipamentos.filter((equipamento) =>
    equipamento.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div>
      <h2>Gestão de Equipamentos</h2>

      <div className="caixa-formulario">
        <h3>{idEditando === null ? 'Novo Equipamento' : 'Editando Equipamento'}</h3>

        <input
          type="text"
          placeholder="Nome do equipamento"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <select value={setor} onChange={(e) => setSetor(e.target.value)}>
          <option value="">Selecione o setor</option>
          {setores.map((setorItem) => (
            <option key={setorItem.id} value={setorItem.nome}>{setorItem.nome}</option>
          ))}
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Disponível">Disponível</option>
          <option value="Em uso">Em uso</option>
          <option value="Em manutenção">Em manutenção</option>
        </select>

        <button onClick={salvar}>{idEditando === null ? 'Cadastrar' : 'Salvar'}</button>
        <button onClick={limparCampos}>Limpar</button>
      </div>

      <h3>Equipamentos Cadastrados</h3>
      <p>Total de equipamentos cadastrados: {equipamentos.length}</p>

      <input
        type="text"
        placeholder="Pesquisar equipamento pelo nome"
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />

      {equipamentosFiltrados.length === 0 ? (
        <p>Nenhum equipamento encontrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Setor</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {equipamentosFiltrados.map((equipamento) => (
              <tr key={equipamento.id}>
                <td>{equipamento.id}</td>
                <td>{equipamento.nome}</td>
                <td>{equipamento.setor}</td>
                <td>{equipamento.status}</td>
                <td>
                  <button onClick={() => editar(equipamento)}>Editar</button>
                  <button onClick={() => excluir(equipamento.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
