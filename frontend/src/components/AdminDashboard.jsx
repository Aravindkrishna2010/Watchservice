import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/status/all`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setRequests(res.data))
      .catch(() => {});
  }, [token]);

  const updateStatus = async (trackingId, status) => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/update-status`,
      { trackingId, status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setRequests((prev) => prev.map(r => r.trackingId === trackingId ? { ...r, status } : r));
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Admin Dashboard</h2>
      <ul className="space-y-2">
        {requests.map(r => (
          <li key={r.trackingId} className="border p-2">
            <p>{r.brand} {r.model} - {r.status}</p>
            <button className="bg-green-500 text-white px-2 py-1 mr-2" onClick={() => updateStatus(r.trackingId, 'In Progress')}>In Progress</button>
            <button className="bg-blue-500 text-white px-2 py-1 mr-2" onClick={() => updateStatus(r.trackingId, 'Repaired')}>Repaired</button>
            <button className="bg-gray-700 text-white px-2 py-1" onClick={() => updateStatus(r.trackingId, 'Ready for Pickup')}>Ready</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
