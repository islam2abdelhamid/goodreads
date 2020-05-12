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
    cover: {
      type: String,
      required: false,
      trim: true,
    },
    rate: {
      type: mongoose.Decimal128,
      required: false,
    },
    reviews: [
      {
        rate: Number,
        comment: String,
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
      {
        timestamps: true,
      },
    ],
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

// bookSchema.methods.rate = async function (user, rate, comment) {
//   // if (rate > 5 || rate < 0) throw Error('invalid rate value');
//   // const book = this;
//   // if(book.)
//   // try {
//   // }
// };

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
