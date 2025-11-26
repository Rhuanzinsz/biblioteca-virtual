const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

// Registrar novo usuário
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // Verificar se usuário já existe
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "Email já cadastrado." })
    }

    // Hash da senha
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Criar novo usuário
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    })

    await user.save()

    // Gerar token JWT
    const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })

    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Erro ao registrar usuário.", error: error.message })
  }
})

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Verificar se usuário existe
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Email ou senha inválidos." })
    }

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ message: "Email ou senha inválidos." })
    }

    // Gerar token JWT
    const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })

    res.json({
      message: "Login realizado com sucesso!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Erro ao realizar login.", error: error.message })
  }
})

module.exports = router
