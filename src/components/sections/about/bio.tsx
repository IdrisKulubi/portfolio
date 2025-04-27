'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarIcon, MapPinIcon, MailIcon, LinkedinIcon, DribbbleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Palette, Sparkles } from 'lucide-react';
import { Section } from "@/components/ui/section";

interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

interface PersonalDetail {
  icon: React.ReactNode;
  label: string;
  value: string;
}

// Create a custom Behance icon
const BehanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M8.197 11.217c5.05 0 5.05 5.566 0 5.566h-4.93v-5.566z" />
    <path d="M3.267 5.566h4.93c2.526 0 3.838 1.588 3.838 3.4 0 4.166-6.251 2.866-6.251 2.866z" />
    <path d="M16.5 17.5c1.906 0 3.5-1.594 3.5-3.5s-1.594-3.5-3.5-3.5-3.5 1.594-3.5 3.5 1.594 3.5 3.5 3.5z" />
    <path d="M20.5 10h-7" />
  </svg>
);

export function Bio() {
  const socialLinks: SocialLink[] = [
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/graphicdesignerprofile",
      icon: <LinkedinIcon className="h-5 w-5" />
    },
    {
      platform: "Behance",
      url: "https://behance.net/graphicdesigner",
      icon: <BehanceIcon className="h-5 w-5" />
    },
    {
      platform: "Dribbble",
      url: "https://dribbble.com/graphicdesigner",
      icon: <DribbbleIcon className="h-5 w-5" />
    }
  ];

  const personalDetails: PersonalDetail[] = [
    {
      icon: <CalendarIcon className="h-4 w-4" />,
      label: "Experience",
      value: "8+ Years"
    },
    {
      icon: <MapPinIcon className="h-4 w-4" />,
      label: "Location",
      value: "New York, NY"
    },
    {
      icon: <MailIcon className="h-4 w-4" />,
      label: "Email",
      value: "jane.doe.design@email.com"
    }
  ];

  return (
    <Section className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 flex justify-center"
          >
            <div className="relative w-64 h-64 lg:w-full lg:h-auto lg:aspect-square overflow-hidden rounded-2xl border-4 border-primary/10">
              <Image
                src="/images/profile.jpg"
                alt="Profile Picture"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 16rem, 33vw"
                priority
              />
            </div>
          </motion.div>

          {/* Bio Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="flex flex-col h-full justify-between">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-4xl font-bold mb-2">Jane Doe</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="default" className="text-sm gap-1"><Palette className="h-3 w-3"/> Graphic Designer</Badge>
                  <Badge variant="secondary" className="text-sm gap-1"><Briefcase className="h-3 w-3"/> Branding Specialist</Badge>
                  <Badge variant="outline" className="text-sm gap-1"><Sparkles className="h-3 w-3"/> UI/UX Enthusiast</Badge>
                </div>
              </div>

              {/* Bio Text */}
              <div className="prose prose-lg dark:prose-invert mb-6 max-w-none">
                <p>
                  I&apos;m a passionate and creative Graphic Designer with over 8 years of experience 
                  in crafting compelling visual identities, engaging digital experiences, and impactful print materials.
                  I thrive on transforming complex ideas into elegant, user-centered designs.
                </p>
                <p>
                  My expertise lies in branding, UI/UX design, and illustration. I believe that great 
                  design is a blend of aesthetic appeal, strategic thinking, and seamless functionality. 
                  I&apos;m dedicated to delivering visually stunning solutions that resonate with audiences and achieve business goals.
                </p>
                <p>
                  Outside of design, I draw inspiration from modern art, photography, and exploring urban landscapes.
                  I&apos;m always eager to collaborate on exciting projects and connect with fellow creatives.
                </p>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {personalDetails.map((detail, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex-shrink-0 h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                      {detail.icon}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{detail.label}</p>
                      <p className="font-medium">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    asChild
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.icon}
                      <span>{link.platform}</span>
                    </a>
                  </Button>
                ))}
                <Button className="gap-2">
                  <a href="/jane_doe_resume.pdf" download="Jane_Doe_CV.pdf">
                    Download CV
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
} 