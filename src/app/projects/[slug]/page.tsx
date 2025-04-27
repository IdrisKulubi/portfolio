import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getRelatedProjects } from "@/lib/projects";
import { ProjectDetail } from "@/components/sections/projects/project-detail";
import { RelatedProjects } from "@/components/sections/projects/related-projects";

// Define the correct type for params according to Next.js 15
type ProjectPageParams = Promise<{ slug: string }>;

// Generate metadata for the page
export async function generateMetadata({ params }: { params: ProjectPageParams }): Promise<Metadata> {
  // Await the params promise
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);
  
  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found."
    };
  }
  
  return {
    title: `${project.title} - Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: project.thumbnail.src,
          width: project.thumbnail.width,
          height: project.thumbnail.height,
          alt: project.thumbnail.alt
        }
      ]
    }
  };
}

export default async function ProjectPage({ params }: { params: ProjectPageParams }) {
  // Await the params promise
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);
  
  if (!project) {
    notFound();
  }
  
  const relatedProjects = await getRelatedProjects(resolvedParams.slug, 3);
  
  return (
    <main className="flex-1">
      <ProjectDetail project={project} />
      
      {relatedProjects.length > 0 && (
        <RelatedProjects projects={relatedProjects} />
      )}
    </main>
  );
} 