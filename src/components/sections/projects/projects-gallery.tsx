'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types/project';
import { ProjectCard } from '@/components/projects/project-card';
import { ProjectFilter } from '@/components/projects/project-filter';
import { PROJECT_CATEGORIES } from '@/types/project';
import { getProjects } from '@/lib/projects';
import { Section } from '@/components/ui/section';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export function ProjectsGallery() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // Get the category from URL or default to 'all'
  const categoryParam = searchParams.get('category') || 'all';
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(categoryParam);

  // Fetch projects when category changes
  useEffect(() => {
    async function loadProjects() {
      setIsLoading(true);
      try {
        const data = await getProjects({ 
          category: activeCategory === 'all' ? undefined : activeCategory 
        });
        setProjects(data);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadProjects();
  }, [activeCategory]);

  // Update URL when category changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    // Create new URLSearchParams
    const params = new URLSearchParams(searchParams);
    
    // Update or remove the category parameter
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    
    // Update the URL
    router.push(`${pathname}?${params.toString()}`);
  };

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <Section className="py-16">
      <div className="container">
        {/* Introduction Text */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg text-muted-foreground"
          >
            Browse through my creative projects spanning across various design disciplines. 
            Each project represents a unique challenge and solution crafted with passion and attention to detail.
          </motion.p>
        </div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ProjectFilter
            categories={PROJECT_CATEGORIES}
            activeCategory={activeCategory}
            onChange={handleCategoryChange}
          />
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-20"
            >
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-12"
                >
                  <p className="text-muted-foreground">
                    No projects found in this category. Please try another filter.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
} 