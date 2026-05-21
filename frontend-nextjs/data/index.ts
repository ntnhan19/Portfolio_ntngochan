import profileData from './profile.json';
import projectsData from './projects.json';
import { ProfileData, Project } from '../types';

const basePath = process.env.NODE_ENV === 'production' ? '/Portfolio_ntngochan' : '';

const normalizeAssetPath = (value: string) => {
  if (!value.startsWith('/')) {
    return value;
  }

  if (value.startsWith('/Portfolio_ntngochan/')) {
    const strippedPath = value.replace('/Portfolio_ntngochan', '');
    return `${basePath}${strippedPath}`;
  }

  if (value.startsWith('/images/') || value === '/favicon.ico') {
    return `${basePath}${value}`;
  }

  return value;
};

export const profile = {
  ...profileData,
  avatar: normalizeAssetPath(profileData.avatar),
  certificates: profileData.certificates.map((certificate) => ({
    ...certificate,
    image_url: normalizeAssetPath(certificate.image_url),
  })),
  activities: profileData.activities.map((activity) => ({
    ...activity,
    image_url: normalizeAssetPath(activity.image_url),
  })),
} as ProfileData;

export const projects = projectsData.map((project) => ({
  ...project,
  image_url: normalizeAssetPath(project.image_url),
})) as Project[];

export const certificates = profile.certificates;
export const activities = profile.activities;
