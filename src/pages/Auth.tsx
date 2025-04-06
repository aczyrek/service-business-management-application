import React, { useEffect, useState } from 'react';
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Info } from 'lucide-react';

export default function Auth() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">Welcome Back</h2>
        
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-600 dark:text-blue-400">
              <p className="font-medium mb-1">Test Accounts:</p>
              <div className="space-y-2">
                <div>
                  <p className="font-medium">Admin Account:</p>
                  <p>Email: admin@bookwise.com</p>
                  <p>Password: admin123</p>
                </div>
                <div>
                  <p className="font-medium">Client Account:</p>
                  <p>Email: client@bookwise.com</p>
                  <p>Password: client123</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <SupabaseAuth 
          supabaseClient={supabase}
          view="sign_in"
          appearance={{ 
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#4361EE',
                  brandAccent: '#3651D4',
                },
              },
            },
            className: {
              container: 'auth-container',
              button: 'auth-button',
              input: 'auth-input',
            },
          }}
          providers={[]}
          redirectTo={`${window.location.origin}/dashboard`}
          onlyThirdPartyProviders={false}
          magicLink={false}
          showLinks={true}
          onError={(err) => setError(err.message)}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Email',
                password_label: 'Password',
                button_label: 'Sign In',
                email_input_placeholder: 'Your email address',
                password_input_placeholder: 'Your password',
              },
              sign_up: {
                email_label: 'Email',
                password_label: 'Password',
                button_label: 'Sign Up',
                email_input_placeholder: 'Your email address',
                password_input_placeholder: 'Choose a password',
              },
            },
          }}
        />
      </div>
    </div>
  );
}