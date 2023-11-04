const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  title: String,
  ratings: Number,
  date: {
    type: Date,
    default: Date,
    required: true,
  },
  notes: String,
});
module.exports = new mongoose.model("booksCollection", bookSchema);
