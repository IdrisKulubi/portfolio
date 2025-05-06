import { Metadata } from "next";
import { HeaderPage } from "@/components/layout/header-page";
import { Skills } from "@/components/sections/about/skills";
import { ExperienceTimeline } from "@/components/sections/about/experience-timeline";
import { DownloadCV } from "@/components/sections/about/download-cv";
import { Bio } from "@/components/sections/about/bio";
import { getAbout } from "@/lib/actions/about-actions";

export const metadata: Metadata = {
  title: "About - Portfolio",
  description: "Learn about my professional background, skills, and experience",
};

export default async function AboutPage() {
  const about = await getAbout();
  
  // Default skill description - we could add this to the database schema in the future
  const skillsDescription = "Leveraging a blend of creative talent and technical proficiency to deliver outstanding visual solutions.";
  
  // Default experience section text
  const experienceTitle = "My Journey";
  const experienceSubtitle = "A timeline of my professional experience and education.";
  
  return (
    <>
      <HeaderPage
        title="About Me"
        subtitle="My background, expertise, and professional journey"
      />
      <main className="flex-1">
        <Bio about={about} />
        <Skills 
          skills={about?.skills ?? []} 
          description={skillsDescription}
        />
        <ExperienceTimeline
          title={experienceTitle}
          subtitle={experienceSubtitle}
          experience={
            (about?.experience ?? []).map(exp => ({
              title: exp.role,
              organization: exp.company,
              description: exp.description ?? '',
              date: exp.end ? `${exp.start} - ${exp.end}` : exp.start,
            }))
          }
        />
        <DownloadCV />
      </main>
    </>
  );
} 