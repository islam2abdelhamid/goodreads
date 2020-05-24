const { Router } = require('express');

const adminAuth = require('../middleware/adminAuth');
const userAuth = require('../middleware/userAuth');
const Author = require('../models/Author');
const { Book } = require('../models/Book');

const router = new Router();

router.get('', userAuth, async (req, res, next) => {
  try {
    
    user = req.user;
    
    allBooksIDs = await user.books.map((b) => b.bookId);
    getBooks = await Book.find({ "_id": { "$in": allBooksIDs } }).populate('author').sort();
    allUserBooks = await req.user.books.sort((a, b) => (a.bookId > b.bookId) ? 1 : -1)

    books = []
    function getBooksWithStatus(getBooks,allUserBooks) {
      for (var i = 0; i < getBooks.length; i++) {
        books.push( {book:getBooks[i],status:allUserBooks[i].status});
        }
    }

    getBooksWithStatus(getBooks,allUserBooks);
    // console.log(newBooks);

    res.status(200).json({books:books,type:"All Books"});
  } catch (error) {
    next(error);
  }
});

router.get('/reading-books', userAuth, async (req, res, next) => {
  try {
    
    user = req.user;
    
    allBooksIDs = await user.books.filter((b)=>b.status == 0).map((b) => b.bookId);
    getBooks = await Book.find({ "_id": { "$in": allBooksIDs } }).populate('author').sort();
    allUserBooks = await req.user.books.sort((a, b) => (a.bookId > b.bookId) ? 1 : -1)

    books = []
    function getBooksWithStatus(getBooks,allUserBooks) {
      for (var i = 0; i < getBooks.length; i++) {
        books.push( {book:getBooks[i],status:allUserBooks[i].status});
        }
    }

    getBooksWithStatus(getBooks,allUserBooks);
    // console.log(books);

    res.status(200).json({books:books,type:"Currently Reading"});
  } catch (error) {
    next(error);
  }

});

router.get('/read-books', userAuth, async (req, res, next) => {
  try {
    
    user = req.user;
    
    allBooksIDs = await user.books.filter((b)=>b.status == 1).map((b) => b.bookId);
    getBooks = await Book.find({ "_id": { "$in": allBooksIDs } }).populate('author').sort();
    allUserBooks = await req.user.books.sort((a, b) => (a.bookId > b.bookId) ? 1 : -1)

    books = []
    function getBooksWithStatus(getBooks,allUserBooks) {
      for (var i = 0; i < getBooks.length; i++) {
        books.push( {book:getBooks[i],status:allUserBooks[i].status});
        }
    }

    getBooksWithStatus(getBooks,allUserBooks);
    // console.log(books);

    res.status(200).json({books:books,type:"Read"});
  } catch (error) {
    next(error);
  }
});

router.get('/want-to-read', userAuth, async (req, res, next) => {
  try {
    
    user = req.user;
    
    allBooksIDs = await user.books.filter((b)=>b.status == 2).map((b) => b.bookId);
    getBooks = await Book.find({ "_id": { "$in": allBooksIDs } }).populate('author').sort();
    allUserBooks = await req.user.books.sort((a, b) => (a.bookId > b.bookId) ? 1 : -1)

    books = []
    function getBooksWithStatus(getBooks,allUserBooks) {
      for (var i = 0; i < getBooks.length; i++) {
        books.push( {book:getBooks[i],status:allUserBooks[i].status});
        }
    }

    getBooksWithStatus(getBooks,allUserBooks);
    // console.log(books);

    res.status(200).json({books:books,type:"Want To Read"});
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
