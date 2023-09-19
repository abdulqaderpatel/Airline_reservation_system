const express = require("express");

const Book = require("../models/book");

const bookRouter = express.Router();


bookRouter.get("/data/:id", async (req, res) => {
  const id = req.params.id;
  const flight = await Flight.findOne({ _id: id });
  console.log("Hello");
  res.json(flight);
});

bookRouter.get("/user/bookings/:id",async(req,res)=>{
  const id=req.params.id;
  const book=await Book.find({user:id})
  res.json(book)
})

bookRouter.post("/add", async (req, res) => {
  try {
    const {user,airline, source, destination, start_time, end_time, price, date,type,isFood,participants,booking_date} =
      req.body;
    var book = new Book({
      user,
      airline,
      source,
      destination,
      start_time,
      end_time,
      price,
      date,
      type,
      isFood,
      participants,
      booking_date
    });
    await book.save();
    res.json(book);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = bookRouter;
