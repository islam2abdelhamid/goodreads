const { Router } = require('express');

const adminAuth = require('../middleware/adminAuth');
const userAuth = require('../middleware/userAuth');
const Author = require('../models/Author');
const {Book} = require('../models/Book');

const router = new Router();

router.get('', userAuth, async (req, res, next) => {
  try {
    user = req.user;
    allBooks = user.books;
    res.status(200).json(allBooks);
  } catch (error) {
    next(error);
  }
});

router.get('/reading-books', userAuth, async (req, res, next) => {
  try {
    user = req.user;
    readingBooks = user.books.filter((b) => b.status == 0);
    res.status(200).json(readingBooks);
  } catch (error) {
    next(error);
  }
});

router.get('/read-books', userAuth, async (req, res, next) => {
  try {
    user = req.user;
    readBooks = user.books.filter((b) => b.status == 1);    
    res.status(200).json(readBooks);
  } catch (error) {
    next(error);
  }
});

router.get('/want-to-read', userAuth, async (req, res, next) => {
  try {
    user = req.user;
    wantReadBooks = user.books.filter((b) => b.status == 2);
    res.status(200).json(wantReadBooks);
  } catch (error) {
    next(error);
  }
});

router.get('/search', userAuth, async (req, res, next) => {
  text = req.query.text;
  if (typeof req.query.text !== 'undefined') {
    books = Book.findOne({ username: /.*text.*/ });
    author = Author.findOne({ name: /.*text.*/ });
    for (b in books) {
      books += b.books;
    }
    res.status(200).json(books);
  } else {
    res.redirect('/');
  }
});

module.exports = router;
