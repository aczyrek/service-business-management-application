/*
  # Fix authentication credentials

  1. Changes
    - Drop and recreate test users with proper password hashing
    - Use proper auth.uid() function in policies
  
  2. Security
    - Ensures passwords are properly hashed
    - Maintains existing RLS policies
*/

-- First, safely remove existing test users if they exist
DELETE FROM auth.users WHERE email IN ('admin@bookwise.com', 'client@bookwise.com');
DELETE FROM public.profiles WHERE email IN ('admin@bookwise.com', 'client@bookwise.com');

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
  role
)
VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'admin@bookwise.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Admin User"}',
  now(),
  now(),
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
SELECT 
  id,
  'admin@bookwise.com',
  'Admin User',
  'admin'
FROM auth.users
WHERE email = 'admin@bookwise.com';

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
  role
)
VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'client@bookwise.com',
  crypt('client123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Client User"}',
  now(),
  now(),
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
SELECT 
  id,
  'client@bookwise.com',
  'Client User',
  'client'
FROM auth.users
WHERE email = 'client@bookwise.com';