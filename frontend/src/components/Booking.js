import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const Booking = ({ room, startDate, endDate }) => {
  const [daysdiff, setDaysDiff] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const navigation = useNavigate();
  console.log(startDate, endDate);

  useEffect(() => {
    const daysDiff = dayjs(endDate, "DD-MM-YYYY").diff(
      dayjs(startDate, "DD-MM-YYYY"),
      "days"
    );
    setDaysDiff(daysDiff);

    let totalAmount = room.rentperday * parseInt(daysDiff);
    setTotalAmount(totalAmount);
  }, [startDate, endDate, room.rentperday]);

  const { name, id } = JSON.parse(localStorage.getItem("currentUser"));
  async function bookRoom() {
    try {
      const booking = {
        roomname: room.name,
        roomid: room._id,
        name: name,
        userid: id,
        fromdate: startDate,
        todate: endDate,
        rentperday: room.rentperday,
        totalamount: totalAmount,
        totaldays: daysdiff,
      };
      console.log(booking);

      let data = await axios.post(
        "http://localhost:8080/api/booking/bookroom",
        booking
      );
      if (data.status === 201) {
        toast.success(data.data.message);
        navigation("/");
      }
    } catch (err) {
      if (err.response && err.response.status === 500) {
        // User already exists, display the error message
        toast.error(err.response.data.message);
      } else {
        // Handle other errors if needed
        console.error("Error during axios request");
      }
    }
  }

  return (
    <div>
      <div className="row bs">
        <div className="col-md-6">
          <p>{room.name}</p>
          <img src={room.imageurls[0]} alt="dataImage" className="small-img" />
        </div>

        <div className="col-md-5" style={{ textAlign: "left !important" }}>
          <p>Booking Details</p>
          <hr></hr>
          <p>Name:{name}</p>
          <p>From Date : {startDate}</p>
          <p>To Date : {endDate}</p>
          <p>Max Count : {room.maxcount}</p>

          <div>
            <p>Amount</p>
            <hr></hr>
            <p>
              Total Days : <p>{daysdiff}</p>
            </p>
            <p>Rent per day :{room.rentperday}</p>
            <p>TotalAmount : {totalAmount} </p>
          </div>
          <div>
            <button className="btn btn-dark" onClick={bookRoom}>
              PayNow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
