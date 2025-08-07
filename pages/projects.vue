<script setup lang="ts">
const config = useAppConfig();
useSeoMeta({
  title: "Projects - Rubbie Kelvin",
  description: "Explore software development projects by Rubbie Kelvin including Rust, Python, and JavaScript applications. Open source projects showcasing expertise in system programming and web development.",
  keywords: "Rubbie Kelvin projects, software projects, Rust projects, Python projects, JavaScript projects, open source, GitHub projects, portfolio projects",
  ogTitle: "Software Development Projects | Rubbie Kelvin",
  ogDescription: "Explore innovative software projects by Rubbie Kelvin including system tools, web applications, and open source contributions.",
  ogType: "website",
  ogUrl: "https://iam.rubbietheone.com/projects",
});

type Project = (typeof config.projects)[number];

// Organize projects by category and development stage
const projectCategories = computed(() => {
  return [
    {
      title: "Professional Tools",
      subtitle: "Production-ready applications solving real-world problems",
      description: "These projects represent my evolution into building professional-grade tools that developers and teams can rely on.",
      projects: [
        config.projects.find(p => p.title === "Native Doctor"),
        config.projects.find(p => p.title === "Courier"),
      ].filter(Boolean) as Project[]
    },
    {
      title: "System Utilities",
      subtitle: "Command-line tools and productivity enhancers",
      description: "My journey into systems programming, focusing on creating efficient tools that enhance developer productivity.",
      projects: [
        config.projects.find(p => p.title === "Progress"),
        config.projects.find(p => p.title === "Opennotes"),
      ].filter(Boolean) as Project[]
    },
    {
      title: "Learning & Exploration",
      subtitle: "Experimental projects and learning exercises",
      description: "Projects that showcase my curiosity and willingness to explore new concepts, languages, and paradigms.",
      projects: [
        config.projects.find(p => p.title === "Fuck rust"),
        config.projects.find(p => p.title === "Shared"),
      ].filter(Boolean) as Project[]
    }
  ];
});

// Add structured data for projects
useSchemaOrg([
  {
    "@type": "ItemList",
    "name": "Rubbie Kelvin's Software Projects",
    "description": "A collection of software development projects by Rubbie Kelvin",
    "itemListElement": config.projects.map((project, index) => ({
      "@type": "SoftwareApplication",
      "position": index + 1,
      "name": project.title,
      "description": project.description,
      "url": project.link,
      "author": {
        "@type": "Person",
        "name": "Rubbie Kelvin",
        "@id": "https://iam.rubbietheone.com/#person"
      }
    }))
  }
]);
</script>

<template>
  <div class="flex-grow flex gap-8 flex-col">
    <header>
      <h1 class="lg:text-8xl md:text-7xl text-5xl">Projects</h1>
      <p class="mt-4 mute xl:max-w-[60%]">
        From learning experiments to professional tools—each project tells part of my development story.
      </p>
    </header>

    <main class="space-y-8">
      <section 
        v-for="category in projectCategories" 
        :key="category.title"
        class="space-y-4"
      >
        <div>
          <h2 class="text-2xl md:text-3xl font-bold">{{ category.title }}</h2>
          <p class="text-sm mute mt-1">{{ category.subtitle }}</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <article
            v-for="project in category.projects"
            :key="project.title"
            class="group"
          >
            <a 
              :href="project.link" 
              class="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 
                     hover:border-gray-300 dark:hover:border-gray-600 
                     transition-colors duration-200"
              :aria-label="`View ${project.title} project on GitHub`"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="space-y-2">
                <h3 class="text-lg font-semibold group-hover:underline">
                  {{ project.title }}
                </h3>
                <p class="text-sm mute">
                  {{ project.description }}
                </p>
                <span class="text-xs mute">View on GitHub →</span>
              </div>
            </a>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>
