import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  async function login(e) {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    try {
      let data = await axios.post(
        "http://localhost:8080/api/users/login",
        user
      );

      if (data.status === 200) {
        localStorage.setItem("currentUser", JSON.stringify(data.data));
        navigate("/");
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // User already exists, display the error message
        toast.error(err.response.data.message);
      } else {
        // Handle other errors if needed
        console.error("Error during axios request");
      }
    }
  }

  return (
    <div>
      <form>
        <div className="row justify-content-center mt-3 ">
          <div className="col-md-5 ">
            <div className="bs">
              <input
                type="email"
                className="form-control mb-3"
                placeholder="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
              <input
                type="password"
                className="form-control mb-3"
                placeholder="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />

              <button className="btn btn-dark" onClick={login}>
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
