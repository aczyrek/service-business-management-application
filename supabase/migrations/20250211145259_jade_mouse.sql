/*
  # Fix user registration

  1. Changes
    - Add trigger to automatically create profile on user signup
    - Ensure proper handling of auth.users and profiles synchronization
    - Fix profile creation constraints

  2. Security
    - Maintain RLS policies
    - Ensure secure user creation flow
*/

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    'client'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Ensure proper constraints on profiles table
DO $$ BEGIN
  -- Update profiles table if needed
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.table_constraints 
    WHERE constraint_name = 'profiles_pkey'
  ) THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.table_constraints 
    WHERE constraint_name = 'profiles_email_key'
  ) THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_email_key UNIQUE (email);
  END IF;
END $$;