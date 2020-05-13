const mongoose = require('mongoose');
const Category = require('./Category');
const Author = require('./Author');
const Review = require('./Review');

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

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
