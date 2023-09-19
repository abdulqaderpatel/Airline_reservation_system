const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Flight = require("../models/flight");


const flightRouter = express.Router();

flightRouter.get("/data",async(req,res)=>{
  const flights=await Flight.find()
  res.json(flights)
})


flightRouter.get("/data/:id",async(req,res)=>{
  const id=req.params.id
  const flight=await Flight.findOne({_id:id})
  console.log("Hello")
  res.json(flight)
  })
  

flightRouter.post("/add", async (req, res) => {
  try {
   const {airline,source,destination,start_time,end_time,price,date}=req.body
var flight=new Flight({airline,source,destination,start_time,end_time,price,date})
await flight.save()
res.json(flight)
   

  
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});








module.exports = flightRouter;
