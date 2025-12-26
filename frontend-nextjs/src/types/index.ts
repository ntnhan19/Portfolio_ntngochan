export interface Project {
  id: number;
  title: string;
  description: string;
  content: string; // Nội dung Markdown báo cáo
  tech_stack: string;
  category: string; // "Network Programming", "AI/LLM"...
  repo_url: string;
  demo_url: string;
  image_url?: string;
  created_at: string;
}

export interface Certificate {
  id: number;
  name: string;
  issuer: string;
  type: string;
  date: string;
  url?: string;
  image_url?: string; 
}

export interface Activity {
  id: number;
  name: string;
  role: string;
  description: string;
  date: string;
  image_url?: string;
}

export interface Profile {
  id: number;
  full_name: string;
  title: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  image_url?: string;
}