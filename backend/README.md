# Biblioteca Virtual - API Backend

API RESTful para gerenciamento de biblioteca virtual com autenticação JWT e operações CRUD completas.

## 🚀 Funcionalidades

- ✅ Autenticação JWT (Login/Registro)
- ✅ CRUD completo de Livros
- ✅ Gerenciamento de Usuários
- ✅ Controle de permissões (user/admin)
- ✅ Busca e filtros de livros

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- MongoDB
- npm ou yarn

## 🔧 Instalação

1. Entre na pasta backend:
\`\`\`bash
cd backend
\`\`\`

2. Instale as dependências:
\`\`\`bash
npm install
\`\`\`

3. Configure o arquivo `.env` com suas credenciais do MongoDB e JWT_SECRET

4. Inicie o servidor:
\`\`\`bash
npm run dev
\`\`\`

## 📚 Endpoints da API

### Autenticação

#### Registrar Usuário
\`\`\`http
POST /api/auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "role": "user"
}
\`\`\`

#### Login
\`\`\`http
POST /api/auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "password": "senha123"
}
\`\`\`

### Livros

#### Listar Todos os Livros
\`\`\`http
GET /api/books
GET /api/books?category=Romance
GET /api/books?search=harry potter
\`\`\`

#### Buscar Livro por ID
\`\`\`http
GET /api/books/:id
\`\`\`

#### Criar Livro (requer autenticação)
\`\`\`http
POST /api/books
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Harry Potter e a Pedra Filosofal",
  "author": "J.K. Rowling",
  "isbn": "9788532530787",
  "publisher": "Rocco",
  "publishedYear": 2000,
  "category": "Fantasia",
  "description": "O primeiro livro da série Harry Potter",
  "quantity": 5
}
\`\`\`

#### Atualizar Livro (requer autenticação)
\`\`\`http
PUT /api/books/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "quantity": 10,
  "available": true
}
\`\`\`

#### Deletar Livro (requer autenticação)
\`\`\`http
DELETE /api/books/:id
Authorization: Bearer {token}
\`\`\`

### Usuários

#### Obter Perfil do Usuário Logado
\`\`\`http
GET /api/users/me
Authorization: Bearer {token}
\`\`\`

#### Listar Todos os Usuários (somente admin)
\`\`\`http
GET /api/users
Authorization: Bearer {token}
\`\`\`

#### Atualizar Usuário (somente admin)
\`\`\`http
PUT /api/users/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Novo Nome",
  "role": "admin"
}
\`\`\`

#### Deletar Usuário (somente admin)
\`\`\`http
DELETE /api/users/:id
Authorization: Bearer {token}
\`\`\`

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Após o login ou registro, você receberá um token que deve ser incluído no header Authorization de todas as requisições protegidas:

\`\`\`
Authorization: Bearer {seu-token-jwt}
\`\`\`

## 👥 Roles de Usuário

- **user**: Pode criar, editar e deletar seus próprios livros
- **admin**: Pode gerenciar todos os livros e usuários

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- CORS
- dotenv

## 📝 Estrutura do Projeto

\`\`\`
backend/
├── src/
│   ├── config/
│   │   └── database.js       # Configuração do MongoDB
│   ├── middleware/
│   │   └── auth.js            # Middlewares de autenticação
│   ├── models/
│   │   ├── User.js            # Schema do usuário
│   │   └── Book.js            # Schema do livro
│   ├── routes/
│   │   ├── auth.js            # Rotas de autenticação
│   │   ├── books.js           # Rotas de livros
│   │   └── users.js           # Rotas de usuários
│   └── server.js              # Arquivo principal
├── .env                       # Variáveis de ambiente
├── package.json
└── README.md
\`\`\`

## 📝 Licença

ISC
