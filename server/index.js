const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const userRouter = require("./routes/userRoute");
const flightRouter=require("./routes/flightRoute")
const bookRouter=require("./routes/bookingRoute")


const server = "127.0.0.1:27017";
const database = "airline_reservation";
//initialize server
const app = express();



//middlewares
app.use(express.json());
app.use(cors());
app.get(bodyparser.json());
app.use("/user", userRouter);
app.use("/flight",flightRouter)
app.use("/book",bookRouter)


//connections
mongoose
  .connect(`mongodb://${server}/${database}`)
  .then(() => {})
  .catch((e) => {
    console.log(e);
  });

app.listen(3001, () => {});
