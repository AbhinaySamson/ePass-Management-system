import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [epasses, setEpasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!email) return;

    axios.get(`http://localhost:8000/epasses/${email}`)
      .then((res) => {
        setEpasses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [email]);

  if (loading) return <p>Loading...</p>;
  if (!email) return <p>Please login to view this page.</p>;

  return (
    <div>
      <h2>Welcome, {email}</h2>
      {epasses.length > 0 ? (
        <>
          <h3>Your E-Passes</h3>
          <ul>
            {epasses.map((epass, idx) => (
              <li key={idx}>
                Reason: {epass.reason} | From: {epass.from} | To: {epass.to}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p>You have no E-Passes.</p>
          <Link to="/add-epass">Add New E-Pass</Link>
        </>
      )}
    </div>
  );
}

export default Dashboard;
