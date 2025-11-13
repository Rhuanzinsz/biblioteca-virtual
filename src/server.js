// src/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Configura as variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurações básicas
app.use(cors()); // Libera acesso
app.use(express.json()); // JSON

//(só pra ver se funciona)
app.get('/', (req, res) => {
    res.send('Servidor da Biblioteca está rodando!');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});