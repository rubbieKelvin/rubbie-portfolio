export type Social = {
  label: string;
  link: string;
  description: string;
};

export type Project = {
  title: string;
  link: string;
  description: string;
};

export type Article = {
  title: string;
  date: string;
  tags: string[];
  path: string;
  excerpt: string;
};

export default defineAppConfig({
  socials: <Social[]>[
    {
      label: "X/Twttr",
      link: "https://x.com/kelvinrubbie",
      description: "Follow me for updates and thoughts",
    },
    {
      label: "Github",
      link: "https://github.com/rubbiekelvin",
      description: "Check out my code and projects",
    },
    {
      label: "Mail",
      link: "mailto:dev.rubbie+portfolio@gmail.com",
      description: "Reach out for work inquiries",
    },
    {
      label: "LinkedIn",
      link: "https://linkedin.com/in/rubbiekelvin",
      description: "Connect with me professionally",
    },
  ],
  projects: <Project[]>[
    {
      title: "Progress",
      link: "https://github.com/rubbieKelvin/progress",
      description: "A progress tracking cli app written in rust",
    },
    {
      title: "Opennotes",
      link: "https://github.com/rubbieKelvin/notes",
      description: "Simple paper for storing notes",
    },
    {
      title: "Fuck rust",
      link: "https://github.com/rubbieKelvin/fuck-rust",
      description: "Implementation of a brain-fuck interpreter in rust",
    },
    {
      title: "Courier",
      link: "https://github.com/rubbieKelvin/courier",
      description:
        "Desktop app for messaging and sending files via local network",
    },
    {
      title: "Shared",
      link: "https://github.com/rubbieKelvin/shared",
      description: "A django utility pack",
    },
  ],
  articles: <Article[]>[],
});
