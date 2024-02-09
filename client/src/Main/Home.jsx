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

  // Fetch flight data on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3001/flight/data")
      .then((response) => {
        setFlights(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Filter flights when price, date, source, or destination changes
  useEffect(() => {
    setFilteredFlights(
      flights.filter((flight) => {
        return (
          flight.price < parseInt(priceFilter) &&
          flight.date === startDate.toISOString().split("T")[0] &&
          flight.source === source &&
          flight.destination === destination
        );
      })
    );
  }, [priceFilter, startDate, source, destination]);

  // Handle form submission
  function handleSearchFlights(event) {
    event.preventDefault();
    setSearch(true);
  }

  // Handle source selection
  function handleSourceChange(event) {
    setSource(event.target.value);
  }

  // Handle destination selection
  function handleDestinationChange(event) {
    setDestination(event.target.value);
  }

  // Handle price filter change
  function handlePriceChange(event) {
    setPriceFilter(event.target.value);
  }

  return (
    <div className="container mt-5">
      <form
        onSubmit={handleSearchFlights}
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <div className="mb-3">
          <label htmlFor="source" className="form-label">
            Source
          </label>
          <select
            id="source"
            className="form-select"
            value={source}
            onChange={handleSourceChange}
          >
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Jodhpur">Jodhpur</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Lucknow">Lucknow</option>
            <option value="Surat">Surat</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="destination" className="form-label">
            Destination
          </label>
          <select
            id="destination"
            className="form-select"
            value={destination}
            onChange={handleDestinationChange}
          >
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Jodhpur">Jodhpur</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Lucknow">Lucknow</option>
            <option value="Surat">Surat</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price range
          </label>
          <select
            id="price"
            className="form-select"
            value={priceFilter}
            onChange={handlePriceChange}
          >
            <option value="1000">Any</option>
            <option value="200">Under 200</option>
            <option value="400">Under 400</option>
            <option value="600">Under 600</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Search flights
        </button>
      </form>

      {search && (
        <div>
          {filteredFlights.map((flight) => (
            <FlightDetails
              key={flight._id}
              price={flight.price}
              date={flight.date}
              start_time={flight.start_time}
              end_time={flight.end_time}
              airline={flight.airline}
              source={flight.source}
              destination={flight.destination}
              _id={flight._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
