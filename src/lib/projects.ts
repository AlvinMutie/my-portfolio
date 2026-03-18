export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    title: "Attachment Management System",
    description: "A comprehensive system designed to streamline the management of student attachments and internships, improving coordination between institutions and host organizations.",
    tags: ["Full Stack", "Management", "Automation"],
    github: "https://github.com/AlvinMutie/Attachment-Management-System",
  },
  {
    title: "Edvantage",
    description: "An innovative educational platform aimed at enhancing the learning experience through tailored digital tools and resources.",
    tags: ["Education", "E-Learning", "Web App"],
    github: "https://github.com/AlvinMutie/Edvantage",
  },
  {
    title: "V1 Portfolio",
    description: "The first iteration of my professional portfolio, built to showcase skills and early projects in web development.",
    tags: ["React", "Vite", "Portfolio"],
    github: "https://github.com/AlvinMutie/my-portfolio",
  }
];
