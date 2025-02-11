import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, User, Mail, Phone } from 'lucide-react';

export default function Booking() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleGuestInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuestInfo({
      ...guestInfo,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Book an Appointment</h1>
      
      {!user && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            You're booking as a guest. 
            <Link to="/auth" className="ml-2 text-blue-600 dark:text-blue-400 hover:underline">
              Sign in or create an account
            </Link>
            {' '}to manage your bookings easily.
          </p>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {/* Progress Steps */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex max-w-2xl mx-auto">
            <div className={`flex-1 text-center py-4 ${step >= 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}>
              <span className="text-sm font-medium">1. Select Service</span>
            </div>
            <div className={`flex-1 text-center py-4 ${step >= 2 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}>
              <span className="text-sm font-medium">2. Choose Time</span>
            </div>
            <div className={`flex-1 text-center py-4 ${step >= 3 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}>
              <span className="text-sm font-medium">3. Your Details</span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-4">Select a Service</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {['Haircut', 'Hair Coloring', 'Styling', 'Treatment'].map((service) => (
                  <button
                    key={service}
                    onClick={() => setStep(2)}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                  >
                    <h3 className="font-medium">{service}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">45 minutes • $50</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-4">Choose Date & Time</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CalendarIcon className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium">Select Date</span>
                  </div>
                  {/* Calendar will be implemented next */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Calendar coming soon...</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium">Available Times</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM'].map((time) => (
                      <button
                        key={time}
                        onClick={() => setStep(3)}
                        className="p-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && !user && (
            <div className="max-w-md mx-auto space-y-4">
              <h2 className="text-lg font-semibold mb-4">Your Details</h2>
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    value={guestInfo.name}
                    onChange={handleGuestInfoChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={guestInfo.email}
                    onChange={handleGuestInfoChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    name="phone"
                    value={guestInfo.phone}
                    onChange={handleGuestInfoChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Confirm Booking
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          {step > 1 && (
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setStep(step - 1)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}