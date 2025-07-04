export interface PersonalInfo {
  id: string;
  name: string;
  title: string;
  description: string;
  email: string;
  github_url?: string;
  linkedin_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  image_url?: string;
  features: string[];
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  category?: string;
  status?: string;
  categories?: string[];
  technologies: string[];
  github_url?: string;
  demo_url?: string;
  award?: string;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  employment_type: string;
  start_date: string;
  end_date?: string;
  is_current?: boolean;
  description?: string;
  skills?: string[];
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field_of_study?: string;
  start_date: string;
  end_date?: string;
  is_current?: boolean;
  grade?: string;
  activities?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: boolean;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}