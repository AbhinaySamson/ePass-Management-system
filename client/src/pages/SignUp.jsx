import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/signup", data)
      .then(res => setStatus(res.data))
      .catch(err => setStatus(err.response?.data || "Signup failed"));
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
        <p>{status}</p>
      </form>
    </div>
  );
}

export default Signup;
