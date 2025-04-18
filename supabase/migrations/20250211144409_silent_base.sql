/*
  # Minimal Auth Setup
  
  1. Changes
    - Remove all optional fields
    - Focus on core required fields only
    - Ensure proper password hashing
  
  2. Security
    - Maintain basic auth requirements
    - Keep profile associations
*/

DO $$
DECLARE
  admin_id uuid := gen_random_uuid();
  client_id uuid := gen_random_uuid();
BEGIN
  -- First, safely remove existing profiles if they exist
  DELETE FROM public.profiles WHERE email IN ('admin@bookwise.com', 'client@bookwise.com');
  DELETE FROM auth.users WHERE email IN ('admin@bookwise.com', 'client@bookwise.com');

  -- Create admin user with minimal fields
  INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
  )
  VALUES (
    admin_id,
    'admin@bookwise.com',
    crypt('admin123', gen_salt('bf')),
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

  -- Create client user with minimal fields
  INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
  )
  VALUES (
    client_id,
    'client@bookwise.com',
    crypt('client123', gen_salt('bf')),
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