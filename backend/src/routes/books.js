const express = require("express")
const router = express.Router()
const Book = require("../models/Book")
const { authMiddleware, adminMiddleware } = require("../middleware/auth")

// Listar todos os livros (público)
router.get("/", async (req, res) => {
  try {
    const { category, author, search } = req.query
    const query = {}

    if (category) query.category = category
    if (author) query.author = new RegExp(author, "i")
    if (search) {
      query.$or = [
        { title: new RegExp(search, "i") },
        { author: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
      ]
    }

    const books = await Book.find(query).populate("createdBy", "name email")
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar livros.", error: error.message })
  }
})

// Buscar livro por ID (público)
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("createdBy", "name email")

    if (!book) {
      return res.status(404).json({ message: "Livro não encontrado." })
    }

    res.json(book)
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar livro.", error: error.message })
  }
})

// Criar novo livro (requer autenticação)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const bookData = {
      ...req.body,
      createdBy: req.user.userId,
    }

    const book = new Book(bookData)
    await book.save()

    res.status(201).json({
      message: "Livro criado com sucesso!",
      book,
    })
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar livro.", error: error.message })
  }
})

// Atualizar livro (requer autenticação)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)

    if (!book) {
      return res.status(404).json({ message: "Livro não encontrado." })
    }

    // Verificar se o usuário é o criador ou admin
    if (book.createdBy.toString() !== req.user.userId && req.user.role !== "admin") {
      return res.status(403).json({ message: "Sem permissão para atualizar este livro." })
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true },
    )

    res.json({
      message: "Livro atualizado com sucesso!",
      book: updatedBook,
    })
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar livro.", error: error.message })
  }
})

// Deletar livro (requer autenticação)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)

    if (!book) {
      return res.status(404).json({ message: "Livro não encontrado." })
    }

    // Verificar se o usuário é o criador ou admin
    if (book.createdBy.toString() !== req.user.userId && req.user.role !== "admin") {
      return res.status(403).json({ message: "Sem permissão para deletar este livro." })
    }

    await Book.findByIdAndDelete(req.params.id)

    res.json({ message: "Livro deletado com sucesso!" })
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar livro.", error: error.message })
  }
})

module.exports = router
