<template>
    <div class="text-gray-900">
        <div class=" ov-lay bg-gray-100 md:bg-gray-200 absolute top-0 right-0 left-2/3" style="bottom: 5vh"/>
        <div id="hero-cont" class="container px-10 md:px-0 mx-auto pt-18 md:pt-0 flex flex-row md:flex-col items-center justify-center">
            <div class=" flex md:gap-4 lg:gap-10 justify-center items-center z-10" style="">
                <div class="flex flex-col gap-6 max-w-lg">
                    <h1 class=" text-6xl font-semibold md:text-8xl md:font-bold">{{profile.title}}</h1>
                    <p class="text-lg text-gray-800">{{profile.bio}}</p>
                    <div class="flex flex-row gap-4">
                        <router-link style="" class=" rounded-md bg-accent hover:bg-opacity-10 hover:text-accent px-7 flex items-center justify-center h-14 text-white font-medium" to="/hire">Hire Me.</router-link>
                        <!-- big screen -->
                        <a :href="profile.link_resume" class="hidden rounded-md hover:bg-transparent hover:w-auto px-4 gap-3 group border hover:border-accent hover:text-accent transition-all delay-75 duration-200 text-accent h-14 w-14 items-center justify-center md:flex flex-row bg-accent bg-opacity-10">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 22H6C4.89543 22 4 21.1046 4 20V4C4 2.89543 4.89543 2 6 2H13C13.0109 2.00047 13.0217 2.00249 13.032 2.006C13.0418 2.00902 13.0518 2.01103 13.062 2.012C13.1502 2.01765 13.2373 2.0348 13.321 2.063L13.349 2.072C13.3717 2.07968 13.3937 2.08904 13.415 2.1C13.5239 2.14842 13.6232 2.21618 13.708 2.3L19.708 8.3C19.7918 8.38479 19.8596 8.48406 19.908 8.593C19.918 8.615 19.925 8.638 19.933 8.661L19.942 8.687C19.9699 8.77039 19.9864 8.85718 19.991 8.945C19.9926 8.95418 19.9949 8.96322 19.998 8.972C19.9998 8.98122 20.0004 8.99062 20.0001 9V20C20.0001 21.1046 19.1046 22 18 22ZM6 4V20H18V10H13C12.4477 10 12 9.55228 12 9V4H6ZM14 5.414V8H16.586L14 5.414Z" fill="currentColor"/>
                            </svg>
                            <p class=" group-hover:inline hidden">Download Resume</p>
                        </a>
                        <!-- small screen -->
                        <a :href="profile.link_resume" class="md:hidden rounded-md px-4 gap-3 group border transition-all delay-75 duration-200 text-accent h-14 items-center justify-center flex flex-row bg-accent bg-opacity-10">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 22H6C4.89543 22 4 21.1046 4 20V4C4 2.89543 4.89543 2 6 2H13C13.0109 2.00047 13.0217 2.00249 13.032 2.006C13.0418 2.00902 13.0518 2.01103 13.062 2.012C13.1502 2.01765 13.2373 2.0348 13.321 2.063L13.349 2.072C13.3717 2.07968 13.3937 2.08904 13.415 2.1C13.5239 2.14842 13.6232 2.21618 13.708 2.3L19.708 8.3C19.7918 8.38479 19.8596 8.48406 19.908 8.593C19.918 8.615 19.925 8.638 19.933 8.661L19.942 8.687C19.9699 8.77039 19.9864 8.85718 19.991 8.945C19.9926 8.95418 19.9949 8.96322 19.998 8.972C19.9998 8.98122 20.0004 8.99062 20.0001 9V20C20.0001 21.1046 19.1046 22 18 22ZM6 4V20H18V10H13C12.4477 10 12 9.55228 12 9V4H6ZM14 5.414V8H16.586L14 5.414Z" fill="currentColor"/>
                            </svg>
                            <p class="">Download Resume</p>
                        </a>
                    </div>
                </div>
                <template v-if="profile.featured_project">
                    <highlighted-project-card class="hidden lg:inline" featured :projectData="profile.featured_project"/>
                </template>
            </div>
        </div>

        <template v-if="fetchStatus==statuses.success">
            <div class="bg-white container px-10 mx-auto" style="">
                <div class="flex gap-x-3 pb-20 gap-y-10 flex-wrap">
                    <!-- featured on mobile -->
                    <template v-if="profile.featured_project">
                        <highlighted-project-card class="lg:hidden" :projectData="profile.featured_project"/>
                    </template>
                    <!-- ... -->
                    <highlighted-project-card class="flex-grow" v-for="project in projects" :key="project.id" :projectData="project"/>
                </div>
            </div>
        </template>
        <template v-else-if="fetchStatus===statuses.fetching">
            <div class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25 text-accent text-opacity-60" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p>Loading...</p>
            </div>
        </template>
        <div v-else-if="fetchStatus==statuses.error">
            <div class="flex gap-4 items-center justify-center flex-col pb-16">
                
                <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M75 150C116.421 150 150 116.421 150 75C150 33.5786 116.421 0 75 0C33.5786 0 0 33.5786 0 75C0 116.421 33.5786 150 75 150Z" fill="url(#paint0_linear_1_753)"/>
                <path d="M120 150H30V53C34.242 52.9952 38.3089 51.308 41.3084 48.3085C44.308 45.3089 45.9952 41.242 46 37H104C103.996 39.1014 104.408 41.1828 105.213 43.1238C106.018 45.0648 107.2 46.8268 108.691 48.308C110.172 49.7991 111.934 50.9816 113.875 51.787C115.817 52.5924 117.898 53.0047 120 53V150Z" fill="white"/>
                <path d="M75 102C88.2548 102 99 91.2548 99 78C99 64.7452 88.2548 54 75 54C61.7452 54 51 64.7452 51 78C51 91.2548 61.7452 102 75 102Z" fill="#4285F4"/>
                <path d="M83.4853 89.3138L75 80.8286L66.5147 89.3138L63.6863 86.4854L72.1716 78.0001L63.6863 69.5148L66.5147 66.6864L75 75.1717L83.4853 66.6864L86.3137 69.5148L77.8284 78.0001L86.3137 86.4854L83.4853 89.3138Z" fill="white"/>
                <path d="M88 108H62C60.3431 108 59 109.343 59 111C59 112.657 60.3431 114 62 114H88C89.6569 114 91 112.657 91 111C91 109.343 89.6569 108 88 108Z" fill="#DFEAFB"/>
                <path d="M97 120H53C51.3431 120 50 121.343 50 123C50 124.657 51.3431 126 53 126H97C98.6569 126 100 124.657 100 123C100 121.343 98.6569 120 97 120Z" fill="#DFEAFB"/>
                <defs>
                <linearGradient id="paint0_linear_1_753" x1="75" y1="0" x2="75" y2="150" gradientUnits="userSpaceOnUse">
                <stop stop-color="#E3ECFA"/>
                <stop offset="1" stop-color="#DAE7FF"/>
                </linearGradient>
                </defs>
                </svg>

                <h3 class="font-bold text-5xl">Opps...</h3>
                <p class="text-md text-gray-600">Couldn't fetch blog posts from the internet</p>
                <button class="bg-accent text-white px-12 rounded-md py-3" @click="fetchIntro">retry</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.ov-lay{
    border-radius: 0px 0px 0px 2000px;
}

#hero-cont{
    min-height: 90vh
}

