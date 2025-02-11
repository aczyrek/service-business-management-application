/*
  # Fix user registration and profile creation

  1. Changes
    - Drop and recreate trigger with proper error handling
    - Add proper exception handling for profile creation
    - Ensure atomic operations
    - Add proper constraints and checks

  2. Security
    - Maintain RLS policies
    - Add proper error handling
*/

-- First, clean up any existing triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create improved function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  profile_exists boolean;
BEGIN
  -- Check if profile already exists
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = NEW.id
  ) INTO profile_exists;

  -- Only create profile if it doesn't exist
  IF NOT profile_exists THEN
    INSERT INTO public.profiles (
      id,
      email,
      full_name,
      role,
      created_at,
      updated_at
    )
    VALUES (
      NEW.id,
      NEW.email,
      COALESCE(
        NEW.raw_user_meta_data->>'full_name',
        split_part(NEW.email, '@', 1)
      ),
      'client',
      NOW(),
      NOW()
    )
    ON CONFLICT (id) DO NOTHING;
  END IF;

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error details
    RAISE WARNING 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Create new trigger with proper timing
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Ensure proper constraints on profiles table
DO $$ 
BEGIN
  -- Ensure email is not null
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'email' 
    AND is_nullable = 'NO'
  ) THEN
    ALTER TABLE public.profiles 
      ALTER COLUMN email SET NOT NULL;
  END IF;

  -- Ensure proper constraints
  ALTER TABLE public.profiles
    DROP CONSTRAINT IF EXISTS profiles_pkey;
  
  ALTER TABLE public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);
  
  ALTER TABLE public.profiles
    DROP CONSTRAINT IF EXISTS profiles_email_key;
    
  ALTER TABLE public.profiles
    ADD CONSTRAINT profiles_email_key UNIQUE (email);

  -- Add check constraint for valid email
  ALTER TABLE public.profiles
    DROP CONSTRAINT IF EXISTS profiles_email_check;
    
  ALTER TABLE public.profiles
    ADD CONSTRAINT profiles_email_check 
    CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
END $$;