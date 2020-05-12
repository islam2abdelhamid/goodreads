const { Router } = require('express');

const Book = require('../models/Book');
const User = require('../models/User');
const userAuth = require('../middleware/userAuth');
const adminAuth = require('../middleware/adminAuth');

const router = new Router();

// Normal CRUD operations //
router.get('/', userAuth, async (req, res, next) => {
  try {
    const pagination = req.query.pagination
      ? parseInt(req.query.pagination)
      : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    books = await Book.find({})
      .skip((page - 1) * pagination)
      .limit(pagination);
    // .populate('category')
    // .populate('author')
    // .populate('reviews');
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
});

//Get Popular Books
router.get('/top_books', async (req, res, next) => {
  try {
    book = await Book.find({}).sort({ rate: -1 }).limit(5);
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', userAuth, async (req, res, next) => {
  try {
    book = await Book.findById(req.params.id)
      .populate('category')
      .populate('author');
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
});

router.post('/', adminAuth, async (req, res, next) => {
  let { body } = req;
  let book = new Book(body);
  try {
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', adminAuth, async (req, res, next) => {
  let { body } = req;
  try {
    let book = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: body },
      { new: true }
    );
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', adminAuth, async (req, res, next) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).send('Book has been deleted successfully');
    next();
  } catch (error) {
    next(error);
  }
});

// reviews end points //

// create review //
router.post('/:id', userAuth, async (req, res, next) => {
  let {
    body: { rate, comment },
  } = req;
  let review = { rate, comment, userId: req.user.id };
  try {
    user = req.user;
    book = await Book.findById(req.params.id);
    userBook = user.books.filter((b) => b.id == book.id);
    if (userBook.status != 1) {
      res.status(403).send("You can't review the book unless you read it!");
      return;
    }
    book.reviews.push(review);
    await book.save();
    user.reviews.push(review);
    await user.save();
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
});

// change book status //
router.patch('/:id/change-status', userAuth, async (req, res, next) => {
  let {
    body: { status },
  } = req;
  try {
    User.findOne({ _id: req.user.id }).then((doc) => {
      book = doc.books.id({ bookId: req.params.id });
      if (book) {
        book['status'] = status;
      } else {
        doc.books.push({ bookId: req.params.id, status });
      }
      doc.save();
    });
    res.status(200).send('book status has been changed successfully');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
