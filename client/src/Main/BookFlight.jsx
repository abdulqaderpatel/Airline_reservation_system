import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BookFlight() {
  const id = useParams();
  const [details, setDetails] = useState({});
  const [participants, setParticipants] = useState(1);
  const [users, setUsers] = useState([1]);
  const [totalPrice, setTotalPrice] = useState(details.price);
  const [type, setType] = useState(0);
  const [isFood, setIsFood] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem("user"));
  const [passenger, setPassenger] = useState({ name: "", age: "" });
  const [form, setForm] = useState([{}]);
  const [detailsTracker, setDetailsTracker] = useState(1);
  const [familyDetails,setFamilyDetails]=useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/flight/data/${id.id}`)
      .then(async (Response) => {
        await setDetails(Response.data);

        console.log(details.price);
        setTotalPrice(details.price);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setUsers([]);
    const user = [];
    const totalForms = [];
    if (isFood) {
      setTotalPrice(participants * details.price + parseInt(type) + 100);
    } else {
      setTotalPrice(participants * details.price + parseInt(type));
    }
    for (var i = 1; i <= parseInt(participants); i++) {
      user.push(i);
      totalForms.push({ name: "", age: "" });
    }
    setUsers(user);
    setForm(totalForms);
    console.log(form);
    console.log(users);
  }, [participants, type, isFood]);

  useEffect(()=>{
    setDetailsTracker(1);
    setFamilyDetails([])
   
  },[participants])

  function participantsChange(evt) {
    setParticipants(evt.target.value);
    console.log(participants);
  }

  function handleChange(evt) {
    const value = evt.target.value;
    setPassenger({ ...passenger, [evt.target.name]: value });
    console.log(passenger);
  }

  const completeBooking = () => {
    axios
      .post("http://localhost:3001/book/add/", {
        user: userDetails._id,
        airline: details.airline,
        source: details.source,
        destination: details.destination,
        price: totalPrice,
        date: details.date,
        start_time: details.start_time,
        end_time: details.end_time,
        type: type,
        isFood: isFood,
        participants: participants,
        booking_date: Date.now().toString(),
        passengers:familyDetails
      })
      .then((Response) => {
        alert("Flight successfully booked");
      });
  };
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center ">
      <div class="row gx-lg-5 align-items-center">
        <div class="">
          <div class="d-flex flex-row mb-3">
            <h5 class="ls-tight mr-3">Select the number of tickets needed</h5>
            <br />
            <select
              className="ms-3"
              style={{ maxHeight: "50px" }}
              onChange={participantsChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
          { detailsTracker<=participants?
          <div class="row mb-2">
            <div class="d-flex flex-column justify-content-center align-items-center" style={{   }}>
              <h4>Person {detailsTracker} details</h4>
              <label>Name</label>
              <input value={passenger.name} name="name" onChange={handleChange} />
              <label>Age</label>
              <input value={passenger.age} name="age" onChange={handleChange} />
              <button
                class={
                  detailsTracker > participants
                    ? "btn btn-danger mt-2"
                    : "btn btn-primary mt-2"
                }
                onClick={() => {
                  if (detailsTracker <= participants) {
                    setDetailsTracker(detailsTracker + 1);
                   setFamilyDetails([...familyDetails,passenger])
                    setPassenger({"name":"","age":""});
                    console.log(familyDetails)
                  }
                }}
              >
                {detailsTracker <= participants
                  ? "Ok"
                  : "Details filled successfully"}
              </button>
            </div>
          </div>:<div className="d-flex flex-row justify-content-center align-items-center"><button class="btn btn-danger ">Details Filled successfully</button></div>
          }
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h3 className="mt-2">Flight type:</h3>
            <div>
              <input
                type="radio"
                name="class"
                value="0"
                onChange={() => {
                  setType(event.target.value);
                  console.log(type);
                }}
              />
              <label className="ms-1" for="vehicle1"> Economy</label>
            </div>
            <div>
              <input
                type="radio"
                name="class"
                value="100"
                onChange={() => {
                  setType(event.target.value);
                  console.log(type);
                }}
              />
              <label className="ms-2" for="radio">Business</label>
            </div>
            <div>
              <input
                type="radio"
                name="class"
                value="200"
                onChange={() => {
                  setType(event.target.value);
                  console.log(type);
                }}
              />
              <label className="ms-1" for="vehicle3">First Class</label>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center mb-3">
          <h2 className="mt-2">Extras</h2>
          <div>
          <input
            type="checkbox"
            value="100"
            name="food"
            checked={isFood}
            onChange={() => {
              setIsFood(!isFood);
            }}
          />{" "}
          Food (extra 100)
          </div>
          </div>
         
         
        </div>
      </div>
      <h2 className="mb-2">Total costs: {totalPrice}</h2>
      <div className="btn btn-primary" onClick={completeBooking}>
        Pay
      </div>
    </div>
  );
}

export default BookFlight;
