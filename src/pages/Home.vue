<template>
    <div class="text-gray-900">
        <div class=" pt-28">

            <!-- HERO, KINDA -->
            <div class="flex items-center justify-center" style="height: 80vh;">
                <div class="flex justify-center items-center border-slate-200 md:border">
                    <img class="h-80 w-80 md:inline hidden" :src="dp" alt="">
                    <div class="px-14 flex flex-col gap-9 md:gap-4">
                        <h2 class="font-dm-sans font-bold text-5xl">Hi, I'm Rubbie.</h2>
                        <p class="md:max-w-sm leading-6">I'm a UI/UX Designer and Software developer, I easily adapt to any tech i get my hands on. Super hyped when working impossible tasks and solving complex problems.</p>
                        <router-link to="/hire" class="bg-gray-900 w-max px-6 py-3 text-white border border-gray-900 hover:bg-white hover:text-gray-900 transition-all delay-75">Hire me.</router-link>
                    </div>
                </div>
            </div>

            <!-- PROJECTS -->
            <div>
                <!-- ... -->
                <div v-if="projects===null">
                    Loading...
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
import {get_projects} from "../api"
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
                // project.cover = "http://localhost:8000"+project.cover;
                project.cover = 'http://192.168.43.153:8000'+project.cover;
            }
        });
    }
}
</script>