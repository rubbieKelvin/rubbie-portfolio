<template>
    <div class=" px-10 md:px-0 min-h-screen">
        <div class=" pt-32 text-gray-900">
            <div v-if="project === null">
                <div class="flex items-center justify-center" style="min-height: 93vh;">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25 text-gray-900" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p>
                        Loading...
                    </p>
                </div>
            </div>
            <blog-post v-else :project="project"/>
        </div>
    </div>
</template>

<script>
import {one_project} from '../api'
import BlogPost from '../components/BlogPost.vue';
export default {
  components: { BlogPost },
    data: function(){
        return {
            project: null
        }
    },
    created: async function(){
        const project_id = this.$route.params.project;
        this.project = await one_project(project_id);
        if (this.project == null){
            this.$router.push("/")
        }
        document.title = `Rubbie Kelvin - ${this.project.title}`
    }
}
</script>
