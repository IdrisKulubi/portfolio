'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  createFloatingElements,
  animateFloatingElements,
  createWaveBackground,
  animateWaveBackground,
  isWebGLAvailable,
} from '@/lib/three/scene-elements';

interface HeroCanvasProps {
  setIsLoaded: (isLoaded: boolean) => void;
}

export function HeroCanvas({ setIsLoaded }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const floatingElementsRef = useRef<ReturnType<typeof createFloatingElements>>([]);
  const waveBackgroundRef = useRef<ReturnType<typeof createWaveBackground> | null>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const clockRef = useRef(new THREE.Clock());

  const [hasWebGLSupport, setHasWebGLSupport] = useState(true);

  // Watch for theme changes
  useEffect(() => {
    // Function to update renderer and materials for the current theme
    const updateTheme = () => {
      // Check if we're in dark mode by looking at the html element
      const isDarkMode = document.documentElement.classList.contains('dark');
      console.log(`Theme update: ${isDarkMode ? 'dark mode' : 'light mode'}`);
      
      // If we have access to the scene elements, we could adjust their properties based on theme
      if (waveBackgroundRef.current && waveBackgroundRef.current.material.uniforms) {
        // Optional: Adjust uniforms based on theme
        // Example: waveBackgroundRef.current.material.uniforms.someProperty.value = isDarkMode ? value1 : value2;
      }
    };

    // Initial theme detection
    updateTheme();

    // Set up a mutation observer to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          updateTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleResize = useCallback(() => {
    if (cameraRef.current && rendererRef.current) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      console.log('Resized canvas');
    }
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useEffect(() => {
    console.log('HeroCanvas useEffect started');
    if (!containerRef.current) {
        console.error('Container ref not found');
        return;
    }

    if (!isWebGLAvailable()) {
        setHasWebGLSupport(false);
        setIsLoaded(true);
        console.warn("WebGL is not supported or available.");
        return;
    }
    console.log('WebGL available');

    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      premultipliedAlpha: false,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Set color space for modern Three.js versions
    try {
      if ('outputColorSpace' in renderer) {
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        console.log('Renderer outputColorSpace set to SRGBColorSpace');
      } else {
        console.warn('renderer.outputColorSpace not available. Color space might not be correct.');
        // No reliable fallback for the removed sRGBEncoding needed for now
      }
    } catch (e) {
      console.warn('Could not set color space:', e);
    }
    
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    console.log('Renderer created and appended');

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // Increase brightness
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0); // Increase intensity
    directionalLight.position.set(5, 8, 5);
    scene.add(directionalLight);
    
    // Add a hemisphere light for better ambient lighting based on "sky" and "ground"
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
    scene.add(hemisphereLight);

    // Create scene elements
    floatingElementsRef.current = createFloatingElements();
    floatingElementsRef.current.forEach(el => scene.add(el));
    console.log(`Created ${floatingElementsRef.current.length} floating elements`);

    waveBackgroundRef.current = createWaveBackground();
    scene.add(waveBackgroundRef.current.mesh);
    console.log('Created wave background');

    // Animation loop
    let initialRender = true;
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clockRef.current.getElapsedTime();

      // Animate elements
      animateFloatingElements(floatingElementsRef.current, mouseRef.current, elapsedTime);
      if (waveBackgroundRef.current) {
          animateWaveBackground(waveBackgroundRef.current, mouseRef.current, elapsedTime);
      }

      // Subtle Camera Movement based on mouse
      if (cameraRef.current) {
          const targetX = mouseRef.current.x * 0.1;
          const targetY = mouseRef.current.y * 0.1;
          cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.02;
          cameraRef.current.position.y += (-targetY - cameraRef.current.position.y) * 0.02;
          cameraRef.current.lookAt(scene.position);
      }

      renderer.render(scene, camera);

      if (initialRender) {
          console.log('First render complete');
          setIsLoaded(true);
          initialRender = false;
      }
    };

    console.log('Starting animation loop');
    animate();

    // Event Listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      console.log('Cleaning up HeroCanvas');
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      if (rendererRef.current && containerRef.current && rendererRef.current.domElement) {
          try {
             // eslint-disable-next-line react-hooks/exhaustive-deps
             containerRef.current.removeChild(rendererRef.current.domElement);
          } catch (error) {
              console.warn("Error removing renderer DOM element:", error);
          }
      }
      // Dispose Three.js objects
      floatingElementsRef.current.forEach(el => {
        el.geometry.dispose();
        if (Array.isArray(el.material)) {
            el.material.forEach(m => m.dispose());
        } else {
            el.material.dispose();
        }
      });
      if (waveBackgroundRef.current) {
          waveBackgroundRef.current.mesh.geometry.dispose();
          waveBackgroundRef.current.material.dispose();
      }
      rendererRef.current?.dispose();
      console.log('Three.js resources disposed');

      // Clear refs
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      floatingElementsRef.current = [];
      waveBackgroundRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsLoaded]);

  if (!hasWebGLSupport) {
    return <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-blue-900"><p className="text-white p-4 text-center mt-10">WebGL not supported. Displaying static background.</p></div>;
  }

  // Use a slightly different class to ensure the Three.js canvas is always visible regardless of theme
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-1000 ease-in-out data-[loaded=true]:opacity-100 dark:opacity-0 dark:data-[loaded=true]:opacity-100 dark:pointer-events-auto" 
      data-loaded={!!rendererRef.current} 
      style={{ 
        willChange: 'opacity',
        isolation: 'isolate' // Create a new stacking context to help with z-index issues
      }}
    />
  );
} 