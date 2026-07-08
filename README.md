# Sistema Integrado da Mineradora

Sistema web simples para gerenciar informações básicas de uma mineradora. O projeto possui front-end em React com Vite, back-end em Node.js com Express e banco de dados no Supabase.

## Visão geral

O sistema permite cadastrar e consultar informações relacionadas a:

- Cidades
- Setores
- Equipamentos
- Funcionários
- Serviços

Também possui uma página Home com um resumo geral dos dados cadastrados no sistema.

A comunicação do sistema funciona desta forma:

```txt
Front-end React/Vite
        ↓
Back-end Node.js/Express
        ↓
Supabase
        ↓
Banco de dados
```

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- React
- Vite
- Node.js
- Express
- Supabase

## Funcionalidades

### Início

Página inicial do sistema, com uma apresentação simples do projeto.

### Home

Página de visão geral com os principais dados cadastrados, mostrando:

- Total de cidades
- Total de setores
- Total de funcionários
- Total de equipamentos
- Total de serviços
- Quantidade de serviços pendentes
- Quantidade de serviços em andamento
- Quantidade de serviços finalizados
- Quantidade de equipamentos disponíveis
- Quantidade de equipamentos em uso
- Quantidade de equipamentos em manutenção
- Tabela simples com os equipamentos cadastrados

### Cidades

Permite:

- Cadastrar cidade
- Listar cidades
- Editar cidade
- Excluir cidade
- Pesquisar cidade por nome
- Ver o total de cidades cadastradas

### Setores

Permite:

- Cadastrar setor
- Listar setores
- Editar setor
- Excluir setor
- Pesquisar setor por nome
- Ver o total de setores cadastrados

### Equipamentos

Permite:

- Cadastrar equipamento
- Selecionar um setor já cadastrado
- Informar o status do equipamento
- Listar equipamentos
- Editar equipamento
- Excluir equipamento
- Pesquisar equipamento por nome
- Ver o total de equipamentos cadastrados

Status disponíveis para equipamentos:

- Disponível
- Em uso
- Em manutenção

### Funcionários

Permite:

- Cadastrar funcionário
- Selecionar uma cidade já cadastrada
- Informar o cargo
- Listar funcionários
- Editar funcionário
- Excluir funcionário
- Pesquisar funcionário por nome
- Ver o total de funcionários cadastrados

### Serviços

Permite:

- Cadastrar serviço
- Selecionar equipamento já cadastrado
- Selecionar cidade já cadastrada
- Selecionar funcionário responsável
- Informar o status do serviço
- Listar serviços
- Editar serviço
- Excluir serviço
- Pesquisar serviço por descrição
- Ver o total de serviços cadastrados

Status disponíveis para serviços:

- Pendente
- Em andamento
- Finalizado

## Estrutura de pastas

```txt
sistema-mineradora-iniciante/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── supabaseClient.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── src/
│   ├── components/
│   │   └── Menu.jsx
│   ├── pages/
│   │   ├── Inicio.jsx
│   │   ├── Home.jsx
│   │   ├── Cidades.jsx
│   │   ├── Setores.jsx
│   │   ├── Equipamentos.jsx
│   │   ├── Funcionarios.jsx
│   │   └── Servicos.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── style.css
├── supabase/
│   ├── schema.sql
│   └── atualizacao.sql
├── .env.example
├── .gitignore
├── index.html
├── netlify.toml
├── package.json
└── README.md
```

## Explicação dos principais arquivos

### `src/App.jsx`

Controla qual página será exibida na tela. O projeto usa um controle simples de páginas com estado, sem React Router.

### `src/components/Menu.jsx`

Contém o menu de navegação do sistema.

### `src/pages/`

Contém as páginas do sistema:

- `Inicio.jsx`
- `Home.jsx`
- `Cidades.jsx`
- `Setores.jsx`
- `Equipamentos.jsx`
- `Funcionarios.jsx`
- `Servicos.jsx`

### `src/services/api.js`

Arquivo responsável por fazer as requisições do front-end para o back-end.

### `src/style.css`

Arquivo de estilos do sistema.

### `backend/src/server.js`

Arquivo principal do back-end. Nele ficam as rotas da API para cidades, setores, equipamentos, funcionários e serviços.

### `backend/src/config/supabaseClient.js`

Arquivo responsável por conectar o back-end ao Supabase.

