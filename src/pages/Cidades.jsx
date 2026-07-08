import React, { useEffect, useState } from 'react';
import { cidadeService } from '../services/api';

export default function Cidades() {
  const [cidades, setCidades] = useState([]);
  const [nome, setNome] = useState('');
  const [estado, setEstado] = useState('');
  const [pesquisa, setPesquisa] = useState('');
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    carregarCidades();
  }, []);

  const carregarCidades = async () => {
    const resposta = await cidadeService.listar();

    if (resposta.error) {
      alert('Erro ao buscar cidades');
      console.log(resposta.error);
    } else {
      setCidades(resposta.data);
    }
  };

  const salvar = async () => {
    if (nome === '' || estado === '') {
      alert('Preencha todos os campos!');
      return;
    }

    const cidade = {
      nome: nome,
      estado: estado
    };

    if (idEditando === null) {
      const resposta = await cidadeService.criar(cidade);

      if (resposta.error) {
        alert('Erro ao cadastrar cidade');
        console.log(resposta.error);
        return;
      }
    } else {
      const resposta = await cidadeService.atualizar(idEditando, cidade);

      if (resposta.error) {
        alert('Erro ao atualizar cidade');
        console.log(resposta.error);
        return;
      }
    }

    limparCampos();
    carregarCidades();
  };

  const editar = (cidade) => {
    setIdEditando(cidade.id);
    setNome(cidade.nome);
    setEstado(cidade.estado);
  };

  const excluir = async (id) => {
    const confirmar = confirm('Deseja excluir esta cidade?');

    if (confirmar === false) {
      return;
    }

    const resposta = await cidadeService.excluir(id);

    if (resposta.error) {
      alert('Erro ao excluir cidade');
      console.log(resposta.error);
    } else {
      carregarCidades();
    }
  };

  const limparCampos = () => {
    setIdEditando(null);
    setNome('');
    setEstado('');
  };

  const cidadesFiltradas = cidades.filter((cidade) =>
    cidade.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div>
      <h2>Gestão de Cidades</h2>

      <div className="caixa-formulario">
        <h3>{idEditando === null ? 'Nova Cidade' : 'Editando Cidade'}</h3>

        <input
          type="text"
          placeholder="Nome da cidade"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="text"
          placeholder="Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        />

        <button onClick={salvar}>{idEditando === null ? 'Cadastrar' : 'Salvar'}</button>
        <button onClick={limparCampos}>Limpar</button>
      </div>

      <h3>Cidades Cadastradas</h3>
      <p>Total de cidades cadastradas: {cidades.length}</p>

      <input
        type="text"
        placeholder="Pesquisar cidade pelo nome"
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />

      {cidadesFiltradas.length === 0 ? (
        <p>Nenhuma cidade encontrada.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Estado</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {cidadesFiltradas.map((cidade) => (
              <tr key={cidade.id}>
                <td>{cidade.id}</td>
                <td>{cidade.nome}</td>
                <td>{cidade.estado}</td>
                <td>
                  <button onClick={() => editar(cidade)}>Editar</button>
                  <button onClick={() => excluir(cidade.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
