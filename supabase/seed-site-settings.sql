-- Seed site settings with logo and CEO photo
INSERT INTO site_settings (key, value) VALUES
  ('logo_url', 'https://fukqrltohhzvhcjzgwxb.supabase.co/storage/v1/object/public/site-images/06e1531679cf5905c7eee1476a28091e.png'),
  ('ceo_photo_url', 'https://fukqrltohhzvhcjzgwxb.supabase.co/storage/v1/object/public/site-images/12e3f521b891233424eb2e582c1fbf0f.png')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
