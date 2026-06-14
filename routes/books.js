const express = require('express');
const router = express.Router();
const Book = require('../models/Book');


// ===========================
// GET /api/books
// Get all books with optional search and pagination
// Example: /api/books?author=Orwell&genre=Fiction&page=1&limit=5
// ===========================

router.get('/', async function (req, res) {
  try {
    var filter = {};

    // Search by author if provided in query
    if (req.query.author) {
      filter.author = { $regex: req.query.author, $options: 'i' };
    }

    // Search by genre if provided in query
    if (req.query.genre) {
      filter.genre = { $regex: req.query.genre, $options: 'i' };
    }

    // Pagination
    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 10;
    var skip = (page - 1) * limit;

    var books = await Book.find(filter).skip(skip).limit(limit);
    var total = await Book.countDocuments(filter);

    res.status(200).json({
      success: true,
      total: total,
      page: page,
      limit: limit,
      totalPages: Math.ceil(total / limit),
      data: books
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// ===========================
// GET /api/books/:id
// Get a single book by ID
// ===========================

router.get('/:id', async function (req, res) {
  try {
    var book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    res.status(200).json({ success: true, data: book });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Invalid ID or server error' });
  }
});


// ===========================
// POST /api/books
// Add a new book
// ===========================

router.post('/', async function (req, res) {
  try {
    var title = req.body.title;
    var author = req.body.author;
    var price = req.body.price;

    // Manual validation for required fields
    if (!title || !author || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Title, author, and price are required fields'
      });
    }

    var newBook = new Book({
      title: title,
      author: author,
      genre: req.body.genre,
      price: price,
      publishedDate: req.body.publishedDate,
      inStock: req.body.inStock
    });

    var savedBook = await newBook.save();

    res.status(201).json({ success: true, message: 'Book added successfully', data: savedBook });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});


// ===========================
// PUT /api/books/:id
// Update a book by ID
// ===========================

router.put('/:id', async function (req, res) {
  try {
    var title = req.body.title;
    var author = req.body.author;
    var price = req.body.price;

    // Validate required fields
    if (!title || !author || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Title, author, and price are required fields'
      });
    }

    var updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: title,
        author: author,
        genre: req.body.genre,
        price: price,
        publishedDate: req.body.publishedDate,
        inStock: req.body.inStock
      },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    res.status(200).json({ success: true, message: 'Book updated successfully', data: updatedBook });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});


// ===========================
// DELETE /api/books/:id
// Delete a book by ID
// ===========================

router.delete('/:id', async function (req, res) {
  try {
    var deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    res.status(200).json({ success: true, message: 'Book deleted successfully' });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


module.exports = router;
