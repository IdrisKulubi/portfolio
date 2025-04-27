import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "1",
    title: "Evergreen Brand Identity",
    slug: "evergreen-brand-identity",
    category: "branding",
    tags: ["Logo Design", "Brand Guidelines", "Visual Identity"],
    thumbnail: {
      src: "/images/projects/evergreen/thumbnail.jpg",
      alt: "Evergreen brand identity",
      width: 800,
      height: 600
    },
    images: [
      {
        src: "/images/projects/evergreen/image-1.jpg",
        alt: "Evergreen logo design",
        width: 1200,
        height: 800
      },
      {
        src: "/images/projects/evergreen/image-2.jpg",
        alt: "Evergreen business cards",
        width: 1200,
        height: 800
      },
      {
        src: "/images/projects/evergreen/image-3.jpg",
        alt: "Evergreen brand guidelines",
        width: 1200,
        height: 800
      }
    ],
    client: "Evergreen Sustainability",
    year: 2023,
    description: "A comprehensive brand identity for Evergreen, a sustainability consulting firm. The identity reflects the company's commitment to environmental stewardship through a modern and timeless design language.",
    challenge: "Evergreen needed a brand identity that would convey their expertise in sustainability while appealing to corporate clients. The challenge was to create a visual language that balanced professionalism with environmental consciousness.",
    solution: "I developed a versatile logo and visual system that incorporates organic forms and a sustainable color palette. The identity includes custom iconography, typography guidelines, and application examples across various touchpoints.",
    featured: true,
    createdAt: "2023-06-15"
  },
  {
    id: "2",
    title: "Harmony Music App",
    slug: "harmony-music-app",
    category: "ui-ux",
    tags: ["UI Design", "User Experience", "Mobile App"],
    thumbnail: {
      src: "/images/projects/harmony/thumbnail.jpg",
      alt: "Harmony music app interface",
      width: 800,
      height: 600
    },
    images: [
      {
        src: "/images/projects/harmony/image-1.jpg",
        alt: "Harmony app screens",
        width: 1200,
        height: 800
      },
      {
        src: "/images/projects/harmony/image-2.jpg",
        alt: "Harmony user flow",
        width: 1200,
        height: 800
      },
      {
        src: "/images/projects/harmony/image-3.jpg",
        alt: "Harmony design system",
        width: 1200,
        height: 800
      }
    ],
    client: "Harmony Music",
    year: 2022,
    description: "Harmony is a music streaming app designed for classical music enthusiasts. The interface organizes content by composers, periods, and instruments to enhance discovery.",
    challenge: "Classical music has unique organization requirements compared to popular music. The challenge was to create an intuitive interface that respects the complexity of classical music while making it accessible to both novices and experts.",
    solution: "I designed a unique browsing experience that allows users to navigate by different attributes of classical music. The UI features elegant typography and subtle animations that reflect the mood of the music.",
    featured: true,
    createdAt: "2022-11-10"
  },
  {
    id: "3",
    title: "Urban Jungle Illustrations",
    slug: "urban-jungle-illustrations",
    category: "illustration",
    tags: ["Digital Illustration", "Character Design", "Editorial"],
    thumbnail: {
      src: "/images/projects/urban-jungle/thumbnail.jpg",
      alt: "Urban Jungle illustration series",
      width: 800,
      height: 600
    },
    images: [
      {
        src: "/images/projects/urban-jungle/image-1.jpg",
        alt: "Urban Jungle main illustration",
        width: 1200,
        height: 800
      },
      {
        src: "/images/projects/urban-jungle/image-2.jpg",
        alt: "Urban Jungle characters",
        width: 1200,
        height: 800
      },
      {
        src: "/images/projects/urban-jungle/image-3.jpg",
        alt: "Urban Jungle color palette",
        width: 1200,
        height: 800
      }
    ],
    client: "Urbanite Magazine",
    year: 2022,
    description: "A series of editorial illustrations for Urbanite Magazine's feature on urban wildlife. The illustrations blend realistic city environments with stylized animal characters.",
    featured: false,
    createdAt: "2022-08-05"
  },
  {
    id: "4",
    title: "Artisan Coffee Packaging",
    slug: "artisan-coffee-packaging",
    category: "packaging",
    tags: ["Packaging Design", "Typography", "Print Production"],
    thumbnail: {
      src: "/images/projects/artisan-coffee/thumbnail.jpg",
      alt: "Artisan coffee packaging",
      width: 800,
      height: 600
    },
    images: [
      {
        src: "/images/projects/artisan-coffee/image-1.jpg",
        alt: "Artisan coffee bag design",
        width: 1200,
        height: 800
      },
      {
        src: "/images/projects/artisan-coffee/image-2.jpg",
        alt: "Artisan coffee label details",
        width: 1200,
        height: 800
      },
      {
        src: "/images/projects/artisan-coffee/image-3.jpg",
        alt: "Artisan coffee packaging family",
        width: 1200,
        height: 800
      }
    ],
    client: "Artisan Roasters",
    year: 2021,
    description: "Premium packaging design for an artisanal coffee roastery. Each blend features a unique illustrative element that reflects its origin and flavor profile.",
    challenge: "Artisan Roasters needed packaging that would stand out on crowded retail shelves while communicating the premium quality of their single-origin coffees.",
    solution: "I created a cohesive packaging system with a distinct visual language for each coffee origin. The designs feature hand-drawn illustrations and a tactile uncoated paper stock with selective spot varnish.",
    featured: true,
    createdAt: "2021-10-22"
  },
  {
    id: "5",
    title: "Wellness Center Website",
    slug: "wellness-center-website",
    category: "web-design",
    tags: ["Web Design", "Responsive", "User Experience"],
    thumbnail: {
      src: "/images/projects/wellness/thumbnail.jpg",
      alt: "Wellness center website",
      width: 800,
      height: 600
    },
    images: [
      {
        src: "/images/projects/wellness/image-1.jpg",
        alt: "Wellness center homepage",
        width: 1200,
        height: 800
      },
      {
        src: "/images/projects/wellness/image-2.jpg",
        alt: "Wellness center mobile views",
        width: 1200,
        height: 800
      },
      {
        src: "/images/projects/wellness/image-3.jpg",
        alt: "Wellness center booking flow",
        width: 1200,
        height: 800
      }
    ],
    client: "Serenity Wellness",
    year: 2021,
    description: "A responsive website for a holistic wellness center. The design emphasizes tranquility and accessibility, making it easy for clients to find information and book services.",
    featured: false,
    createdAt: "2021-05-18"
  },
  {
    id: "6",
    title: "Tech Conference Branding",
    slug: "tech-conference-branding",
    category: "branding",
    tags: ["Event Branding", "Print Design", "Digital Assets"],
    thumbnail: {
      src: "/images/projects/tech-conf/thumbnail.jpg",
      alt: "Tech conference branding",
      width: 800,
      height: 600
    },
    images: [
      {
        src: "/images/projects/tech-conf/image-1.jpg",
        alt: "Tech conference logo variations",
        width: 1200,
        height: 800
      },
      {
        src: "/images/projects/tech-conf/image-2.jpg",
        alt: "Tech conference promotional materials",
        width: 1200,
        height: 800
      },
      {
        src: "/images/projects/tech-conf/image-3.jpg",
        alt: "Tech conference digital assets",
        width: 1200,
        height: 800
      }
    ],
    client: "FutureTech Summit",
    year: 2023,
    description: "Complete branding for an annual technology conference. The visual identity combines tech-inspired geometric elements with vibrant gradients to create an energetic and forward-thinking look.",
    featured: false,
    createdAt: "2023-02-14"
  },
  {
    id: "7",
    title: "Ocean Conservation Campaign",
    slug: "ocean-conservation-campaign",
    category: "print",
    tags: ["Poster Design", "Campaign", "Environmental"],
    thumbnail: {
      src: "/images/projects/ocean/thumbnail.jpg",
      alt: "Ocean conservation campaign posters",
      width: 800,
      height: 600
    },
    images: [
      {
        src: "/images/projects/ocean/image-1.jpg",
        alt: "Ocean conservation main poster",
        width: 1200,
        height: 800
      },
      {
        src: "/images/projects/ocean/image-2.jpg",
        alt: "Ocean conservation series of posters",
        width: 1200,
        height: 800
      },
      {
        src: "/images/projects/ocean/image-3.jpg",
        alt: "Ocean conservation campaign in context",
        width: 1200,
        height: 800
      }
    ],
    client: "Marine Protection Alliance",
    year: 2022,
    description: "A series of impactful posters for an ocean conservation awareness campaign. The designs use powerful imagery and compelling typography to communicate the urgency of marine protection.",
    featured: false,
    createdAt: "2022-06-08"
  },
  {
    id: "8",
    title: "Wave Music Visualizer",
    slug: "wave-music-visualizer",
    category: "motion",
    tags: ["Motion Graphics", "Animation", "Audio Reactive"],
    thumbnail: {
      src: "/images/projects/wave/thumbnail.jpg",
      alt: "Wave music visualizer",
      width: 800,
      height: 600
    },
    images: [
      {
        src: "/images/projects/wave/image-1.jpg",
        alt: "Wave visualizer key frames",
        width: 1200,
        height: 800
      },
      {
        src: "/images/projects/wave/image-2.jpg",
        alt: "Wave visualizer color studies",
        width: 1200,
        height: 800
      },
      {
        src: "/images/projects/wave/image-3.jpg",
        alt: "Wave visualizer in use",
        width: 1200,
        height: 800
      }
    ],
    client: "Independent Music Label",
    year: 2023,
    description: "An audio-reactive motion graphics piece that visualizes music through organic wave forms. The animation responds to different frequency ranges, creating a hypnotic visual experience that complements the audio.",
    featured: true,
    createdAt: "2023-01-20"
  }
]; 