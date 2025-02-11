import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, Clock, User, Mail, Phone, Search,
  Scissors, Sparkles, Dog, Palette, Eye, HeartHandshake,
  Activity, Zap, Flower, PenTool, CloudSun, Dumbbell, HeartPulse,
  MapPin, Building, Star, ChevronLeft, ChevronRight, Check, AlertCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, isToday, isBefore, isAfter, startOfDay, parseISO } from 'date-fns';

interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  company_name: string;
  company_address: string;
  company_phone: string;
  company_email: string;
  category_id: string;
  rating: number;
  rating_count: number;
}

export default function Booking() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchServices(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('service_categories')
      .select('*')
      .order('name');
    
    if (data) {
      setCategories(data);
    }
    setLoading(false);
  };

  const fetchServices = async (categoryId: string) => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('category_id', categoryId)
      .order('company_name');
    
    if (data) {
      setServices(data);
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType } = {
      scissors: Scissors,
      sparkles: Sparkles,
      dog: Dog,
      palette: Palette,
      eye: Eye,
      'heart-handshake': HeartHandshake,
      activity: Activity,
      zap: Zap,
      flower: Flower,
      'pen-tool': PenTool,
      'cloud-sun': CloudSun,
      dumbbell: Dumbbell,
      'heart-pulse': HeartPulse,
    };
    
    const IconComponent = icons[iconName];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : null;
  };

  const handleGuestInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuestInfo({
      ...guestInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (user) {
      setStep(4);
    } else {
      setStep(4);
    }
  };

  const handleConfirmBooking = async () => {
    try {
      setSubmitting(true);
      setError(null);

      if (!selectedService || !selectedDate || !selectedTime) {
        throw new Error('Please select all booking details');
      }

      if (!user) {
        if (!guestInfo.name || !guestInfo.email || !guestInfo.phone) {
          throw new Error('Please fill in all your contact details');
        }
        if (!guestInfo.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          throw new Error('Please enter a valid email address');
        }
        if (!guestInfo.phone.match(/^\+\d{1,4}\s?(\d{1,3}\s?)*\d{4}$/)) {
          throw new Error('Please enter a valid phone number with country code (e.g., +44 7911 123456)');
        }
      }

      const [hour, period] = selectedTime.split(' ');
      const [hourStr] = hour.split(':');
      let bookingHour = parseInt(hourStr);
      if (period === 'PM' && bookingHour !== 12) bookingHour += 12;
      if (period === 'AM' && bookingHour === 12) bookingHour = 0;

      const startTime = new Date(selectedDate);
      startTime.setHours(bookingHour, 0, 0, 0);

      const durationMatch = selectedService.duration.match(/(\d+)/);
      const durationMinutes = durationMatch ? parseInt(durationMatch[0]) : 60;
      const endTime = new Date(startTime.getTime() + durationMinutes * 60000);

      const { data: existingBookings } = await supabase
        .from('appointments')
        .select('*')
        .eq('service_id', selectedService.id)
        .gte('start_time', startTime.toISOString())
        .lt('start_time', endTime.toISOString());

      if (existingBookings && existingBookings.length > 0) {
        throw new Error('This time slot is no longer available. Please select another time.');
      }

      const { data: appointment, error: appointmentError } = await supabase
        .from('appointments')
        .insert([
          {
            client_id: user?.id,
            service_id: selectedService.id,
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
            status: 'pending',
            notes: user ? undefined : `Guest Booking - ${guestInfo.name} (${guestInfo.phone})`
          }
        ])
        .select()
        .single();

      if (appointmentError) throw appointmentError;

      if (!user && appointment) {
        const { error: formError } = await supabase
          .from('client_forms')
          .insert([
            {
              appointment_id: appointment.id,
              form_data: {
                name: guestInfo.name,
                email: guestInfo.email,
                phone: guestInfo.phone
              }
            }
          ]);

        if (formError) throw formError;
      }

      navigate('/dashboard', {
        state: {
          success: true,
          message: 'Booking confirmed successfully!'
        }
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while booking');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredServices = services.filter(service => 
    service.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderRating = (rating: number, count: number) => {
    return (
      <div className="flex items-center space-x-1">
        <div className="flex items-center text-yellow-400">
          <Star className="w-4 h-4 fill-current" />
        </div>
        <span className="text-sm font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">({count})</span>
      </div>
    );
  };

  const getAvailableTimeSlots = () => {
    const slots = [];
    let hour = 9;
    
    while (hour <= 17) {
      const time = `${hour === 12 ? 12 : hour % 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
      slots.push(time);
      hour++;
    }
    
    return slots;
  };

  const getCalendarDays = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(addMonths(currentMonth, 2));
    return eachDayOfInterval({ start, end });
  };

  const formatDate = (date: Date) => {
    return format(date, 'EEEE, MMMM d, yyyy');
  };

  const isDateSelectable = (date: Date) => {
    const today = startOfDay(new Date());
    const threeMonthsFromNow = addMonths(today, 3);
    return !isBefore(date, today) && !isAfter(date, threeMonthsFromNow);
  };

  const nextMonth = () => {
    const newDate = addMonths(currentMonth, 1);
    const maxDate = addMonths(startOfMonth(new Date()), 2);
    if (!isAfter(newDate, maxDate)) {
      setCurrentMonth(newDate);
    }
  };

  const previousMonth = () => {
    const newDate = addMonths(currentMonth, -1);
    const today = startOfMonth(new Date());
    if (!isBefore(newDate, today)) {
      setCurrentMonth(newDate);
    }
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
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex max-w-2xl mx-auto">
            <div className={`flex-1 text-center py-4 ${step >= 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}>
              <span className="text-sm font-medium">1. Select Category</span>
            </div>
            <div className={`flex-1 text-center py-4 ${step >= 2 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}>
              <span className="text-sm font-medium">2. Choose Provider</span>
            </div>
            <div className={`flex-1 text-center py-4 ${step >= 3 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}>
              <span className="text-sm font-medium">3. Pick Time</span>
            </div>
            <div className={`flex-1 text-center py-4 ${step >= 4 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}>
              <span className="text-sm font-medium">4. Confirm</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Select a Service Category</h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setStep(2);
                    }}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-blue-600 dark:text-blue-400">
                        {getIconComponent(category.icon)}
                      </div>
                      <div>
                        <h3 className="font-medium">{category.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Choose a Provider</h2>
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search providers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                  />
                </div>
              </div>

              <div className="grid gap-4">
                {filteredServices.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service);
                      setStep(3);
                    }}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-left"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div>
                          <h3 className="font-medium">{service.company_name}</h3>
                          {renderRating(service.rating, service.rating_count)}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {service.name} • {service.duration} • ${service.price}
                        </p>
                        {service.company_address && (
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <MapPin className="w-4 h-4 mr-1" />
                            {service.company_address}
                          </div>
                        )}
                        {service.company_phone && (
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Phone className="w-4 h-4 mr-1" />
                            {service.company_phone}
                          </div>
                        )}
                      </div>
                      <Building className="w-6 h-6 text-gray-400 flex-shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Choose Date & Time</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CalendarIcon className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm font-medium">Select Date</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={previousMonth}
                        disabled={isSameMonth(currentMonth, new Date())}
                        className={`p-1 rounded-full ${
                          isSameMonth(currentMonth, new Date())
                            ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <span className="text-sm font-medium">
                        {format(currentMonth, 'MMMM yyyy')}
                      </span>
                      <button
                        onClick={nextMonth}
                        disabled={isSameMonth(currentMonth, addMonths(startOfMonth(new Date()), 2))}
                        className={`p-1 rounded-full ${
                          isSameMonth(currentMonth, addMonths(startOfMonth(new Date()), 2))
                            ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-7 text-center">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div
                          key={day}
                          className="py-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700"
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7">
                      {getCalendarDays().map((date) => {
                        const isSelectable = isDateSelectable(date);
                        const isSelected = isSameDay(date, selectedDate);
                        const isCurrentMonth = isSameMonth(date, currentMonth);
                        
                        return (
                          <button
                            key={date.toISOString()}
                            onClick={() => isSelectable && setSelectedDate(date)}
                            disabled={!isSelectable}
                            className={`
                              p-2 text-sm border-t border-l first:border-l-0 border-gray-200 dark:border-gray-700
                              ${!isCurrentMonth ? 'text-gray-400 dark:text-gray-600' : ''}
                              ${isToday(date) ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                              ${isSelected ? 'bg-blue-600 text-white' : ''}
                              ${isSelectable ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : 'cursor-not-allowed opacity-50'}
                            `}
                          >
                            {format(date, 'd')}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {selectedService && (
                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h3 className="font-medium mb-2">{selectedService.company_name}</h3>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        <p>{selectedService.name}</p>
                        <p>Duration: {selectedService.duration}</p>
                        <p>Price: ${selectedService.price}</p>
                        {renderRating(selectedService.rating, selectedService.rating_count)}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm font-medium">Available Times</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(selectedDate)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {getAvailableTimeSlots().map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`p-3 text-sm border rounded-lg transition-colors ${
                          selectedTime === time
                            ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="max-w-md mx-auto space-y-6">
              {!user && (
                <>
                  <h2 className="text-lg font-semibold">Your Details</h2>
                  <div className="space-y-4">
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
                          placeholder="+44 7911 123456"
                        />
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                        Format: +[country code] [number], e.g., +44 7911 123456
                      </span>
                    </div>
                  </div>
                </>
              )}

              {selectedService && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
                  <h3 className="font-medium">Booking Summary</h3>
                  <div className="text-sm space-y-2">
                    <p><span className="text-gray-500 dark:text-gray-400">Service:</span> {selectedService.name}</p>
                    <p><span className="text-gray-500 dark:text-gray-400">Provider:</span> {selectedService.company_name}</p>
                    <p><span className="text-gray-500 dark:text-gray-400">Date:</span> {format(selectedDate, 'MMMM d, yyyy')}</p>
                    <p><span className="text-gray-500 dark:text-gray-400">Time:</span> {selectedTime}</p>
                    <p><span className="text-gray-500 dark:text-gray-400">Duration:</span> {selectedService.duration}</p>
                    <p><span className="text-gray-500 dark:text-gray-400">Price:</span> ${selectedService.price}</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <button
                onClick={handleConfirmBooking}
                disabled={submitting}
                className={`w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors ${
                  submitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Confirming...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Confirm Booking</span>
                  </>
                )}
              </button>
            </div>
          )}

          {step > 1 && (
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setStep(step - 1)}
                disabled={submitting}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
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