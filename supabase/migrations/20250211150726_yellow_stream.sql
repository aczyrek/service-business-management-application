/*
  # Add companies and ratings

  1. Changes to services table
    - Add rating fields
    - Add sample companies with ratings

  2. Security
    - Maintain existing RLS policies
*/

-- Add rating columns to services
ALTER TABLE services ADD COLUMN IF NOT EXISTS rating numeric(3,2) CHECK (rating >= 0 AND rating <= 5);
ALTER TABLE services ADD COLUMN IF NOT EXISTS rating_count int DEFAULT 0;

-- Insert sample companies with services
INSERT INTO services (
  name,
  description,
  duration,
  price,
  company_name,
  company_address,
  company_phone,
  company_email,
  category_id,
  rating,
  rating_count
) VALUES
  -- Barbershops
  (
    'Classic Haircut',
    'Traditional barbershop haircut with hot towel service',
    '30 minutes',
    35.00,
    'The Dapper Gentleman',
    '123 Main St, Downtown',
    '(555) 123-4567',
    'appointments@dappergent.com',
    (SELECT id FROM service_categories WHERE slug = 'barbershop'),
    4.8,
    127
  ),
  (
    'Beard Trim & Styling',
    'Professional beard grooming and shaping',
    '45 minutes',
    40.00,
    'Urban Cuts & Co.',
    '456 Oak Ave, Midtown',
    '(555) 234-5678',
    'book@urbancuts.com',
    (SELECT id FROM service_categories WHERE slug = 'barbershop'),
    4.7,
    98
  ),

  -- Nail Care
  (
    'Luxury Mani-Pedi',
    'Complete hand and foot care with premium products',
    '90 minutes',
    85.00,
    'Pristine Nails & Spa',
    '789 Fashion Blvd',
    '(555) 345-6789',
    'hello@pristinenails.com',
    (SELECT id FROM service_categories WHERE slug = 'nail-care'),
    4.9,
    203
  ),
  (
    'Gel Manicure',
    'Long-lasting gel polish application',
    '45 minutes',
    45.00,
    'The Nail Lounge',
    '321 Beauty Lane',
    '(555) 456-7890',
    'appointments@naillounge.com',
    (SELECT id FROM service_categories WHERE slug = 'nail-care'),
    4.6,
    156
  ),

  -- Pet Grooming
  (
    'Full Service Dog Grooming',
    'Bath, haircut, nail trim, and ear cleaning',
    '120 minutes',
    75.00,
    'Pawsome Pets',
    '567 Bark Avenue',
    '(555) 567-8901',
    'woof@pawsomepets.com',
    (SELECT id FROM service_categories WHERE slug = 'pet-grooming'),
    4.9,
    312
  ),
  (
    'Cat Grooming Package',
    'Gentle grooming service for cats',
    '60 minutes',
    65.00,
    'Purr-fect Grooming',
    '890 Whisker Lane',
    '(555) 678-9012',
    'meow@purrfectgrooming.com',
    (SELECT id FROM service_categories WHERE slug = 'pet-grooming'),
    4.8,
    89
  ),

  -- Makeup
  (
    'Bridal Makeup',
    'Complete bridal makeup with trial session',
    '120 minutes',
    200.00,
    'Glam Squad',
    '123 Beauty Row',
    '(555) 789-0123',
    'hello@glamsquad.com',
    (SELECT id FROM service_categories WHERE slug = 'makeup'),
    5.0,
    178
  ),
  (
    'Special Event Makeup',
    'Professional makeup for any special occasion',
    '60 minutes',
    95.00,
    'Beauty Bar',
    '456 Glamour Ave',
    '(555) 890-1234',
    'book@beautybar.com',
    (SELECT id FROM service_categories WHERE slug = 'makeup'),
    4.7,
    145
  ),

  -- Lashes & Brows
  (
    'Volume Lash Extensions',
    'Full set of volume lash extensions',
    '120 minutes',
    150.00,
    'Lash & Brow Studio',
    '789 Flutter Lane',
    '(555) 901-2345',
    'hello@lashstudio.com',
    (SELECT id FROM service_categories WHERE slug = 'lashes-brows'),
    4.9,
    234
  ),
  (
    'Microblading',
    'Semi-permanent eyebrow enhancement',
    '180 minutes',
    350.00,
    'Brow Art',
    '321 Arch Street',
    '(555) 012-3456',
    'appointments@browart.com',
    (SELECT id FROM service_categories WHERE slug = 'lashes-brows'),
    4.8,
    167
  ),

  -- Massage
  (
    'Deep Tissue Massage',
    'Therapeutic deep tissue massage',
    '60 minutes',
    110.00,
    'Healing Hands Spa',
    '567 Wellness Way',
    '(555) 123-4567',
    'relax@healinghands.com',
    (SELECT id FROM service_categories WHERE slug = 'massage'),
    4.9,
    423
  ),
  (
    'Swedish Massage',
    'Relaxing full body massage',
    '90 minutes',
    130.00,
    'Tranquility Massage',
    '890 Serenity Dr',
    '(555) 234-5678',
    'book@tranquilitymassage.com',
    (SELECT id FROM service_categories WHERE slug = 'massage'),
    4.7,
    289
  ),

  -- Physiotherapy
  (
    'Initial Assessment',
    'Comprehensive physiotherapy assessment',
    '60 minutes',
    120.00,
    'PhysioFirst',
    '123 Health Blvd',
    '(555) 345-6789',
    'care@physiofirst.com',
    (SELECT id FROM service_categories WHERE slug = 'physiotherapy'),
    4.9,
    178
  ),
  (
    'Sports Injury Treatment',
    'Specialized treatment for sports injuries',
    '45 minutes',
    95.00,
    'Active Recovery',
    '456 Sports Ave',
    '(555) 456-7890',
    'heal@activerecovery.com',
    (SELECT id FROM service_categories WHERE slug = 'physiotherapy'),
    4.8,
    156
  ),

  -- Depilation
  (
    'Full Body Waxing',
    'Complete body hair removal',
    '120 minutes',
    180.00,
    'Smooth Skin Studio',
    '789 Silk Road',
    '(555) 567-8901',
    'hello@smoothskin.com',
    (SELECT id FROM service_categories WHERE slug = 'depilation'),
    4.7,
    198
  ),
  (
    'Laser Hair Removal',
    'Advanced laser hair removal treatment',
    '60 minutes',
    250.00,
    'LaserTech Beauty',
    '321 Beam Street',
    '(555) 678-9012',
    'zap@lasertech.com',
    (SELECT id FROM service_categories WHERE slug = 'depilation'),
    4.8,
    245
  ),

  -- Cosmetology
  (
    'Facial Treatment',
    'Customized facial with premium products',
    '90 minutes',
    120.00,
    'Glow Skincare',
    '567 Radiance Ave',
    '(555) 789-0123',
    'glow@skincare.com',
    (SELECT id FROM service_categories WHERE slug = 'cosmetology'),
    4.9,
    312
  ),
  (
    'Chemical Peel',
    'Professional chemical peel treatment',
    '60 minutes',
    150.00,
    'Skin Renewal Center',
    '890 Fresh Look Lane',
    '(555) 890-1234',
    'renew@skinrenewal.com',
    (SELECT id FROM service_categories WHERE slug = 'cosmetology'),
    4.8,
    178
  ),

  -- Tattoo & Piercing
  (
    'Custom Tattoo Design',
    'Professional custom tattoo service',
    '180 minutes',
    200.00,
    'Ink Masters',
    '123 Art Street',
    '(555) 901-2345',
    'create@inkmasters.com',
    (SELECT id FROM service_categories WHERE slug = 'tattoo-piercing'),
    4.9,
    567
  ),
  (
    'Professional Piercing',
    'Safe and professional body piercing',
    '30 minutes',
    75.00,
    'Pierce Perfect',
    '456 Steel Ave',
    '(555) 012-3456',
    'pierce@pierceperfect.com',
    (SELECT id FROM service_categories WHERE slug = 'tattoo-piercing'),
    4.8,
    423
  ),

  -- Spa & Wellness
  (
    'Luxury Spa Day',
    'Complete spa package with multiple treatments',
    '240 minutes',
    350.00,
    'Serenity Spa Resort',
    '789 Paradise Way',
    '(555) 123-4567',
    'relax@serenityspa.com',
    (SELECT id FROM service_categories WHERE slug = 'spa-wellness'),
    5.0,
    289
  ),
  (
    'Detox Treatment',
    'Comprehensive detox and wellness program',
    '120 minutes',
    180.00,
    'Wellness Haven',
    '321 Zen Street',
    '(555) 234-5678',
    'detox@wellnesshaven.com',
    (SELECT id FROM service_categories WHERE slug = 'spa-wellness'),
    4.8,
    156
  ),

  -- Personal Training
  (
    'Personal Training Session',
    'One-on-one fitness training',
    '60 minutes',
    85.00,
    'Elite Fitness',
    '567 Muscle Lane',
    '(555) 345-6789',
    'train@elitefitness.com',
    (SELECT id FROM service_categories WHERE slug = 'personal-training'),
    4.9,
    234
  ),
  (
    'Nutrition Consultation',
    'Personalized nutrition planning',
    '90 minutes',
    120.00,
    'FitLife Studio',
    '890 Health Ave',
    '(555) 456-7890',
    'eat@fitlife.com',
    (SELECT id FROM service_categories WHERE slug = 'personal-training'),
    4.7,
    178
  ),

  -- Aesthetic Medicine
  (
    'Botox Treatment',
    'Professional Botox injection service',
    '45 minutes',
    400.00,
    'Aesthetic Med Spa',
    '123 Youth Street',
    '(555) 567-8901',
    'renew@aestheticmed.com',
    (SELECT id FROM service_categories WHERE slug = 'aesthetic-medicine'),
    4.9,
    456
  ),
  (
    'Dermal Fillers',
    'Premium dermal filler treatment',
    '60 minutes',
    500.00,
    'Beauty Medicine Center',
    '456 Glow Ave',
    '(555) 678-9012',
    'enhance@beautymed.com',
    (SELECT id FROM service_categories WHERE slug = 'aesthetic-medicine'),
    4.8,
    345
  )
ON CONFLICT DO NOTHING;