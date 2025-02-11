-- Add more specialized services for each category
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
  -- Additional Barbershop Services
  (
    'Royal Shave Experience',
    'Premium hot towel shave with facial massage',
    '60 minutes',
    55.00,
    'Crown & Blade',
    '789 Royal Court',
    '(555) 987-6543',
    'royal@crownblade.com',
    (SELECT id FROM service_categories WHERE slug = 'barbershop'),
    4.9,
    156
  ),
  (
    'Father & Son Package',
    'Haircuts for father and son with styling',
    '75 minutes',
    65.00,
    'Family Cuts',
    '321 Heritage Lane',
    '(555) 876-5432',
    'book@familycuts.com',
    (SELECT id FROM service_categories WHERE slug = 'barbershop'),
    4.8,
    89
  ),

  -- Additional Nail Care Services
  (
    'Japanese Nail Art',
    'Intricate nail art with premium designs',
    '120 minutes',
    120.00,
    'Tokyo Nails',
    '567 Cherry Blossom Way',
    '(555) 765-4321',
    'art@tokyonails.com',
    (SELECT id FROM service_categories WHERE slug = 'nail-care'),
    4.9,
    167
  ),
  (
    'Organic Spa Pedicure',
    'All-natural pedicure with organic products',
    '75 minutes',
    95.00,
    'Green Beauty Lounge',
    '890 Eco Street',
    '(555) 654-3210',
    'eco@greenbeauty.com',
    (SELECT id FROM service_categories WHERE slug = 'nail-care'),
    4.7,
    134
  ),

  -- Additional Pet Grooming Services
  (
    'Show Dog Grooming',
    'Competition-level grooming service',
    '180 minutes',
    150.00,
    'Elite Pet Salon',
    '123 Champion Circle',
    '(555) 543-2109',
    'show@elitepet.com',
    (SELECT id FROM service_categories WHERE slug = 'pet-grooming'),
    5.0,
    78
  ),
  (
    'Senior Pet Care Package',
    'Gentle grooming for elderly pets',
    '90 minutes',
    85.00,
    'Gentle Paws',
    '456 Comfort Lane',
    '(555) 432-1098',
    'care@gentlepaws.com',
    (SELECT id FROM service_categories WHERE slug = 'pet-grooming'),
    4.9,
    112
  ),

  -- Additional Makeup Services
  (
    'Editorial Makeup',
    'High-fashion editorial makeup',
    '90 minutes',
    175.00,
    'Avant-Garde Beauty',
    '789 Fashion Ave',
    '(555) 321-0987',
    'style@avantgarde.com',
    (SELECT id FROM service_categories WHERE slug = 'makeup'),
    4.8,
    92
  ),
  (
    'Natural Makeup Class',
    'Learn everyday makeup techniques',
    '120 minutes',
    150.00,
    'Beauty Academy',
    '321 Learning Way',
    '(555) 210-9876',
    'learn@beautyacademy.com',
    (SELECT id FROM service_categories WHERE slug = 'makeup'),
    4.7,
    156
  ),

  -- Additional Lashes & Brows Services
  (
    'Hybrid Lash Extensions',
    'Mix of classic and volume lashes',
    '90 minutes',
    175.00,
    'Lash Artistry',
    '567 Beauty Row',
    '(555) 109-8765',
    'hybrid@lashartistry.com',
    (SELECT id FROM service_categories WHERE slug = 'lashes-brows'),
    4.8,
    143
  ),
  (
    'Brow Lamination',
    'Brow restructuring and setting',
    '60 minutes',
    95.00,
    'Brow Lab',
    '890 Style Street',
    '(555) 098-7654',
    'lamination@browlab.com',
    (SELECT id FROM service_categories WHERE slug = 'lashes-brows'),
    4.7,
    167
  ),

  -- Additional Massage Services
  (
    'Hot Stone Therapy',
    'Relaxing massage with heated stones',
    '90 minutes',
    140.00,
    'Stone & Soul Spa',
    '123 Zen Way',
    '(555) 987-6543',
    'stones@soulspa.com',
    (SELECT id FROM service_categories WHERE slug = 'massage'),
    4.9,
    198
  ),
  (
    'Sports Recovery Massage',
    'Targeted massage for athletes',
    '75 minutes',
    120.00,
    'Athletic Recovery Center',
    '456 Sports Blvd',
    '(555) 876-5432',
    'recover@athletic.com',
    (SELECT id FROM service_categories WHERE slug = 'massage'),
    4.8,
    167
  ),

  -- Additional Physiotherapy Services
  (
    'Post-Surgery Rehabilitation',
    'Specialized post-operative care',
    '60 minutes',
    130.00,
    'Recovery Plus',
    '789 Medical Park',
    '(555) 765-4321',
    'rehab@recoveryplus.com',
    (SELECT id FROM service_categories WHERE slug = 'physiotherapy'),
    4.9,
    145
  ),
  (
    'Chronic Pain Management',
    'Long-term pain management therapy',
    '45 minutes',
    100.00,
    'Pain Relief Center',
    '321 Wellness Road',
    '(555) 654-3210',
    'relief@paincare.com',
    (SELECT id FROM service_categories WHERE slug = 'physiotherapy'),
    4.8,
    178
  ),

  -- Additional Depilation Services
  (
    'IPL Hair Removal',
    'Intense Pulsed Light hair removal',
    '45 minutes',
    200.00,
    'Modern Hair Removal',
    '567 Tech Avenue',
    '(555) 543-2109',
    'ipl@modernhair.com',
    (SELECT id FROM service_categories WHERE slug = 'depilation'),
    4.7,
    156
  ),
  (
    'Sugar Waxing',
    'All-natural hair removal',
    '60 minutes',
    85.00,
    'Sweet & Smooth',
    '890 Natural Way',
    '(555) 432-1098',
    'sugar@sweetsmooth.com',
    (SELECT id FROM service_categories WHERE slug = 'depilation'),
    4.8,
    123
  ),

  -- Additional Cosmetology Services
  (
    'LED Light Therapy',
    'Advanced skin treatment with LED',
    '45 minutes',
    95.00,
    'Future Skin',
    '123 Innovation Ave',
    '(555) 321-0987',
    'led@futureskin.com',
    (SELECT id FROM service_categories WHERE slug = 'cosmetology'),
    4.8,
    145
  ),
  (
    'Microdermabrasion',
    'Deep exfoliation treatment',
    '60 minutes',
    130.00,
    'Crystal Clear Skin',
    '456 Glow Street',
    '(555) 210-9876',
    'crystal@clearskin.com',
    (SELECT id FROM service_categories WHERE slug = 'cosmetology'),
    4.7,
    167
  ),

  -- Additional Tattoo & Piercing Services
  (
    'Cover-Up Tattoo',
    'Professional tattoo cover-up work',
    '240 minutes',
    300.00,
    'Second Chance Ink',
    '789 Artist Row',
    '(555) 109-8765',
    'coverup@secondchance.com',
    (SELECT id FROM service_categories WHERE slug = 'tattoo-piercing'),
    4.9,
    189
  ),
  (
    'Microdermal Piercing',
    'Single-point piercing service',
    '45 minutes',
    95.00,
    'Modern Body Art',
    '321 Steel Street',
    '(555) 098-7654',
    'micro@modernbody.com',
    (SELECT id FROM service_categories WHERE slug = 'tattoo-piercing'),
    4.8,
    145
  ),

  -- Additional Spa & Wellness Services
  (
    'Ayurvedic Treatment',
    'Traditional Indian wellness therapy',
    '120 minutes',
    200.00,
    'Ayurveda Wellness',
    '567 Ancient Way',
    '(555) 987-6543',
    'ayur@wellness.com',
    (SELECT id FROM service_categories WHERE slug = 'spa-wellness'),
    4.9,
    167
  ),
  (
    'Salt Cave Therapy',
    'Halotherapy session',
    '45 minutes',
    75.00,
    'Salt & Soul',
    '890 Mineral Lane',
    '(555) 876-5432',
    'salt@soultherapy.com',
    (SELECT id FROM service_categories WHERE slug = 'spa-wellness'),
    4.7,
    134
  ),

  -- Additional Personal Training Services
  (
    'HIIT Training',
    'High-intensity interval training',
    '45 minutes',
    70.00,
    'Burn Studio',
    '123 Intensity Road',
    '(555) 765-4321',
    'hiit@burnstudio.com',
    (SELECT id FROM service_categories WHERE slug = 'personal-training'),
    4.8,
    178
  ),
  (
    'Senior Fitness Program',
    'Customized training for seniors',
    '60 minutes',
    75.00,
    'Active Aging',
    '456 Vitality Street',
    '(555) 654-3210',
    'senior@activeaging.com',
    (SELECT id FROM service_categories WHERE slug = 'personal-training'),
    4.9,
    145
  ),

  -- Additional Aesthetic Medicine Services
  (
    'PDO Thread Lift',
    'Non-surgical face lifting',
    '90 minutes',
    600.00,
    'Advanced Aesthetics',
    '789 Youth Avenue',
    '(555) 543-2109',
    'lift@advancedaesthetics.com',
    (SELECT id FROM service_categories WHERE slug = 'aesthetic-medicine'),
    4.8,
    167
  ),
  (
    'Vampire Facial',
    'PRP facial treatment',
    '75 minutes',
    450.00,
    'Regenerative Beauty',
    '321 Revival Lane',
    '(555) 432-1098',
    'prp@regenbeauty.com',
    (SELECT id FROM service_categories WHERE slug = 'aesthetic-medicine'),
    4.7,
    134
  )
ON CONFLICT DO NOTHING;