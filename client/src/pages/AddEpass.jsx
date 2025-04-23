import { useState } from 'react';
import axios from 'axios';
import "./Registerform.css";
function AddEpass() {
  const [epass, setEpass] = useState({ name: '', reason: '', date: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEpass({ ...epass, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/epass", epass)
      .then(res => alert("E-Pass Added"))
      .catch(err => alert(err));
    setEpass({ name: '', reason: '', date: '' });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Add E-Pass</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="text" name="name" placeholder="Name" value={epass.name} onChange={handleChange} required />
        <input type="text" name="reason" placeholder="Reason for Travel" value={epass.reason} onChange={handleChange} required />
        <input type="date" name="date" value={epass.date} onChange={handleChange} required />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
}

export default AddEpass;
