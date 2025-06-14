import { useState } from 'react';
import axios from 'axios';

export default function TrackStatus() {
  const [trackingId, setTrackingId] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/status/${trackingId}`);
    setStatus(res.data.status);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="border p-2 w-full" placeholder="Tracking ID" value={trackingId} onChange={(e) => setTrackingId(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2" type="submit">Check Status</button>
      </form>
      {status && <p className="mt-4">Status: {status}</p>}
    </div>
  );
}
