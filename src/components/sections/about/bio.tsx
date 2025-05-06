'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarIcon, MapPinIcon, MailIcon, LinkedinIcon, DribbbleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Palette, Sparkles } from 'lucide-react';
import { Section } from "@/components/ui/section";
import { getContact } from "@/lib/actions/contact-actions";
import { useEffect, useState } from "react";

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

interface ContactInfo {
  id: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  socials?: Array<{ type: string; url: string }> | null;
  createdAt: Date;
  resume?: string | null;
}

interface BioProps {
  about: {
    id: string;
    bio: string;
    hero: { headline: string; subheadline?: string; image?: string } | null;
    skills: string[];
    experience: Array<{
      company: string;
      role: string;
      start: string;
      end?: string;
      description?: string;
    }> | null;
    createdAt: Date;
  } | null;
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

export function Bio({ about }: BioProps) {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      const contact = await getContact();
      setContactInfo(contact);
    };

    fetchContactInfo();
  }, []);

  if (!about) {
    return (
      <Section className="py-16">
        <div className="container text-center text-muted-foreground">
          Bio information is not available.
        </div>
      </Section>
    );
  }

  // Extract years of experience from the earliest experience entry
  const getExperienceYears = () => {
    if (!about.experience || about.experience.length === 0) return "N/A";
    
    // Find earliest start date
    const startDates = about.experience.map(exp => {
      const year = parseInt(exp.start.split(' ')[1] || exp.start);
      return isNaN(year) ? new Date().getFullYear() : year;
    });
    
    const earliestYear = Math.min(...startDates);
    const yearsOfExperience = new Date().getFullYear() - earliestYear;
    
    return `${yearsOfExperience}+ Years`;
  };
  
  // Get social links from contact info if available, otherwise use fallbacks
  const getSocialIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'linkedin':
        return <LinkedinIcon className="h-5 w-5" />;
      case 'behance':
        return <BehanceIcon className="h-5 w-5" />;
      case 'dribbble':
        return <DribbbleIcon className="h-5 w-5" />;
      default:
        return <LinkedinIcon className="h-5 w-5" />;
    }
  };

  // Use socials from contact info if available
  const socialLinks: SocialLink[] = contactInfo?.socials?.map(social => ({
    platform: social.type,
    url: social.url,
    icon: getSocialIcon(social.type)
  })) || [
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

  // Generate personal details from about data
  const personalDetails: PersonalDetail[] = [
    {
      icon: <CalendarIcon className="h-4 w-4" />,
      label: "Experience",
      value: getExperienceYears()
    },
    {
      icon: <MapPinIcon className="h-4 w-4" />,
      label: "Location",
      value: contactInfo?.address || "New York, NY"
    },
    {
      icon: <MailIcon className="h-4 w-4" />,
      label: "Email",
      value: contactInfo?.email || "jane.doe.design@email.com"
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
                src={about.hero?.image || "/images/profile.jpg"}
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
                <h1 className="text-4xl font-bold mb-2">{about.hero?.headline || "Clement"}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  {about.skills.slice(0, 3).map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant={index === 0 ? "default" : index === 1 ? "secondary" : "outline"} 
                      className="text-sm gap-1"
                    >
                      {index === 0 && <Palette className="h-3 w-3"/>}
                      {index === 1 && <Briefcase className="h-3 w-3"/>}
                      {index === 2 && <Sparkles className="h-3 w-3"/>}
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Bio Text */}
              <div className="prose prose-lg dark:prose-invert mb-6 max-w-none">
                {about.bio.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
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
                {contactInfo?.resume && (
                  <Button className="gap-2">
                    <a href={contactInfo.resume} download>
                      Download CV
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
} 