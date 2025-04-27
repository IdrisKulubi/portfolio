import { Metadata } from "next";
import { Suspense } from 'react';
import { HeaderPage } from "@/components/layout/header-page";
import { ProjectsGallery } from "@/components/sections/projects/projects-gallery";

export const metadata: Metadata = {
  title: "Portfolio - Creative Work",
  description: "Explore my portfolio of graphic design projects including branding, UI/UX design, illustrations, and print media.",
};

export default async function ProjectsPage() {
  return (
    <>
      <HeaderPage
        title="Portfolio"
        subtitle="A collection of my creative work and design projects"
        color="secondary"
      />
      <main className="flex-1 py-12">
        <Suspense fallback={<div>Loading projects...</div>}>
          <ProjectsGallery />
        </Suspense>
      </main>
    </>
  );
} 