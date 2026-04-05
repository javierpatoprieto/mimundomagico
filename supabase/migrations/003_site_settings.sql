-- Site settings table for CMS
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  label TEXT NOT NULL DEFAULT '',
  description TEXT DEFAULT '',
  type TEXT NOT NULL DEFAULT 'text', -- text | textarea | boolean | number
  category TEXT NOT NULL DEFAULT 'general', -- general | landing | pricing | promo
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read (needed for landing page)
CREATE POLICY "Public read site_settings" ON site_settings
  FOR SELECT USING (true);

-- Only service role can write (from admin panel)
-- Admin panel uses service role key server-side

-- Default values
INSERT INTO site_settings (key, value, label, description, type, category, sort_order) VALUES
  ('hero_title', 'El cuento donde {name} es el héroe', 'Título del hero', 'Usa {name} para el nombre animado', 'text', 'landing', 1),
  ('hero_subtitle', 'Los 7 cuentos clásicos adaptados con el nombre de tu hijo/a como protagonista. Gratis para siempre. Y con un cuento personalizado de regalo.', 'Subtítulo del hero', '', 'textarea', 'landing', 2),
  ('hero_badge', '7 cuentos clásicos GRATIS · 1 cuento personalizado de regalo', 'Badge del hero', 'Texto pequeño encima del título', 'text', 'landing', 3),
  ('hero_cta_primary', '🌟 Empieza la aventura GRATIS', 'Botón principal CTA', '', 'text', 'landing', 4),
  ('pricing_monthly_price', '2,99€', 'Precio mensual (solo visual)', 'El precio real lo controla Stripe', 'text', 'pricing', 1),
  ('pricing_tagline', 'al mes · Cancela cuando quieras', 'Subtexto del precio', '', 'text', 'pricing', 2),
  ('pricing_cta', '¡Empezar Premium!', 'Botón de pago Premium', '', 'text', 'pricing', 3),
  ('pricing_guarantee', 'Sin compromiso · Cancela en 1 clic · Reembolso 7 días', 'Texto de garantía bajo el botón', '', 'text', 'pricing', 4),
  ('promo_banner_enabled', 'false', 'Activar banner promocional', 'Muestra un banner en toda la app', 'boolean', 'promo', 1),
  ('promo_banner_text', '🎉 ¡Oferta de lanzamiento! 50% dto el primer mes con código MAGIC50', 'Texto del banner promo', '', 'text', 'promo', 2),
  ('promo_banner_color', 'amber', 'Color del banner (amber/violet/green/red)', '', 'text', 'promo', 3),
  ('support_email', 'legal@mimundomagico.es', 'Email de soporte', '', 'text', 'general', 1),
  ('app_name', 'Mi Mundo Mágico', 'Nombre de la app', '', 'text', 'general', 2),
  ('maintenance_mode', 'false', 'Modo mantenimiento', 'Muestra página de mantenimiento a todos los usuarios', 'boolean', 'general', 3),
  ('footer_tagline', 'Para todas las noches de "un cuento más, papi". Con amor.', 'Frase del footer', '', 'text', 'general', 4)
ON CONFLICT (key) DO NOTHING;
