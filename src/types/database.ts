export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: 'admin' | 'client';
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string | null;
  duration: string;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  client_id: string;
  service_id: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ClientForm {
  id: string;
  client_id: string;
  appointment_id: string;
  form_data: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface BlockedTime {
  id: string;
  start_time: string;
  end_time: string;
  reason: string | null;
  created_at: string;
  updated_at: string;
}