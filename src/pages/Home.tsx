import React, { useState } from 'react';
import { Calendar, Clock, Users, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import VideoModal from '../components/VideoModal';

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Main Content */}
      <div className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8 md:space-y-10">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 lg:mb-6">
                <span className="text-gray-900 dark:text-white">Smart</span>
                <br />
                <span className="text-[#4361EE] dark:text-[#6C8EFF]">Booking</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-lg">
                Streamline your appointment scheduling with BookWise. Easy booking, instant confirmations, and hassle-free management.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-[#4361EE]/5 dark:bg-[#4361EE]/10 p-4 md:p-6 rounded-xl">
                <Clock className="w-6 h-6 md:w-8 md:h-8 text-[#4361EE] dark:text-[#6C8EFF] mb-3" />
                <h3 className="text-sm md:text-base font-semibold mb-2 dark:text-white">24/7 Booking</h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Book appointments anytime, anywhere</p>
              </div>
              <div className="bg-[#4361EE]/5 dark:bg-[#4361EE]/10 p-4 md:p-6 rounded-xl">
                <Calendar className="w-6 h-6 md:w-8 md:h-8 text-[#4361EE] dark:text-[#6C8EFF] mb-3" />
                <h3 className="text-sm md:text-base font-semibold mb-2 dark:text-white">Smart Calendar</h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Automated scheduling system</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/booking"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-[#4361EE] dark:bg-[#6C8EFF] text-white rounded-full hover:bg-[#3651D4] dark:hover:bg-[#5B7FFF] transition-colors text-base md:text-lg font-medium"
              >
                Book Now
              </Link>
              <button 
                onClick={() => setShowVideo(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-700 rounded-full hover:border-[#4361EE] dark:hover:border-[#6C8EFF] transition-colors text-base md:text-lg font-medium group"
              >
                <Play className="w-4 h-4 md:w-5 md:h-5 mr-2 text-[#4361EE] dark:text-[#6C8EFF] group-hover:text-[#3651D4] dark:group-hover:text-[#5B7FFF]" />
                Short App Movie
              </button>
            </div>

            {/* Statistics */}
            <div className="flex justify-start space-x-6 sm:space-x-8 md:space-x-12">
              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      className="text-gray-200 dark:text-gray-700"
                      strokeWidth="10"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-[#4361EE] dark:text-[#6C8EFF] transition-all duration-1000 ease-out"
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
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold dark:text-white">80%</span>
                    <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-gray-500 dark:text-gray-400 mt-0.5">Time Saved</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      className="text-gray-200 dark:text-gray-700"
                      strokeWidth="10"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-[#4361EE] dark:text-[#6C8EFF] transition-all duration-1000 ease-out"
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
                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold dark:text-white">70%</span>
                    <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-gray-500 dark:text-gray-400 mt-0.5">Happy Users</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Phone Mockup */}
          <div className="relative mt-10 lg:mt-0">
            <div className="w-full max-w-[260px] xs:max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] mx-auto">
              <div className="relative z-10 bg-gradient-to-b from-[#4361EE]/10 to-[#4361EE]/5 dark:from-[#6C8EFF]/20 dark:to-[#6C8EFF]/10 rounded-[2rem] sm:rounded-[2.5rem] p-3 sm:p-4">
                <div className="aspect-[9/19] bg-[#4361EE]/10 dark:bg-[#6C8EFF]/20 rounded-[1.75rem] sm:rounded-[2rem] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop"
                    alt="Booking Interface"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Floating Stats Card */}
              <div className="hidden sm:block absolute top-1/2 -right-8 md:-right-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 md:p-4 transform -translate-y-1/2">
                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Users className="w-4 h-4 md:w-5 md:h-5 text-[#4361EE] dark:text-[#6C8EFF]" />
                    <div>
                      <div className="text-sm md:text-base font-bold text-[#4361EE] dark:text-[#6C8EFF]">1000+</div>
                      <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Active Users</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-[#4361EE] dark:text-[#6C8EFF]" />
                    <div>
                      <div className="text-sm md:text-base font-bold text-[#4361EE] dark:text-[#6C8EFF]">24/7</div>
                      <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Availability</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal isOpen={showVideo} onClose={() => setShowVideo(false)} />
    </div>
  );
}