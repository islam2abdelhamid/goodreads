const mongoose = require('mongoose');
const validator = require('validator');

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
      required:false
    },
    reviews: [
      {
        rate: Number,
        comment: String,
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
      },
      {
        timestamps: true
      }
    ]
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
