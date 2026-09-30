export interface Project {
  title: string;
  description: string;
  liveUrl?: string;
  tags: string[];
  gradient: string;
  image?: string;
  wideLogo?: boolean;
}

export const projects: Project[] = [
  {
    title: "Eleve Health",
    description:
      "Health and wellness clinic specializing in hyperbaric oxygen therapy and longevity. Leading growth.",
    liveUrl: "https://elevehealth.com/",
    tags: ["Growth", "Health & Wellness", "Marketing"],
    gradient: "#000000",
    image: "/elevehealth.jpg",
    wideLogo: true,
  },
  {
    title: "GlamHere",
    description:
      "Mobile beauty and styling application connecting users with local beauty professionals and on-demand services.",
    liveUrl: "https://www.glamhereapp.com/",
    tags: ["Mobile", "React Native", "UI/UX"],
    gradient: "#f5edef",
    image: "/glamhere.jpg",
  },
  {
    title: "ETI Technology",
    description:
      "Enterprise technology and innovation company delivering cutting-edge solutions for modern businesses.",
    liveUrl: "https://etitechnology.com/",
    tags: ["Enterprise", "Technology", "Operations"],
    gradient: "#F0EDE6",
    image: "/eti.png",
    wideLogo: true,
  },
  {
    title: "yourautomation.ai",
    description:
      "AI-powered automation platform that streamlines business workflows with intelligent agents and custom pipelines.",
    liveUrl: "https://yourautomation.ai",
    tags: ["AI", "Automation", "Next.js", "SaaS"],
    gradient: "#1a1a2e",
    image: "/yourautomation.png",
  },
  {
    title: "Voyax Health",
    description:
      "Health monitoring platform designed for travelers, providing real-time health tracking and medical resource access worldwide.",
    liveUrl: "https://voyaxhealth.com",
    tags: ["React Native", "Health Tech", "Cloud"],
    gradient: "#e8f4f8",
    image: "/voyaxhealth.png",
  },
  {
    title: "Peptide Guide",
    description:
      "Comprehensive peptide research and reference tool for exploring sequences, properties, and biomedical applications.",
    tags: ["React", "Python", "Research", "API"],
    gradient: "#eef6ee",
    image: "/peptideguide.svg",
  },
  {
    title: "Photo Verify",
    description:
      "Photo verification platform leveraging computer vision and AI to authenticate and validate image integrity.",
    tags: ["AI/ML", "Computer Vision", "React", "Node.js"],
    gradient: "#eeedf5",
    image: "/photoverify.svg",
  },
  {
    title: "AI Agents SDK",
    description:
      "Building and contributing to AI agent development frameworks, enabling autonomous task execution and multi-tool orchestration.",
    tags: ["Python", "AI Agents", "Claude", "SDK"],
    gradient: "#f3f0e8",
  },
  {
    title: "Dinan Solutions",
    description:
      "Enterprise software engineering and cloud architecture solutions powering scalable business infrastructure.",
    liveUrl: "https://dev.zarvx.io/",
    tags: ["Enterprise", "Cloud", "AWS", "Full-Stack"],
    gradient: "#eaeff5",
  },
];
