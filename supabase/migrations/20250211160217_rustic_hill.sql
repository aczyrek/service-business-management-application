/*
  # Add more specialized services

  1. New Services
    - Adds additional specialized services for each category
    - Each service includes detailed descriptions, pricing, and duration
    - Maintains high-quality service offerings with realistic pricing
  
  2. Categories Coverage
    - Barbershop: Specialized cuts, treatments, and styling
    - Nail Care: Advanced techniques and treatments
    - Pet Grooming: Breed-specific and specialized services
    - Makeup: Occasion-specific and technique-focused services
    - Lashes & Brows: Advanced treatments and combinations
    - Massage: Various massage techniques and specialties
    - Physiotherapy: Specialized treatments and therapies
    - Depilation: Advanced hair removal methods
    - Cosmetology: Cutting-edge skin treatments
    - Tattoo & Piercing: Specialized techniques
    - Spa & Wellness: Holistic treatments
    - Personal Training: Specialized fitness programs
    - Aesthetic Medicine: Advanced procedures
*/

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
  -- Barbershop Additional Services
  (
    'Precision Fade & Design',
    'Custom hair design with intricate patterns',
    '45 minutes',
    50.00,
    'The Dapper Gentleman',
    '123 Main St, Downtown',
    '(555) 123-4567',
    'appointments@dappergent.com',
    (SELECT id FROM service_categories WHERE slug = 'barbershop'),
    4.9,
    142
  ),
  (
    'Scalp Treatment & Head Massage',
    'Deep cleansing scalp treatment with relaxing massage',
    '45 minutes',
    45.00,
    'Crown & Blade',
    '789 Royal Court',
    '(555) 987-6543',
    'royal@crownblade.com',
    (SELECT id FROM service_categories WHERE slug = 'barbershop'),
    4.8,
    98
  ),

  -- Nail Care Additional Services
  (
    '3D Nail Art Design',
    'Elaborate 3D nail art with crystals and embellishments',
    '90 minutes',
    110.00,
    'Tokyo Nails',
    '567 Cherry Blossom Way',
    '(555) 765-4321',
    'art@tokyonails.com',
    (SELECT id FROM service_categories WHERE slug = 'nail-care'),
    4.9,
    167
  ),
  (
    'Paraffin Treatment',
    'Intensive hand and foot treatment with paraffin wax',
    '60 minutes',
    75.00,
    'Pristine Nails & Spa',
    '789 Fashion Blvd',
    '(555) 345-6789',
    'hello@pristinenails.com',
    (SELECT id FROM service_categories WHERE slug = 'nail-care'),
    4.7,
    134
  ),

  -- Pet Grooming Additional Services
  (
    'Breed-Specific Styling',
    'Specialized grooming for specific dog breeds',
    '120 minutes',
    120.00,
    'Elite Pet Salon',
    '123 Champion Circle',
    '(555) 543-2109',
    'show@elitepet.com',
    (SELECT id FROM service_categories WHERE slug = 'pet-grooming'),
    4.9,
    156
  ),
  (
    'Pet Spa Day Package',
    'Complete spa treatment including aromatherapy and massage',
    '150 minutes',
    160.00,
    'Pawsome Pets',
    '567 Bark Avenue',
    '(555) 567-8901',
    'woof@pawsomepets.com',
    (SELECT id FROM service_categories WHERE slug = 'pet-grooming'),
    4.8,
    123
  ),

  -- Makeup Additional Services
  (
    'Airbrush Makeup Application',
    'Professional airbrush makeup for flawless finish',
    '75 minutes',
    150.00,
    'Glam Squad',
    '123 Beauty Row',
    '(555) 789-0123',
    'hello@glamsquad.com',
    (SELECT id FROM service_categories WHERE slug = 'makeup'),
    4.9,
    189
  ),
  (
    'Stage & Performance Makeup',
    'Dramatic makeup for stage performances and photos',
    '90 minutes',
    165.00,
    'Avant-Garde Beauty',
    '789 Fashion Ave',
    '(555) 321-0987',
    'style@avantgarde.com',
    (SELECT id FROM service_categories WHERE slug = 'makeup'),
    4.8,
    145
  ),

  -- Lashes & Brows Additional Services
  (
    'Colored Lash Extensions',
    'Custom colored lash extensions for unique looks',
    '100 minutes',
    190.00,
    'Lash Artistry',
    '567 Beauty Row',
    '(555) 109-8765',
    'hybrid@lashartistry.com',
    (SELECT id FROM service_categories WHERE slug = 'lashes-brows'),
    4.8,
    167
  ),
  (
    'Brow Tinting & Lamination Combo',
    'Complete brow transformation with tinting and lamination',
    '75 minutes',
    120.00,
    'Brow Lab',
    '890 Style Street',
    '(555) 098-7654',
    'lamination@browlab.com',
    (SELECT id FROM service_categories WHERE slug = 'lashes-brows'),
    4.7,
    134
  ),

  -- Massage Additional Services
  (
    'Thai Massage',
    'Traditional Thai massage with stretching',
    '90 minutes',
    130.00,
    'Stone & Soul Spa',
    '123 Zen Way',
    '(555) 987-6543',
    'stones@soulspa.com',
    (SELECT id FROM service_categories WHERE slug = 'massage'),
    4.9,
    178
  ),
  (
    'Prenatal Massage',
    'Gentle massage specifically for expecting mothers',
    '60 minutes',
    95.00,
    'Healing Hands Spa',
    '567 Wellness Way',
    '(555) 123-4567',
    'relax@healinghands.com',
    (SELECT id FROM service_categories WHERE slug = 'massage'),
    4.8,
    145
  ),

  -- Physiotherapy Additional Services
  (
    'Vestibular Rehabilitation',
    'Treatment for balance and dizziness disorders',
    '45 minutes',
    110.00,
    'Recovery Plus',
    '789 Medical Park',
    '(555) 765-4321',
    'rehab@recoveryplus.com',
    (SELECT id FROM service_categories WHERE slug = 'physiotherapy'),
    4.9,
    156
  ),
  (
    'TMJ Treatment',
    'Specialized treatment for jaw and facial pain',
    '60 minutes',
    125.00,
    'PhysioFirst',
    '123 Health Blvd',
    '(555) 345-6789',
    'care@physiofirst.com',
    (SELECT id FROM service_categories WHERE slug = 'physiotherapy'),
    4.8,
    134
  ),

  -- Depilation Additional Services
  (
    'Brazilian Laser Package',
    'Complete Brazilian area laser treatment',
    '45 minutes',
    220.00,
    'Modern Hair Removal',
    '567 Tech Avenue',
    '(555) 543-2109',
    'ipl@modernhair.com',
    (SELECT id FROM service_categories WHERE slug = 'depilation'),
    4.8,
    189
  ),
  (
    'Men''s Back & Chest Waxing',
    'Full upper body waxing for men',
    '75 minutes',
    110.00,
    'Sweet & Smooth',
    '890 Natural Way',
    '(555) 432-1098',
    'sugar@sweetsmooth.com',
    (SELECT id FROM service_categories WHERE slug = 'depilation'),
    4.7,
    145
  ),

  -- Cosmetology Additional Services
  (
    'Hydrafacial Treatment',
    'Advanced facial with hydradermabrasion',
    '60 minutes',
    180.00,
    'Future Skin',
    '123 Innovation Ave',
    '(555) 321-0987',
    'led@futureskin.com',
    (SELECT id FROM service_categories WHERE slug = 'cosmetology'),
    4.9,
    167
  ),
  (
    'Oxygen Facial Therapy',
    'Pressurized oxygen treatment for glowing skin',
    '75 minutes',
    160.00,
    'Crystal Clear Skin',
    '456 Glow Street',
    '(555) 210-9876',
    'crystal@clearskin.com',
    (SELECT id FROM service_categories WHERE slug = 'cosmetology'),
    4.8,
    134
  ),

  -- Tattoo & Piercing Additional Services
  (
    'Watercolor Tattoo',
    'Artistic watercolor style tattoo design',
    '180 minutes',
    350.00,
    'Second Chance Ink',
    '789 Artist Row',
    '(555) 109-8765',
    'coverup@secondchance.com',
    (SELECT id FROM service_categories WHERE slug = 'tattoo-piercing'),
    4.9,
    178
  ),
  (
    'Industrial Piercing',
    'Professional industrial bar piercing',
    '45 minutes',
    85.00,
    'Modern Body Art',
    '321 Steel Street',
    '(555) 098-7654',
    'micro@modernbody.com',
    (SELECT id FROM service_categories WHERE slug = 'tattoo-piercing'),
    4.7,
    145
  ),

  -- Spa & Wellness Additional Services
  (
    'Hammam Experience',
    'Traditional Turkish bath experience',
    '90 minutes',
    160.00,
    'Ayurveda Wellness',
    '567 Ancient Way',
    '(555) 987-6543',
    'ayur@wellness.com',
    (SELECT id FROM service_categories WHERE slug = 'spa-wellness'),
    4.9,
    189
  ),
  (
    'Infrared Sauna Session',
    'Deep detox with infrared technology',
    '45 minutes',
    65.00,
    'Salt & Soul',
    '890 Mineral Lane',
    '(555) 876-5432',
    'salt@soultherapy.com',
    (SELECT id FROM service_categories WHERE slug = 'spa-wellness'),
    4.8,
    156
  ),

  -- Personal Training Additional Services
  (
    'Boxing Training',
    'One-on-one boxing and fitness training',
    '60 minutes',
    90.00,
    'Burn Studio',
    '123 Intensity Road',
    '(555) 765-4321',
    'hiit@burnstudio.com',
    (SELECT id FROM service_categories WHERE slug = 'personal-training'),
    4.9,
    167
  ),
  (
    'Prenatal Fitness',
    'Safe exercise program for expecting mothers',
    '45 minutes',
    80.00,
    'Active Aging',
    '456 Vitality Street',
    '(555) 654-3210',
    'senior@activeaging.com',
    (SELECT id FROM service_categories WHERE slug = 'personal-training'),
    4.8,
    134
  ),

  -- Aesthetic Medicine Additional Services
  (
    'Kybella Treatment',
    'Injectable treatment for double chin reduction',
    '45 minutes',
    750.00,
    'Advanced Aesthetics',
    '789 Youth Avenue',
    '(555) 543-2109',
    'lift@advancedaesthetics.com',
    (SELECT id FROM service_categories WHERE slug = 'aesthetic-medicine'),
    4.9,
    145
  ),
  (
    'CO2 Laser Resurfacing',
    'Advanced laser treatment for skin rejuvenation',
    '60 minutes',
    800.00,
    'Regenerative Beauty',
    '321 Revival Lane',
    '(555) 432-1098',
    'prp@regenbeauty.com',
    (SELECT id FROM service_categories WHERE slug = 'aesthetic-medicine'),
    4.8,
    123
  )
ON CONFLICT DO NOTHING;