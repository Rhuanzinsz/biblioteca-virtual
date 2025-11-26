require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectDB = require("./config/database")

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Conectar ao MongoDB
connectDB()

// Rotas
app.use("/api/auth", require("./routes/auth"))
app.use("/api/books", require("./routes/books"))
app.use("/api/users", require("./routes/users"))

// Rota de teste
app.get("/", (req, res) => {
  res.json({ message: "API da Biblioteca Virtual funcionando!" })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
