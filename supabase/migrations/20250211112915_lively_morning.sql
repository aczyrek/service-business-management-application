/*
  # Create test users with proper auth setup

  1. Changes
    - Simplified user creation
    - Proper auth metadata
    - Correct profile linking
  
  2. Security
    - Proper password hashing
    - Correct auth roles
*/

-- Create test users with proper auth setup
DO $$
DECLARE
  admin_id uuid := gen_random_uuid();
  client_id uuid := gen_random_uuid();
BEGIN
  -- First, safely remove existing profiles if they exist
  DELETE FROM public.profiles WHERE email IN ('admin@bookwise.com', 'client@bookwise.com');
  DELETE FROM auth.users WHERE email IN ('admin@bookwise.com', 'client@bookwise.com');

  -- Create admin user
  INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    aud
  )
  VALUES (
    admin_id,
    'admin@bookwise.com',
    crypt('admin123', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Admin User"}',
    now(),
    now(),
    'authenticated'
  );

  -- Create admin profile
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    role
  )
  VALUES (
    admin_id,
    'admin@bookwise.com',
    'Admin User',
    'admin'
  );

  -- Create client user
  INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    aud
  )
  VALUES (
    client_id,
    'client@bookwise.com',
    crypt('client123', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Client User"}',
    now(),
    now(),
    'authenticated'
  );

  -- Create client profile
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    role
  )
  VALUES (
    client_id,
    'client@bookwise.com',
    'Client User',
    'client'
  );
END $$;