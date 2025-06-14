
-- Create table for personal information
CREATE TABLE public.personal_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  email TEXT NOT NULL,
  github_url TEXT,
  linkedin_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for services/skills
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  features TEXT[], -- Array of feature strings
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for projects
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Completed',
  technologies TEXT[], -- Array of technology strings
  github_url TEXT,
  demo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (make tables public for now for portfolio display)
ALTER TABLE public.personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (portfolio website)
CREATE POLICY "Allow public read on personal_info" ON public.personal_info FOR SELECT USING (true);
CREATE POLICY "Allow public read on services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow public read on projects" ON public.projects FOR SELECT USING (true);

-- Insert initial personal information
INSERT INTO public.personal_info (name, title, description, email, github_url, linkedin_url)
VALUES (
  'Muhammad Mahathir',
  'Full Stack Developer & Data Scientist',
  'Full-stack developer passionate about creating innovative digital solutions with modern web technologies and data-driven insights.',
  'muhammad.mahathir.id@gmail.com',
  'https://github.com/Mahathirrr',
  'https://www.linkedin.com/in/muhammad-mahathir/'
);

-- Insert initial services
INSERT INTO public.services (title, description, icon, category, image_url, features) VALUES
('Frontend Development', 'Building modern, responsive web applications with cutting-edge frameworks. Creating interactive user interfaces with clean, maintainable code and optimal performance.', 'Code', 'Frontend', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80', ARRAY['Modern JavaScript Frameworks', 'Responsive Design', 'Component-Based Architecture', 'State Management', 'Performance Optimization', 'User Experience Design']),
('Backend Development', 'Developing robust and scalable backend systems. Building efficient APIs, microservices, and server-side applications with high performance and security.', 'Database', 'Backend', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80', ARRAY['RESTful APIs', 'Microservices Architecture', 'Database Design & Optimization', 'Server-Side Development', 'Authentication & Security', 'Performance & Scalability']),
('Data Science', 'Extracting insights from data through analysis, machine learning, and statistical modeling. Helping businesses make data-driven decisions with predictive analytics.', 'BarChart3', 'Data Science', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80', ARRAY['Python Programming', 'Machine Learning', 'Data Analysis & Visualization', 'Statistical Modeling', 'Data Pipeline Development', 'Business Intelligence']);

-- Insert initial projects
INSERT INTO public.projects (title, description, image_url, category, status, technologies, github_url) VALUES
('Modern E-Commerce Platform', 'Responsive e-commerce application with product catalog, shopping cart, and user authentication featuring clean, maintainable code architecture.', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80', 'Frontend', 'Completed', ARRAY['Vue.js 3', 'Composition API', 'Vuex', 'SCSS', 'Responsive Design'], 'https://github.com/Mahathirrr/vue-ecommerce'),
('High-Performance API Server', 'Scalable REST API server with JWT authentication, database integration, comprehensive testing, and optimized performance.', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80', 'Backend', 'Completed', ARRAY['Golang', 'Gin Framework', 'PostgreSQL', 'JWT', 'Docker'], 'https://github.com/Mahathirrr/golang-api'),
('Business Intelligence Dashboard', 'Interactive data visualization platform for business analytics featuring real-time insights and machine learning predictions.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80', 'Data Science', 'Completed', ARRAY['Python', 'Pandas', 'Plotly', 'Scikit-learn', 'Streamlit'], 'https://github.com/Mahathirrr/data-dashboard'),
('Microservices Architecture', 'Enterprise-grade microservices system with service discovery, load balancing, and distributed tracing for scalable applications.', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80', 'Backend', 'Completed', ARRAY['Golang', 'Docker', 'Kubernetes', 'gRPC', 'Redis'], 'https://github.com/Mahathirrr/microservices'),
('Collaborative Task Manager', 'Real-time task management application with drag-and-drop functionality, team collaboration, and project tracking capabilities.', 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80', 'Frontend', 'Completed', ARRAY['Vue.js', 'Pinia', 'Socket.io', 'TypeScript', 'Tailwind CSS'], 'https://github.com/Mahathirrr/vue-task-manager'),
('ML Pipeline Platform', 'End-to-end machine learning pipeline for predictive analytics including data preprocessing, model training, and automated deployment.', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80', 'Data Science', 'In Progress', ARRAY['Python', 'TensorFlow', 'Apache Airflow', 'MLflow', 'AWS'], 'https://github.com/Mahathirrr/ml-pipeline');
