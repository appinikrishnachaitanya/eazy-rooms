const mongoose = require("mongoose");
const mongoURL = "mongodb://127.0.0.1:27017/eazyrooms";

mongoose.connect(mongoURL);

const connection = mongoose.connection;

connection.on("error", () => {
  console.log("Connection Failed");
});

connection.on("connected", () => {
  console.log("Connected to Mongodb");
});

module.exports = connection;
