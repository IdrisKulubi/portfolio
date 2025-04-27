'use client';

import { motion } from 'framer-motion';
import { useId } from 'react';
import { cn } from '@/lib/utils';

interface HeaderPageProps {
  title: string;
  subtitle: string;
  color?: 'default' | 'primary' | 'secondary' | 'accent';
}

export function HeaderPage({ 
  title, 
  subtitle,
  color = 'primary'
}: HeaderPageProps) {
  const id = useId();
  
  // Color variants
  const colorVariants = {
    default: 'from-background to-muted/30',
    primary: 'from-background via-primary/5 to-primary/10',
    secondary: 'from-background via-secondary/5 to-secondary/10',
    accent: 'from-primary/5 via-secondary/5 to-background'
  };

  // Animated dots decoration
  const dotCount = 30;
  const dots = Array.from({ length: dotCount });

  return (
    <section className={cn(
      "py-16 md:py-24 lg:py-32 relative overflow-hidden",
      "bg-gradient-to-b",
      colorVariants[color]
    )}>
      {/* Animated background dots */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {dots.map((_, index) => (
          <motion.div
            key={`${id}-dot-${index}`}
            className={cn(
              "absolute rounded-full",
              index % 4 === 0 ? "bg-primary" : 
              index % 4 === 1 ? "bg-secondary" : 
              index % 4 === 2 ? "bg-muted-foreground" : 
              "bg-accent"
            )}
            style={{ 
              width: `${Math.random() * 8 + 4}px`, 
              height: `${Math.random() * 8 + 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 0.6, 
              scale: 1,
              y: [0, Math.random() * 20 - 10],
              x: [0, Math.random() * 20 - 10],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 0.1
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Decorative line */}
          <motion.div 
            className="h-1 w-16 mx-auto bg-primary rounded-full mb-8"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 64, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Title */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl text-muted-foreground md:text-2xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            {subtitle}
          </motion.p>

          {/* Decorative accent */}
          <motion.div 
            className="flex justify-center gap-3 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/70" />
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/40" />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 