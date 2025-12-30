-- LukGood Database Schema
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('customer', 'beautician')),
  avatar_url TEXT,
  location GEOGRAPHY(POINT, 4326),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BEAUTICIANS TABLE
-- ============================================
CREATE TABLE beauticians (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  business_name VARCHAR(150) NOT NULL,
  bio TEXT,
  address TEXT NOT NULL,
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  working_hours JSONB DEFAULT '{"open": "09:00", "close": "18:00", "days": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}',
  services_offered TEXT[] NOT NULL DEFAULT '{}',
  profile_photo TEXT,
  cover_photo TEXT,
  phone VARCHAR(20) NOT NULL,
  whatsapp VARCHAR(20),
  is_verified BOOLEAN DEFAULT FALSE,
  rating DECIMAL(2, 1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INVENTORY TABLE
-- ============================================
CREATE TABLE inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  beautician_id UUID NOT NULL REFERENCES beauticians(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('nails', 'makeup', 'wig')),
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  occasion_tags TEXT[] DEFAULT '{}',
  photos TEXT[] NOT NULL DEFAULT '{}',
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- FAVORITES TABLE
-- ============================================
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  beautician_id UUID NOT NULL REFERENCES beauticians(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, beautician_id)
);

-- ============================================
-- CONTACT LOGS TABLE (for analytics)
-- ============================================
CREATE TABLE contact_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  beautician_id UUID NOT NULL REFERENCES beauticians(id) ON DELETE CASCADE,
  contact_type VARCHAR(20) NOT NULL CHECK (contact_type IN ('whatsapp', 'call')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Index for location-based queries on beauticians
CREATE INDEX idx_beauticians_location ON beauticians USING GIST (location);

-- Index for filtering inventory by type
CREATE INDEX idx_inventory_type ON inventory(type);

-- Index for filtering inventory by beautician
CREATE INDEX idx_inventory_beautician ON inventory(beautician_id);

-- Index for user phone lookups
CREATE INDEX idx_users_phone ON users(phone);

-- Index for contact logs analytics
CREATE INDEX idx_contact_logs_beautician ON contact_logs(beautician_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE beauticians ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_logs ENABLE ROW LEVEL SECURITY;

-- Users can read all users but only update their own
CREATE POLICY "Users can view all users" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid()::text = id::text);

-- Anyone can view beauticians (public profiles)
CREATE POLICY "Anyone can view beauticians" ON beauticians FOR SELECT USING (true);
CREATE POLICY "Beauticians can update own profile" ON beauticians FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Beauticians can insert own profile" ON beauticians FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Anyone can view available inventory
CREATE POLICY "Anyone can view inventory" ON inventory FOR SELECT USING (is_available = true);
CREATE POLICY "Beauticians can manage own inventory" ON inventory FOR ALL USING (
  beautician_id IN (SELECT id FROM beauticians WHERE user_id::text = auth.uid()::text)
);

-- Users can manage their own favorites
CREATE POLICY "Users can view own favorites" ON favorites FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can manage own favorites" ON favorites FOR ALL USING (auth.uid()::text = user_id::text);

-- Contact logs - anyone can insert, beauticians can view their own
CREATE POLICY "Anyone can log contact" ON contact_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Beauticians can view own contact logs" ON contact_logs FOR SELECT USING (
  beautician_id IN (SELECT id FROM beauticians WHERE user_id::text = auth.uid()::text)
);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to find beauticians within a radius (in kilometers)
CREATE OR REPLACE FUNCTION find_nearby_beauticians(
  user_lat DOUBLE PRECISION,
  user_lng DOUBLE PRECISION,
  radius_km DOUBLE PRECISION DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  business_name VARCHAR,
  bio TEXT,
  address TEXT,
  services_offered TEXT[],
  profile_photo TEXT,
  phone VARCHAR,
  whatsapp VARCHAR,
  is_verified BOOLEAN,
  rating DECIMAL,
  review_count INTEGER,
  distance_km DOUBLE PRECISION
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    b.id,
    b.user_id,
    b.business_name,
    b.bio,
    b.address,
    b.services_offered,
    b.profile_photo,
    b.phone,
    b.whatsapp,
    b.is_verified,
    b.rating,
    b.review_count,
    ST_Distance(
      b.location::geography,
      ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography
    ) / 1000 AS distance_km
  FROM beauticians b
  WHERE ST_DWithin(
    b.location::geography,
    ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography,
    radius_km * 1000
  )
  ORDER BY distance_km;
END;
$$ LANGUAGE plpgsql;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_beauticians_updated_at
  BEFORE UPDATE ON beauticians
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_inventory_updated_at
  BEFORE UPDATE ON inventory
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
