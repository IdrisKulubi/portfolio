import { Metadata } from "next";
import { HeaderPage } from "@/components/layout/header-page";
import { ProjectsGallery } from "@/components/sections/projects/projects-gallery";
import { getProjects } from "@/lib/actions/project-actions";

export const metadata: Metadata = {
  title: "Portfolio - Creative Work",
  description: "Explore my portfolio of graphic design projects including branding, UI/UX design, illustrations, and print media.",
};

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
        <ProjectsGallery projects={projects} />
      </main>
    </>
  );
} 