export interface Project {
  title: string;
  description: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    title: "Dinan Solutions",
    description: "Enterprise software engineering & cloud architecture",
    liveUrl: "https://dev.zarvx.io/",
  },
  {
    title: "Voyax Health",
    description: "Health monitoring platform for travelers",
    liveUrl: "https://voyaxhealth.com",
  },
  {
    title: "GlamHere",
    description: "Mobile beauty & styling application",
    liveUrl: "https://glamhereapp.com/",
  },
  {
    title: "YourAutomation.ai",
    description: "AI-powered automation platform",
    liveUrl: "https://yourautomation.ai",
  },
];
