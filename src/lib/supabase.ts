import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error(`Invalid Supabase URL format: ${error.message}`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web',
      'Access-Control-Allow-Origin': '*'
    }
  }
});

// Enhanced error handling for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    supabase.auth.refreshSession();
  } else if (event === 'TOKEN_REFRESHED') {
    console.log('Auth token refreshed successfully');
  } else if (event === 'USER_UPDATED') {
    console.log('User data updated');
  }
});

// Add error interceptor for network issues
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  try {
    const response = await originalFetch(...args);
    if (!response.ok && response.url.includes(supabaseUrl)) {
      console.error(`Supabase request failed: ${response.status} ${response.statusText}`);
      throw new Error(`Supabase request failed: ${response.status} ${response.statusText}`);
    }
    return response;
  } catch (error) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      console.error('Network error while connecting to Supabase. Please check your internet connection.');
    }
    throw error;
  }
};