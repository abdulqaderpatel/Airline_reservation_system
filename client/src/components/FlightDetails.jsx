import React from "react";
import airlinelogo from "../assets/airline.png";
import { useNavigate } from "react-router-dom";
function FlightDetails(props) {
  const navigate = useNavigate();
  return (
    <div style={{ width: "42rem" }}>
      <div
        onClick={() => {
          navigate(`/book/${props._id}`);
        }}
        className="card-body d-flex justify-content-around align-items-center "
      >
        <img src={airlinelogo} height={30} />

        <div className="d-flex flex-column align-items-center">
          <p>
            {new Date(props.start_time).toLocaleTimeString("en", {
              timeStyle: "short",
              hour12: false,
              timeZone: "UTC",
            })}
          </p>
          <p>{props.source}</p>
        </div>
        <div className="d-flex flex-column  align-items-start">
          <h3>{props.airline}</h3>
          <h5>{props.date}</h5>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-start">
          <p>
            {new Date(props.end_time).toLocaleTimeString("en", {
              timeStyle: "short",
              hour12: false,
              timeZone: "UTC",
            })}
          </p>
          <p>{props.destination}</p>
        </div>
        <button
          type="button"
          class="btn btn-primary"
        >{`$${props.price}`}</button>
      </div>
    </div>
  );
}

export default FlightDetails;
