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
    function getBooksWithStatus(getBooks, allUserBooks) {
      for (var i = 0; i < getBooks.length; i++) {
        books.push({ book: getBooks[i], status: allUserBooks[i].status });
      }
    }

    getBooksWithStatus(getBooks, allUserBooks);
    // console.log(newBooks);

    res.status(200).json({ books: books, type: "All Books" });
  } catch (error) {
    next(error);
  }
});

router.get('/reading-books', userAuth, async (req, res, next) => {
  try {

    user = req.user;

    allBooksIDs = await user.books.filter((b) => b.status == 0).map((b) => b.bookId);
    getBooks = await Book.find({ "_id": { "$in": allBooksIDs } }).populate('author').sort();
    allUserBooks = await req.user.books.sort((a, b) => (a.bookId > b.bookId) ? 1 : -1)

    books = []
    function getBooksWithStatus(getBooks, allUserBooks) {
      for (var i = 0; i < getBooks.length; i++) {
        books.push({ book: getBooks[i], status: allUserBooks[i].status });
      }
    }

    getBooksWithStatus(getBooks, allUserBooks);
    // console.log(books);

    res.status(200).json({ books: books, type: "Currently Reading" });
  } catch (error) {
    next(error);
  }

});

router.get('/read-books', userAuth, async (req, res, next) => {
  try {

    user = req.user;

    allBooksIDs = await user.books.filter((b) => b.status == 1).map((b) => b.bookId);
    getBooks = await Book.find({ "_id": { "$in": allBooksIDs } }).populate('author').sort();
    allUserBooks = await req.user.books.sort((a, b) => (a.bookId > b.bookId) ? 1 : -1)

    books = []
    function getBooksWithStatus(getBooks, allUserBooks) {
      for (var i = 0; i < getBooks.length; i++) {
        books.push({ book: getBooks[i], status: allUserBooks[i].status });
      }
    }

    getBooksWithStatus(getBooks, allUserBooks);
    // console.log(books);

    res.status(200).json({ books: books, type: "Read" });
  } catch (error) {
    next(error);
  }
});

router.get('/want-to-read', userAuth, async (req, res, next) => {
  try {

    user = req.user;

    allBooksIDs = await user.books.filter((b) => b.status == 2).map((b) => b.bookId);
    getBooks = await Book.find({ "_id": { "$in": allBooksIDs } }).populate('author').sort();
    allUserBooks = await req.user.books.sort((a, b) => (a.bookId > b.bookId) ? 1 : -1)

    books = []
    function getBooksWithStatus(getBooks, allUserBooks) {
      for (var i = 0; i < getBooks.length; i++) {
        books.push({ book: getBooks[i], status: allUserBooks[i].status });
      }
    }

    getBooksWithStatus(getBooks, allUserBooks);
    // console.log(books);

    res.status(200).json({ books: books, type: "Want To Read" });
  } catch (error) {
    next(error);
  }
});

router.get('/search', userAuth, async (req, res, next) => {
  text = req.query.q;
  //  console.log("search word" + text);

  if (typeof text != 'undefined') {
    try {
      books = await Book.find({}).populate('author');
      //  for (b in books) {
      //   console.log(books[b].name.includes(text)+"   "+text+" "+books[b].name)
      // }
      books = await books.filter((b) => b.name.includes(text) == true);

      // books = []
      author = await Author.find({}).populate('books');

      // console.log("author" + author);

      for (au in author) {
        for (b in author[au].books) {
          if (books.indexOf(author[au].books[b]) < 0 &&
            (author[au].firstName.includes(text) == true ||
              author[au].lastName.includes(text) == true)
          ) {
            // console.log("here");
            books.push(await Book.findOne({ _id: author[au].books[b]._id }).populate('author'));
          }
        }
      }

      // console.log("books" + books);

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
