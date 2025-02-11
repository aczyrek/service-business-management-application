/*
  # Fix user authentication setup

  1. Changes
    - Update user creation to use proper Supabase auth setup
    - Ensure passwords are properly hashed with correct salt
    - Fix user metadata structure
  
  2. Security
    - Proper password hashing
    - Correct auth metadata setup
    - Maintains RLS policies
*/

DO $$
DECLARE
  admin_id uuid;
  client_id uuid;
BEGIN
  -- First, safely remove existing profiles (must be deleted before auth.users due to FK constraint)
  DELETE FROM public.profiles WHERE email IN ('admin@bookwise.com', 'client@bookwise.com');
  
  -- Then remove auth users
  DELETE FROM auth.users WHERE email IN ('admin@bookwise.com', 'client@bookwise.com');

  -- Create admin user
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    aud,
    role
  )
  VALUES (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000000',
    'admin@bookwise.com',
    crypt('admin123', gen_salt('bf', 10)),
    now(),
    jsonb_build_object(
      'provider', 'email',
      'providers', array['email']
    ),
    jsonb_build_object(
      'full_name', 'Admin User'
    ),
    now(),
    now(),
    'authenticated',
    'authenticated'
  )
  RETURNING id INTO admin_id;

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
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    aud,
    role
  )
  VALUES (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000000',
    'client@bookwise.com',
    crypt('client123', gen_salt('bf', 10)),
    now(),
    jsonb_build_object(
      'provider', 'email',
      'providers', array['email']
    ),
    jsonb_build_object(
      'full_name', 'Client User'
    ),
    now(),
    now(),
    'authenticated',
    'authenticated'
  )
  RETURNING id INTO client_id;

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