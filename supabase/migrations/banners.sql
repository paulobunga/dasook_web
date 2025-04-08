-- Create the banner-images bucket in storage
INSERT INTO storage.buckets (id, name, public) 
VALUES ('banner-images', 'banner-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up public access policy for the banner-images bucket
INSERT INTO storage.policies (name, definition, bucket_id)
VALUES (
  'Public Banner Images Policy',
  '(bucket_id = ''banner-images''::text)',
  'banner-images'
)
ON CONFLICT (name, bucket_id) DO NOTHING;

-- Create the banners table
CREATE TABLE IF NOT EXISTS public.banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_url TEXT,
  position TEXT NOT NULL,
  status TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  clicks INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a function to increment banner clicks
CREATE OR REPLACE FUNCTION increment_banner_clicks(banner_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.banners
  SET clicks = clicks + 1
  WHERE id = banner_id;
END;
$$ LANGUAGE plpgsql;

-- Create RLS policies for the banners table
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to select banners
CREATE POLICY "Authenticated users can select banners"
ON public.banners
FOR SELECT
TO authenticated
USING (true);

-- Policy for authenticated users to insert banners
CREATE POLICY "Authenticated users can insert banners"
ON public.banners
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy for authenticated users to update their own banners
CREATE POLICY "Authenticated users can update banners"
ON public.banners
FOR UPDATE
TO authenticated
USING (true);

-- Policy for authenticated users to delete their own banners
CREATE POLICY "Authenticated users can delete banners"
ON public.banners
FOR DELETE
TO authenticated
USING (true);

-- Create an index on the status column for faster filtering
CREATE INDEX IF NOT EXISTS idx_banners_status ON public.banners(status);

-- Create an index on the position column for faster filtering
CREATE INDEX IF NOT EXISTS idx_banners_position ON public.banners(position);
