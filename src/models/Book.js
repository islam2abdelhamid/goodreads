const mongoose = require('mongoose');
const validator = require('validator');

const authorSchema = new mongoose.Schema(
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
      required: true,
      trim: true,
    },
    reviews: {
        
    }
  },
  {
    timestamps: true,
  }
);

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
