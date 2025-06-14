
-- Create profiles table for admin users
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Update existing table policies to require authentication for write operations
DROP POLICY IF EXISTS "Allow public read on personal_info" ON public.personal_info;
DROP POLICY IF EXISTS "Allow public read on services" ON public.services;
DROP POLICY IF EXISTS "Allow public read on projects" ON public.projects;

-- Create new policies with public read but authenticated write
CREATE POLICY "Allow public read on personal_info" ON public.personal_info FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to manage personal_info" ON public.personal_info FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read on services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to manage services" ON public.services FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read on projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to manage projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');

-- Create function to handle new user signup and create profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'admin');
  RETURN new;
END;
$$;

-- Create trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
