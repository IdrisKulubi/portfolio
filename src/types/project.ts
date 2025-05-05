export type ProjectCategory = 
  | 'branding' 
  | 'ui-ux' 
  | 'illustration' 
  | 'print' 
  | 'web-design'
  | 'packaging'
  | 'motion';

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  tags: string[];
  thumbnail: ProjectImage;
  images: ProjectImage[];
  client: string | null;
  year: number | null;
  description: string;
  challenge?: string;
  solution?: string;
  featured: boolean;
  createdAt: string;
}

export interface ProjectFilterOption {
  value: string;
  label: string;
}

export const PROJECT_CATEGORIES: ProjectFilterOption[] = [
  { value: 'all', label: 'All Projects' },
  { value: 'branding', label: 'Branding' },
  { value: 'ui-ux', label: 'UI/UX Design' },
  { value: 'illustration', label: 'Illustration' },
  { value: 'print', label: 'Print Design' },
  { value: 'web-design', label: 'Web Design' },
  { value: 'packaging', label: 'Packaging' },
  { value: 'motion', label: 'Motion Graphics' },
]; 