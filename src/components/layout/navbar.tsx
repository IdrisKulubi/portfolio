'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/app/shared/theme/mode-toggle';

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full py-4 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex items-center justify-between">
          {/* Logo/Brand Name */}
        <Link href="/" className="text-2xl font-bold tracking-tight text-foreground">
          Clement <span className="text-primary">.</span>
        </Link>

        <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild>
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
           <ModeToggle /> 
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden flex items-center">
         <div className="mr-2"><ModeToggle /></div> 
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <Link href="/" className="text-xl font-bold text-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                     Mugoh <span className="text-primary">.</span>
                  </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                  </SheetClose>
                </div>

                <div className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                       <Link
                         href={link.href}
                         className={cn(
                           'text-lg font-medium text-muted-foreground hover:text-foreground transition-colors'
                         )}
                       >
                         {link.label}
                       </Link>
                    </SheetClose>
                  ))}
                </div>

                 {/* Optional: Add Social links or CTA at the bottom */}
                 <div className="mt-auto pt-6 border-t border-border">
                    <Button className="w-full" asChild>
                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Let&apos;s Talk</Link>
                    </Button>
                 </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
} 