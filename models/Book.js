const mongoose = require('mongoose');

// Book Schema - defines the structure of a book document in MongoDB
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Book title is required']
    },

    author: {
      type: String,
      required: [true, 'Author name is required']
    },

    genre: {
      type: String
    },

    price: {
      type: Number,
      required: [true, 'Price is required']
    },

    publishedDate: {
      type: Date
    },

    inStock: {
      type: Boolean,
      default: true
    }
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true
  }
);

module.exports = mongoose.model('Book', bookSchema);
