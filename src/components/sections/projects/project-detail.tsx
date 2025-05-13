'use client';

import { Project } from "@/types/project";
import { motion } from "framer-motion";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <Section className="pt-12 pb-16 md:pt-16 md:pb-24">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Project Info */}
            <div>
              <motion.div variants={fadeInUp}>
                <Link href="/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to All Projects
                </Link>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              >
                {project.title}
              </motion.h1>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-6">
                <Badge className="px-2.5 py-0.5">
                  {project.category.replace('-', ' ')}
                </Badge>
                
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-2.5 py-0.5">
                    {tag}
                  </Badge>
                ))}
              </motion.div>
              
              <motion.p 
                variants={fadeInUp}
                className="text-muted-foreground mb-8"
              >
                {project.description}
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                className="grid grid-cols-2 gap-6 mb-8"
              >
                <div>
                  <h4 className="text-sm font-medium mb-1">Client</h4>
                  <p className="text-muted-foreground">{project.client}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Year</h4>
                  <p className="text-muted-foreground">{project.year}</p>
                </div>
              </motion.div>
            </div>
            
            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="lg:order-first"
            >
              <div className="rounded-lg overflow-hidden border border-border">
                <Image
                  src={project.thumbnail.src}
                  alt={project.thumbnail.alt}
                  width={project.thumbnail.width}
                  height={project.thumbnail.height}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Section>
      
      {/* Project Details Section */}
      <Section className="py-16 bg-muted/30">
        <div className="container">
          <Tabs defaultValue="gallery" className="w-full">
            <div className="flex justify-center mb-10">
              <TabsList>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                {project.challenge && (
                  <TabsTrigger value="details">Project Details</TabsTrigger>
                )}
              </TabsList>
            </div>
            
            <TabsContent value="gallery" className="focus-visible:outline-none">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {project.images.map((image, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeInUp}
                    className="rounded-lg overflow-hidden border border-border bg-card"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-contain bg-muted/20"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            
            {project.challenge && (
              <TabsContent value="details" className="focus-visible:outline-none">
                <div className="max-w-3xl mx-auto">
                  <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="space-y-12"
                  >
                    <motion.div variants={fadeInUp} className="bg-card border border-border rounded-lg p-8">
                      <h3 className="text-xl font-semibold mb-4">The Challenge</h3>
                      <p className="text-muted-foreground">{project.challenge}</p>
                    </motion.div>
                    
                    {project.solution && (
                      <motion.div variants={fadeInUp} className="bg-card border border-border rounded-lg p-8">
                        <h3 className="text-xl font-semibold mb-4">The Solution</h3>
                        <p className="text-muted-foreground">{project.solution}</p>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </Section>
    </>
  );
} 