@media (min-width: 768px) {
    #hero-cont {
        min-height: 95vh
    }
}
</style>

<script>
import {getIntro} from "../api"
import HighlightedProjectCard from "../components/HighlightedProjectCard.vue";

const statuses = {
    fetching: 0,
    error: 1,
    success: 2
}
export default {
    components: {HighlightedProjectCard},
    data: function(){
        return {
            profile: {
                bio: "I'm a UI/UX Designer and Software developer, i easily adapt to any tech i get my hands on. Super hyped when working impossible tasks and solving complex problems.",
                featured_project: null,
                link_resume: "https://drive.google.com/file/d/1cN2Ys9uPc3zToBA9P5GXz7C9z8r_dNWU/view?usp=sharing",
                title: "H!, I'm Rubbie.",
            },
            projects: [],
            fetchStatus: statuses.fetching,
            statuses
        };
    },
    methods: {
        async fetchIntro(){
            try{
                this.fetchStatus = this.statuses.fetching;
                const data_ = await getIntro();
                this.fetchStatus = this.statuses.success;
                this.profile = data_.profile;
                this.projects = data_.projects;
                console.log(data_)
            }catch (e) {
                this.fetchStatus = this.statuses.error
            }
        }
    },
    created: async function(){
        await this.fetchIntro();
    }
}
</script>