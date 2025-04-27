'use client';

import { AnimatedSection } from '@/components/ui/animated-section';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <AnimatedSection
      className={cn('mb-12 max-w-3xl', alignClass[align], className)}
      delay={0.1}
    >
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted-foreground">
          {subtitle}
        </p>
      )}
      <div className="mt-4 h-1 w-20 bg-primary rounded-full" />
    </AnimatedSection>
  );
} 