const express = require('express');
const cors = require('cors');
require('dotenv').config();

const supabase = require('./config/supabaseClient');

const app = express();
const porta = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API do Sistema Mineradora funcionando!');
});

// ROTAS DE CIDADES
app.get('/cidades', async (req, res) => {
  const { data, error } = await supabase.from('cidades').select('*').order('id');

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

app.post('/cidades', async (req, res) => {
  const { data, error } = await supabase.from('cidades').insert([req.body]).select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

app.put('/cidades/:id', async (req, res) => {
  const { data, error } = await supabase.from('cidades').update(req.body).eq('id', req.params.id).select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

app.delete('/cidades/:id', async (req, res) => {
  const { data, error } = await supabase.from('cidades').delete().eq('id', req.params.id).select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

// ROTAS DE SETORES
app.get('/setores', async (req, res) => {
  const { data, error } = await supabase.from('setores').select('*').order('id');

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

app.post('/setores', async (req, res) => {
  const { data, error } = await supabase.from('setores').insert([req.body]).select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

app.put('/setores/:id', async (req, res) => {
  const { data, error } = await supabase.from('setores').update(req.body).eq('id', req.params.id).select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

app.delete('/setores/:id', async (req, res) => {
  const { data, error } = await supabase.from('setores').delete().eq('id', req.params.id).select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

// ROTAS DE EQUIPAMENTOS
app.get('/equipamentos', async (req, res) => {
  const { data, error } = await supabase.from('equipamentos').select('*').order('id');

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

app.post('/equipamentos', async (req, res) => {
  const { data, error } = await supabase.from('equipamentos').insert([req.body]).select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

app.put('/equipamentos/:id', async (req, res) => {
  const { data, error } = await supabase.from('equipamentos').update(req.body).eq('id', req.params.id).select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

app.delete('/equipamentos/:id', async (req, res) => {
  const { data, error } = await supabase.from('equipamentos').delete().eq('id', req.params.id).select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

// ROTAS DE FUNCIONÁRIOS
app.get('/funcionarios', async (req, res) => {
  const { data, error } = await supabase.from('funcionarios').select('*').order('id');

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

app.post('/funcionarios', async (req, res) => {
  const { data, error } = await supabase.from('funcionarios').insert([req.body]).select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

app.put('/funcionarios/:id', async (req, res) => {
  const { data, error } = await supabase.from('funcionarios').update(req.body).eq('id', req.params.id).select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

app.delete('/funcionarios/:id', async (req, res) => {
  const { data, error } = await supabase.from('funcionarios').delete().eq('id', req.params.id).select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

// ROTAS DE SERVIÇOS
app.get('/servicos', async (req, res) => {
  const { data, error } = await supabase.from('servicos').select('*').order('id');

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

app.post('/servicos', async (req, res) => {
  const { data, error } = await supabase.from('servicos').insert([req.body]).select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

app.put('/servicos/:id', async (req, res) => {
  const { data, error } = await supabase.from('servicos').update(req.body).eq('id', req.params.id).select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

app.delete('/servicos/:id', async (req, res) => {
  const { data, error } = await supabase.from('servicos').delete().eq('id', req.params.id).select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

app.listen(porta, () => {
  console.log('Servidor rodando na porta ' + porta);
});
