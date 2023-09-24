import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Booking() {
  const [details, setDetails] = useState([]);
  const [localStorageData, setLocalStorageData] = useState({});
  const userDetails = JSON.parse(localStorage.getItem("user"));
  const navigate=useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/book/user/bookings/${userDetails._id}`)
      .then(async (Response) => {
        await setDetails(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function removeTime(date = new Date()) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
  }

  return (
    <div className="container-fluid d-flex flex-column align-items-center mt-3 ">
      {details.map((e) => {
        return (
          <div style={{ width: "52rem" }} onClick={(()=>{
                navigate(`/receipts/${e._id}`)
          })}>
            <div className="card flex-column justify-content-center p-2 mb-3">
              <div className="d-flex flex-row justify-content-center">
                <h3>{e.source} to {e.destination}</h3>
              </div>
              <div className="d-flex flex-row justify-content-center mt-2 mb-2">
                Flight date: {e.date}
              </div>
              <div className="d-flex flex-row justify-content-evenly mb-2">
                <div>
                Timings:  
                 { new Date(e.start_time).toLocaleTimeString("en", {
                  timeStyle: "short",
                  hour12: false,
                  timeZone: "UTC",
                })} to  {new Date(e.end_time).toLocaleTimeString("en", {
                  timeStyle: "short",
                  hour12: false,
                  timeZone: "UTC",
                })}
                </div>
                <div>class: {e.type==0?"Economy":e.type=="100"?"Business":"First class"}</div>
              </div>
              <div class=" row justify-content-center">Booking Date: {Date(e.booking_date.getFullYear)} </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Booking;
