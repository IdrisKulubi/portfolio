'use client';

import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter, LucideIcon, PenTool, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useId, useMemo } from "react";
import { cn } from "@/lib/utils";

interface ContactData {
  email: string;
  phone?: string | null;
  socials?: Array<{ type: string; url: string }> | null;
  address?: string | null;
}

type ContactDetail = {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  color: string;
};

// Helper function to generate deterministic "random" values based on seed
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function ContactInfo({ contact }: { contact?: ContactData | null }) {
  const id = useId();
  const decorCount = 10;
  
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
        width: seededRandom(seed1) * 300 + 100,
        height: seededRandom(seed2) * 300 + 100,
        top: seededRandom(seed3) * 100,
        left: seededRandom(seed4) * 100,
        x: seededRandom(seed5) * 50 - 25,
        y: seededRandom(seed6) * 50 - 25,
        duration: seededRandom(index) * 10 + 10,
      };
    });
  }, []);

  if (!contact) {
    return (
      <Section className="py-20">
        <div className="container text-center text-muted-foreground">
          Contact information is not available.
        </div>
      </Section>
    );
  }

  const contactDetails: ContactDetail[] = [
    contact.email
      ? {
          icon: Mail,
          label: "Email",
          value: contact.email,
          href: `mailto:${contact.email}`,
          color: "from-blue-500/20 to-blue-500/10 text-blue-500",
        }
      : undefined,
    contact.phone
      ? {
          icon: Phone,
          label: "Phone",
          value: contact.phone,
          href: `tel:${contact.phone}`,
          color: "from-emerald-500/20 to-emerald-500/10 text-emerald-500",
        }
      : undefined,
    contact.address
      ? {
          icon: MapPin,
          label: "Location",
          value: contact.address,
          color: "from-amber-500/20 to-amber-500/10 text-amber-500",
        }
      : undefined,
  ].filter((d): d is ContactDetail => !!d);

  const socialIconMap: Record<string, LucideIcon> = {
    linkedin: Linkedin,
    instagram: Instagram,
    twitter: Twitter,
  };

  const socialLinks = (contact.socials || []).map(social => ({
    icon: socialIconMap[social.type.toLowerCase()] || Linkedin,
    href: social.url,
    label: social.type.charAt(0).toUpperCase() + social.type.slice(1),
    color:
      social.type.toLowerCase() === "linkedin"
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : social.type.toLowerCase() === "instagram"
        ? "bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 text-white hover:from-pink-600 hover:via-purple-600 hover:to-orange-500"
        : social.type.toLowerCase() === "twitter"
        ? "bg-sky-500 text-white hover:bg-sky-600"
        : "bg-muted text-foreground",
  }));

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  // Card hover animation
  const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.03, 
      y: -5,
      transition: { 
        type: "spring", 
        stiffness: 400,
        damping: 17
      }
    }
  };

  return (
    <Section className="py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-40">
        {decorElements.map((decor, index) => (
          <motion.div
            key={`${id}-decor-${index}`}
            className={cn(
              "absolute rounded-full opacity-30",
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

      <div className="container relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          {/* Introduction Text with decorative elements */}
          <motion.div variants={fadeInUp} className="text-center mb-16 relative">
            {/* Decorative shapes */}
            <motion.div 
              className="absolute top-0 left-1/2 -translate-x-1/2 -mt-10 text-primary"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Sparkles className="h-6 w-6" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">
              Let&apos;s Connect
            </h2>
            
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full" />
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities 
              to be part of your vision. Feel free to reach out through any of the channels below.
            </p>
            
            <motion.div 
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-secondary"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <PenTool className="h-5 w-5" />
            </motion.div>
          </motion.div>

          {/* Contact Details Grid */}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {contactDetails.map((detail, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="relative"
              >
                <motion.div
                  variants={cardHover}
                  className={cn(
                    "flex flex-col items-center text-center p-8 rounded-2xl backdrop-blur-sm shadow-lg",
                    "bg-white/5 dark:bg-black/5 border border-white/20 dark:border-black/20"
                  )}
                >
                  {/* Background gradient */}
                  <div className={cn(
                    "absolute inset-0 rounded-2xl opacity-20 -z-10 bg-gradient-to-br",
                    detail.color
                  )}/>
                  
                  <div className={cn(
                    "mb-5 p-4 rounded-full bg-gradient-to-br",
                    detail.color
                  )}>
                    <detail.icon className="h-6 w-6" />
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2">{detail.label}</h3>
                  
                  {detail.href ? (
                    <a 
                      href={detail.href}
                      className="text-muted-foreground hover:text-primary transition-colors break-all relative group"
                    >
                      {detail.value}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                    </a>
                  ) : (
                    <p className="text-muted-foreground break-all">{detail.value}</p>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div 
            variants={fadeInUp} 
            className="text-center bg-card/30 backdrop-blur-sm rounded-xl p-8 border border-border/50"
          >
            <h3 className="text-xl font-semibold mb-8">Follow My Work</h3>
            <div className="flex justify-center gap-6">
              {socialLinks.map((link, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 rounded-full opacity-75 blur-sm bg-gradient-to-r from-primary to-secondary group-hover:opacity-100 transition duration-300" />
                  <Button 
                    className={cn(
                      "relative h-12 w-12 rounded-full",
                      link.color
                    )}
                    size="icon" 
                    asChild
                  >
                    <a 
                      href={link.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label={link.label}
                    >
                      <link.icon className="h-5 w-5" />
                      <span className="sr-only">{link.label}</span>
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}