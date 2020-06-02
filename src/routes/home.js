const { Router } = require('express');

const adminAuth = require('../middleware/adminAuth');
const userAuth = require('../middleware/userAuth');
const Author = require('../models/Author');
const { Book } = require('../models/Book');

const router = new Router();

router.get('', userAuth, async (req, res, next) => {
  try {

    user = req.user;

    userBooks = await user.books.map((b) => b = {id: b.bookId, status: b.status, rate:b.rate} ).sort((a, b) => (a.id> b.id) ? 1 : -1)
    allBooksIDs = await user.books.map((b) => b.bookId);
    getBooks = await Book.find({ "_id": { "$in": allBooksIDs } }).populate('author').sort();

    books = []
    function getBooksWithStatus(getBooks, userBooks) {
      for (var i = 0; i < getBooks.length; i++) {
        books.push({ book: getBooks[i], status: userBooks[i].status, rate:userBooks[i].rate });
      }
    }

    getBooksWithStatus(getBooks, userBooks);

    res.status(200).json({ books: books, type: "Read" });
  } catch (error) {
    next(error);
  }
  

});

router.get('/Currently', userAuth, async (req, res, next) => {
  try {

    user = req.user;

    userBooks = await user.books.filter((b) => b.status == 0).map((b) => b = {id: b.bookId, status: b.status, rate:b.rate} ).sort((a, b) => (a.id> b.id) ? 1 : -1)
    allBooksIDs = await user.books.filter((b) => b.status == 0).map((b) => b.bookId);
    getBooks = await Book.find({ "_id": { "$in": allBooksIDs } }).populate('author').sort();

    books = []
    function getBooksWithStatus(getBooks, userBooks) {
      for (var i = 0; i < getBooks.length; i++) {
        books.push({ book: getBooks[i], status: userBooks[i].status, rate:userBooks[i].rate });
      }
    }

    getBooksWithStatus(getBooks, userBooks);

    res.status(200).json({ books: books, type: "Read" });
  } catch (error) {
    next(error);
  }
  



});

router.get('/Read', userAuth, async (req, res, next) => {
  try {

    user = req.user;

    userBooks = await user.books.filter((b) => b.status == 1).map((b) => b = {id: b.bookId, status: b.status, rate:b.rate} ).sort((a, b) => (a.id> b.id) ? 1 : -1)
    allBooksIDs = await user.books.filter((b) => b.status == 1).map((b) => b.bookId);
    getBooks = await Book.find({ "_id": { "$in": allBooksIDs } }).populate('author').sort();

    books = []
    function getBooksWithStatus(getBooks, userBooks) {
      for (var i = 0; i < getBooks.length; i++) {
        books.push({ book: getBooks[i], status: userBooks[i].status, rate:userBooks[i].rate });
      }
    }

    getBooksWithStatus(getBooks, userBooks);

    res.status(200).json({ books: books, type: "Read" });
  } catch (error) {
    next(error);
  }
});

router.get('/Want', userAuth, async (req, res, next) => {
  try {

    user = req.user;

    userBooks = await user.books.filter((b) => b.status == 2).map((b) => b = {id: b.bookId, status: b.status, rate:b.rate} ).sort((a, b) => (a.id> b.id) ? 1 : -1)
    allBooksIDs = await user.books.filter((b) => b.status == 2).map((b) => b.bookId);
    getBooks = await Book.find({ "_id": { "$in": allBooksIDs } }).populate('author').sort();

    books = []
    function getBooksWithStatus(getBooks, userBooks) {
      for (var i = 0; i < getBooks.length; i++) {
        books.push({ book: getBooks[i], status: userBooks[i].status, rate: userBooks[i].rate });
      }
    }

    getBooksWithStatus(getBooks, userBooks);

    res.status(200).json({ books: books, type: "Read" });
  } catch (error) {
    next(error);
  }
  
  
});

router.get('/search', userAuth, async (req, res, next) => {
  text = req.query.q;

  if (typeof text != 'undefined') {
    try {
      books = await Book.find({}).populate('author');
      books = await books.filter((b) => b.name.includes(text) == true);

      author = await Author.find({}).populate('books');

      for (au in author) {
        for (b in author[au].books) {
          if (books.indexOf(author[au].books[b]) < 0 &&
            (author[au].firstName.includes(text) == true ||
              author[au].lastName.includes(text) == true)
          ) {
            books.push(await Book.findOne({ _id: author[au].books[b]._id }).populate('author'));
          }
        }
      }

      res.status(200).json({ books });
    }
    catch (error) {
      next(error);

    }
  } else {
    res.redirect('/');
  }
});

module.exports = router;
