export interface Project {
  title: string;
  description: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    title: "Dinan Solutions",
    description: "Enterprise software engineering & cloud architecture",
  },
  {
    title: "Voyax Health",
    description: "Health monitoring platform for travelers",
    liveUrl: "https://voyaxhealth.com",
  },
  {
    title: "GlamHere",
    description: "Mobile beauty & styling application",
  },
  {
    title: "YourAutomation.ai",
    description: "AI-powered automation platform",
  },
];
