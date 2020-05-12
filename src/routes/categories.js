const { Router } = require('express');

const adminAuth = require('../middleware/adminAuth');
const userAuth = require('../middleware/userAuth');
const Category = require('../models/Category');
const router = new Router();

router.get('', userAuth, async (req, res, next) => {
  try {
    const pagination = req.query.pagination
      ? parseInt(req.query.pagination)
      : 15;

    const page = req.query.page ? parseInt(req.query.page) : 1;
    cat = await Category.find({})
      .skip((page - 1) * pagination)
      .limit(pagination);

    res.status(200).json(cat);
  } catch (error) {
    next(error);
  }
});

//Get Popular Categories
router.get('/top_categories', (req, res, next) => {
  try {
    Category.find({})
      .populate('books')
      .limit(5)
      .exec(function (err, docs) {
        docs.sort(function compare(a, b) {
          let c = 0;
          if (a.books.rate > b.books.rate) {
            c = 1;
          } else if (b.books.rate > a.books.rate) {
            c = -1;
          }
          return c;
        });
        // return or response with docs
        if (err) return res.send(err);
        res.status(200).json(docs);
      });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', userAuth, async (req, res, next) => {
  try {
    cat = await Category.findById(req.params.id).populate('books');
    res.status(200).json(cat);
  } catch (error) {
    next(error);
  }
});

router.post('/', adminAuth, async (req, res, next) => {
  let {
    body: { name },
  } = req;
  let cat = new Category({ name });

  try {
    await cat.save();
    res.status(201).json(cat);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', adminAuth, async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).send('category has been deleted successfully');
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
