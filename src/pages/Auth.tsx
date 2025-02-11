import React, { useEffect } from 'react';
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Auth() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">Welcome Back</h2>
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
  );
}