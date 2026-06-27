-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: vehicles
-- ============================================
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  make VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INT NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  transmission VARCHAR(50) NOT NULL,
  fuel_type VARCHAR(50) NOT NULL,
  body_type VARCHAR(50) NOT NULL,
  mileage INT NOT NULL DEFAULT 0,
  condition VARCHAR(50) NOT NULL,
  description TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'sold')),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_vehicles_make ON vehicles(make);
CREATE INDEX idx_vehicles_featured ON vehicles(featured);
CREATE INDEX idx_vehicles_price ON vehicles(price);

-- ============================================
-- TABLE: vehicle_images
-- ============================================
CREATE TABLE vehicle_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_vehicle_images_vehicle_id ON vehicle_images(vehicle_id);

-- ============================================
-- TABLE: vehicle_features
-- ============================================
CREATE TABLE vehicle_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  feature_name VARCHAR(150) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_vehicle_features_vehicle_id ON vehicle_features(vehicle_id);

-- ============================================
-- TABLE: vehicle_categories
-- ============================================
CREATE TABLE vehicle_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  make VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- TABLE: testimonials
-- ============================================
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name VARCHAR(200) NOT NULL,
  customer_role VARCHAR(100),
  quote TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  avatar_url VARCHAR(500),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_testimonials_featured ON testimonials(featured);

-- ============================================
-- TABLE: contact_inquiries
-- ============================================
CREATE TABLE contact_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_contact_inquiries_status ON contact_inquiries(status);

-- ============================================
-- TABLE: procurement_requests
-- ============================================
CREATE TABLE procurement_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  desired_vehicle VARCHAR(300) NOT NULL,
  budget DECIMAL(12,2) NOT NULL,
  requirements TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in-progress', 'completed')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_procurement_requests_status ON procurement_requests(status);

-- ============================================
-- TABLE: sell_car_requests
-- ============================================
CREATE TABLE sell_car_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  vehicle_make VARCHAR(100) NOT NULL,
  vehicle_model VARCHAR(100) NOT NULL,
  vehicle_year INT NOT NULL,
  mileage INT NOT NULL,
  price_expectation DECIMAL(12,2) NOT NULL,
  condition VARCHAR(50) NOT NULL,
  photos_urls TEXT[],
  notes TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'contacted')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_sell_car_requests_status ON sell_car_requests(status);

-- ============================================
-- TABLE: newsletter_subscribers
-- ============================================
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(200) NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- TABLE: admins
-- ============================================
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(200) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(200) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'superadmin')),
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- TABLE: activity_logs
-- ============================================
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES admins(id) ON DELETE SET NULL,
  action VARCHAR(200) NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_activity_logs_admin_id ON activity_logs(admin_id);

-- ============================================
-- TABLE: site_settings
-- ============================================
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(100) NOT NULL UNIQUE,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE procurement_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE sell_car_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ policies (anyone can view vehicles, images, features, testimonials)
CREATE POLICY "Public can view vehicles" ON vehicles FOR SELECT USING (true);
CREATE POLICY "Public can view vehicle_images" ON vehicle_images FOR SELECT USING (true);
CREATE POLICY "Public can view vehicle_features" ON vehicle_features FOR SELECT USING (true);
CREATE POLICY "Public can view vehicle_categories" ON vehicle_categories FOR SELECT USING (true);
CREATE POLICY "Public can view testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public can view site_settings" ON site_settings FOR SELECT USING (true);

-- PUBLIC INSERT policies (anyone can submit forms)
CREATE POLICY "Public can submit inquiries" ON contact_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can submit procurement requests" ON procurement_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can submit sell car requests" ON sell_car_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can subscribe to newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- ADMIN-ONLY policies (using service role key bypasses RLS automatically,
-- so these are mainly to block public access via anon key)
CREATE POLICY "Admins only - manage vehicles" ON vehicles FOR ALL USING (false);
CREATE POLICY "Admins only - manage vehicle_images" ON vehicle_images FOR ALL USING (false);
CREATE POLICY "Admins only - manage vehicle_features" ON vehicle_features FOR ALL USING (false);
CREATE POLICY "Admins only - view inquiries" ON contact_inquiries FOR SELECT USING (false);
CREATE POLICY "Admins only - view procurement" ON procurement_requests FOR SELECT USING (false);
CREATE POLICY "Admins only - view sell requests" ON sell_car_requests FOR SELECT USING (false);
CREATE POLICY "Admins only - manage testimonials" ON testimonials FOR ALL USING (false);
CREATE POLICY "No public access - admins table" ON admins FOR ALL USING (false);
CREATE POLICY "No public access - activity logs" ON activity_logs FOR ALL USING (false);

-- ============================================
-- SEED DATA: Default site settings
-- ============================================
INSERT INTO site_settings (key, value) VALUES
  ('site_name', 'IG Easy Auto Limited'),
  ('site_tagline', 'LUXURY • RELIABILITY • TRUST'),
  ('contact_email', 'info@igeasyauto.com'),
  ('contact_phone_1', '+2348167984867'),
  ('contact_phone_2', '+2348100005213'),
  ('whatsapp_number', '+2348167984867');
