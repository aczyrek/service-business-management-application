import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, Clock, User, Mail, Phone, Search,
  Scissors, Sparkles, Dog, Palette, Eye, HeartHandshake,
  Activity, Zap, Flower, PenTool, CloudSun, Dumbbell, HeartPulse,
  MapPin, Building
} from 'lucide-react';
import { supabase } from '../lib/supabase';

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
  category_id: string;
}

export default function Booking() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
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

  const filteredServices = services.filter(service => 
    service.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        {/* Step Content */}
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
                      <div>
                        <h3 className="font-medium">{service.company_name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {service.name} • {service.duration} • ${service.price}
                        </p>
                        {service.company_address && (
                          <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                            <MapPin className="w-4 h-4 mr-1" />
                            {service.company_address}
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
                  <div className="flex items-center">
                    <CalendarIcon className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium">Select Date</span>
                  </div>
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
                        onClick={() => setStep(4)}
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

          {step === 4 && !user && (
            <div className="max-w-md mx-auto space-y-4">
              <h2 className="text-lg font-semibold">Your Details</h2>
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
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
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