const { Router } = require('express');

const adminAuth = require('../middleware/adminAuth');
const userAuth = require('../middleware/userAuth');
const Author = require('../models/Author');
const Book = require('../models/Book');

const router = new Router();

router.get('', userAuth, async (req, res, next) => {
    try {
        user = req.user;
        console.log(user.books);
        if (user.books.length) {
            allBooks = user.books.filter({});
            readingBooks = user.books.filter(b => b.status == 0);
            readBooks = user.books.filter(b => b.status == 1);
            wantReadBooks = user.books.filter(b => b.status == 2);
            books = {
                "allBooks": allBooks,
                "readingBooks": readingBooks,
                "readBooks": readBooks,
                "wantReadBooks": wantReadBooks
            }
            res.status(200).json(books);
        }

        res.status(200).json("empty");


    } catch (error) {
        next(error)
    }
});





router.get('/search', userAuth, async (req, res, next) => {
    text = req.query.text;
    if (typeof req.query.text !== 'undefined') {
        books = Book.findOne({ "username": /.*text.*/ });
        author = Author.findOne({ "name": /.*text.*/ });
        for (b in books) {
            books += b.books;
        }
        res.status(200).json(books);


    } else {
        res.redirect('/')
    }
});



module.exports = router;
