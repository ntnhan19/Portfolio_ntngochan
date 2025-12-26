// src/types/index.ts
export interface Project {
  id: number;
  title: string;
  description: string;
  content: string;
  tech_stack: string;
  category: string;
  repo_url: string;
  demo_url: string;
  image_url?: string;

  // ⭐ THÊM MỚI
  metrics?: string;      // JSON string
  highlights?: string;   // Comma-separated
  duration?: string;
  team_size?: string;

  created_at: string;
}

export interface Certificate {
  id: number;
  name: string;
  issuer: string;
  type: string; // "Title" | "Award" | "Course"
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
}

export interface BlogPost {
  id: number;
  title: string;
  summary: string;
  content: string;
  cover_image: string;
  tags: string;
  date: string;
  created_at: string;
}