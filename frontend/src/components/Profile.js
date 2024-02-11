import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigation = useNavigate();
  let user = localStorage.getItem("currentUser");
  const [profile, setProfile] = useState();
  useEffect(() => {
    if (user) {
      parseUser();
    } else {
      navigation("/login");
      toast.error("Please Login...........");
    }
  }, [user]);

  function parseUser() {
    let parsedProfile = JSON.parse(user);
    setProfile(parsedProfile);
  }
  return (
    <div className="bs">
      <div>
        <p>Name: {profile.name}</p>
        <p>Email: {profile.email}</p>
        <p>Admin Access :{profile.isAdmin ? "YES" : "NO"} </p>
        <div style={{ float: "right" }}>
          <button className="btn btn-dark">Get Admin Access</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
