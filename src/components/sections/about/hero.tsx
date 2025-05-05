"use client";

import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import Image from "next/image";

export interface HeroData {
  headline: string;
  subheadline?: string;
  image?: string;
}

export function AboutHero({ hero, bio }: { hero?: HeroData | null; bio?: string }) {
  // If there's no bio text provided, return null or a placeholder
  if (!bio) {
    return (
      <Section className="py-16">
        <div className="container text-center text-muted-foreground">
          About information is not available.
        </div>
      </Section>
    );
  }

  // Split the bio into paragraphs for display
  const paragraphs = bio.split('\n\n');

  return (
    <Section className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <h2 className="text-3xl font-bold mb-4 text-primary">{hero?.headline || "Hello, I'm Clement"}</h2>
            {hero?.subheadline && (
              <p className="text-xl mb-2 text-muted-foreground">{hero.subheadline}</p>
            )}
            <div className="space-y-4 text-muted-foreground text-lg">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 md:order-2"
          >
            <div className="relative aspect-[4/5] max-w-sm mx-auto rounded-2xl overflow-hidden border-4 border-primary/10 shadow-xl">
              <Image
                src={hero?.image || "/images/graphic-designer-profile.jpg"}
                alt={hero?.headline || "Jane Doe - Graphic Designer"}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 90vw, 400px"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
} 