-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  parent_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  products_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS categories_parent_id_idx ON categories(parent_id);
CREATE INDEX IF NOT EXISTS categories_slug_idx ON categories(slug);

-- Create storage bucket for category images
INSERT INTO storage.buckets (id, name, public) VALUES ('category-images', 'Category Images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policy to allow public access to category images
CREATE POLICY "Category Images Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'category-images');

-- Set up storage policy to allow authenticated users to upload category images
CREATE POLICY "Authenticated Users Can Upload Category Images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'category-images');

-- Set up storage policy to allow authenticated users to update their own category images
CREATE POLICY "Authenticated Users Can Update Category Images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'category-images');

-- Set up storage policy to allow authenticated users to delete category images
CREATE POLICY "Authenticated Users Can Delete Category Images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'category-images');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE ON categories
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create RLS policies for categories table
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Allow public read access to categories
CREATE POLICY "Allow public read access to categories"
ON categories FOR SELECT
USING (true);

-- Allow authenticated users to insert categories
CREATE POLICY "Allow authenticated users to insert categories"
ON categories FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update categories
CREATE POLICY "Allow authenticated users to update categories"
ON categories FOR UPDATE
TO authenticated
USING (true);

-- Allow authenticated users to delete categories
CREATE POLICY "Allow authenticated users to delete categories"
ON categories FOR DELETE
TO authenticated
USING (true);
