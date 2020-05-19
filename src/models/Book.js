const mongoose = require('mongoose');
const Category = require('./Category');
const Author = require('./Author');

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: true,
    },
    rate: Number,
    cover: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.post('save', async function () {
  const book = this;
  try {
    await Author.findByIdAndUpdate(book.author, {
      $push: { books: book.id },
    });

    await Category.findByIdAndUpdate(book.category, {
      $push: { books: book.id },
    });
  } catch (err) {
    throw new Error(err);
  }
});

bookSchema.methods.getReviews = async function () {
  const book = this;
  const reviews = await Review.find({ bookId: book._id });
  return reviews;
};

const reviewSchema = new mongoose.Schema(
  {
    rate: {
      type: Number,
      validate(value) {
        if (value < 0 || value > 5) throw new Error('invalid rate value');
      },
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.post('save', async function () {
  const review = this;
  try {
    const book = await Book.findById(review.bookId);

    const reviews = await book.getReviews();
    const totalRate = reviews.reduce((a, b) => a + (b['rate'] || 0), 0);
    book.rate = (totalRate / reviews.length).toFixed(1);
    await book.save();
  } catch (error) {
    throw new Error(error);
  }
});

const Review = mongoose.model('Review', reviewSchema);

const Book = mongoose.model('Book', bookSchema);

module.exports = { Book: Book, Review: Review };
