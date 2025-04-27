'use client';

import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  once?: boolean;
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 50,
  duration = 0.5,
  once = true,
}: AnimatedSectionProps) {
  // Set transform direction based on the direction prop
  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...directionOffset[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom ease curve for smooth animation
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
} 