/*
  # Fix user authentication setup
  
  1. Changes
    - Remove generated columns (confirmed_at, etc.)
    - Set only required fields for auth.users
    - Maintain proper user profiles
  
  2. Security
    - Maintain password hashing
    - Keep proper role assignments
*/

DO $$
DECLARE
  admin_id uuid := gen_random_uuid();
  client_id uuid := gen_random_uuid();
BEGIN
  -- First, safely remove existing profiles if they exist
  DELETE FROM public.profiles WHERE email IN ('admin@bookwise.com', 'client@bookwise.com');
  DELETE FROM auth.users WHERE email IN ('admin@bookwise.com', 'client@bookwise.com');

  -- Create admin user with only required fields
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
  )
  VALUES (
    admin_id,
    '00000000-0000-0000-0000-000000000000',
    'admin@bookwise.com',
    crypt('admin123', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Admin User"}',
    now(),
    now()
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

  -- Create client user with only required fields
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
  )
  VALUES (
    client_id,
    '00000000-0000-0000-0000-000000000000',
    'client@bookwise.com',
    crypt('client123', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Client User"}',
    now(),
    now()
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