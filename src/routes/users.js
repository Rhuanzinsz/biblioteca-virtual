const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { authMiddleware, adminMiddleware } = require("../middleware/auth")

// Obter perfil do usuário logado
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password")
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar perfil.", error: error.message })
  }
})

// Listar todos os usuários (somente admin)
router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password")
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários.", error: error.message })
  }
})

// Atualizar usuário (somente admin)
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, email, role } = req.body

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true, runValidators: true },
    ).select("-password")

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." })
    }

    res.json({
      message: "Usuário atualizado com sucesso!",
      user,
    })
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar usuário.", error: error.message })
  }
})

// Deletar usuário (somente admin)
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." })
    }

    res.json({ message: "Usuário deletado com sucesso!" })
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar usuário.", error: error.message })
  }
})

module.exports = router
