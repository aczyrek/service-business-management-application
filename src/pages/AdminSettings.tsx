import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function AdminSettings() {
  const { profile } = useAuth();

  if (profile?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Services</h2>
          {/* Service management will be implemented next */}
          <p className="text-gray-600">Service management coming soon...</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Blocked Times</h2>
          {/* Blocked times management will be implemented next */}
          <p className="text-gray-600">Time blocking coming soon...</p>
        </div>
      </div>
    </div>
  );
}