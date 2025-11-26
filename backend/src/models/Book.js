const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  isbn: {
    type: String,
    unique: true,
    sparse: true,
  },
  publisher: {
    type: String,
    trim: true,
  },
  publishedYear: {
    type: Number,
  },
  category: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 0,
  },
  available: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Book", bookSchema)
