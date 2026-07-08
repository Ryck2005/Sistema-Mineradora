import React, { useEffect, useState } from 'react';
import { funcionarioService, cidadeService } from '../services/api';

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [cidade, setCidade] = useState('');
  const [pesquisa, setPesquisa] = useState('');
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    carregarFuncionarios();
    carregarCidades();
  }, []);

  const carregarFuncionarios = async () => {
    const resposta = await funcionarioService.listar();

    if (resposta.error) {
      alert('Erro ao buscar funcionários');
      console.log(resposta.error);
    } else {
      setFuncionarios(resposta.data);
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

  const salvar = async () => {
    if (nome === '' || cargo === '' || cidade === '') {
      alert('Preencha todos os campos!');
      return;
    }

    const funcionario = {
      nome: nome,
      cargo: cargo,
      cidade: cidade
    };

    if (idEditando === null) {
      const resposta = await funcionarioService.criar(funcionario);

      if (resposta.error) {
        alert('Erro ao cadastrar funcionário');
        console.log(resposta.error);
        return;
      }
    } else {
      const resposta = await funcionarioService.atualizar(idEditando, funcionario);

      if (resposta.error) {
        alert('Erro ao atualizar funcionário');
        console.log(resposta.error);
        return;
      }
    }

    limparCampos();
    carregarFuncionarios();
  };

  const editar = (funcionario) => {
    setIdEditando(funcionario.id);
    setNome(funcionario.nome);
    setCargo(funcionario.cargo);
    setCidade(funcionario.cidade);
  };

  const excluir = async (id) => {
    const confirmar = confirm('Deseja excluir este funcionário?');

    if (confirmar === false) {
      return;
    }

    const resposta = await funcionarioService.excluir(id);

    if (resposta.error) {
      alert('Erro ao excluir funcionário');
      console.log(resposta.error);
    } else {
      carregarFuncionarios();
    }
  };

  const limparCampos = () => {
    setIdEditando(null);
    setNome('');
    setCargo('');
    setCidade('');
  };

  const funcionariosFiltrados = funcionarios.filter((funcionario) =>
    funcionario.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div>
      <h2>Gestão de Funcionários</h2>

      <div className="caixa-formulario">
        <h3>{idEditando === null ? 'Novo Funcionário' : 'Editando Funcionário'}</h3>

        <input
          type="text"
          placeholder="Nome do funcionário"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="text"
          placeholder="Cargo"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
        />

        <select value={cidade} onChange={(e) => setCidade(e.target.value)}>
          <option value="">Selecione a cidade</option>
          {cidades.map((cidadeItem) => (
            <option key={cidadeItem.id} value={cidadeItem.nome}>{cidadeItem.nome}</option>
          ))}
        </select>

        <button onClick={salvar}>{idEditando === null ? 'Cadastrar' : 'Salvar'}</button>
        <button onClick={limparCampos}>Limpar</button>
      </div>

      <h3>Funcionários Cadastrados</h3>
      <p>Total de funcionários cadastrados: {funcionarios.length}</p>

      <input
        type="text"
        placeholder="Pesquisar funcionário pelo nome"
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />

      {funcionariosFiltrados.length === 0 ? (
        <p>Nenhum funcionário encontrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Cidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcionariosFiltrados.map((funcionario) => (
              <tr key={funcionario.id}>
                <td>{funcionario.id}</td>
                <td>{funcionario.nome}</td>
                <td>{funcionario.cargo}</td>
                <td>{funcionario.cidade}</td>
                <td>
                  <button onClick={() => editar(funcionario)}>Editar</button>
                  <button onClick={() => excluir(funcionario.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
