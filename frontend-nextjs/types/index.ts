export interface Project {
  id: number;
  title: string;
  description: string;
  content: string;
  tech_stack: string;
  category: string;
  repo_url?: string;
  demo_url?: string;
  image_url: string;
  highlights?: string;
  duration?: string;
  team_size?: string;
}

export interface Certificate {
  id: number;
  name: string;
  issuer: string;
  type: string;
  date: string;
  image_url: string;
  url?: string;
}

export interface Activity {
  id: number;
  name: string;
  role: string;
  description: string;
  date: string;
  image_url: string;
}

export interface Profile {
  full_name: string;
  title: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  avatar: string;
}

export interface ProfileData extends Profile {
  certificates: Certificate[];
  activities: Activity[];
}
