import React, { useState } from 'react'
import airlinelogo from '../assets/airline.png'
import { useNavigate,Link } from "react-router-dom";
import Axios from 'axios';
import Home from '../Main/Home';

const Login=()=> {
    const navigate=useNavigate()

    

    const LoginUser=async()=>{
      event.preventDefault()
     let Response=await Axios.post("http://localhost:3001/user/api/signin/",{"email":form.email,"password":form.password})
        localStorage.setItem("user",JSON.stringify(Response.data))  
        localStorage.setItem("auth",true); 
       useState()
        console.log(Response.data)
        
 
     

    }

    const [form, setForm] = useState({email: "", password: "" });

    function handleChange(evt)
    {
      const value=evt.target.value;
      setForm({...form,[evt.target.name]:value})
      console.log(form)
    }
  return (
    <div>
        <section class="h-100 gradient-form" style={{backgroundColor: "#eee"}}>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-xl-10">
        <div class="card rounded-3 text-black">
          <div class="row g-0">
            <div class="col-lg-6">
              <div class="card-body p-md-5 mx-md-4">

                <div class="text-center">
                  <img src={airlinelogo}
                    style={{width: "185px"}}/>
                  <h4 class="mt-1 mb-5 pb-1">Indian Airlines</h4>
                </div>

                <form onSubmit={LoginUser}>
                  <p>Please login to your account</p>

                  <div class="form-outline mb-4">
                  <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          id="form3Example3"
                          class="form-control"
                        />
                    <label class="form-label" for="form2Example11">Username</label>
                  </div>

                  <div class="form-outline mb-4">
                  <input
                          type="password"
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          id="form3Example3"
                          class="form-control"
                        />
                    <label class="form-label" for="form2Example22">Password</label>
                  </div>

                  <div class="text-center pt-1 mb-5 pb-1">
                    <Link to="/" element={<Home/>} onClick={LoginUser}  >Log
                      in</Link>
                 
                  </div>

                  <div class="d-flex align-items-center justify-content-center pb-4">
                    <p class="mb-0 me-2">Don't have an account?</p>
                    <button type="button" class="btn btn-outline-danger" onClick={()=>{
                        navigate("/signup")
                    }}>Create new</button>
                  </div>

                </form>

              </div>
            </div>
            <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
              <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 class="mb-4">We are more than just a company</h4>
                <p class="small mb-0">Air India provides the best airline service in the world. Our website provides a 
                seamless and easy way for users to book flights.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Login