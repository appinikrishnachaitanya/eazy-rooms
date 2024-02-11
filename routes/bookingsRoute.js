const express = require("express");
const router = express.Router();
const bookingModel = require("../models/book");
const roomModel = require("../models/room");
router.post("/bookroom", async (req, res) => {
  try {
    const {
      roomname,
      roomid,
      name,
      userid,
      fromdate,
      todate,
      rentperday,
      totalamount,
      totaldays,
    } = req.body;

    const newbooking = new bookingModel({
      roomname: roomname,
      roomid: roomid,
      userid: userid,
      name: name,
      fromdate: fromdate,
      todate: todate,
      rentperday: rentperday,
      totalamount: totalamount,
      totaldays: totaldays,
      transactionid: "2345",
    });
    //console.log(newbooking);
    const data = await newbooking.save();
    console.log(data);
    const roomdata = await roomModel.findOne({ _id: roomid });
    console.log(roomdata);
    if (roomdata == null) {
      return res.status(404).json({ message: "Room not found" });
    } else {
      roomdata.currentbookings.push({
        bookingid: data._id,
        fromdate: data.fromdate,
        todate: data.todate,
        userid: userid,
        status: data.status,
      });
      await roomdata.save();
    }

    return res.status(201).json({ message: "Booking Successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

router.post("/cancelroom", async (req, res) => {
  const bookingid = req.body.bookingid;
  try {
    let data = bookingModel.findOne({ _id: bookingid });
    if (data== null) {
      return res.status(404).send("booking  not found");
    }
    await bookingModel.updateOne({ _id: bookingid }, { status: "cancelled" });
    return res.status(204).send("Booking cancelled successfully");
  } catch (err) {
    return res.status(204).send(err.message);
  }
});

router.get("/bookings", async (req, res) => {
  const userId = req.body.userid;
  console.log(userId);
  try {
    let bookings = await bookingModel.find({ userid: userId });
    console.log(bookings);
    return res.status(200).json(bookings);
  } catch (err) {
    return res.status(404).json({ message: "bookings  not found" });
  }
});

module.exports = router;
