
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
  category: string;
  status: string;
  technologies: string[];
  github_url?: string;
  demo_url?: string;
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
