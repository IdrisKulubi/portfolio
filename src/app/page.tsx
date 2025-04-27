import { HeroSection } from "@/components/sections/hero/hero-section";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection />
      {/* Other page sections will go here */}
      {/* <div className="h-screen bg-gray-100 p-8">Section 2 Content</div>
      <div className="h-screen bg-gray-200 p-8">Section 3 Content</div> */}
    </main>
  );
}
