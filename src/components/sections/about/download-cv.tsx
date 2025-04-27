'use client';

import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { DownloadIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export function DownloadCV() {
  return (
    <Section className="py-16 bg-primary/5">
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4">
            Interested in learning more?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Download my comprehensive CV to get a detailed overview of my skills,
            experience, and accomplishments.
          </p>
          <Button asChild size="lg" className="gap-2">
            <a href="/resume.pdf" download="John_Doe_CV.pdf">
              <DownloadIcon className="h-5 w-5" />
              Download CV
            </a>
          </Button>
        </motion.div>
      </div>
    </Section>
  );
} 