'use client';

import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Code, Paintbrush, Palette, Layout, Monitor, CameraIcon, LucideIcon } from "lucide-react";

interface SkillsShowcaseProps {
  skills: string[];
}

// A mapping of some common skills to icons
const skillIconMap: Record<string, LucideIcon> = {
  "graphic design": Palette,
  "ui design": Layout,
  "ux design": Monitor,
  "web design": Layout,
  "illustration": Paintbrush,
  "photography": CameraIcon,  
  "coding": Code,
};

// A list of colors for the skill cards
const skillColors = [
  "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "bg-violet-500/10 text-violet-500 border-violet-500/20",
  "bg-amber-500/10 text-amber-500 border-amber-500/20",
  "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  "bg-pink-500/10 text-pink-500 border-pink-500/20",
  "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  "bg-rose-500/10 text-rose-500 border-rose-500/20",
];

export function SkillsShowcase({ skills }: SkillsShowcaseProps) {
  if (!skills.length) return null;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <Section className="py-24" id="skills">
      <div className="container px-4 md:px-6">
        <SectionHeading
          title="Skills & Expertise"
          subtitle="A diverse set of skills and tools I use to bring creative visions to life."
          align="center"
        />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {skills.map((skill, index) => {
            const IconComponent = skillIconMap[skill.toLowerCase()] || Palette;
            const colorClass = skillColors[index % skillColors.length];
            
            return (
              <motion.div
                key={skill}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03, 
                  transition: { type: "spring", stiffness: 400, damping: 10 } 
                }}
                className={cn(
                  "flex flex-col items-center justify-center p-6 rounded-xl border",
                  "transition-all duration-300",
                  colorClass
                )}
              >
                <IconComponent className="h-8 w-8 mb-3" />
                <h3 className="font-semibold text-center">{skill}</h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
} 