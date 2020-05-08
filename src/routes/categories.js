const { Router } = require('express');

const adminAuth = require('../middleware/adminAuth');
const userAuth = require('../middleware/userAuth');
const Category = require('../models/Category')
const router = new Router();


router.get('', userAuth, async (req, res, next)=>{
    try {
        cat = await Category.find({});
        res.status(200).json(cat);
    } catch (error) {
        next(error)
    }
});
router.get('/:id', userAuth, async (req, res, next)=>{
    try {
        cat = await Category.findById(req.params.id);
        res.status(200).json(cat);
    } catch (error) {
        next(error)
    }
});

router.post('/', adminAuth, async (req, res, next)=>{
    let { body: {name} } = req;
    let cat = new Category({name});
    
    try {
        await cat.save();
        res.status(201).json(cat);
    } catch (error) {
        next(error)
    }
});

router.delete('/:id', adminAuth, async (req, res, next)=>{
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).send("category has been deleted successfully");
        next();     
    } catch (error) {
        next(error);
    }   
});

module.exports = router;
