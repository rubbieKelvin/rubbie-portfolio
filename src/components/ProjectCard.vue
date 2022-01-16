<template>
    <div class=" w-full md:w-1/2 card bg-cover bg-center bg-no-repeat" :style="`background-image: url(${image});`">
        <router-link :to="`/project/${uuid}/`" class=" card flex flex-col items-center justify-center bg-opacity-0 hover:bg-black hover:bg-opacity-70 text-transparent hover:text-white transition-all delay-100 duration-150">
            <div class="hidden md:flex flex-col">
                <h2 class="text-xl font-dm-sans font-medium">{{title}}</h2>
                <p class="">{{subtitle}}</p>
            </div>
            <div class="md:hidden h-full w-full px-4 pb-4 flex items-end">
                <div class="bg-gray-900 px-10 py-4 w-max">
                    <h2 class="text-white text-xl font-dm-sans font-medium">{{title}}</h2>
                    <p class=" text-blue-200 font-light">{{subtitle}}</p>
                </div>
            </div>
        </router-link>
    </div>
</template>

<style scoped>
.card {
    height: 600px;
}
</style>

<script>
    export default {
        props: {
            image: {type: String, required: true},
            title: {type: String, required: true},
            subtitle: {type: String, required: true},
            uuid: {type: String, required: true}
        }
    }
</script>