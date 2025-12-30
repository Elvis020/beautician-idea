-- LukGood Seed Data
-- Run this AFTER schema.sql to populate with test data
-- These are dummy beauticians in Accra, Ghana

-- ============================================
-- DUMMY USERS (Beauticians)
-- ============================================
INSERT INTO users (id, phone, name, role, location) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-111111111111', '+233241234567', 'Akosua Mensah', 'beautician', ST_SetSRID(ST_MakePoint(-0.1870, 5.6037), 4326)),
  ('a1b2c3d4-e5f6-7890-abcd-222222222222', '+233501234568', 'Ama Darko', 'beautician', ST_SetSRID(ST_MakePoint(-0.2057, 5.5600), 4326)),
  ('a1b2c3d4-e5f6-7890-abcd-333333333333', '+233271234569', 'Efua Asante', 'beautician', ST_SetSRID(ST_MakePoint(-0.1679, 5.6145), 4326)),
  ('a1b2c3d4-e5f6-7890-abcd-444444444444', '+233551234570', 'Adwoa Boateng', 'beautician', ST_SetSRID(ST_MakePoint(-0.2200, 5.5913), 4326)),
  ('a1b2c3d4-e5f6-7890-abcd-555555555555', '+233201234571', 'Yaa Frimpong', 'beautician', ST_SetSRID(ST_MakePoint(-0.1750, 5.6320), 4326));

-- ============================================
-- DUMMY BEAUTICIAN PROFILES
-- ============================================
INSERT INTO beauticians (id, user_id, business_name, bio, address, location, services_offered, phone, whatsapp, is_verified, rating, review_count) VALUES
  (
    'b1b2c3d4-e5f6-7890-abcd-111111111111',
    'a1b2c3d4-e5f6-7890-abcd-111111111111',
    'Akosua Beauty Lounge',
    'Professional nail artist with 5 years experience. Specializing in intricate nail art and gel extensions.',
    'Osu, Oxford Street, Accra',
    ST_SetSRID(ST_MakePoint(-0.1870, 5.6037), 4326),
    ARRAY['nails', 'makeup'],
    '+233241234567',
    '+233241234567',
    true,
    4.8,
    124
  ),
  (
    'b1b2c3d4-e5f6-7890-abcd-222222222222',
    'a1b2c3d4-e5f6-7890-abcd-222222222222',
    'Ama Glam Studio',
    'Your one-stop shop for wigs and makeup. Bridal specialist with celebrity clientele.',
    'East Legon, Accra',
    ST_SetSRID(ST_MakePoint(-0.2057, 5.5600), 4326),
    ARRAY['makeup', 'wig'],
    '+233501234568',
    '+233501234568',
    true,
    4.9,
    89
  ),
  (
    'b1b2c3d4-e5f6-7890-abcd-333333333333',
    'a1b2c3d4-e5f6-7890-abcd-333333333333',
    'Efua Nails & More',
    'Affordable quality nails for every occasion. Walk-ins welcome!',
    'Madina, Accra',
    ST_SetSRID(ST_MakePoint(-0.1679, 5.6145), 4326),
    ARRAY['nails'],
    '+233271234569',
    '+233271234569',
    false,
    4.5,
    56
  ),
  (
    'b1b2c3d4-e5f6-7890-abcd-444444444444',
    'a1b2c3d4-e5f6-7890-abcd-444444444444',
    'Adwoa Wig Palace',
    'Premium human hair wigs and installation. Custom wig making available.',
    'Spintex Road, Accra',
    ST_SetSRID(ST_MakePoint(-0.2200, 5.5913), 4326),
    ARRAY['wig'],
    '+233551234570',
    '+233551234570',
    true,
    4.7,
    203
  ),
  (
    'b1b2c3d4-e5f6-7890-abcd-555555555555',
    'a1b2c3d4-e5f6-7890-abcd-555555555555',
    'Yaa Complete Beauty',
    'Full service beauty salon. Nails, makeup, and wigs all under one roof.',
    'Achimota, Accra',
    ST_SetSRID(ST_MakePoint(-0.1750, 5.6320), 4326),
    ARRAY['nails', 'makeup', 'wig'],
    '+233201234571',
    '+233201234571',
    false,
    4.6,
    78
  );

-- ============================================
-- DUMMY INVENTORY ITEMS
-- ============================================

