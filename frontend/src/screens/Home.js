import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Input } from "antd";
import { Select, Space } from "antd";
const { RangePicker } = DatePicker;

const Home = () => {
  //const [data, setdata] = useState([]);

  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [isError, setIsError] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEnddate] = useState();

  function getStartAndEndDates(dates) {
    if (dates != null && dates.length === 2) {
      console.log(dates);
      console.log(dates[1]);
      const startDate = dayjs(dates[0]).format("DD-MM-YYYY");
      const endDate = dayjs(dates[1]).format("DD-MM-YYYY");
      setStartDate(startDate);
      setEnddate(endDate);
    }
  }

  function filterByType() {
    console.log(data);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = (
          await axios.get("http://localhost:8080/api/rooms/getallrooms")
        ).data;
        setdata(data);
        setIsLoading(false);
      } catch (err) {
        setIsError(true);

        console.log(err);
        setIsLoading(false);
      }
    };

    fetchData(); // Invoke the async function here
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center bs">
        <div className="col-md-3">
          <RangePicker onChange={getStartAndEndDates} />
        </div>
        <div className="col-md-2">
          <Input placeholder="Search Rooms" />
        </div>
        <div className="col-md-2">
          <Select
            defaultValue="ALL"
            style={{
              width: 120,
            }}
            onChange={filterByType}
            options={[
              {
                value: "ALL",
                label: "ALL",
              },
              {
                value: "DELUX",
                label: "DELUX",
              },
              {
                value: "NON-DELUX",
                label: "NON-DELUX",
              },
            ]}
          />
        </div>
      </div>
      <div className="row justify-content-center">
        {isLoading ? (
          <Loader></Loader>
        ) : isError ? (
          <Error></Error>
        ) : (
          data.map((room) => {
            return (
              <div className="col-md-9 mt-2">
                <Room
                  room={room}
                  startDate={startDate}
                  endDate={endDate}
                ></Room>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
