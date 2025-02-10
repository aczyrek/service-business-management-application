import React from 'react';
import { Calendar, Clock, Users, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8 md:space-y-10">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 lg:mb-6">
                <span className="text-gray-900">Smart</span>
                <br />
                <span className="text-[#4361EE]">Booking</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-lg">
                Streamline your appointment scheduling with BookWise. Easy booking, instant confirmations, and hassle-free management.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-[#4361EE]/5 p-4 md:p-6 rounded-xl">
                <Clock className="w-6 h-6 md:w-8 md:h-8 text-[#4361EE] mb-3" />
                <h3 className="text-sm md:text-base font-semibold mb-2">24/7 Booking</h3>
                <p className="text-xs md:text-sm text-gray-600">Book appointments anytime, anywhere</p>
              </div>
              <div className="bg-[#4361EE]/5 p-4 md:p-6 rounded-xl">
                <Calendar className="w-6 h-6 md:w-8 md:h-8 text-[#4361EE] mb-3" />
                <h3 className="text-sm md:text-base font-semibold mb-2">Smart Calendar</h3>
                <p className="text-xs md:text-sm text-gray-600">Automated scheduling system</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to={user ? "/booking" : "/auth"}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-[#4361EE] text-white rounded-full hover:bg-[#3651D4] transition-colors text-base md:text-lg font-medium"
              >
                Book Now
              </Link>
              <button 
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-gray-700 border-2 border-gray-200 rounded-full hover:border-[#4361EE] transition-colors text-base md:text-lg font-medium group"
              >
                <Play className="w-4 h-4 md:w-5 md:h-5 mr-2 text-[#4361EE] group-hover:text-[#3651D4]" />
                How it Works
              </button>
            </div>

            {/* Statistics */}
            <div className="flex justify-start space-x-6 sm:space-x-8 md:space-x-12">
              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      className="text-gray-200"
                      strokeWidth="10"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-[#4361EE] transition-all duration-1000 ease-out"
                      strokeWidth="10"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 * 0.2}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">80%</span>
                    <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-gray-500 mt-0.5">Time Saved</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      className="text-gray-200"
                      strokeWidth="10"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-[#4361EE] transition-all duration-1000 ease-out"
                      strokeWidth="10"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 * 0.3}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">70%</span>
                    <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-gray-500 mt-0.5">Happy Users</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Phone Mockup */}
          <div className="relative mt-10 lg:mt-0">
            <div className="w-full max-w-[260px] xs:max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] mx-auto">
              <div className="relative z-10 bg-gradient-to-b from-[#4361EE]/10 to-[#4361EE]/5 rounded-[2rem] sm:rounded-[2.5rem] p-3 sm:p-4">
                <div className="aspect-[9/19] bg-[#4361EE]/10 rounded-[1.75rem] sm:rounded-[2rem] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop"
                    alt="Booking Interface"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Floating Stats Card */}
              <div className="hidden sm:block absolute top-1/2 -right-8 md:-right-12 bg-white rounded-xl shadow-lg p-3 md:p-4 transform -translate-y-1/2">
                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Users className="w-4 h-4 md:w-5 md:h-5 text-[#4361EE]" />
                    <div>
                      <div className="text-sm md:text-base font-bold text-[#4361EE]">1000+</div>
                      <div className="text-xs md:text-sm text-gray-500">Active Users</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-[#4361EE]" />
                    <div>
                      <div className="text-sm md:text-base font-bold text-[#4361EE]">24/7</div>
                      <div className="text-xs md:text-sm text-gray-500">Availability</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}