<template>
    <div ref="nav" class="bg-opacity-50 transition-all duration-200 z-50 container mx-auto fixed top-0 left-0 right-0 pt-4">
        <div class="h-16 flex items-center flex-row">
            <router-link to="/" class="pl-10 md:pl-0 select-none font-dm-sans font-bold text-2xl">
                Rubbie<span class=" font-normal">Kelvin</span>.
            </router-link>
            <div class="flex-grow"/>
            <div class=" flex gap-5 pr-10 md:pr-0 ">
                <a href="https://www.linkedin.com/in/rubbiekelvinvoltsman/" class="nav-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 21H9V9.00003H13V11C13.8526 9.91529 15.1456 9.2686 16.525 9.23703C19.0056 9.2508 21.0072 11.2694 21 13.75V21H17V14.25C16.84 13.1327 15.8818 12.3036 14.753 12.306C14.2593 12.3216 13.7932 12.5378 13.4624 12.9047C13.1316 13.2715 12.9646 13.7573 13 14.25V21ZM7 21H3V9.00003H7V21ZM5 7.00003C3.89543 7.00003 3 6.1046 3 5.00003C3 3.89546 3.89543 3.00003 5 3.00003C6.10457 3.00003 7 3.89546 7 5.00003C7 5.53046 6.78929 6.03917 6.41421 6.41424C6.03914 6.78932 5.53043 7.00003 5 7.00003Z" fill="currentColor"/>
                    </svg>
                </a>
                <a href="https://github.com/rubbieKelvin" class="nav-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z" fill="currentColor"/>
                    </svg>
                </a>
                <a href="https://twitter.com/KelvinRubbie" class="nav-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.995 6.68799C20.8914 6.15208 21.5622 5.30823 21.882 4.31399C21.0397 4.81379 20.118 5.16587 19.157 5.35499C17.8246 3.94552 15.7135 3.60251 14.0034 4.51764C12.2933 5.43277 11.4075 7.37948 11.841 9.26999C8.39062 9.09676 5.17598 7.4669 2.99702 4.78599C1.85986 6.74741 2.44097 9.25477 4.32502 10.516C3.64373 10.4941 2.97754 10.3096 2.38202 9.97799C2.38202 9.99599 2.38202 10.014 2.38202 10.032C2.38241 12.0751 3.82239 13.8351 5.82502 14.24C5.19308 14.4119 4.53022 14.4372 3.88702 14.314C4.45022 16.0613 6.06057 17.2583 7.89602 17.294C6.37585 18.4871 4.49849 19.1342 2.56602 19.131C2.22349 19.1315 1.88123 19.1118 1.54102 19.072C3.50341 20.333 5.78738 21.0023 8.12002 21C11.3653 21.0223 14.484 19.7429 16.7787 17.448C19.0734 15.1531 20.3526 12.0342 20.33 8.78899C20.33 8.60299 20.3257 8.41799 20.317 8.23399C21.1575 7.62659 21.8828 6.87414 22.459 6.01199C21.676 6.35905 20.8455 6.58691 19.995 6.68799Z" fill="currentColor"/>
                    </svg>
                </a>
                <a href="mailto:dev.rubbie@gmail.com" class="nav-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.956 10.356V13.807H16.748C16.302 16 14.435 17.26 11.956 17.26C9.06851 17.2202 6.74862 14.8682 6.74862 11.9805C6.74862 9.09275 9.06851 6.74072 11.956 6.70098C13.1562 6.69954 14.3194 7.11605 15.246 7.87898L17.846 5.27898C14.8636 2.65705 10.508 2.31981 7.15752 4.45142C3.80707 6.58303 2.26698 10.6712 3.37821 14.4836C4.48943 18.296 7.98491 20.9164 11.956 20.914C16.423 20.914 20.485 17.665 20.485 11.98C20.4781 11.4326 20.411 10.8877 20.285 10.355L11.956 10.356Z" fill="currentColor"/>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.nav-link{
    @apply hover:bg-accent md:p-3 text-accent rounded-md hover:text-white;
    @apply transition-all duration-200 ease-in-out;
}
</style>

<script>
function addClasses(item, classes){
    classes.forEach(element => {
        item.classList.add(element);
    });
}

function removeClasses(item, classes){
    classes.forEach(element => {
        item.classList.remove(element);
    });
}

const navScrollClasses1 = [
    "bg-white",
    "text-currentColor",
    "rounded-md",
    "md:pl-10",
    "md:pr-10",
    "py-2",
    "md:top-7",
    "md:left-7",
    "backdrop-blur-lg",
    "md:right-7"];

const navScrollClasses2 = [
    "top-0",
    "left-0",
    "right-0",
    "pt-4"];

export default {
    created(){
        const self = this;
        window.addEventListener('scroll', function(ev){
            const nav = self.$refs.nav;
            if (nav){
                if (window.scrollY>50){
                    addClasses(nav, navScrollClasses1);
                    removeClasses(nav, navScrollClasses2);
                }else{
                    removeClasses(nav, navScrollClasses1);
                    addClasses(nav, navScrollClasses2);
                }
            }
        })        
    }
}
</script>