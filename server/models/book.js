const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  user:{
    type:String
  },
  airline: {
    type: String,
  },
  source: {
    type: String,
  },
  destination: {
    type: String,
  },
  price: {
    type: Number,
  },
  date: {
    type: String,
  },
  start_time: {
    type: String,
  },
  end_time: {
    type: String,
  },
  type: {
    type: String,
  },
  isFood: {
    type: Boolean,
  },
  participants: {
    type: Number,
  },
  booking_date: {
    type: String,
  },

});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
