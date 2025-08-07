<script setup lang="ts">
useSeoMeta({
  title: "Rubbie Kelvin - Software Developer & Engineer",
  description: "Rubbie Kelvin is a professional software developer from Nigeria specializing in Python, C++, JavaScript/TypeScript, and Rust. Expert in solving complex problems and building intuitive interfaces.",
  keywords: "Rubbie Kelvin, Software Developer, Python Developer, JavaScript Developer, TypeScript Developer, Rust Developer, Nigerian Developer, Full Stack Developer, Portfolio",
  ogTitle: "Rubbie Kelvin - Software Developer & Engineer",
  ogDescription: "Professional portfolio of Rubbie Kelvin, showcasing expertise in Python, C++, JavaScript/TypeScript, and Rust development.",
  ogType: "website",
  ogUrl: "https://iam.rubbietheone.com",
  ogImage: "https://iam.rubbietheone.com/images/rubbie-the-one.png",
  twitterCard: "summary_large_image",
  twitterTitle: "Rubbie Kelvin - Software Developer & Engineer",
  twitterDescription: "Professional portfolio showcasing software development expertise",
  twitterImage: "https://iam.rubbietheone.com/images/rubbie-the-one.png",
});

// Add structured data for better search results
useSchemaOrg([
  {
    "@type": "Person",
    "@id": "https://iam.rubbietheone.com/#person",
    "name": "Rubbie Kelvin",
    "alternateName": "Rubbie Kelvin",
    "description": "Software developer from Nigeria specializing in Python, C++, JavaScript/TypeScript, and Rust",
    "url": "https://iam.rubbietheone.com",
    "image": "https://iam.rubbietheone.com/images/rubbie-the-one.png",
    "jobTitle": "Software Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "nationality": {
      "@type": "Country",
      "name": "Nigeria"
    },
    "knowsAbout": ["Python", "C++", "JavaScript", "TypeScript", "Rust", "Software Development", "Web Development"],
    "sameAs": [
      "https://github.com/rubbiekelvin",
      "https://linkedin.com/in/rubbiekelvin",
      "https://x.com/kelvinrubbie"
    ]
  },
  {
    "@type": "WebSite",
    "@id": "https://iam.rubbietheone.com/#website",
    "url": "https://iam.rubbietheone.com",
    "name": "Rubbie Kelvin Portfolio",
    "description": "Professional portfolio of Rubbie Kelvin, software developer",
    "publisher": {
      "@id": "https://iam.rubbietheone.com/#person"
    },
    "inLanguage": "en-US"
  }
]);
</script>
<template>
  <div class="flex-grow flex gap-4 flex-col">
    <p class="md:text-base text-sm">Software developer ・Nigeria</p>
    <h1 class="lg:text-8xl md:text-7xl text-5xl">Rubbie Kelvin</h1>

    <div class="xl:max-w-[60%] space-y-4">
      <p class="mute">
        I'm a passionate software developer from Nigeria who specializes in solving complex problems, 
        from writing low-level systems to building interfaces with beautiful UIs. I easily adapt to any 
        technology stack and my core expertise lies in <strong>Python</strong>, <strong>C++</strong>, 
        and <strong>JavaScript/TypeScript</strong>.
      </p>

      <p class="mute">
        Currently exploring <strong>Rust</strong> for the excitement of learning new paradigms and 
        building high-performance applications. I enjoy creating robust, scalable solutions that 
        make a real impact.
      </p>

      <p class="mute text-sm">
        <strong>Skills:</strong> Full-stack development, System programming, Web development, 
        API design, Database optimization, UI/UX implementation
      </p>
    </div>

    <div class="flex flex-col gap-2 mt-4">
      <NuxtLink
        to="https://drive.google.com/file/d/1OHI72FXBm46HS7XhxY_IObJM6buUcQ05/view?usp=sharing"
        external
        target="_blank"
        class="w-max hover:underline"
        aria-label="Download Rubbie Kelvin's resume"
      >
        ~ $ wget resume.pdf
      </NuxtLink>

      <div>&middot;</div>
      
      <div class="flex gap-4 text-sm">
        <p>&plus;</p>
        <NuxtLink to="/projects" class="hover:underline">View Projects</NuxtLink>
        <NuxtLink to="/contact" class="hover:underline">Get In Touch</NuxtLink>
        <NuxtLink to="/blog" class="hover:underline">Read Blog</NuxtLink>
      </div>
    </div>
  </div>
</template>
