# Exemplos de Uso da API

## Testando com cURL

### 1. Registrar um novo usuário

\`\`\`bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Silva",
    "email": "maria@email.com",
    "password": "senha123"
  }'
\`\`\`

### 2. Fazer Login

\`\`\`bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@email.com",
    "password": "senha123"
  }'
\`\`\`

Copie o token retornado para usar nas próximas requisições.

### 3. Criar um Livro

\`\`\`bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "title": "1984",
    "author": "George Orwell",
    "isbn": "9780451524935",
    "publisher": "Signet Classic",
    "publishedYear": 1949,
    "category": "Distopia",
    "description": "Um clássico sobre vigilância totalitária",
    "quantity": 3
  }'
\`\`\`

### 4. Listar Todos os Livros

\`\`\`bash
curl http://localhost:3000/api/books
\`\`\`

### 5. Buscar Livros por Categoria

\`\`\`bash
curl "http://localhost:3000/api/books?category=Distopia"
\`\`\`

### 6. Buscar Livros por Texto

\`\`\`bash
curl "http://localhost:3000/api/books?search=orwell"
\`\`\`

### 7. Atualizar um Livro

\`\`\`bash
curl -X PUT http://localhost:3000/api/books/BOOK_ID_AQUI \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "quantity": 5,
    "available": true
  }'
\`\`\`

### 8. Deletar um Livro

\`\`\`bash
curl -X DELETE http://localhost:3000/api/books/BOOK_ID_AQUI \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
\`\`\`

### 9. Obter Perfil do Usuário

\`\`\`bash
curl http://localhost:3000/api/users/me \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
\`\`\`

## Testando com Postman ou Insomnia

1. Importe a collection (arquivo JSON) ou crie manualmente as requisições
2. Configure uma variável de ambiente para o `baseURL`: `http://localhost:3000`
3. Após o login, salve o token em uma variável de ambiente chamada `token`
4. Use `{{token}}` no header Authorization

## Respostas de Sucesso

### Registro/Login
\`\`\`json
{
  "message": "Login realizado com sucesso!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65f1234567890abcdef12345",
    "name": "Maria Silva",
    "email": "maria@email.com",
    "role": "user"
  }
}
\`\`\`

### Livro Criado
\`\`\`json
{
  "message": "Livro criado com sucesso!",
  "book": {
    "_id": "65f1234567890abcdef12346",
    "title": "1984",
    "author": "George Orwell",
    "isbn": "9780451524935",
    "quantity": 3,
    "available": true,
    "createdAt": "2024-03-15T10:30:00.000Z"
  }
}
\`\`\`

## Códigos de Status HTTP

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Requisição inválida
- `401` - Não autenticado
- `403` - Sem permissão
- `404` - Recurso não encontrado
- `500` - Erro interno do servidor
