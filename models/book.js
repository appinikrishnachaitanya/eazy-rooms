const mongoose = require("mongoose");
const bookingSchema = mongoose.Schema(
  {
    roomname: {
      type: String,
      required: true,
    },

    roomid: {
      type: String,
      required: true,
    },

    userid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    fromdate: {
      type: String,
      required: true,
    },

    todate: {
      type: String,
      required: true,
    },

    totaldays: {
      type: Number,
      required: true,
    },

    rentperday: {
      type: Number,
      required: true,
    },

    totalamount: {
      type: Number,
      required: true,
    },
    transactionid: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Booked",
    },
  },
  { timestamps: true }
);

const BookingModel = mongoose.model("bookings", bookingSchema);
module.exports = BookingModel;
