const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function enviarRequisicao(caminho, opcoes = {}) {
  try {
    const resposta = await fetch(API_URL + caminho, {
      headers: {
        'Content-Type': 'application/json'
      },
      ...opcoes
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      return { data: null, error: dados.error };
    }

    return { data: dados, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

export const cidadeService = {
  listar: () => enviarRequisicao('/cidades'),
  criar: (cidade) => enviarRequisicao('/cidades', {
    method: 'POST',
    body: JSON.stringify(cidade)
  }),
  atualizar: (id, cidade) => enviarRequisicao('/cidades/' + id, {
    method: 'PUT',
    body: JSON.stringify(cidade)
  }),
  excluir: (id) => enviarRequisicao('/cidades/' + id, {
    method: 'DELETE'
  })
};

export const setorService = {
  listar: () => enviarRequisicao('/setores'),
  criar: (setor) => enviarRequisicao('/setores', {
    method: 'POST',
    body: JSON.stringify(setor)
  }),
  atualizar: (id, setor) => enviarRequisicao('/setores/' + id, {
    method: 'PUT',
    body: JSON.stringify(setor)
  }),
  excluir: (id) => enviarRequisicao('/setores/' + id, {
    method: 'DELETE'
  })
};

export const equipamentoService = {
  listar: () => enviarRequisicao('/equipamentos'),
  criar: (equipamento) => enviarRequisicao('/equipamentos', {
    method: 'POST',
    body: JSON.stringify(equipamento)
  }),
  atualizar: (id, equipamento) => enviarRequisicao('/equipamentos/' + id, {
    method: 'PUT',
    body: JSON.stringify(equipamento)
  }),
  excluir: (id) => enviarRequisicao('/equipamentos/' + id, {
    method: 'DELETE'
  })
};

export const funcionarioService = {
  listar: () => enviarRequisicao('/funcionarios'),
  criar: (funcionario) => enviarRequisicao('/funcionarios', {
    method: 'POST',
    body: JSON.stringify(funcionario)
  }),
  atualizar: (id, funcionario) => enviarRequisicao('/funcionarios/' + id, {
    method: 'PUT',
    body: JSON.stringify(funcionario)
  }),
  excluir: (id) => enviarRequisicao('/funcionarios/' + id, {
    method: 'DELETE'
  })
};

export const servicoService = {
  listar: () => enviarRequisicao('/servicos'),
  criar: (servico) => enviarRequisicao('/servicos', {
    method: 'POST',
    body: JSON.stringify(servico)
  }),
  atualizar: (id, servico) => enviarRequisicao('/servicos/' + id, {
    method: 'PUT',
    body: JSON.stringify(servico)
  }),
  excluir: (id) => enviarRequisicao('/servicos/' + id, {
    method: 'DELETE'
  })
};
