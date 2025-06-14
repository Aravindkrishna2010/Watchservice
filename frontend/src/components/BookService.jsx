import { useState } from 'react';
import axios from 'axios';

export default function BookService() {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [issue, setIssue] = useState('');
  const [tracking, setTracking] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/book-service`,
      { brand, model, issue },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTracking(res.data.trackingId);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="border p-2 w-full" placeholder="Watch Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
        <input className="border p-2 w-full" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
        <textarea className="border p-2 w-full" placeholder="Issue" value={issue} onChange={(e) => setIssue(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2" type="submit">Book Service</button>
      </form>
      {tracking && <p className="mt-4">Tracking ID: {tracking}</p>}
    </div>
  );
}
