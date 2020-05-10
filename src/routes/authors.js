const { Router } = require('express');

const adminAuth = require('../middleware/adminAuth');
const userAuth = require('../middleware/userAuth');
const Author = require('../models/Author');

const router = new Router();

router.get('', userAuth, async (req, res, next)=>{
    try {
        author = await Author.find({});
        res.status(200).json(author);
    } catch (error) {
        next(error)
    }
});

//Get Popular Authors
router.get('/top_authors', (req, res, next)=>{
    try {
        Author.find({}).populate('books').limit(5).exec(function(err, docs) {
            docs.sort(function compare(a, b){
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

router.get('/:id', userAuth, async (req, res, next)=>{
    try {
        author = await Author.findById(req.params.id);
        res.status(200).json(author);
    } catch (error) {
        next(error)
    }
});

router.post('/', adminAuth, async (req, res, next)=>{
    let { body } = req;
    let author = new Author(body);
    try {
        await author.save();
        res.status(201).json(author);
    } catch (error) {
        next(error)
    }
});

router.patch('/:id', adminAuth, async (req, res, next)=>{
    let { body } = req;
    try {
        let author = await Author.findByIdAndUpdate(req.params.id, {$set: body}, {new: true});
        res.status(200).json(author);
    } catch (error) {
        next(error)
    }
});

router.delete('/:id', adminAuth, async (req, res, next)=>{
    try {
        await Author.findByIdAndDelete(req.params.id);
        res.status(200).send("Author has been deleted successfully");
        next();     
    } catch (error) {
        next(error);
    }   
});

module.exports = router;
