"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BriefcaseIcon, GraduationCapIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ExperienceType = "work" | "education";

interface ExperienceItem {
  type: ExperienceType;
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  skills?: string[];
}

const experienceData: ExperienceItem[] = [
  {
    type: "work",
    title: "Senior Frontend Developer",
    organization: "TechCorp Inc.",
    location: "San Francisco, CA",
    period: "2021 - Present",
    description: "Led the development of the company's flagship SaaS product. Implemented new features, optimized performance, and mentored junior developers. Reduced load times by 40% through code splitting and lazy loading strategies.",
    skills: ["React", "TypeScript", "Next.js", "Redux", "Tailwind CSS"]
  },
  {
    type: "work",
    title: "Frontend Developer",
    organization: "WebSolutions LLC",
    location: "Austin, TX",
    period: "2018 - 2021",
    description: "Designed and developed responsive web applications for clients in various industries. Collaborated with UX designers to implement pixel-perfect interfaces and animations. Maintained legacy code and migrated projects to modern frameworks.",
    skills: ["JavaScript", "React", "CSS/SCSS", "RESTful APIs", "Git"]
  },
  {
    type: "education",
    title: "M.S. in Computer Science",
    organization: "Tech University",
    location: "Boston, MA",
    period: "2016 - 2018",
    description: "Specialized in Human-Computer Interaction and Web Technologies. Completed thesis on 'Optimizing User Experience in Progressive Web Applications'. Participated in various hackathons and coding competitions.",
  },
  {
    type: "work",
    title: "Junior Web Developer",
    organization: "Digital Agency",
    location: "Chicago, IL",
    period: "2015 - 2018",
    description: "Developed and maintained websites for small to medium businesses. Created responsive layouts and implemented CMS solutions. Assisted senior developers with complex projects and debugging tasks.",
    skills: ["HTML", "CSS", "JavaScript", "PHP", "WordPress"]
  },
  {
    type: "education",
    title: "B.S. in Computer Science",
    organization: "State University",
    location: "Chicago, IL",
    period: "2011 - 2015",
    description: "Graduated with honors. Focused on web development and software engineering. Active member of the Computer Science Student Association. Completed several internships with local tech companies.",
  }
];

export function Experience() {
  const [filter, setFilter] = useState<ExperienceType | "all">("all");
  
  const filteredExperience = experienceData.filter(item => 
    filter === "all" || item.type === filter
  );

  return (
    <Section className="py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Experience & Education</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            My professional journey and educational background that have shaped my expertise.
          </p>
        </motion.div>
        
        <div className="flex justify-center mb-10 space-x-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "work" ? "default" : "outline"}
            onClick={() => setFilter("work")}
          >
            <BriefcaseIcon className="mr-2 h-4 w-4" />
            Work
          </Button>
          <Button
            variant={filter === "education" ? "default" : "outline"}
            onClick={() => setFilter("education")}
          >
            <GraduationCapIcon className="mr-2 h-4 w-4" />
            Education
          </Button>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative border-l border-muted-foreground/20 pl-6 ml-4 md:ml-6">
            {filteredExperience.map((item, index) => (
              <motion.div
                key={`${item.type}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-12 relative"
              >
                <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full border border-muted-foreground/20 bg-background flex items-center justify-center">
                  {item.type === "work" ? (
                    <BriefcaseIcon className="h-3 w-3 text-primary" />
                  ) : (
                    <GraduationCapIcon className="h-3 w-3 text-primary" />
                  )}
                </div>
                
                <div className={cn(
                  "bg-muted/30 rounded-lg p-6 shadow-sm",
                  "border border-muted-foreground/10"
                )}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <Badge variant="outline" className="md:ml-2 mt-1 md:mt-0 self-start md:self-center">
                      {item.period}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-4">
                    {item.organization} • {item.location}
                  </div>
                  
                  <p className="mb-4">{item.description}</p>
                  
                  {item.skills && item.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map(skill => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
} 