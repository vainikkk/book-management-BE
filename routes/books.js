var express = require("express");
var router = express.Router();
let Books = require("../models/books.js");
let upload = require("../middleware/upload");
let fs = require("fs");
const { Console } = require("console");
/* GET users listing. */
router.get("/", function (req, res, next) {
  Books.find().exec((err, books) => {
    if (err) {
      res.status(500).json({ message: "Internal server Error" });
    } else {
      res.json(books);
    }
  });
});

router.delete("/", function (req, res, next) {
  let id = req.query.id;
  Books.findByIdAndRemove(id, (err, books) => {
    if (err) {
      res.status(500).json({ message: "Internal server Error" });
    } else {
      res.json(`Successfully Deleted`);
    }
  });
});

router.put("/", upload.single("image"), (req, res) => {
  let id = req.query.id;
  let updatedValue;
  if (req.file) {
    var image = fs.readFileSync(req.file.path);
    var encode_image = image.toString("base64");
    updatedValue = { ...req.body, image: new Buffer(encode_image, "base64") };
  } else {
    updatedValue = { ...req.body };
  }
  Books.findByIdAndUpdate(id, updatedValue, (error, book) => {
    if (error) {
      res.status(500).json({ message: "Internal server Error" });
    } else {
      res.json("Successfully Updated");
    }
  });
});

router.post("/", upload.single("image"), (req, res, next) => {
  var image = fs.readFileSync(req.file.path);
  var encode_image = image.toString("base64");

  let books = Books({
    ...req.body,
    image: new Buffer(encode_image, "base64"),
  });
  books.save((error) => {
    console.log(error);
    if (error) {
      res.status(500).json({ message: "Internal server Error" });
    } else {
      res.json({ message: "Data Saved successfully" });
    }
  });
});

module.exports = router;
