export type Social = {
  label: string;
  link: string;
};

export type Project = {
  title: string;
  description: string;
};

export default defineAppConfig({
  socials: <Social[]>[
    {
      label: "X/Twttr",
      link: "https://x.com/kelvinrubbie",
    },
    {
      label: "Github",
      link: "https://github.com/rubbiekelvin",
    },
    {
      label: "Mail",
      link: "mailto:dev.rubbie+portfolio@gmail.com",
    },
    {
      label: "LinkedIn",
      link: "https://linkedin.com/in/rubbiekelvin",
    },
  ],
  projects: <Project[]>[],
});
