import { Metadata } from "next";
import { HeaderPage } from "@/components/layout/header-page";
import { ProjectsGallery } from "@/components/sections/projects/projects-gallery";
import { getProjects } from "@/lib/actions/project-actions";
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "Portfolio - Creative Work",
  description: "Explore my portfolio of graphic design projects including branding, UI/UX design, illustrations, and print media.",
};

// Basic Loading Component
function GalleryLoading() {
  return (
    <div className="container py-10 text-center">
      <p className="text-muted-foreground">Loading projects...</p>
      {/* You could add a spinner or skeleton loaders here */}
    </div>
  );
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <>
      <HeaderPage
        title="Portfolio"
        subtitle="A collection of my creative work and design projects"
        color="secondary"
      />
      <main className="flex-1 py-12">
        <Suspense fallback={<GalleryLoading />}>
          <ProjectsGallery projects={projects} />
        </Suspense>
      </main>
    </>
  );
} 