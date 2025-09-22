export interface ContactInfo {
  href: string;
  icon: string;
  title: string;
  subtitle: string;
  color: "blue" | "purple" | "gray";
}

export const contactInfo: ContactInfo[] = [
  {
    href: "mailto:oenshaie@gmail.com",
    icon: "Mail",
    title: "Email",
    subtitle: "oenshaie@gmail.com",
    color: "blue",
  },
  {
    href: "https://www.linkedin.com/in/omeed-enshaie/",
    icon: "Linkedin",
    title: "LinkedIn",
    subtitle: "/in/omeed-enshaie",
    color: "purple",
  },
  {
    href: "https://github.com/OmeedEn",
    icon: "Github",
    title: "GitHub",
    subtitle: "/OmeedEn",
    color: "gray",
  },
];
