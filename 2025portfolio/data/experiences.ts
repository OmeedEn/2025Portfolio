export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    title: "Co-Founder",
    company: "DegreeMate",
    period: "2025 - Present",
    description:
      "Creating personalized degree planning software to help students navigate their academic journeys effectively.",
    achievements: [
      "Content creation with students and academic advisors to ensure accurate degree planning",
      "Collaborated with clients to gather requirements and deliver tailored solutions",
      "Implemented responsive designs to ensure optimal user experience across devices",
    ],
  },
  {
    title: "Founding Engineer",
    company: "Voyax Health",
    period: "2025 - Present",
    description:
      "Created a health monitoring MVP from the ground up using React, Node.js, and AWS to create a scalable solution for travelers.",
    achievements: [
      "Led the frontend work using Architectural patterns and best practices",
      "Implemented endpoints by integrating with existing AWS Lambda functions to manage patient data securely",
      "Maintained documentation and tracked progress via Jira, GitHub, and participated in weekly Agile sprints",
    ],
  },
  {
    title: "Software Engineering",
    company: "Dinan Solutions",
    period: "2024 - Present",
    description:
      "Developed an application using different JavaScript frameworks, enhancing user engagement and streamlining automated workflows.",
    achievements: [
      "Implemented secure authentication with Azure AD, Key Vault, and utilizing OAuth/JWT tokens",
      "Created an overarching design system in Figma, speeding up implementation",
      "Designed the architecture of the application using a Kubernetes model and microservices",
      "Built a robust Azure DevOps pipeline to import artifacts for private libraries reducing deployment time",
    ],
  },
  {
    title: "Software Internship",
    company: "Degreely",
    period: "2023 - 2024",
    description:
      "Contributed to a degree platform by implementing CI/CD pipelines and modern development practices.",
    achievements: [
      "Demonstrated knowledge in Redux for state management, PHP for server-side scripting",
      "Spearheaded the development of new API endpoints utilizing PHP and many UI updates using React.js",
      "Established great team culture",
    ],
  },
];
