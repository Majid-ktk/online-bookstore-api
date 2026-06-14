// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const bookRoutes = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 5000;


// ===========================
// MIDDLEWARE: Parse JSON body
// ===========================

app.use(express.json());


// ===========================
// MIDDLEWARE: Request Logger
// Logs every incoming request with method, endpoint, and time
// ===========================

app.use(function (req, res, next) {
  var now = new Date().toLocaleString();
  console.log('[' + now + '] ' + req.method + ' ' + req.originalUrl);
  next();
});


// ===========================
// ROUTES
// ===========================

app.get('/', function (req, res) {
  res.status(200).json({
    message: 'Welcome to the Online Bookstore API',
    endpoints: {
      getAllBooks: 'GET /api/books',
      getBookById: 'GET /api/books/:id',
      addBook: 'POST /api/books',
      updateBook: 'PUT /api/books/:id',
      deleteBook: 'DELETE /api/books/:id',
      searchBooks: 'GET /api/books?author=xyz&genre=abc',
      pagination: 'GET /api/books?page=1&limit=5'
    }
  });
});

// Book routes
app.use('/api/books', bookRoutes);


// ===========================
// GLOBAL ERROR HANDLER
// Catches invalid routes (404) and any unhandled errors
// ===========================

// Invalid route handler
app.use(function (req, res) {
  res.status(404).json({
    success: false,
    message: 'Route not found. Check the endpoint and try again.'
  });
});

// General error handler
app.use(function (err, req, res, next) {
  console.error('Server Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});


// ===========================
// CONNECT TO MONGODB & START SERVER
// ===========================

mongoose.connect(process.env.MONGO_URI)
  .then(function () {
    console.log('Connected to MongoDB successfully');
    app.listen(PORT, function () {
      console.log('Server is running on http://localhost:' + PORT);
    });
  })
  .catch(function (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });
