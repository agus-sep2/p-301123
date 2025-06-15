
-- Add award column to projects table
ALTER TABLE projects ADD COLUMN award TEXT;

-- Insert an example award-winning project
INSERT INTO projects (
  title,
  description,
  category,
  status,
  technologies,
  github_url,
  demo_url,
  image_url,
  award
) VALUES (
  'Smart Campus Management System',
  'A comprehensive web application for managing university operations including student enrollment, course management, and administrative tasks. Built with modern technologies and featuring real-time notifications, advanced analytics dashboard, and mobile-responsive design.',
  'Frontend',
  'Completed',
  ARRAY['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Socket.io', 'Tailwind CSS'],
  'https://github.com/username/smart-campus-system',
  'https://smart-campus-demo.vercel.app',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80',
  '1st Place - University Innovation Contest 2024'
);
