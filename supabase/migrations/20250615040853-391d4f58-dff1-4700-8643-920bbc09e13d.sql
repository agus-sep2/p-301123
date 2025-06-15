
-- Create a table for education
CREATE TABLE public.education (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  grade TEXT,
  activities TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for site settings
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value BOOLEAN NOT NULL DEFAULT true,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add sample education data
INSERT INTO public.education (institution, degree, field_of_study, start_date, end_date, is_current, grade, description) VALUES
(
  'Universitas Indonesia',
  'Bachelor of Computer Science',
  'Computer Science',
  '2016-08-01',
  '2020-06-30',
  false,
  '3.75/4.00',
  'Focused on software engineering, data structures, and algorithms. Participated in programming competitions and hackathons.'
),
(
  'SMA Negeri 1 Jakarta',
  'High School Diploma',
  'Natural Sciences',
  '2013-07-01',
  '2016-06-30',
  false,
  '92/100',
  'Specialized in Mathematics and Physics. Active member of the computer club and robotics team.'
);

-- Add default site settings
INSERT INTO public.site_settings (setting_key, setting_value, description) VALUES
('show_experience_section', true, 'Show/hide the experience section on the portfolio'),
('show_education_section', true, 'Show/hide the education section on the portfolio');
