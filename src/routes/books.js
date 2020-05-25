const { Router } = require('express');

const { Book } = require('../models/Book');
const User = require('../models/User');
const { Review } = require('../models/Book');
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
      .limit(pagination)
      .populate({
        path: 'category',
        select: 'name',
      })
      .populate({
        path: 'author',
        select: 'firstName + lastName',
      });
    // .populate('reviews');
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
});

//Get Popular Books
router.get('/top_books', async (req, res, next) => {
  try {
    book = await Book.find({}).sort({ rate: -1 }).limit(5).populate('category');
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', userAuth, async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('category')
      .populate('author');
    if (!book) {
      res.status(404);
      throw new Error('Book not found');
    }
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
router.post('/:id/reviews', userAuth, async (req, res, next) => {
  let {
    body: { rate, comment },
  } = req;

  if (rate > 5 || rate < 0 || comment === '')
    return res.status(400).send({ message: 'invalid rate value or comment' });

  let review = await Review.findOne({
    userId: req.user.id,
    bookId: req.params.id,
  });

  if (!review) {
    const userBook = req.user.books.find(book => {
      return String(book.bookId) === String(req.params.id);
    });

    if (!userBook || userBook.status !== 1)
      return res
        .status(403)
        .send("You can't review the book unless you read it!");

    review = new Review({
      userId: req.user.id,
      bookId: req.params.id,
      comment,
      rate,
    });
  } else {
    review.rate = rate;
    review.comment = comment;
  }
  await review.save();
  res.send();
});

router.get('/:id/reviews', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    const reviews = await book.getReviews();
    res.send(reviews);
  } catch (error) {
    res.status(404).send();
  }
});
// change book status //
router.patch('/:id/change-status', userAuth, async (req, res, next) => {
  const book = req.user.books.find(book => {
    return String(book.bookId) === String(req.params.id);
  });

  // console.log("boo3kss"+book);
  // console.log("status   "+ req.body.status);

  if (!book) {
    req.user.books.push({
      bookId: req.params.id,
      status: req.body.status,
    });
  } else if (book.status !== req.body.status) {
    book.status = req.body.status;
  } else {
    return res
      .status(200)
      .send({ message: `book status is already ${req.body.status}` });
  }
  try {
    await req.user.save();
    return res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
