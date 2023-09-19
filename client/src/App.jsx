import { useEffect, useState } from "react";

import Login from "./Authentication/Login";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  Outlet,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./Main/Home";

import Signup from "./Authentication/Signup";
import airlinelogo from "./assets/airline.png";
import Booking from "./Main/Booking";
import BookFlight from "./Main/BookFlight";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => JSON.parse(localStorage.getItem("auth")) || false
  );





  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);
  


  return (
    <div>
      <BrowserRouter>
        {localStorage.getItem("user")!=null ? (
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <img src={airlinelogo} height={40} />

            <ul class="navbar-nav">
              <li>
                <Link to="/" element={<Home />}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/booking" element={<Booking />}>
                  Bookings
                </Link>
              </li>
            <Link to="/login" element={<Login/>} onClick={(()=>{
             localStorage.clear()
             useState()
              
            })}>
              Logout</Link>
            </ul>
          </nav>
        ) : (
          <div></div>
        )}
        <Routes>
          <Route
            path="/"
            element={<Home /> }
          ></Route>
             <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/booking" element={<Booking />}></Route>
          <Route path="/book/:id" element={<BookFlight />}>
            {" "}
          </Route>
          <Route path="/booking" element={<Booking />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
