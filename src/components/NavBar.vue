<template>
    <div class=" border-b border-stroke h-20 z-50 fixed top-0 left-0 right-0 bg-white">
        <div class="px-10 md:px-0 container mx-auto flex items-center h-full">
            <div class="flex-grow">
                <a href="/" class="font-medium text-3xl">rubbiekelvin<span class="text-accent">.</span></a>
            </div>
            <div class="flex-grow justify-end flex gap-6">
                <social class="hidden md:flex items-center gap-5" svgClass="social"/>
                <a class="ui-btn md:text-lg text-white bg-accent" href="mailto:dev.rubbie@gmail.com">Hire me</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.nav-link{
    @apply hover:bg-accent md:p-3 text-accent rounded-md hover:text-white;
    @apply transition-all duration-200 ease-in-out;
}

.ui-btn{
    @apply rounded-lg px-3 py-2;
    @apply md:px-5 md:py-3;
}

:deep(.social > svg){
    width: 24px;
    height: 24px;
}

:deep(.social){
    padding: 6px;
    border-radius: 6px;
}

:deep(.social:hover){
    @apply bg-gray-100;
}
</style>

<script>
import Social from './Social.vue'

export default {
    components: { Social }
}
</script>