### `supabase/schema.sql`

Script para criar o banco de dados do zero no Supabase.

### `supabase/atualizacao.sql`

Script para atualizar um banco já criado anteriormente.

## Configuração do banco de dados

1. Acesse o Supabase.
2. Crie um novo projeto.
3. Abra o SQL Editor.
4. Se for criar o banco do zero, execute o conteúdo do arquivo:

```txt
supabase/schema.sql
```

5. Se o banco antigo já existir e for apenas atualizar, execute o conteúdo do arquivo:

```txt
supabase/atualizacao.sql
```

As principais tabelas usadas são:

- `cidades`
- `setores`
- `equipamentos`
- `funcionarios`
- `servicos`

## Configuração do back-end

Entre na pasta do back-end:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Copie o arquivo:

```txt
backend/.env.example
```

Crie um novo arquivo chamado:

```txt
backend/.env
```

O conteúdo deve ficar parecido com este exemplo:

```env
PORT=3001
SUPABASE_URL=https://xxxxxxxx.supabase.co
SUPABASE_ANON_KEY=sua_chave_do_supabase
```

A URL e a chave do Supabase ficam na área de configurações do projeto, na parte de API.

Depois rode o back-end:

```bash
npm run dev
```

Se estiver funcionando, o terminal vai mostrar uma mensagem parecida com:

```txt
Servidor rodando na porta 3001
```

## Configuração do front-end

Na pasta principal do projeto, instale as dependências:

```bash
npm install
```

Copie o arquivo:

```txt
.env.example
```

Crie um novo arquivo chamado:

```txt
.env
```

O conteúdo deve ficar assim:

```env
VITE_API_URL=http://localhost:3001
```

Depois rode o front-end:

```bash
npm run dev
```

Normalmente o sistema abrirá em:

```txt
http://localhost:5173
```

## Como rodar o projeto

Para usar o sistema localmente, é necessário abrir dois terminais.

### Terminal 1: back-end

```bash
cd backend
npm run dev
```

### Terminal 2: front-end

```bash
npm run dev
```

Depois abra o endereço mostrado pelo Vite no navegador.

## Como usar o sistema

1. Abra o sistema no navegador.
2. Acesse a página `Cidades` e cadastre as cidades.
3. Acesse a página `Setores` e cadastre os setores.
4. Acesse a página `Equipamentos` e cadastre os equipamentos, selecionando o setor correspondente.
5. Acesse a página `Funcionários` e cadastre os funcionários, selecionando a cidade correspondente.
6. Acesse a página `Serviços` e cadastre os serviços, selecionando equipamento, cidade e responsável.
7. Acesse a página `Home` para visualizar o resumo geral dos dados cadastrados.

## Publicação do front-end no Netlify

Para gerar o projeto para publicação, rode:

```bash
npm run build
```

No Netlify, use as seguintes configurações:

```txt
Build command: npm run build
Publish directory: dist
```

Se o front-end for publicado no Netlify, a variável `VITE_API_URL` deve apontar para a URL pública do back-end.

Exemplo:

```env
VITE_API_URL=https://sua-api-publicada.com
```

## Publicação do back-end

O back-end Node.js precisa ficar rodando em um serviço que aceite aplicações Node.js, como Render, Railway ou outro servidor.

Na publicação do back-end, configure as variáveis:

```env
SUPABASE_URL=https://xxxxxxxx.supabase.co
SUPABASE_ANON_KEY=sua_chave_do_supabase
```

Depois de publicar o back-end, copie a URL gerada e coloque essa URL na variável `VITE_API_URL` do front-end.

## Observações importantes

- O arquivo `.env` não deve ser enviado para o GitHub.
- A pasta `node_modules` não deve ser enviada para o GitHub.
- Para recriar a pasta `node_modules`, basta rodar `npm install`.
- O front-end depende do back-end rodando para cadastrar, listar, editar e excluir dados.
- O back-end depende do Supabase configurado corretamente para salvar os dados.

## Comandos principais

### Front-end

```bash
npm install
npm run dev
npm run build
```

### Back-end

```bash
cd backend
npm install
npm run dev
```

## Resumo

Este projeto é um sistema simples para controle de uma mineradora, com páginas para gerenciar cidades, setores, equipamentos, funcionários e serviços. O sistema possui uma tela Home com visão geral dos dados e utiliza Supabase como banco de dados online.
