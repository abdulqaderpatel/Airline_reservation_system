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
  const [form, setForm] = useState([{}]);

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
    const totalForms=[];
    if (isFood) {
      setTotalPrice(participants * details.price + parseInt(type) + 100);
    } else {
      setTotalPrice(participants * details.price + parseInt(type));
    }
    for (var i = 1; i <= parseInt(participants); i++) {

      user.push(i);
      totalForms.push({name:"",age:""});
    }
    setUsers(user);
    setForm(totalForms)
    console.log(form)
    console.log(users);
  }, [participants, type, isFood]);

  function participantsChange(evt) {
    setParticipants(evt.target.value);
    console.log(participants);
  }

  function handleChange(evt)
  {
    const value=evt.target.value;
    setForm([{...form,[evt.target.name]:value}])
    console.log(form)
  }

  const completeBooking = () => {
    
 
    axios.post("http://localhost:3001/book/add/", {
      "user":userDetails._id,
      "airline":details.airline,
      "source":details.source,
      "destination":details.destination,
      "price":totalPrice,
      "date":details.date,
      "start_time":details.start_time,
      "end_time":details.end_time,
      "type":type,
      "isFood":isFood,
      "participants":participants,
      "booking_date":Date.now().toString()
    }).then((Response) => {
      alert("Flight successfully booked")
    });
  };
  return (
    <div className="container-fluid">
      <div class="row gx-lg-5 align-items-center">
        <div class="">
          <div class="d-flex flex-row mb-3">
            <h5 class="ls-tight mr-3">Select the number of tickets needed</h5>
            <br />
            <select
              className="ml-3"
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
          <div class="row">
            {users.map((e) => {
              return (
                <div class="d-flex flex-column" style={{ maxWidth: "180px" }}>
                  <h4>Person {e}</h4>
                  <label>Name</label>
                  <input 

                  />
                  <label>Age</label>
                  <input />
                </div>
              );
            })}
          </div>
          <div className="row">
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
              <label for="vehicle1"> Economy</label>
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
              <label for="radio">Business</label>
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
              <label for="vehicle3">First Class</label>
            </div>
          </div>
          <h2 className="mt-2">Extras</h2>
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
      <h2>Total costs: {totalPrice}</h2>
      <div className="btn btn-primary" onClick={completeBooking}>
        Pay
      </div>
 
    </div>
  );
}

export default BookFlight;
