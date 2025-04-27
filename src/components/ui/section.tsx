import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id, ...props }: SectionProps) {
  return (
    <section id={id} className={cn("w-full", className)} {...props}>
      {children}
    </section>
  );
} 