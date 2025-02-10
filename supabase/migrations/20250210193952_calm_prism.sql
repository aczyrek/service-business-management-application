/*
  # Create test users with duplicate handling

  1. New Data
    - Creates a test admin user if not exists
    - Creates a test client user if not exists
  
  2. Security
    - Uses Supabase's auth system
    - Sets up proper roles and identities
    - Handles existing users gracefully
*/

-- Create extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Function to create a user if not exists
CREATE OR REPLACE FUNCTION create_user_if_not_exists(
  email TEXT,
  password TEXT,
  full_name TEXT,
  user_role user_role
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_id uuid;
BEGIN
  -- Check if user exists
  SELECT id INTO user_id FROM auth.users WHERE auth.users.email = create_user_if_not_exists.email;
  
  -- If user doesn't exist, create new user
  IF user_id IS NULL THEN
    user_id := gen_random_uuid();
    
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
      user_id,
      '00000000-0000-0000-0000-000000000000',
      email,
      crypt(password, gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      jsonb_build_object('full_name', full_name),
      now(),
      now()
    );

    -- Create profile only if it doesn't exist
    INSERT INTO public.profiles (
      id,
      email,
      full_name,
      role
    )
    VALUES (
      user_id,
      email,
      full_name,
      user_role
    )
    ON CONFLICT (id) DO NOTHING;
  END IF;

  RETURN user_id;
END;
$$;

-- Create test users
SELECT create_user_if_not_exists(
  'admin@bookwise.com',
  'admin123',
  'Admin User',
  'admin'::user_role
);

SELECT create_user_if_not_exists(
  'client@bookwise.com',
  'client123',
  'Client User',
  'client'::user_role
);

-- Drop the function after use
DROP FUNCTION create_user_if_not_exists;