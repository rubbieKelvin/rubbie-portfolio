<template>
  <!-- This component doesn't render anything visible -->
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'JsonLd',
  setup() {
    const route = useRoute();

    // Function to generate schema.org data based on current route
    const generateJsonLd = () => {
      // Base person schema
      const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'Rubbie Kelvin',
        'url': window.location.origin,
        'jobTitle': 'Software Developer',
        'knowsAbout': ['Web Development', 'TypeScript', 'Vue.js', 'Software Engineering'],
        'sameAs': [
          'https://github.com/rubbiekelvin',
          'https://linkedin.com/in/rubbiekelvin' // Update with your actual LinkedIn URL
        ]
      };

      // Website schema
      const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'Rubbie Kelvin Portfolio',
        'url': window.location.origin,
        'description': 'Portfolio of Rubbie Kelvin showcasing software development projects and skills.'
      };

      // Project schema (if on projects page)
      const projectSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        'itemListElement': [] as any[]
      };

      // Page-specific schema
      let pageSchema: any = null;

      // Add page-specific schema based on current route
      if (route.path === '/') {
        pageSchema = personSchema;
      } else if (route.path === '/projects') {
        pageSchema = projectSchema;
      } else {
        pageSchema = websiteSchema;
      }

      // Remove any existing JSON-LD scripts
      const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
      existingScripts.forEach(script => script.remove());

      // Add new JSON-LD script
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.textContent = JSON.stringify(pageSchema);
      document.head.appendChild(script);
    };

    // Generate JSON-LD on component mount
    onMounted(() => {
      generateJsonLd();
    });

    // Update JSON-LD when route changes
    watch(() => route.path, () => {
      generateJsonLd();
    });

    return {};
  }
});
</script> 