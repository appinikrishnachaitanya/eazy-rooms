const express = require("express");
const router = express.Router();
const roomModel = require("../models/room");
const bookingModel = require("../models/book");

router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await roomModel.find({});
    return res.json(rooms);
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});

router.get("/getroombyid", async (req, res) => {
  try {
    console.log(req.params.id);
    const data = await roomModel.find({ _id: req.query.id });
    return res.send(data);
  } catch (err) {
    return res.status(404).send(err);
  }
});

router.post("/createroom", async (req, res) => {});

router.delete("/deleteroom", async (req, res) => {
  const roomid = req.body.roomid;
  try {
    const data = await roomModel.find({ _id: roomid });
    console.log(data);
    if (data.length == 0) {
      return res.status(404).send("room not found");
    }
    await roomModel.deleteOne({ _id: roomid });
    await bookingModel.updateMany({ roomid: roomid }, { status: "CANCELLED" });
    return res.status(204).send("Room deleted successfully");
  } catch (err) {
    return res.status(404).send(err);
  }
});
module.exports = router;
