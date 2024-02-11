import React from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const Room = ({ room, startDate, endDate }) => {
  // const firstImage = [...imageurls][0];
  const navigator = useNavigate();
  function NavigateBooking() {
    if (startDate != null && endDate != null) {
      navigator(`/booking/${room._id}/${startDate}/${endDate}`);
    } else {
      toast.error("Please Select Dates....");
    }
  }
  return (
    <div className="row bs">
      <div className="col-md-4">
        <img
          src={room.imageurls[0]}
          alt="roomimage"
          className="small-img"
        ></img>
      </div>

      <div className="col-md-7">
        <h1>{room.name}</h1>
        <p>Max Count : {room.maxcount}</p>
        <p>Phonenumber: {room.phonenumber}</p>
        <p>Roomtype : {room.type}</p>
        <div style={{ float: "right" }}>
          {/* <NavLink to={`/booking/${room._id}/${startDate}/${endDate}`}> */}
          <button className="btn btn-dark m-3" onClick={NavigateBooking}>
            Book Now
          </button>
          {/* </NavLink> */}

          <button
            className="btn btn-dark "
            data-bs-toggle="modal"
            data-bs-target={`#exampleModal${room._id}`}
          >
            View Details
          </button>
        </div>
      </div>

      <div
        className="modal fade"
        id={`exampleModal${room._id}`}
        tabIndex="-1"
        aria-labelledby={`exampleModalLabel${room._id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {room.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <div
                  id="carouselExampleFade"
                  className="carousel slide carousel-fade"
                >
                  <div className="carousel-inner">
                    {room.imageurls.map((url) => {
                      return (
                        <div className="carousel-item active">
                          <img src={url} className="d-block w-100" alt="..." />
                        </div>
                      );
                    })}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
              <div>{room.description}</div>
            </div>
            <div className="modal-footer  ">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
