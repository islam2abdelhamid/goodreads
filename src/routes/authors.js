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
