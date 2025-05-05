'use client';

import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Paintbrush, 
  PenTool, 
  Layout, 
  Globe, 
  Image, 
  Type, 
  LucideIcon,
  PackageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

export function Services() {
  // List of services
  const services: Service[] = [
    {
      icon: PenTool,
      title: "Branding & Identity",
      description: "Crafting distinctive brand identities that resonate with your audience and differentiate your business.",
      color: "from-blue-600/20 to-blue-600/5 text-blue-600"
    },
    {
      icon: Layout,
      title: "UI/UX Design",
      description: "Creating intuitive, user-centered digital interfaces that enhance user experience and drive engagement.",
      color: "from-violet-600/20 to-violet-600/5 text-violet-600"
    },
    {
      icon: Globe,
      title: "Web Design",
      description: "Designing responsive websites that combine aesthetic appeal with functional excellence.",
      color: "from-emerald-600/20 to-emerald-600/5 text-emerald-600"
    },
    {
      icon: Paintbrush,
      title: "Illustration",
      description: "Custom illustrations that bring personality and uniqueness to your brand communication.",
      color: "from-amber-600/20 to-amber-600/5 text-amber-600"
    },
    {
      icon: PackageIcon,
      title: "Packaging Design",
      description: "Eye-catching packaging solutions that enhance product presence and consumer experience.",
      color: "from-pink-600/20 to-pink-600/5 text-pink-600"
    },
    {
      icon: Type,
      title: "Typography",
      description: "Custom type design and font selection to enhance visual communication and brand identity.",
      color: "from-indigo-600/20 to-indigo-600/5 text-indigo-600"
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Section className="py-24 bg-muted/30" id="services">
      <div className="container px-4 md:px-6">
        <SectionHeading
          title="Services I Offer"
          subtitle="Specialized design services tailored to meet your specific needs and objectives."
          align="center"
        />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className={cn(
                "h-2 w-full bg-gradient-to-r",
                service.color.split(" ")[0].replace("/20", ""),
                service.color.split(" ")[1].replace("/5", "")
              )} />
              <div className="p-6">
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br",
                  service.color
                )}>
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">
              Discuss Your Project
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
} 