export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    title: "AI Portfolio Assistant",
    description:
      "An intelligent portfolio management system using React and machine learning algorithms to optimize user engagement and project showcasing.",
    technologies: ["React", "Node.js", "Python", "TensorFlow", "AWS"],
    githubUrl: "https://github.com/OmeedEn/ai-portfolio",
    liveUrl: "https://ai-portfolio-demo.vercel.app",
    featured: true,
  },
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with real-time inventory management, payment processing, and analytics dashboard.",
    technologies: ["Next.js", "PostgreSQL", "Stripe", "Redis", "Docker"],
    githubUrl: "https://github.com/OmeedEn/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.netlify.app",
    featured: true,
  },
  {
    title: "Data Visualization Tool",
    description:
      "Interactive data visualization platform for business analytics with real-time chart updates and custom dashboard creation.",
    technologies: ["React", "D3.js", "Express", "MongoDB", "Socket.io"],
    githubUrl: "https://github.com/OmeedEn/data-viz-tool",
    liveUrl: "https://dataviz-demo.herokuapp.com",
    featured: false,
  },
  {
    title: "Task Management API",
    description:
      "RESTful API for task management with user authentication, real-time notifications, and team collaboration features.",
    technologies: ["Node.js", "Express", "JWT", "PostgreSQL", "WebSocket"],
    githubUrl: "https://github.com/OmeedEn/task-api",
    featured: false,
  },
];
