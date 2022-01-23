<template>
    <div class=" min-h-screen">
        <div class=" text-gray-900">
            <div v-if="fetchState===states.fetching">
                <div class="flex items-center justify-center" style="min-height: 85vh;">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25 text-accent text-opacity-60" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p>Loading...</p>
                </div>
            </div>
            <template v-else-if="fetchState===states.success">
                <div class="md:pt-28 pt-24">
                    <div class="flex gap-4 indent mx-auto flex-col pb-10">
                        <img class="w-full md:rounded-lg h-96 object-center object-cover" :src="image(project.cover)" alt="">
                        <div class="px-10 md:px-0 flex flex-col gap-2">
                            <h1 class="font-bold font-bold-dm-sans text-4xl">{{project.meta_title}}</h1>
                            <p class=" font-light text-gray-800">{{project.meta_summary}}</p>
                            <p class="font-bold text-sm text-gray-400">{{project.scope}}</p>
                            <div class="flex flex-row items-center">
                                <div class="flex w-max flex-row gap-4 text-accent bg-accent bg-opacity-10 px-4 py-3 rounded-md">
                                    <template v-if="project.link_figma">
                                        <a :href="project.link_figma" class="linkt">
                                            <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            >
                                            <path
                                                d="M8.94504 22.0001C7.28013 22.013 5.78874 20.9726 5.22604 19.4056C4.66335 17.8386 5.15219 16.0871 6.44504 15.038C5.52804 14.2958 4.99527 13.1792 4.99527 11.9995C4.99527 10.8198 5.52804 9.70318 6.44504 8.961C5.15177 7.91224 4.66264 6.16063 5.22544 4.59356C5.78825 3.0265 7.28003 1.98632 8.94504 1.99987H15.055C16.72 1.98632 18.2118 3.0265 18.7746 4.59356C19.3374 6.16063 18.8483 7.91224 17.555 8.961C18.8479 10.0101 19.3367 11.7616 18.774 13.3286C18.2113 14.8956 16.72 15.936 15.055 15.923C14.286 15.9239 13.5335 15.7001 12.89 15.279V18.079C12.8807 20.25 11.116 22.0039 8.94504 22.0001ZM8.92304 15.924C7.73858 15.9427 6.79173 16.9148 6.80416 18.0993C6.81658 19.2839 7.7836 20.2358 8.96819 20.2297C10.1528 20.2236 11.1099 19.2616 11.11 18.077V15.924H8.92204H8.92304ZM15.056 9.847C13.8684 9.85307 12.91 10.8197 12.914 12.0073C12.9181 13.1949 13.8831 14.155 15.0707 14.153C16.2583 14.151 17.22 13.1876 17.22 12C17.2156 10.8081 16.247 9.84479 15.055 9.847H15.056ZM8.94604 9.84697C8.17685 9.8429 7.46389 10.2495 7.07574 10.9135C6.68758 11.5776 6.6832 12.3984 7.06424 13.0665C7.44527 13.7347 8.15385 14.1489 8.92304 14.153H11.11V9.84697H8.94604ZM12.89 3.77V8.07703H15.054C16.2115 8.0824 17.1666 7.17242 17.217 6.016V6.451V5.923C17.2121 4.73248 16.2456 3.77 15.055 3.77H12.89ZM8.94404 3.77C8.17485 3.77 7.46408 4.18036 7.07949 4.8465C6.69489 5.51265 6.69489 6.33336 7.07949 6.9995C7.46408 7.66565 8.17485 8.076 8.94404 8.076H11.11V3.77H8.94404Z"
                                                fill="currentColor"
                                            />
                                            </svg>
                                        </a>
                                    </template>

                                    <template v-if="project.link_github">
                                        <a :href="project.link_github" class="linkt">
                                            <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            >
                                            <path
                                                d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z"
                                                fill="currentColor"
                                            />
                                            </svg>
                                        </a>
                                    </template>

                                    <template v-if="project.link_website">
                                        <a :href="project.link_website" class="linkt">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 22H5C4.44772 22 4 21.5523 4 21V13H2L11.292 3.70698C11.4796 3.51921 11.7341 3.4137 11.9995 3.4137C12.2649 3.4137 12.5194 3.51921 12.707 3.70698L22 13H20V21C20 21.5523 19.5523 22 19 22ZM10 15H14V20H18V11.828L12 5.82798L6 11.828V20H10V15Z" fill="currentColor"/>
                                            </svg>
                                        </a>
                                    </template>
                                </div>
                                <div class="flex-grow"/>
                                <p>{{project.read_count}} {{(project.read_count==1) ? 'view':'views'}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <blog-post class="px-10 md:px-0" :project="project"/>
            </template>
            <div v-else-if="fetchState==states.error">
                <div class="flex gap-4 items-center justify-center flex-col" style="min-height: 85vh;">
                    
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
                    <p class="text-md text-gray-600">Couldn't fetch blog post from the internet</p>
                    <button class="bg-accent text-white px-12 rounded-md py-3" @click="fetchProject">retry</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.indent{
    max-width: 800px;
}
</style>

<script>
import {one_project, image} from '../api'
import BlogPost from '../components/BlogPost.vue';
import {addMetaTags} from '../routes'

const state = {
    fetching: 0,
    success: 1,
    error: 2
}

Object.freeze(state);

export default {
  components: { BlogPost },
    data: function(){
        return {
            image,
            project: null,
            states: state,
            fetchState: state.fetching
        }
    },
    methods: {
        async fetchProject(){
            this.fetchState = state.fetching;
            const project_id = this.$route.params.project;

            try {
                const json = await one_project(project_id);
                this.project = json
                this.fetchState = state.success
                console.log(json)
                if (this.project == null){
                    this.$router.push("/")
                }

                // title
                document.title = `Rubbie Kelvin - ${this.project.title}`

                // meta
                const meta = [
                    {property:"og:title", content: this.project.meta_title},
                    {property:"og:type", content: "article"},
                    {property:"og:image", content: image(this.project.cover)},
                    {property:"og:url", content: this.$route.fullPath},
                    {property: "og:description", content: this.project.meta_description},
                    {property: "og:site_name", content: "Rubbie Kelvin"},
                    {name:"twitter:title", content: this.project.meta_title},
                    {name:"twitter:card", content: "summary_large_image"},
                    {name:"twitter:image", content: image(this.project.cover)},
                    {name: "twitter:description", content: this.project.meta_description},
                    {name: "twitter:image:alt", content: this.project.title},
                ]

                addMetaTags(meta);
            } catch (error) {
                this.fetchState = state.error;
            }
        }
    },
    created: async function(){
        await this.fetchProject();
    }
}
</script>
