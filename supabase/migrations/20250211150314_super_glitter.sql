/*
  # Add service categories and improve services table

  1. New Tables
    - `service_categories` - Categories for services
      - `id` (uuid, primary key)
      - `name` (text) - Category name
      - `slug` (text) - URL-friendly name
      - `description` (text) - Category description
      - `icon` (text) - Lucide icon name
    
    2. Changes to existing tables
    - Add category_id to services table
    - Add company information to services

  3. Security
    - Enable RLS
    - Add policies for public read access
*/

-- Create service categories table
CREATE TABLE IF NOT EXISTS service_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  icon text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add company information to services
ALTER TABLE services ADD COLUMN IF NOT EXISTS company_name text NOT NULL;
ALTER TABLE services ADD COLUMN IF NOT EXISTS company_address text;
ALTER TABLE services ADD COLUMN IF NOT EXISTS company_phone text;
ALTER TABLE services ADD COLUMN IF NOT EXISTS company_email text;
ALTER TABLE services ADD COLUMN IF NOT EXISTS category_id uuid REFERENCES service_categories(id);

-- Enable RLS
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Allow public read access to service categories"
  ON service_categories FOR SELECT
  TO public
  USING (true);

-- Insert service categories
INSERT INTO service_categories (name, slug, description, icon) VALUES
  ('Barbershop', 'barbershop', 'Professional haircuts and grooming services', 'scissors'),
  ('Manicure & Pedicure', 'nail-care', 'Nail care and beauty treatments', 'sparkles'),
  ('Pet Grooming', 'pet-grooming', 'Professional pet grooming services', 'dog'),
  ('Makeup', 'makeup', 'Professional makeup services', 'palette'),
  ('Lashes & Brows', 'lashes-brows', 'Lash extensions and brow treatments', 'eye'),
  ('Massage', 'massage', 'Relaxing massage therapy', 'heart-handshake'),
  ('Physiotherapy', 'physiotherapy', 'Professional physiotherapy services', 'activity'),
  ('Depilation', 'depilation', 'Hair removal services', 'zap'),
  ('Cosmetology', 'cosmetology', 'Skin care and beauty treatments', 'flower'),
  ('Tattoo & Piercing', 'tattoo-piercing', 'Professional tattoo and piercing services', 'pen-tool'),
  ('Spa & Wellness', 'spa-wellness', 'Relaxation and wellness treatments', 'cloud-sun'),
  ('Personal Training', 'personal-training', 'Professional fitness training', 'dumbbell'),
  ('Aesthetic Medicine', 'aesthetic-medicine', 'Non-surgical aesthetic treatments', 'heart-pulse')
ON CONFLICT (slug) DO NOTHING;