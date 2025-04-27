import { Metadata } from "next";
import { HeaderPage } from "@/components/layout/header-page";
import { AboutHero } from "@/components/sections/about/hero";
import { Skills } from "@/components/sections/about/skills";
import { ExperienceTimeline } from "@/components/sections/about/experience-timeline";
import { DownloadCV } from "@/components/sections/about/download-cv";

export const metadata: Metadata = {
  title: "About - Portfolio",
  description: "Learn about my professional background, skills, and experience",
};

export default function AboutPage() {
  return (
    <>
      <HeaderPage
        title="About Me"
        subtitle="My background, expertise, and professional journey"
      />
      <main className="flex-1">
        <AboutHero />
        <Skills />
        <ExperienceTimeline />
        <DownloadCV />
      </main>
    </>
  );
} 