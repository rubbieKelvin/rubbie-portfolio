<template>
    <div class=" px-10 md:px-0 min-h-screen">
        <div class=" pt-32 text-gray-900">
            <div v-if="project === null">
                <div class="flex items-center justify-center" style="min-height: 93vh;">
                    Loading...
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
