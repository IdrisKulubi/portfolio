"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Section } from "@/components/ui/section";

export function Skills({ skills }: { skills: string[] }) {
  const [activeTab, setActiveTab] = useState("all");
  const filteredSkills = skills;
  const categories = [
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
  if (!skills.length) return null;
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
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-1">
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
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill}
                  variants={itemVariants}
                  className="bg-card rounded-lg p-4 border border-border hover:border-primary/20 transition-colors"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{skill}</h3>
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