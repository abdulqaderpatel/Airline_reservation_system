import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState(0);

  function handleChange(evt) {
    const value = evt.target.value;
    setForm({ ...form, [evt.target.name]: value });
  }

  const SignupUser = () => {
    event.preventDefault();
    if (form.name === "") {
      alert("Name cannot be empty");
    } else if (form.password.length < 6) {
      alert("Password length cannot be less than 6 characters");
    } else {
      Axios.post("http://localhost:3001/user/api/signup/", {
        email: form.email,
        name: form.name,
        password: form.password,
      })
        .then((Response) => {
          setStatus(Response.status);
          console.log(status);

          localStorage.setItem("user", JSON.stringify(Response.data));
          localStorage.setItem("auth", true);
          console.log(localStorage.getItem("user"));

          navigate("/");
        })
        .catch((error) => {
          alert(error.response.data["msg"]);
        });
    }
  };

  return (
    <div>
      <section class="">
        <div
          class="px-4 py-5 px-md-5 text-center text-lg-start"
          style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
        >
          <div class="container">
            <div class="row gx-lg-5 align-items-center">
              <div class="col-lg-6 mb-5 mb-lg-0">
                <h2 class="my-5 display-3 fw-bold ls-tight">
                  Create your account
                  <br />
                  <span class="text-primary">
                    book flights on the go with Indian Airlines
                  </span>
                </h2>
                <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                  Indian Airlines provides one of the best airline services in
                  the world. Be sure to check out the offers our company
                  provides for an even enriching experience.
                </p>
              </div>

              <div class="col-lg-6 mb-5 mb-lg-0">
                <div class="card">
                  <div class="card-body py-5 px-md-5">
                    <form onSubmit={SignupUser}>
                      <div class="form-outline">
                        <input
                          type="text"
                          id="form3Example1"
                          class="form-control"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                        />
                        <label class="form-label" for="form3Example1">
                          First name
                        </label>
                      </div>

                      <div class="form-outline mb-4">
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          id="form3Example3"
                          class="form-control"
                        />
                        <label class="form-label" for="form3Example3">
                          Email address
                        </label>
                      </div>

                      <div class="form-outline mb-4">
                        <input
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          type="password"
                          id="form3Example4"
                          class="form-control"
                        />
                        <label class="form-label" for="form3Example4">
                          Password
                        </label>
                      </div>

                      <button
                        type="submit"
                        class="btn btn-primary btn-block mb-4"
                      >
                        Sign up
                      </button>
                      <div class="d-flex align-items-center justify-content-center pb-4">
                        <p class="mb-0 me-2">Already have an account?</p>
                        <button
                          onClick={() => {
                            navigate("/login");
                          }}
                          type="button"
                          class="btn btn-outline-danger"
                        >
                          Login
                        </button>
                      </div>

                      <div class="text-center"></div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signup;
