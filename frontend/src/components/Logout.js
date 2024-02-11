import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();

  const user = localStorage.getItem("currentUser");

  useEffect(() => {
    if (user) {
      localStorage.removeItem("currentUser");
      toast.error("Logout Successfully");
      navigate("/login"); // Redirection within useEffect
    } else {
      toast.error("Please Login first !!!");
    }
  }, [user]); // Only run the effect when user changes

  return null;
};

export default Logout;
