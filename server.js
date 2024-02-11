const express = require("express");
const app = express();
const connect = require("./mongoose");
const roomRouter = require("./routes/roomsRoute");
const bookingRouter = require("./routes/bookingsRoute");
const userRouter = require("./routes/usersRoute");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use("/api/rooms", roomRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/users", userRouter);
app.get("/", (req, res) => {
  console.log("Hello world");
  res.send("<h1>Hello world</h1>");
});

app.listen("8080", (err) => {
  console.log(err);
});
