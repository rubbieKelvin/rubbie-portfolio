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
  <div class="flex-grow flex gap-4 flex-col">
    <header>
      <h1 class="lg:text-8xl md:text-7xl text-5xl">Projects</h1>
      <p class="mt-4 mute xl:max-w-[60%]">
        A collection of software projects I've built, ranging from system utilities 
        to web applications. Each project showcases different aspects of my 
        programming expertise and problem-solving approach.
      </p>
    </header>

    <section class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6" role="main">
      <article
        v-for="project in config.projects"
        :key="project.title"
        class="project-card p-4 rounded-lg border border-gray-200 dark:border-gray-700 duration-300 hover:border-gray-300 dark:hover:border-gray-600"
      >
        <a 
          :href="project.link" 
          class="block h-full" 
          :aria-label="`View ${project.title} project on GitHub`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 class="text-xl font-semibold mb-2">{{ project.title }}</h2>
          <p class="mute text-sm">
            {{ project.description }}
          </p>
          <span class="text-xs mute mt-2 block">View on GitHub →</span>
        </a>
      </article>
    </section>
  </div>
</template>
