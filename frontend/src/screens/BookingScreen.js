import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Booking from "../components/Booking";
import Loader from "../components/Loader";
import Error from "../components/Error";
const BookingScreen = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useState();
  const { id, startDate, endDate } = useParams();

  useEffect(() => {
    async function getRoomById() {
      try {
        setIsLoading(true);
        const data = (
          await axios.get(
            `http://localhost:8080/api/rooms/getroombyid/?id=${id}`
          )
        ).data;
        console.log(data);
        setData(data);
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
        setIsLoading(false);
        console.log(err);
      }
    }

    getRoomById();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader></Loader>
      ) : isError ? (
        <Error></Error>
      ) : (
        data.map((room) => {
          return (
            <Booking
              room={room}
              startDate={startDate}
              endDate={endDate}
            ></Booking>
          );
        })
      )}
    </div>
  );
};

export default BookingScreen;
