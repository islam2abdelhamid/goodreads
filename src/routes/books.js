const express = require("express");
const BookModel = require("../models/Book");

const router = express.Router();

router.get("/all", (req, res) => {
  BookModel.find({}, (err, books) => {
    if (err) return res.send(err);
    res.json(books);
  });
});

router.get("/:id", (req, res) => {
  BookModel.findById(req.params.id, (err, books) => {
    if (err) return res.send(err);
    res.json(books);
  });
});

module.exports = router;
