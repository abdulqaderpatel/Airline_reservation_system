const mongoose = require("mongoose");

const flightSchema = mongoose.Schema({
  airline: {
    type: String,
  },
  source:{
    type:String,
  },
  destination:{
    type:String,
  },
  price:{
    type:Number,
  },
  date:{
    type:String,
  },
  start_time:{
    type:String,
  },
  end_time:{
    type:String,
  },
 

  
});

const Flight=mongoose.model("Flight",flightSchema);
module.exports=Flight