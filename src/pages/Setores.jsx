import React, { useEffect, useState } from 'react';
import { setorService } from '../services/api';

export default function Setores() {
  const [setores, setSetores] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [pesquisa, setPesquisa] = useState('');
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    carregarSetores();
  }, []);

  const carregarSetores = async () => {
    const resposta = await setorService.listar();

    if (resposta.error) {
      alert('Erro ao buscar setores');
      console.log(resposta.error);
    } else {
      setSetores(resposta.data);
    }
  };

  const salvar = async () => {
    if (nome === '') {
      alert('Informe o nome do setor!');
      return;
    }

    const setor = {
      nome: nome,
      descricao: descricao
    };

    if (idEditando === null) {
      const resposta = await setorService.criar(setor);

      if (resposta.error) {
        alert('Erro ao cadastrar setor');
        console.log(resposta.error);
        return;
      }
    } else {
      const resposta = await setorService.atualizar(idEditando, setor);

      if (resposta.error) {
        alert('Erro ao atualizar setor');
        console.log(resposta.error);
        return;
      }
    }

    limparCampos();
    carregarSetores();
  };

  const editar = (setor) => {
    setIdEditando(setor.id);
    setNome(setor.nome);
    setDescricao(setor.descricao || '');
  };

  const excluir = async (id) => {
    const confirmar = confirm('Deseja excluir este setor?');

    if (confirmar === false) {
      return;
    }

    const resposta = await setorService.excluir(id);

    if (resposta.error) {
      alert('Erro ao excluir setor');
      console.log(resposta.error);
    } else {
      carregarSetores();
    }
  };

  const limparCampos = () => {
    setIdEditando(null);
    setNome('');
    setDescricao('');
  };

  const setoresFiltrados = setores.filter((setor) =>
    setor.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div>
      <h2>Gestão de Setores</h2>

      <div className="caixa-formulario">
        <h3>{idEditando === null ? 'Novo Setor' : 'Editando Setor'}</h3>

        <input
          type="text"
          placeholder="Nome do setor"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="text"
          placeholder="Descrição simples"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <button onClick={salvar}>{idEditando === null ? 'Cadastrar' : 'Salvar'}</button>
        <button onClick={limparCampos}>Limpar</button>
      </div>

      <h3>Setores Cadastrados</h3>
      <p>Total de setores cadastrados: {setores.length}</p>

      <input
        type="text"
        placeholder="Pesquisar setor pelo nome"
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />

      {setoresFiltrados.length === 0 ? (
        <p>Nenhum setor encontrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {setoresFiltrados.map((setor) => (
              <tr key={setor.id}>
                <td>{setor.id}</td>
                <td>{setor.nome}</td>
                <td>{setor.descricao}</td>
                <td>
                  <button onClick={() => editar(setor)}>Editar</button>
                  <button onClick={() => excluir(setor.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
