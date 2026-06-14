# Online Bookstore Management API

A RESTful API for managing an online bookstore built with Node.js, Express, and MongoDB.

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- nodemon

## Project Structure

online-bookstore-api/
├── models/
│   └── Book.js
├── routes/
│   └── books.js
├── .env
├── server.js
└── package.json

## Installation

1. Clone the repository

git clone https://github.com/yourusername/online-bookstore-api

2. Install dependencies

npm install

3. Add your MongoDB URI in .env file

MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000

4. Run the server

npm run dev

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/books | Get all books |
| GET | /api/books/:id | Get single book by ID |
| POST | /api/books | Add a new book |
| PUT | /api/books/:id | Update a book by ID |
| DELETE | /api/books/:id | Delete a book by ID |

## Search and Filter

Search by author:
GET /api/books?author=Orwell

Search by genre:
GET /api/books?genre=Fiction

Both together:
GET /api/books?author=Orwell&genre=Fiction

## Pagination

GET /api/books?page=1&limit=5

## Book Schema

{
  "title": "string (required)",
  "author": "string (required)",
  "genre": "string",
  "price": "number (required)",
  "publishedDate": "date",
  "inStock": "boolean (default: true)"
}

## Sample Request Body (POST)

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "price": 15.99,
  "publishedDate": "1925-04-10",
  "inStock": true
}

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Server Error |

## Author

Abdul Majid
Registration No: 24PWBCS1258
BS Computer Science 3rd Semester
University of Engineering and Technology, Peshawar
CS-224 Web Technologies — Assignment No. 02
