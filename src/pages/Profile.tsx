import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Calendar, Clock, MapPin, Phone, Mail, User, Pencil, Check, X, AlertCircle, ChevronDown, Search } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { countryCodes, CountryCode } from '../lib/countryData';

interface Appointment {
  id: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  service: {
    name: string;
    company_name: string;
    company_address: string;
    duration: string;
    price: number;
  };
}

export default function Profile() {
  const { profile, user, refreshProfile } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [searchCountry, setSearchCountry] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(() => {
    // Try to find the country from the existing phone number
    if (profile?.phone) {
      const country = countryCodes.find(c => profile.phone?.startsWith(c.dial_code));
      return country || countryCodes[0];
    }
    return countryCodes[0];
  });

  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone ? profile.phone.replace(selectedCountry.dial_code, '').trim() : ''
  });

  // Filter countries based on search
  const filteredCountries = countryCodes.filter(country =>
    country.name.toLowerCase().includes(searchCountry.toLowerCase()) ||
    country.dial_code.includes(searchCountry)
  );

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('country-dropdown');
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          id,
          start_time,
          end_time,
          status,
          service:services (
            name,
            company_name,
            company_address,
            duration,
            price
          )
        `)
        .eq('client_id', user?.id)
        .gte('start_time', new Date().toISOString())
        .order('start_time', { ascending: true })
        .limit(10);

      if (error) throw error;
      setAppointments(data || []);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      // Only allow numbers and spaces
      const cleaned = value.replace(/[^\d\s]/g, '');
      setFormData(prev => ({ ...prev, [name]: cleaned }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCountrySelect = (country: CountryCode) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
    setSearchCountry('');
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const fullPhoneNumber = formData.phone ? `${selectedCountry.dial_code} ${formData.phone}` : '';

      // Validate phone number format
      if (fullPhoneNumber && !fullPhoneNumber.match(/^\+\d{1,4}\s?(\d{1,3}\s?)*\d{4}$/)) {
        throw new Error('Please enter a valid phone number');
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          phone: fullPhoneNumber || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);

      if (error) throw error;

      // Refresh the profile in the context
      await refreshProfile();

      setSuccess('Profile updated successfully!');
      setEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: profile?.full_name || '',
      phone: profile?.phone || ''
    });
    setEditing(false);
    setError(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case 'pending':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
      case 'cancelled':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Profile Information</h2>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                <Pencil className="w-4 h-4" />
                <span>Edit</span>
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <div className="flex items-center space-x-3 text-gray-900 dark:text-gray-100">
                <Mail className="w-5 h-5 text-gray-400" />
                <span>{profile?.email}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              {editing ? (
                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                    placeholder="Your full name"
                  />
                </div>
              ) : (
                <div className="flex items-center space-x-3 text-gray-900 dark:text-gray-100">
                  <User className="w-5 h-5 text-gray-400" />
                  <span>{profile?.full_name || 'Not set'}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone
              </label>
              {editing ? (
                <div className="relative">
                  <div className="flex">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="flex items-center space-x-2 h-full px-3 border border-r-0 border-gray-200 dark:border-gray-700 rounded-l-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <span className="text-xl">{selectedCountry.flag}</span>
                        <span className="text-sm text-gray-900 dark:text-gray-100">{selectedCountry.dial_code}</span>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      </button>

                      {showCountryDropdown && (
                        <div
                          id="country-dropdown"
                          className="absolute z-10 mt-1 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                        >
                          <div className="p-2">
                            <div className="relative">
                              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                              <input
                                type="text"
                                value={searchCountry}
                                onChange={(e) => setSearchCountry(e.target.value)}
                                placeholder="Search countries..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                              />
                            </div>
                          </div>
                          <div className="max-h-60 overflow-y-auto">
                            {filteredCountries.map((country) => (
                              <button
                                key={country.code}
                                onClick={() => handleCountrySelect(country)}
                                className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              >
                                <span className="text-xl">{country.flag}</span>
                                <span className="text-sm text-gray-900 dark:text-gray-100">{country.name}</span>
                                <span className="text-sm text-gray-500">{country.dial_code}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="flex-1 pl-4 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-r-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                      placeholder="7911 123456"
                    />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                    Select your country code and enter your phone number
                  </span>
                </div>
              ) : (
                <div className="flex items-center space-x-3 text-gray-900 dark:text-gray-100">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span>{profile?.phone || 'Not set'}</span>
                </div>
              )}
            </div>

            {editing && (
              <div className="flex items-center space-x-4 mt-6">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {success && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start space-x-3">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Upcoming Appointments</h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : appointments.length > 0 ? (
            <div className="space-y-6">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{appointment.service.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{appointment.service.company_name}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid gap-3 text-sm">
                    <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{format(parseISO(appointment.start_time), 'EEEE, MMMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>
                        {format(parseISO(appointment.start_time), 'h:mm a')} - {format(parseISO(appointment.end_time), 'h:mm a')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{appointment.service.company_address}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Duration: </span>
                        <span className="font-medium">{appointment.service.duration}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Price: </span>
                        <span className="font-medium">${appointment.service.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">No upcoming appointments</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}