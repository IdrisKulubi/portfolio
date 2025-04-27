"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";

interface Skill {
  name: string;
  level: number; // 1-10
  category: string;
}

export function Skills() {
  const [activeTab, setActiveTab] = useState("design"); // Default to design skills
  
  const skills: Skill[] = [
    // Design Skills
    { name: "Branding & Identity", level: 9, category: "design" },
    { name: "UI Design", level: 8, category: "design" },
    { name: "UX Design", level: 7, category: "design" },
    { name: "Typography", level: 9, category: "design" },
    { name: "Illustration", level: 8, category: "design" },
    { name: "Layout & Composition", level: 9, category: "design" },
    { name: "Print Design", level: 7, category: "design" },
    { name: "Web Design", level: 8, category: "design" },
    { name: "Iconography", level: 7, category: "design" },

    // Software Proficiency
    { name: "Adobe Photoshop", level: 9, category: "software" },
    { name: "Adobe Illustrator", level: 9, category: "software" },
    { name: "Adobe InDesign", level: 8, category: "software" },
    { name: "Figma", level: 9, category: "software" },
    { name: "Sketch", level: 7, category: "software" },
    { name: "Adobe XD", level: 7, category: "software" },
    { name: "Procreate", level: 6, category: "software" },

    // Soft Skills
    { name: "Creativity", level: 9, category: "soft" },
    { name: "Communication", level: 8, category: "soft" },
    { name: "Problem Solving", level: 8, category: "soft" },
    { name: "Attention to Detail", level: 9, category: "soft" },
    { name: "Time Management", level: 8, category: "soft" },
    { name: "Client Collaboration", level: 9, category: "soft" },
    { name: "Adaptability", level: 7, category: "soft" },
  ];

  const filteredSkills = activeTab === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeTab);

  const categories = [
    { id: "design", name: "Design Skills" },
    { id: "software", name: "Software" },
    { id: "soft", name: "Soft Skills" },
    { id: "all", name: "All Skills" },
  ];

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
    },
  };

  return (
    <Section id="skills" className="py-16 bg-muted/30">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight mb-3"
          >
            Skills & Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground max-w-2xl"
          >
            Leveraging a blend of creative talent and technical proficiency to deliver outstanding visual solutions.
          </motion.p>
        </div>

        <Tabs defaultValue="design" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4">
              {categories.map(category => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  className="bg-card rounded-lg p-4 border border-border hover:border-primary/20 transition-colors"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{skill.name}</h3>
                    <Badge variant={getBadgeVariant(skill.level)} className="text-xs">
                      {getSkillLevelText(skill.level)}
                    </Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <motion.div
                      className={`h-2.5 rounded-full ${getProgressColorClass(skill.level)}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level * 10}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.05 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </Section>
  );
}

// Helper functions
function getSkillLevelText(level: number): string {
  if (level >= 9) return "Expert";
  if (level >= 7) return "Advanced";
  if (level >= 5) return "Intermediate";
  return "Beginner";
}

function getBadgeVariant(level: number): "default" | "secondary" | "outline" {
  if (level >= 8) return "default";
  if (level >= 6) return "secondary";
  return "outline";
}

function getProgressColorClass(level: number): string {
  if (level >= 8) return "bg-primary";
  if (level >= 6) return "bg-secondary";
  return "bg-muted-foreground";
} 