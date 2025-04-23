import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/login", data)
    .then(res => {
      setStatus(res.data.message);
      localStorage.setItem("userEmail", res.data.email);
      window.location.href = "/dashboard"; // redirect to dashboard
    })
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
        <p>{status}</p>
      </form>
    </div>
  );
}

export default Login;
