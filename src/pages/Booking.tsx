import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Booking() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Book an Appointment</h1>
      <div className="bg-white rounded-lg shadow p-6">
        {/* Calendar and booking form will be implemented next */}
        <p className="text-gray-600">Booking calendar coming soon...</p>
      </div>
    </div>
  );
}