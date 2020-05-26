const mongoose = require('mongoose');
const { Book } = require('../models/Book');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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

categorySchema.post('deleteOne', { document: true }, function (next) {
  console.log('removed');
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
