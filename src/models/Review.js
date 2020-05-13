const mongoose = require('mongoose');

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

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
