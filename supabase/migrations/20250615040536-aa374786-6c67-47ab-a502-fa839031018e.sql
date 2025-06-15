
-- Create a table for experiences
CREATE TABLE public.experiences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  employment_type TEXT NOT NULL DEFAULT 'Full-time',
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  description TEXT,
  skills TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add some sample data
INSERT INTO public.experiences (title, company, location, employment_type, start_date, end_date, is_current, description, skills) VALUES
(
  'Full Stack Developer',
  'Tech Innovate Ltd',
  'Jakarta, Indonesia',
  'Full-time',
  '2022-01-01',
  NULL,
  true,
  'Developing and maintaining web applications using React, Node.js, and PostgreSQL. Collaborating with cross-functional teams to deliver high-quality software solutions.',
  ARRAY['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'AWS']
),
(
  'Frontend Developer',
  'Digital Solutions Inc',
  'Bandung, Indonesia',
  'Full-time',
  '2020-06-01',
  '2021-12-31',
  false,
  'Built responsive user interfaces and implemented interactive features for web applications. Worked closely with designers to ensure pixel-perfect implementations.',
  ARRAY['JavaScript', 'React', 'CSS', 'HTML', 'Git']
),
(
  'Junior Web Developer',
  'StartUp Hub',
  'Surabaya, Indonesia',
  'Internship',
  '2019-08-01',
  '2020-05-31',
  false,
  'Assisted in developing company website and learned modern web development practices. Gained experience in agile development methodologies.',
  ARRAY['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'jQuery']
);
