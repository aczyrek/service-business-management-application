import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span className="font-semibold text-xl dark:text-white">BookWise</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/booking"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Book Appointment
            </Link>
            
            {user && (
              <>
                {profile?.role === 'admin' && (
                  <Link
                    to="/admin/settings"
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Admin
                  </Link>
                )}

                <Link
                  to="/profile"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <User className="w-5 h-5" />
                </Link>

                <button
                  onClick={handleSignOut}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            )}
            {!user && (
              <Link
                to="/auth"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Sign In
              </Link>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}