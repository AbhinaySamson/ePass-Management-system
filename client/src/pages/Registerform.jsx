import React, { useState } from "react";
import axios from "axios";
import "./Registerform.css"; // Importing the CSS file

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/register", formData)
      .then((result) => setStatus(result.data))
      .catch((err) => setStatus(err));
    setSubmittedData([...submittedData, formData]);
    setFormData({ name: "", email: "", service: "" });
    alert("Form submitted!");
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>ID Proof:</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">--Preferred ID Proof--</option>
            <option value="Aadhar">Aadhar</option>
            <option value="Passport">Passport</option>
            <option value="Driver Licence">Driver Licence</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
        <div className="text-green-500 mt-4">{status}</div>
      </form>

      {submittedData.length > 0 && (
        <div>
          <h3>Submitted Data</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>ID Proof:</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.service}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RegisterForm;
