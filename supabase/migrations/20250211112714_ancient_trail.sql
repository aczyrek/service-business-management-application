/*
  # Fix authentication setup and user creation

  1. Changes
    - Ensure required extensions are installed
    - Set up auth schema if needed
    - Create test users with proper authentication
  
  2. Security
    - Proper password hashing
    - Correct auth metadata setup
    - Maintains RLS policies
*/

-- Create required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Ensure auth schema exists
CREATE SCHEMA IF NOT EXISTS auth;

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS auth.users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  instance_id uuid,
  email text UNIQUE,
  encrypted_password text,
  email_confirmed_at timestamptz,
  invited_at timestamptz,
  confirmation_token text,
  confirmation_sent_at timestamptz,
  recovery_token text,
  recovery_sent_at timestamptz,
  email_change_token_new text,
  email_change text,
  email_change_sent_at timestamptz,
  last_sign_in_at timestamptz,
  raw_app_meta_data jsonb,
  raw_user_meta_data jsonb,
  is_super_admin boolean,
  created_at timestamptz,
  updated_at timestamptz,
  phone text UNIQUE DEFAULT NULL,
  phone_confirmed_at timestamptz,
  phone_change text DEFAULT '',
  phone_change_token text DEFAULT '',
  phone_change_sent_at timestamptz,
  confirmed_at timestamptz,
  email_change_token_current text DEFAULT '',
  email_change_confirm_status smallint DEFAULT 0,
  banned_until timestamptz,
  reauthentication_token text DEFAULT '',
  reauthentication_sent_at timestamptz,
  is_sso_user boolean DEFAULT false,
  deleted_at timestamptz,
  aud text,
  role text
);

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
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    aud,
    role,
    confirmed_at
  )
  VALUES (
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
    'authenticated',
    now()
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
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    aud,
    role,
    confirmed_at
  )
  VALUES (
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
    'authenticated',
    now()
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