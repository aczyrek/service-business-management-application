/*
  # Add more specialized services

  1. New Services
    - Adds additional specialized services for each category
    - Each service includes detailed descriptions, pricing, and duration
    - Maintains high-quality service offerings with realistic pricing
  
  2. Categories Coverage
    - Barbershop: Advanced styling and treatments
    - Nail Care: Specialized nail art and treatments
    - Pet Grooming: Luxury and specialized services
    - Makeup: Advanced and specialized techniques
    - Lashes & Brows: Premium and specialized treatments
    - Massage: Therapeutic and specialized techniques
    - Physiotherapy: Advanced treatments
    - Depilation: Premium hair removal services
    - Cosmetology: Advanced skin treatments
    - Tattoo & Piercing: Specialized techniques
    - Spa & Wellness: Premium wellness experiences
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
    'Hair Color & Styling',
    'Professional hair coloring with modern styling',
    '120 minutes',
    150.00,
    'The Dapper Gentleman',
    '123 Main St, Downtown',
    '(555) 123-4567',
    'appointments@dappergent.com',
    (SELECT id FROM service_categories WHERE slug = 'barbershop'),
    4.8,
    167
  ),
  (
    'Luxury Grooming Package',
    'Complete grooming with premium products and hot towel service',
    '90 minutes',
    120.00,
    'Crown & Blade',
    '789 Royal Court',
    '(555) 987-6543',
    'royal@crownblade.com',
    (SELECT id FROM service_categories WHERE slug = 'barbershop'),
    4.9,
    145
  ),

  -- Nail Care Additional Services
  (
    'Chrome Mirror Nails',
    'Metallic chrome finish with intricate designs',
    '75 minutes',
    95.00,
    'Tokyo Nails',
    '567 Cherry Blossom Way',
    '(555) 765-4321',
    'art@tokyonails.com',
    (SELECT id FROM service_categories WHERE slug = 'nail-care'),
    4.8,
    178
  ),
  (
    'Luxury Stone Massage Pedicure',
    'Premium pedicure with hot stone massage',
    '90 minutes',
    115.00,
    'Pristine Nails & Spa',
    '789 Fashion Blvd',
    '(555) 345-6789',
    'hello@pristinenails.com',
    (SELECT id FROM service_categories WHERE slug = 'nail-care'),
    4.9,
    156
  ),

  -- Pet Grooming Additional Services
  (
    'Luxury Cat Grooming',
    'Premium grooming service for cats including lion cut',
    '90 minutes',
    130.00,
    'Elite Pet Salon',
    '123 Champion Circle',
    '(555) 543-2109',
    'show@elitepet.com',
    (SELECT id FROM service_categories WHERE slug = 'pet-grooming'),
    4.8,
    134
  ),
  (
    'Pet Dental Care Package',
    'Complete dental cleaning and oral care',
    '60 minutes',
    95.00,
    'Pawsome Pets',
    '567 Bark Avenue',
    '(555) 567-8901',
    'woof@pawsomepets.com',
    (SELECT id FROM service_categories WHERE slug = 'pet-grooming'),
    4.7,
    189
  ),

  -- Makeup Additional Services
  (
    'Special Effects Makeup',
    'Professional SFX and prosthetic makeup application',
    '120 minutes',
    200.00,
    'Glam Squad',
    '123 Beauty Row',
    '(555) 789-0123',
    'hello@glamsquad.com',
    (SELECT id FROM service_categories WHERE slug = 'makeup'),
    4.9,
    145
  ),
  (
    'Makeup Masterclass',
    'Personal makeup lesson and technique training',
    '150 minutes',
    250.00,
    'Beauty Academy',
    '321 Learning Way',
    '(555) 210-9876',
    'learn@beautyacademy.com',
    (SELECT id FROM service_categories WHERE slug = 'makeup'),
    4.8,
    167
  ),

  -- Lashes & Brows Additional Services
  (
    'Mega Volume Lashes',
    'Ultra-dramatic volume lash extensions',
    '150 minutes',
    250.00,
    'Lash Artistry',
    '567 Beauty Row',
    '(555) 109-8765',
    'hybrid@lashartistry.com',
    (SELECT id FROM service_categories WHERE slug = 'lashes-brows'),
    4.9,
    134
  ),
  (
    'Henna Brows',
    'Natural henna brow tinting and shaping',
    '60 minutes',
    85.00,
    'Brow Lab',
    '890 Style Street',
    '(555) 098-7654',
    'lamination@browlab.com',
    (SELECT id FROM service_categories WHERE slug = 'lashes-brows'),
    4.8,
    156
  ),

  -- Massage Additional Services
  (
    'Bamboo Fusion Massage',
    'Unique massage using warm bamboo rods',
    '90 minutes',
    150.00,
    'Stone & Soul Spa',
    '123 Zen Way',
    '(555) 987-6543',
    'stones@soulspa.com',
    (SELECT id FROM service_categories WHERE slug = 'massage'),
    4.9,
    178
  ),
  (
    'Four Hands Massage',
    'Synchronized massage by two therapists',
    '60 minutes',
    180.00,
    'Healing Hands Spa',
    '567 Wellness Way',
    '(555) 123-4567',
    'relax@healinghands.com',
    (SELECT id FROM service_categories WHERE slug = 'massage'),
    5.0,
    145
  ),

  -- Physiotherapy Additional Services
  (
    'Dry Needling Therapy',
    'Advanced trigger point treatment',
    '45 minutes',
    120.00,
    'Recovery Plus',
    '789 Medical Park',
    '(555) 765-4321',
    'rehab@recoveryplus.com',
    (SELECT id FROM service_categories WHERE slug = 'physiotherapy'),
    4.8,
    167
  ),
  (
    'Aquatic Therapy',
    'Rehabilitation exercises in water',
    '60 minutes',
    95.00,
    'PhysioFirst',
    '123 Health Blvd',
    '(555) 345-6789',
    'care@physiofirst.com',
    (SELECT id FROM service_categories WHERE slug = 'physiotherapy'),
    4.7,
    134
  ),

  -- Depilation Additional Services
  (
    'Full Body Laser Package',
    'Complete body laser hair removal treatment',
    '180 minutes',
    500.00,
    'Modern Hair Removal',
    '567 Tech Avenue',
    '(555) 543-2109',
    'ipl@modernhair.com',
    (SELECT id FROM service_categories WHERE slug = 'depilation'),
    4.9,
    189
  ),
  (
    'Electrolysis Treatment',
    'Permanent hair removal for small areas',
    '45 minutes',
    95.00,
    'Sweet & Smooth',
    '890 Natural Way',
    '(555) 432-1098',
    'sugar@sweetsmooth.com',
    (SELECT id FROM service_categories WHERE slug = 'depilation'),
    4.8,
    145
  ),

  -- Cosmetology Additional Services
  (
    'Radio Frequency Facial',
    'Advanced skin tightening treatment',
    '75 minutes',
    200.00,
    'Future Skin',
    '123 Innovation Ave',
    '(555) 321-0987',
    'led@futureskin.com',
    (SELECT id FROM service_categories WHERE slug = 'cosmetology'),
    4.9,
    167
  ),
  (
    'Vampire Facial',
    'PRP facial treatment for skin rejuvenation',
    '90 minutes',
    350.00,
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
    'Scarification Art',
    'Professional scarification design',
    '120 minutes',
    300.00,
    'Second Chance Ink',
    '789 Artist Row',
    '(555) 109-8765',
    'coverup@secondchance.com',
    (SELECT id FROM service_categories WHERE slug = 'tattoo-piercing'),
    4.7,
    89
  ),
  (
    'Dermal Anchors',
    'Multiple dermal anchor placements',
    '60 minutes',
    150.00,
    'Modern Body Art',
    '321 Steel Street',
    '(555) 098-7654',
    'micro@modernbody.com',
    (SELECT id FROM service_categories WHERE slug = 'tattoo-piercing'),
    4.8,
    112
  ),

  -- Spa & Wellness Additional Services
  (
    'Floatation Therapy',
    'Sensory deprivation float session',
    '60 minutes',
    95.00,
    'Ayurveda Wellness',
    '567 Ancient Way',
    '(555) 987-6543',
    'ayur@wellness.com',
    (SELECT id FROM service_categories WHERE slug = 'spa-wellness'),
    4.9,
    167
  ),
  (
    'Cryotherapy Session',
    'Full body cryotherapy treatment',
    '30 minutes',
    75.00,
    'Salt & Soul',
    '890 Mineral Lane',
    '(555) 876-5432',
    'salt@soultherapy.com',
    (SELECT id FROM service_categories WHERE slug = 'spa-wellness'),
    4.8,
    134
  ),

  -- Personal Training Additional Services
  (
    'Olympic Lifting Training',
    'Technical training in Olympic lifts',
    '90 minutes',
    120.00,
    'Burn Studio',
    '123 Intensity Road',
    '(555) 765-4321',
    'hiit@burnstudio.com',
    (SELECT id FROM service_categories WHERE slug = 'personal-training'),
    4.9,
    156
  ),
  (
    'Movement Assessment',
    'Comprehensive movement and posture analysis',
    '60 minutes',
    95.00,
    'Active Aging',
    '456 Vitality Street',
    '(555) 654-3210',
    'senior@activeaging.com',
    (SELECT id FROM service_categories WHERE slug = 'personal-training'),
    4.8,
    123
  ),

  -- Aesthetic Medicine Additional Services
  (
    'Non-Surgical Rhinoplasty',
    'Injectable nose reshaping treatment',
    '45 minutes',
    850.00,
    'Advanced Aesthetics',
    '789 Youth Avenue',
    '(555) 543-2109',
    'lift@advancedaesthetics.com',
    (SELECT id FROM service_categories WHERE slug = 'aesthetic-medicine'),
    4.9,
    145
  ),
  (
    'PRP Hair Restoration',
    'Platelet-rich plasma treatment for hair growth',
    '60 minutes',
    700.00,
    'Regenerative Beauty',
    '321 Revival Lane',
    '(555) 432-1098',
    'prp@regenbeauty.com',
    (SELECT id FROM service_categories WHERE slug = 'aesthetic-medicine'),
    4.8,
    134
  )
ON CONFLICT DO NOTHING;