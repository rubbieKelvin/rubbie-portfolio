<template>
  <div
    :class="{'aspect-square card shadow-lg p-4 hover:shadow-xl': featured}"
    class="flex gap-3 flex-col flex-grow rounded-lg bg-white">
    <h2 v-if="featured" class=" text-slate-500">Featured Project</h2>
    <div v-if="featured" class=" h-3"/>
    <img
      :class="{'rounded-lg': featured, 'rounded': !featured}"
      class="border-0 outline-0 w-full h-96 object-cover object-center"
      :src="image(projectData.cover)"
      alt=""
    />
    <div v-if="featured" class=" h-3"/>
    <div class="flex flex-row gap-4 items-center">
        <!-- ... -->
      <div>
        <h3 class="font-medium text-lg">{{projectData.title}}</h3>
        <p class="text-sm text-slate-800">{{projectData.meta_summary}}</p>
      </div>
      <!-- ... -->
      <div class="flex-grow"/>
      <!-- ... -->
      <div class="flex flex-row gap-2 text-accent bg-accent bg-opacity-10 p-2 rounded-md">
        <template v-if="projectData.link_figma">
          <a :href="projectData.link_figma" class="linkt">
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

        <template v-if="projectData.link_github">
          <a :href="projectData.link_github" class="linkt">
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

        <template v-if="projectData.link_website">
          <a :href="projectData.link_website" class="linkt">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 22H5C4.44772 22 4 21.5523 4 21V13H2L11.292 3.70698C11.4796 3.51921 11.7341 3.4137 11.9995 3.4137C12.2649 3.4137 12.5194 3.51921 12.707 3.70698L22 13H20V21C20 21.5523 19.5523 22 19 22ZM10 15H14V20H18V11.828L12 5.82798L6 11.828V20H10V15Z" fill="currentColor"/>
            </svg>

          </a>
        </template>

        <router-link :to="`/project/${projectData.slug}/`" class="linkt">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 18.5L24 12L17.5 5.5L16.793 6.207L22.086 11.5L0 11.5V12.5L22.086 12.5L16.793 17.793L17.5 18.5Z"
              fill="currentColor"
            />
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.linkt{
    @apply p-2 rounded-md transition-all duration-200;
    @apply hover:text-white hover:bg-accent;
}
.card{
    min-width: 500px;
    max-width: 500px;
}
</style>

<script>
import {image} from '../api'

export default {
  data(){
    return {image}
  },
  props: {
    featured: {type: Boolean, default: false},
    projectData: {type: Object, required: true}
  }
}
</script>