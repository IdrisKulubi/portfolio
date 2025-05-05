import { HeroSection } from "@/components/sections/hero/hero-section";
import { FeaturedProjects } from "@/components/sections/home/featured-projects";
import { SkillsShowcase } from "@/components/sections/home/skills-showcase";
import { Services } from "@/components/sections/home/services";
import { getAbout } from "@/lib/actions/about-actions";
import { getFeaturedProjects } from "@/lib/actions/project-actions";
import { getContact } from "@/lib/actions/contact-actions";
import { ContactCta } from "@/components/sections/contact/contact-cta";

export default async function HomePage() {
  // Fetch data needed for sections
  const about = await getAbout();
  const featuredProjects = await getFeaturedProjects(3);
  const contact = await getContact();
  
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <FeaturedProjects projects={featuredProjects} />
      <SkillsShowcase skills={about?.skills ?? []} />
      <Services />
      <ContactCta contact={contact} />
    </main>
  );
}
