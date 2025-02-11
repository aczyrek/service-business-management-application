/*
  # Fix user creation with explicit IDs

  1. Changes
    - Explicitly set UUID for users
    - Maintain proper order of operations
    - Use proper JSON building for metadata
  
  2. Security
    - Proper password hashing with bcrypt
    - Correct auth metadata setup
*/

DO $$
DECLARE
  admin_id uuid := gen_random_uuid();
  client_id uuid := gen_random_uuid();
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
    admin_id,
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
    client_id,
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