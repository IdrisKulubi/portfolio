'use client';

import { motion } from "framer-motion";
import { ProjectFilterOption } from "@/types/project";
import { cn } from "@/lib/utils";
import { useCallback } from "react";

interface ProjectFilterProps {
  categories: ProjectFilterOption[];
  activeCategory: string;
  onChange: (category: string) => void;
}

export function ProjectFilter({ categories, activeCategory, onChange }: ProjectFilterProps) {
  const handleCategoryChange = useCallback((category: string) => {
    onChange(category);
  }, [onChange]);

  return (
    <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
      {categories.map((category) => (
        <FilterButton
          key={category.value}
          category={category}
          isActive={activeCategory === category.value}
          onClick={handleCategoryChange}
        />
      ))}
    </div>
  );
}

interface FilterButtonProps {
  category: ProjectFilterOption;
  isActive: boolean;
  onClick: (category: string) => void;
}

function FilterButton({ category, isActive, onClick }: FilterButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(category.value)}
      className={cn(
        "relative px-4 py-2 rounded-full text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
        isActive
          ? "bg-primary text-primary-foreground"
          : "bg-muted hover:bg-muted/80 text-muted-foreground"
      )}
    >
      {isActive && (
        <motion.span
          layoutId="activeFilterIndicator"
          className="absolute inset-0 bg-primary rounded-full"
          initial={false}
          transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
        />
      )}
      <span className="relative z-10">{category.label}</span>
    </motion.button>
  );
} 