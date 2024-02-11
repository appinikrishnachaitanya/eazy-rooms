import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  async function register(event) {
    event.preventDefault();
    if (password === confirmpassword) {
      const user = {
        name: name,
        password: password,
        email: email,
      };

      try {
        const data = await axios.post(
          "http://localhost:8080/api/users/register",
          user
        );

        if (data.status === 201) {
          toast.success(data.data.message);
        }
      } catch (err) {
        if (err.response && err.response.status === 409) {
          // User already exists, display the error message
          toast.error(err.response.data.message);
        } else {
          // Handle other errors if needed
          console.error("Error during axios request:");
        }
      }
    } else {
      toast.error("Given Passwords Don't Match");
    }
  }

  return (
    <div>
      <div className="row justify-content-center mt-3 ">
        <div className="col-md-5 p-3">
          <div className="bs">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
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
            <input
              type="password"
              className="form-control mb-3"
              placeholder="confirmpassword"
              name="confirmpassword"
              value={confirmpassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required
            />
            <button className="btn btn-dark" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
