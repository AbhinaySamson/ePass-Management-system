import { useState } from 'react';
import axios from 'axios';
import "./Registerform.css";
function EditEpass() {
  const [id, setId] = useState('');
  const [epass, setEpass] = useState({ name: '', reason: '', date: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEpass({ ...epass, [name]: value });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:8000/epass/${id}`, epass)
      .then(() => alert('E-Pass Updated'))
      .catch(err => alert(err));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Edit E-Pass</h2>
      <input type="text" placeholder="Enter E-Pass ID" value={id} onChange={(e) => setId(e.target.value)} className="mb-3" />
      <input type="text" name="name" placeholder="Name" value={epass.name} onChange={handleChange} />
      <input type="text" name="reason" placeholder="Reason" value={epass.reason} onChange={handleChange} />
      <input type="date" name="date" value={epass.date} onChange={handleChange} />
      <button onClick={handleUpdate} className="bg-green-500 text-white p-2 mt-2 rounded">Update</button>
    </div>
  );
}

export default EditEpass;
