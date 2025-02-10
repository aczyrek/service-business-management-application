import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { profile } = useAuth();

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
          {/* Appointments list will be implemented next */}
          <p className="text-gray-600">No upcoming appointments</p>
        </div>
        
        {profile?.role === 'admin' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            {/* Activity feed will be implemented next */}
            <p className="text-gray-600">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
}