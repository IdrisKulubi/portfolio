"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Lightbulb, Palette, Code } from "lucide-react";

export function Skills({ 
  skills, 
  description = "Leveraging a blend of creative talent and technical proficiency to deliver outstanding visual solutions." 
}: { 
  skills: string[]; 
  description?: string;
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Slightly faster stagger
        delayChildren: 0.2, // Add a small delay before starting
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.95 }, // Start slightly lower and smaller
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      }
    },
  };
  
  const cardHover = {
    hover: {
      y: -5,
      scale: 1.03,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", // Tailwind shadow-lg
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  }

  if (!skills || skills.length === 0) return null;

  // Helper to get an icon based on skill name (basic example)
  const getSkillIcon = (skill: string) => {
    const lowerSkill = skill.toLowerCase();
    if (lowerSkill.includes('design') || lowerSkill.includes('illustrator') || lowerSkill.includes('photoshop') || lowerSkill.includes('figma')) {
      return <Palette className="h-5 w-5 text-pink-500" />;
    }
    if (lowerSkill.includes('react') || lowerSkill.includes('next') || lowerSkill.includes('typescript') || lowerSkill.includes('node') || lowerSkill.includes('html') || lowerSkill.includes('css')) {
      return <Code className="h-5 w-5 text-blue-500" />;
    }
    return <Lightbulb className="h-5 w-5 text-amber-500" />;
  };

  return (
    <Section id="skills" className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95] }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary"
          >
            Skills & Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.6, 0.01, 0.05, 0.95] }}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            {description}
          </motion.p>
        </div>

        {/* Removed Tabs structure as only "All Skills" were present */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill}
              variants={itemVariants}
              whileHover="hover"
              className="bg-card rounded-xl p-4 border border-border/50 shadow-sm hover:border-primary/30 transition-all duration-300 cursor-pointer group"
            >
              <motion.div variants={cardHover} className="flex flex-col items-center text-center">
                <div className="mb-3 p-2 bg-primary/10 rounded-full group-hover:bg-primary/15 transition-colors">
                   {getSkillIcon(skill)}
                </div>
                <h3 className="font-medium text-sm md:text-base leading-tight">{skill}</h3>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </Section>
  );
} 