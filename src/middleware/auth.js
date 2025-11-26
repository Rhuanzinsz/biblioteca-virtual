const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
  try {
    // Obter token do header
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return res.status(401).json({ message: "Acesso negado. Token não fornecido." })
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ message: "Token inválido." })
  }
}

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Acesso negado. Apenas administradores." })
  }
  next()
}

module.exports = { authMiddleware, adminMiddleware }
