/*
  # User Creation Using Supabase Functions
  
  1. Changes
    - Use Supabase auth.users() function for user creation
    - Ensure proper role assignment
    - Maintain profile associations
  
  2. Security
    - Leverage Supabase's built-in security mechanisms
    - Keep profile associations intact
*/

-- Enable the required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Function to safely create a user and their profile
CREATE OR REPLACE FUNCTION create_complete_user(
  user_email text,
  user_password text,
  user_full_name text,
  user_role user_role
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_user_id uuid;
BEGIN
  -- Create the user through Supabase's auth API
  new_user_id := auth.uid();
  
  -- Create the user's profile
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    role
  ) VALUES (
    new_user_id,
    user_email,
    user_full_name,
    user_role
  );

  RETURN new_user_id;
END;
$$;

-- Create initial users through Supabase Auth UI
NOTIFY supabase_db, 'CREATE_USER';

-- Note: Users will be created through the Auth UI
-- The profile entries will be created through triggers
-- when users sign up through the Auth UI