-- Akosua Beauty Lounge - Nails
INSERT INTO inventory (beautician_id, type, name, description, price, occasion_tags, photos, is_available) VALUES
  ('b1b2c3d4-e5f6-7890-abcd-111111111111', 'nails', 'Classic French Tips', 'Elegant white tips on natural pink base', 80.00, ARRAY['office', 'casual', 'wedding'], ARRAY['https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400'], true),
  ('b1b2c3d4-e5f6-7890-abcd-111111111111', 'nails', 'Glitter Ombre Nails', 'Stunning gradient with gold glitter finish', 120.00, ARRAY['party', 'wedding'], ARRAY['https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400'], true),
  ('b1b2c3d4-e5f6-7890-abcd-111111111111', 'nails', 'Matte Black Stiletto', 'Bold matte black with stiletto shape', 150.00, ARRAY['party', 'funeral'], ARRAY['https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400'], true),
  ('b1b2c3d4-e5f6-7890-abcd-111111111111', 'makeup', 'Natural Glam Makeup', 'Soft, natural look perfect for everyday', 200.00, ARRAY['office', 'casual'], ARRAY['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400'], true);

-- Ama Glam Studio - Makeup & Wigs
INSERT INTO inventory (beautician_id, type, name, description, price, occasion_tags, photos, is_available) VALUES
  ('b1b2c3d4-e5f6-7890-abcd-222222222222', 'makeup', 'Bridal Glam Package', 'Full bridal makeup with lashes and setting spray', 500.00, ARRAY['wedding'], ARRAY['https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400'], true),
  ('b1b2c3d4-e5f6-7890-abcd-222222222222', 'makeup', 'Party Beat Face', 'Bold, camera-ready makeup for special events', 350.00, ARRAY['party'], ARRAY['https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400'], true),
  ('b1b2c3d4-e5f6-7890-abcd-222222222222', 'wig', 'Brazilian Body Wave 18"', 'Premium human hair, pre-plucked lace front', 800.00, ARRAY['wedding', 'party', 'casual'], ARRAY['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400'], true),
  ('b1b2c3d4-e5f6-7890-abcd-222222222222', 'wig', 'Pixie Cut Bob', 'Short and sassy synthetic wig', 250.00, ARRAY['office', 'casual'], ARRAY['https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400'], true);

-- Efua Nails & More - Nails
INSERT INTO inventory (beautician_id, type, name, description, price, occasion_tags, photos, is_available) VALUES
  ('b1b2c3d4-e5f6-7890-abcd-333333333333', 'nails', 'Simple Gel Polish', 'Long-lasting gel polish in any color', 50.00, ARRAY['office', 'casual'], ARRAY['https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400'], true),
  ('b1b2c3d4-e5f6-7890-abcd-333333333333', 'nails', 'Kente Nail Art', 'Traditional Kente patterns on nails', 100.00, ARRAY['wedding', 'party', 'funeral'], ARRAY['https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400'], true),
  ('b1b2c3d4-e5f6-7890-abcd-333333333333', 'nails', 'Chrome Mirror Nails', 'Reflective chrome finish', 130.00, ARRAY['party'], ARRAY['https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400'], true);

-- Adwoa Wig Palace - Wigs
INSERT INTO inventory (beautician_id, type, name, description, price, occasion_tags, photos, is_available) VALUES
  ('b1b2c3d4-e5f6-7890-abcd-444444444444', 'wig', 'Bone Straight 24"', 'Silky straight human hair, HD lace', 1200.00, ARRAY['wedding', 'party'], ARRAY['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400'], true),
  ('b1b2c3d4-e5f6-7890-abcd-444444444444', 'wig', 'Water Wave 20"', 'Natural wave pattern, 13x4 frontal', 950.00, ARRAY['party', 'casual'], ARRAY['https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400'], true),
  ('b1b2c3d4-e5f6-7890-abcd-444444444444', 'wig', 'Kinky Curly 16"', 'Natural afro texture, glueless', 750.00, ARRAY['casual', 'office'], ARRAY['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400'], true),
  ('b1b2c3d4-e5f6-7890-abcd-444444444444', 'wig', 'Blonde Highlight Bob', 'Trendy bob with honey blonde highlights', 650.00, ARRAY['party', 'casual'], ARRAY['https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400'], true);

-- Yaa Complete Beauty - All services
INSERT INTO inventory (beautician_id, type, name, description, price, occasion_tags, photos, is_available) VALUES
  ('b1b2c3d4-e5f6-7890-abcd-555555555555', 'nails', 'Coffin Shape Acrylics', 'Trendy coffin shape with custom design', 140.00, ARRAY['party', 'wedding'], ARRAY['https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400'], true),
  ('b1b2c3d4-e5f6-7890-abcd-555555555555', 'makeup', 'Soft Glam Evening', 'Sophisticated evening look', 280.00, ARRAY['party', 'funeral'], ARRAY['https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400'], true),
  ('b1b2c3d4-e5f6-7890-abcd-555555555555', 'wig', 'Closure Wig 14"', 'Affordable 4x4 closure wig', 400.00, ARRAY['casual', 'office'], ARRAY['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400'], true);
