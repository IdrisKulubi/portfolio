import { Project, ProjectCategory } from "@/types/project";
import { projects } from "@/data/projects";

/**
 * Get all projects with optional filtering
 */
export async function getProjects(options?: {
  category?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Project[]> {
  // Simulate DB fetch delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  let filteredProjects = [...projects];
  
  // Filter by category if provided
  if (options?.category && options.category !== 'all') {
    filteredProjects = filteredProjects.filter(
      project => project.category === options.category as ProjectCategory
    );
  }
  
  // Filter featured projects if requested
  if (options?.featured !== undefined) {
    filteredProjects = filteredProjects.filter(
      project => project.featured === options.featured
    );
  }
  
  // Sort projects by date (newest first)
  filteredProjects.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  // Limit number of projects if requested
  if (options?.limit) {
    filteredProjects = filteredProjects.slice(0, options.limit);
  }
  
  return filteredProjects;
}

/**
 * Get a project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  // Simulate DB fetch delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const project = projects.find(p => p.slug === slug);
  return project || null;
}

/**
 * Get featured projects
 */
export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  return getProjects({ featured: true, limit });
}

/**
 * Get related projects based on category and excludes current project
 */
export async function getRelatedProjects(currentSlug: string, limit = 3): Promise<Project[]> {
  const currentProject = await getProjectBySlug(currentSlug);
  
  if (!currentProject) return [];
  
  const relatedProjects = projects.filter(project => 
    project.category === currentProject.category && project.slug !== currentSlug
  );
  
  // If not enough related projects by category, add some other projects
  if (relatedProjects.length < limit) {
    const otherProjects = projects.filter(project => 
      project.category !== currentProject.category && project.slug !== currentSlug
    );
    
    return [...relatedProjects, ...otherProjects].slice(0, limit);
  }
  
  return relatedProjects.slice(0, limit);
} 