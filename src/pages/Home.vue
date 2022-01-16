<template>
    <div class="text-gray-900">
        <div class=" pt-28">

            <!-- HERO, KINDA -->
            <div class="flex items-center justify-center min-h-[78vh]">
                <div class="flex md:bg-white flex-col md:flex-row gap-5 md:gap-0 justify-center items-center border-slate-200 md:border">
                    <img class="md:h-80 container mx-auto px-10 md:px-0 md:w-80" :src="dp" alt="">
                    <div class="px-14 flex flex-col gap-3 md:gap-4">
                        <h2 class="font-dm-sans font-bold text-5xl">Hi, I'm Rubbie.</h2>
                        <p class="md:max-w-sm leading-6">I'm a UI/UX Designer and Software developer, I easily adapt to any tech i get my hands on. Super hyped when working impossible tasks and solving complex problems.</p>
                        <router-link to="/hire" class="bg-gray-900 w-max px-6 py-3 text-white border border-gray-900 hover:bg-white hover:text-gray-900 transition-all delay-75">Hire me.</router-link>
                    </div>
                </div>
            </div>

            <!-- PROJECTS -->
            <div>
                <!-- ... -->
                <div v-if="projects===null" class="w-full flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25 text-gray-900" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading Blog Posts...
                </div>
                <!-- ... -->
                <div v-else class="flex flex-wrap">
                    <project-card
                        :key="project.id"
                        v-for="project in projects"
                        :image="project.cover"
                        :title="project.title"
                        :subtitle="project.scope"
                        :uuid="project.id"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dp from "../assets/catherine.png"
import {get_projects, BASEURL} from "../api"
import ProjectCard from '../components/ProjectCard.vue'

export default {
    components: { ProjectCard },
    data: function () {
        return {
            dp,
            projects: null
        }
    },
    created: async function () {
        document.title = "Rubbie Kelvin"
        this.projects = await get_projects();
        this.projects.forEach( project => {
            if (project.cover[0] === "/"){
                project.cover = BASEURL+project.cover;
            }
        });
    }
}
</script>