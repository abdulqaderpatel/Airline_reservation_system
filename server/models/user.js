const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    required: true,
    type: String,
    trim: true,
    validate: {
      validator: (value) => {
        const re =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return value.match(re);
      },
      message: "Please enter a valid email message",
    },
  },
  password: {
    required: true,
    type: String,
    validate: {
        validator: (value) => {
        
         
          return value.length>=6
        },
        message: "Password shoudl be of atleast 6 characters",
      },
  },
  name: {
    type: String,
    default: "",
  },
});

const User=mongoose.model("User",userSchema);
module.exports=User