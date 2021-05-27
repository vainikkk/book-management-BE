let mongoose = require("mongoose");

let Books = mongoose.Schema(
  {
    title: String,
    author: String,
    category: String,
    description: String,
    price: Number,
    rating: Number,
    image: Object,
  },
  { collection: "books" }
);

module.exports = mongoose.model("Books", Books);
