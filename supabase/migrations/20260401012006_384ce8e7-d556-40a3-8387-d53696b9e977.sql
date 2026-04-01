
-- Create storage bucket for site images
INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true);

-- Allow anyone to view images
CREATE POLICY "Anyone can view site images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'site-images');

-- Allow admins to upload images
CREATE POLICY "Admins can upload site images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'site-images' 
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Allow admins to update images
CREATE POLICY "Admins can update site images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'site-images' 
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Allow admins to delete images
CREATE POLICY "Admins can delete site images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'site-images' 
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Add unique constraint on site_content for upsert
ALTER TABLE public.site_content ADD CONSTRAINT site_content_section_key_unique UNIQUE (section, key);
