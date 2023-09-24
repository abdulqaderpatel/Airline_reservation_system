import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import worldmap from "../assets/worldmap.jpeg";
import airline from "../assets/airline.png";
function Receipt() {
  const id = useParams();
  const [details, setDetails] = useState({});
  const [isLoading,setIsLoading]=useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/book/receipt/${id.id}`)
      .then(async (Response) => {
        await setDetails(Response.data);
        setIsLoading(false);
        console.log(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container-fluid d-flex flex-column align-items-center mt-3 ">
      <div style={{ width: "80rem" }}>
        <div className="card flex-column justify-content-center p-2 mb-3">
          <image src={airline} className="img-fluid" />
          <div className="d-flex flex-row justify-content-center">
            <h1>Your Reciept</h1>
          </div>

         
            
          <div className="d-flex flex-row justify-content-around mt-2 mb-2">
          <h2 className="text-primary">Airline name: {details.airline}</h2>
         
            <h3 className="text-primary">Flight no: {details._id}</h3>
          </div>

          <div className="d-flex flex-row justify-content-center">
            <h3 className="text-info">From {details.source} to {details.destination}</h3>
          </div>

          <h3 className="d-flex flex-row justify-content-center text-danger mb-3">
            Passengers
          </h3>
          {isLoading?<div></div>:details.passengers.map((e,index)=>{
            return <div className="container-sm mb-1">
                <div className="row ">
                    <h5 className="text-secondary col">Passenger {index+1}</h5>
                    <h5 className="text-secondary col">Age</h5>
                    <h5 className="text-secondary col">Class</h5>                   
                </div>
                <div className="row">
                    <h2 className="col">{e.name}</h2>
                    <h2 className="col">{e.age}</h2>
                    <h2 className="col">{details.type==0?"Economy":details.type=="100"?"Business":"First class"}</h2>
                </div>
                </div>
          })}
          <div className="d-flex flex-row justify-content-evenly mt-2 mb-2">
            <h3 className="text-info">Flight date: {details.date}</h3>
            <h3 className="text-info">Timings: {new Date(details.start_time).toLocaleTimeString("en", {
                timeStyle: "short",
                hour12: false,
                timeZone: "UTC",
              })} to {new Date(details.end_time).toLocaleTimeString("en", {
                timeStyle: "short",
                hour12: false,
                timeZone: "UTC",
              })}</h3>
          </div>
           
       <div className="container payment-color d-flex flex-column ">
        <div className="d-flex flex-row justify-content-center align-items-center">
        <h4 className="text-secondary">Payment Summary</h4>
        </div>
       
            <div className="d-flex flex-row justify-content-between">
                <p className="text-dark">Base Fare</p>
                <p className="text-dark">{details.price-parseInt(details.type)-(details.isFood?100:0)}</p>
            </div>
            <div className="d-flex flex-row justify-content-between">
                <p className="text-dark">Flight Upgrade</p>
                <p className="text-dark">{parseInt(details.type)}</p>
            </div>
            <div className="d-flex flex-row justify-content-between">
                <p className="text-dark">Food and Drinks</p>
                <p className="text-dark">{details.isFood?100:0}</p>
            </div>

            <div className="d-flex flex-row justify-content-between">
                <h3 className="text-dark font-weight-bold">Total</h3>
                <h3 className="text-dark font-weight-bold">{details.price}</h3>
            </div>
       </div>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
