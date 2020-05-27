const mongoose = require('mongoose');
const validator = require('validator');

const authorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      validate(value) {
        if (!validator.isAlpha(value))
          throw new Error('first name should contains only letters');
      },
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      validate(value) {
        if (!validator.isAlpha(value))
          throw new Error('last name should contains only letters');
      },
    },
    avatar: {
      type: String,
      required: false,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
  },
  {
    timestamps: true,
  }
);

authorSchema.post("remove", document => {
  const { Book } = require('./Book');
  const authorId = document._id;
  Book.find({ author: authorId}).then(books => {
    Promise.all(books.map(b => b.remove()));
  });
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
