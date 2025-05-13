'use client';

import { Project } from "@/types/project";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  // Category badge color variants
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'branding':
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
      case 'ui-ux':
        return "bg-violet-500/10 text-violet-500 hover:bg-violet-500/20";
      case 'illustration':
        return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20";
      case 'print':
        return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20";
      case 'web-design':
        return "bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20";
      case 'packaging':
        return "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20";
      case 'motion':
        return "bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
  };

  // Animation variants for staggered entrance
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1
      }
    }
  };

  // Hover animation variants
  const imageVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };
  
  const overlayVariants = {
    hover: { 
      opacity: 0.8,
      transition: { duration: 0.3 }
    }
  };

  const arrowVariants = {
    hover: { 
      x: 2,
      y: -2,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className="group h-full"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <div className="flex flex-col h-full bg-card rounded-lg overflow-hidden border border-border hover:border-primary/20 transition-colors shadow-sm hover:shadow-md">
          {/* Image container */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <motion.div
              whileHover="hover"
              className="h-full"
            >
              <motion.div className="relative h-full" variants={imageVariants}>
                <Image
                  src={project.thumbnail.src}
                  alt={project.thumbnail.alt}
                  fill
                  className="object-contain bg-muted/20"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </motion.div>
              
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 flex items-end justify-start p-4"
                variants={overlayVariants}
                initial={{ opacity: 0 }}
              >
                <div className="flex justify-between items-center w-full">
                  <Badge 
                    className={`px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(project.category)}`}
                  >
                    {project.category.replace('-', ' ')}
                  </Badge>
                  
                  <motion.div
                    className="bg-white rounded-full h-6 w-6 flex items-center justify-center text-black"
                    variants={arrowVariants}
                  >
                    <ArrowUpRight className="h-3 w-3" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Content */}
          <div className="flex flex-col justify-between flex-grow p-4">
            <div>
              <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {project.description}
              </p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-border/50 flex justify-between items-center">
              <div className="text-xs text-muted-foreground">
                {project.client}
              </div>
              <div className="text-xs font-medium">
                {project.year}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 