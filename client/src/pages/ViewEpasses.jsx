import { useEffect, useState } from 'react';
import axios from 'axios';
import "./Registerform.css";
function ViewEpasses() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/epasses")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">List of E-Passes</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>ID</th>
            <th>Name</th>
            <th>Reason</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((epass, i) => (
            <tr key={i} className="border-t">
              <td>{epass._id}</td>
              <td>{epass.name}</td>
              <td>{epass.reason}</td>
              <td>{epass.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewEpasses;
