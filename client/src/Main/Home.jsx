import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";
import FlightDetails from "../components/FlightDetails";

function Home() {
  const [startDate, setStartDate] = useState(new Date());
  const [source, setSource] = useState("Mumbai");
  const [destination, setDestination] = useState("Delhi");
  const [flights, setFlights] = useState([]);
  const [search, setSearch] = useState(false);
  const [priceFilter, setPriceFilter] = useState("10000");
  const [filteredFlights, setFilteredFlights] = useState([]);
  

  //actual functionality

  useEffect(() => {
    axios
      .get("http://localhost:3001/flight/data")
      .then(async (Response) => {
        await setFlights(Response.data);
        console.log(setFlights);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setFilteredFlights(
      flights.filter((e) => {
        return (
          e.price < parseInt(priceFilter) &&
          e.date == startDate.toISOString().split("T")[0] &&
          e.source == source &&
          e.destination == destination
        );
      })
    );
    console.log(filteredFlights);
  }, [priceFilter, startDate,source,destination]);

  function SearchFlights() {
    event.preventDefault();
  }

  //form functilnality

  function sourceChange(evt) {
    setSource(evt.target.value);
    console.log(source)
    console.log(destination)
  }

  function destinationChange(evt) {
    setDestination(evt.target.value);
  }

  const priceChange = (evt) => {
    setPriceFilter(evt.target.value);
  };

  return (
    <div>
      <br></br>
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <div className="d-flex flex-row">
          <form onSubmit={SearchFlights} className="p-3" style={{width:"500px"}}>
            <div class="form-outline d-flex flex-row justify-content-between mb-3">
              <label class="form-label" for="form3Example1">
                Source
              </label>
              <select onChange={sourceChange}>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Jodhpur">Jodhpur</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Lucknow">Lucknow</option>
                <option value="Surat">Surat</option>
              </select>
            </div>

            <div class="form-outline d-flex flex-row justify-content-between mb-3">
              <label class="form-label" for="form3Example1">
                Destination
              </label>
              <select onChange={destinationChange}>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Jodhpur">Jodhpur</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Lucknow">Lucknow</option>
                <option value="Surat">Surat</option>
              </select>
            </div>

            
            <div class="form-outline mb-4 d-flex flex-row justify-content-between">
            <label>Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  console.log(date.toISOString());
                  console.log(date.toISOString().split("T")[0]);
                }}
              />
            </div>
            <div className="form-outline mb-3 d-flex flex-row justify-content-between">
              <label>Price range</label>
              <select onChange={priceChange}>
                <option value="1000">Any</option>
                <option value="200">Under 200</option>
                <option value="400">Under 400</option>
                <option value="600">Under 600</option>
              </select>
            </div>

            <button
              onClick={() => {
                setFilteredFlights(
                  flights.filter((e) => {
                    return (
                      e.price < parseInt(priceFilter) &&
                      e.date == startDate.toISOString().split("T")[0] &&
                      e.source == source &&
                      e.destination == destination
                    );
                  })
                );
                setSearch(true);
              }}
              className="btn btn-primary btn-block mb-4"
            >
              Search flights
            </button>

            <div class="text-center"></div>
          </form>
        </div>
        {search ? (
          filteredFlights.map((e) => {
            return (
              <FlightDetails
                price={e.price}
                date={e.date}
                start_time={e.start_time}
                end_time={e.end_time}
                airline={e.airline}
                source={e.source}
                destination={e.destination}
                _id={e._id}
              />
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Home;
