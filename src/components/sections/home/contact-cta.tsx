'use client';

import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { useId, useMemo } from "react";
import { cn } from "@/lib/utils";

// Helper function to generate deterministic "random" values based on seed
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface ContactData {
  email?: string;
  phone?: string | null;
  socials?: Array<{ type: string; url: string }> | null;
  address?: string | null;
}

export function ContactCta({ contact }: { contact?: ContactData | null }) {
  const id = useId();
  const decorCount = 5;
  
  // Use a deterministic approach for the decorative elements
  const decorElements = useMemo(() => {
    return Array.from({ length: decorCount }).map((_, index) => {
      // Use index as seed to generate stable values
      const seed1 = index * 1.1;
      const seed2 = index * 2.2;
      const seed3 = index * 3.3;
      const seed4 = index * 4.4;
      const seed5 = index * 5.5;
      const seed6 = index * 6.6;
      
      return {
        width: seededRandom(seed1) * 200 + 50,
        height: seededRandom(seed2) * 200 + 50,
        top: seededRandom(seed3) * 100,
        left: seededRandom(seed4) * 100,
        x: seededRandom(seed5) * 30 - 15,
        y: seededRandom(seed6) * 30 - 15,
        duration: seededRandom(index) * 5 + 10,
      };
    });
  }, []);

  return (
    <Section className="py-24 relative overflow-hidden" id="contact-cta">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
        {decorElements.map((decor, index) => (
          <motion.div
            key={`${id}-decor-${index}`}
            className={cn(
              "absolute rounded-full opacity-20",
              index % 3 === 0 ? "bg-primary" : 
              index % 3 === 1 ? "bg-secondary" : 
              "bg-accent"
            )}
            style={{
              width: decor.width,
              height: decor.height,
              top: `${decor.top}%`,
              left: `${decor.left}%`,
              filter: "blur(60px)"
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              x: [0, decor.x],
              y: [0, decor.y],
              scale: 1
            }}
            transition={{
              duration: decor.duration,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      
      <div className="container px-4 md:px-6 relative">
        <div className="bg-card rounded-2xl border border-border p-8 md:p-12 max-w-4xl mx-auto shadow-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Let's work together to create something extraordinary. Get in touch to discuss your ideas and requirements.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8"
          >
            {contact?.email && (
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                <a href={`mailto:${contact.email}`}>
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </a>
              </Button>
            )}
            
            {contact?.phone && (
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                <a href={`tel:${contact.phone}`}>
                  <Phone className="h-4 w-4" />
                  {contact.phone}
                </a>
              </Button>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center"
          >
            <Button asChild size="lg" className="gap-2">
              <Link href="/contact" className="group">
                Contact Me
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </Section>
  );
} 