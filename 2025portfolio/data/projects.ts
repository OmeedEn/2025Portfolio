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
    title: "DegreeMate",
    description:
      "Developed a full-stack web application for CSULB students to streamline degree planning, improving user experience and accessibility with AI.",
    technologies: ["Next.js", "Hono.js", "Node.js", "Docker", "DigitalOcean"],
    githubUrl: "private",
    featured: true,
  },
  {
    title: "App4Apps",
    description:
      "School ranking application with real-time school updates, integration with applications, and essays for students applying to schools.",
    technologies: ["Next.js", "Node.js", "Express.js", "Supabase"],
    githubUrl: "private",
    featured: false,
  },
  {
    title: "Skin Cancer Detection App",
    description:
      "Developed a mobile application for early detection of skin cancer using image recognition and machine learning.",
    technologies: ["React-Native", "TensorFlow", "FastAPI", "Pandas", "Expo", "HuggingFace"],
    githubUrl: "https://github.com/VukIG/Melanoma-Detector",
    featured: true,
  },
  {
    title: "Cyber Chat",
    description:
      "Real-time chat application with user authentication and message encryption.",
    technologies: ["Flutter", "Firebase", "RSA", "OAuth"],
    githubUrl: "",
    liveUrl: "https://cyberchat-378.web.app/",
    featured: false,
  },
  {
    title: "Financial Analysis Tool",
    description:
      "Interactive financial analysis platform with real-time data visualization and reporting features.",
    technologies: ["Ruby", "Gem", "Rails", "SQLite", "Docker"],
    githubUrl: "https://github.com/OmeedEn/financesite",
    featured: false,
  },
  {
    title: "Face Detection System",
    description:
      "RESTful API for face detection with real-time notifications",
    technologies: ["Python", "Tensorflow", "CV2"],
    githubUrl: "https://github.com/OmeedEn/face-detection-api",
    featured: false,
  },
];
