const mongoose = require('mongoose');

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

categorySchema.post("remove", document => {
  const { Book } = require('./Book');
  const catId = document._id;
  Book.find({ category: catId}).then(books => {
    Promise.all(books.map(b => b.remove()));
  });
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
