'use client';

import { useState } from 'react';
import { HeroCanvas } from '@/components/three/hero-canvas';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowDown } from 'lucide-react';

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-950 dark:bg-gray-950">
      {/* Loading Spinner - Hidden when loaded */}
      <div
        className={cn(
          'absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-950 transition-opacity duration-500 ease-in-out dark:bg-gray-950',
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        )}
      >
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-primary-foreground">Creating Experience...</p>
      </div>

      {/* Three.js Canvas - Ensure it has priority rendering */}
      <div className="relative z-0 h-full w-full">
        <HeroCanvas setIsLoaded={setIsLoaded} />
      </div>

      {/* Content Overlay - Fades in when loaded */}
      <div
        className={cn(
          'absolute inset-0 z-10 flex flex-col items-center justify-center p-4 transition-opacity duration-1000 ease-in-out delay-300',
           isLoaded ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div className="text-center max-w-3xl mx-auto backdrop-blur-sm bg-black/30 dark:bg-black/50 p-8 rounded-xl shadow-lg">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Clement
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-prose mx-auto">
            Creative Graphic Designer & Digital Artist transforming ideas into compelling visual narratives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="default" className="bg-white text-black hover:bg-gray-200 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              View Portfolio
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 dark:border-white dark:text-white dark:hover:bg-white/10">
              Contact Me
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Fades in when loaded */}
      <div
        className={cn(
          'absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-opacity duration-1000 ease-in-out delay-500',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
      >
        <ArrowDown className="w-6 h-6 text-white" />
      </div>
    </div>
  );
} 