<template>
    <div class=" container mx-auto flex flex-col items-center gap-7" style="min-height: 93vh;">
        <template :key="item.id" v-for="item in serialized_post">
            <template v-if="item.type=='heading'">
                <h1 class="text-4xl font-bold font-dm-sans">{{project.title}}</h1>
            </template>
            <template v-else-if="item.type=='subheading'">
                <p class="indent text-center w-full">{{item.text}}</p>
            </template>
            <template v-else-if="item.type=='images'">
                <template v-if="item.srcs.length==1">
                    <img class="object-cover object-center" :src="item.srcs[0]"/>
                </template>
                <template v-else-if="item.srcs.length==2">
                    <div class="flex gap-3 flex-col md:flex-row">
                        <img class="object-cover object-center w-full md:w-1/2" :src="item.srcs[0]" alt="">
                        <img class="object-cover object-center w-full md:w-1/2" :src="item.srcs[1]" alt="">
                    </div>
                </template>
            </template>
            <template v-else-if="item.type=='action'">
                <div class="indent w-full">
                    <a :href="item.link" class=" bg-gray-900 text-white px-6 py-3 flex w-max items-center gap-4">
                        <template v-if="item.platform=='github'">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.0217 1.66669C5.9441 1.66616 2.46817 4.62334 1.81533 8.6483C1.16248 12.6733 3.52549 16.5775 7.39416 17.8659C7.81083 17.9409 7.95999 17.685 7.95999 17.465C7.95999 17.2675 7.95333 16.7442 7.95083 16.0484C5.63833 16.5484 5.14999 14.9334 5.14999 14.9334C4.99776 14.4308 4.67047 13.9995 4.22749 13.7175C3.47749 13.2017 4.28499 13.2134 4.28499 13.2134C4.81889 13.2866 5.28879 13.6029 5.55749 14.07C5.78494 14.4836 6.16813 14.7891 6.62191 14.9189C7.0757 15.0486 7.56251 14.9917 7.97416 14.7609C8.01284 14.3392 8.20044 13.9451 8.50333 13.6492C6.65833 13.44 4.71833 12.7267 4.71833 9.54085C4.70809 8.71685 5.01408 7.92027 5.57333 7.31502C5.32028 6.59778 5.35008 5.81106 5.65666 5.11502C5.65666 5.11502 6.35416 4.89085 7.94166 5.96585C9.3032 5.59253 10.7401 5.59253 12.1017 5.96585C13.69 4.89002 14.3867 5.11502 14.3867 5.11502C14.6947 5.81074 14.7245 6.598 14.47 7.31502C15.0313 7.92021 15.337 8.71889 15.3233 9.54419C15.3233 12.7384 13.3817 13.44 11.53 13.6459C11.9294 14.0542 12.1343 14.6145 12.0925 15.1842C12.0925 16.2959 12.0825 17.1925 12.0825 17.465C12.0825 17.6875 12.2308 17.9459 12.655 17.8642C16.522 16.5736 18.8825 12.6692 18.2283 8.64528C17.5741 4.6214 14.0984 1.66575 10.0217 1.66669Z" fill="currentColor"/>
                            </svg>
                        </template>
                        <template v-if="item.platform=='instagram'">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.0016 17.5342C7.95165 17.5342 7.70998 17.5234 6.90998 17.4884C6.28612 17.4679 5.67034 17.341 5.08915 17.1134C4.08357 16.722 3.28843 15.9266 2.89748 14.9209C2.67857 14.3376 2.5605 13.7213 2.54831 13.0984C2.50165 12.3 2.50165 12.0384 2.50165 10.0042C2.50165 7.94838 2.51248 7.70838 2.54831 6.91254C2.56076 6.29048 2.67883 5.67505 2.89748 5.09254C3.28801 4.08549 4.08444 3.28936 5.09165 2.89921C5.67385 2.67938 6.28944 2.561 6.91165 2.54921C7.70748 2.50421 7.96915 2.50421 10.0016 2.50421C12.0683 2.50421 12.3058 2.51504 13.0933 2.54921C13.7171 2.5611 14.3344 2.67947 14.9183 2.89921C15.9252 3.2898 16.7215 4.08577 17.1125 5.09254C17.3351 5.68354 17.4538 6.30859 17.4633 6.94004C17.51 7.73838 17.51 7.99921 17.51 10.0325C17.51 12.0659 17.4983 12.3325 17.4633 13.1217C17.4509 13.7452 17.3326 14.3621 17.1133 14.9459C16.7214 15.9523 15.925 16.748 14.9183 17.1392C14.3352 17.3577 13.7192 17.4758 13.0966 17.4884C12.3008 17.5342 12.04 17.5342 10.0016 17.5342ZM9.97331 3.82338C7.93498 3.82338 7.72331 3.83338 6.92748 3.86921C6.45247 3.8755 5.98205 3.96316 5.53665 4.12838C4.87894 4.38005 4.3585 4.89837 4.10415 5.55504C3.93766 6.00529 3.84999 6.48086 3.84498 6.96088C3.80081 7.76838 3.80081 7.98005 3.80081 10.0042C3.80081 12.0042 3.80831 12.2467 3.84498 13.0492C3.85244 13.5244 3.94006 13.9949 4.10415 14.4409C4.35888 15.0971 4.87923 15.615 5.53665 15.8667C5.98174 16.033 6.45236 16.1207 6.92748 16.1259C7.73415 16.1725 7.94665 16.1725 9.97331 16.1725C12.0175 16.1725 12.2291 16.1625 13.0183 16.1259C13.4936 16.1201 13.9644 16.0324 14.41 15.8667C15.0637 15.6129 15.5808 15.0961 15.835 14.4425C16.0011 13.9919 16.0888 13.5161 16.0941 13.0359H16.1033C16.1391 12.2392 16.1391 12.0267 16.1391 9.99088C16.1391 7.95505 16.13 7.74088 16.0941 6.94504C16.0867 6.47042 15.9991 6.00047 15.835 5.55504C15.5813 4.90052 15.0642 4.38279 14.41 4.12838C13.9645 3.96233 13.4937 3.87465 13.0183 3.86921C12.2125 3.82338 12.0016 3.82338 9.97331 3.82338ZM10.0016 13.8534C8.44331 13.8544 7.03783 12.9165 6.4407 11.4771C5.84357 10.0377 6.1724 8.38032 7.27384 7.27793C8.37528 6.17554 10.0324 5.84527 11.4723 6.44115C12.9122 7.03704 13.8513 8.4417 13.8516 10C13.8494 12.1259 12.1275 13.8492 10.0016 13.8534ZM10.0016 7.49838C8.62094 7.49838 7.50165 8.61767 7.50165 9.99838C7.50165 11.3791 8.62094 12.4984 10.0016 12.4984C11.3824 12.4984 12.5016 11.3791 12.5016 9.99838C12.4984 8.619 11.381 7.50159 10.0016 7.49838ZM14.0016 6.90421C13.5062 6.90237 13.1057 6.4997 13.1066 6.00422C13.1076 5.50874 13.5095 5.10755 14.005 5.10755C14.5005 5.10755 14.9024 5.50873 14.9033 6.00421C14.9035 6.24326 14.8086 6.47256 14.6394 6.64144C14.4702 6.81032 14.2407 6.90488 14.0016 6.90421Z" fill="currentColor"/>
                            </svg>
                        </template>

                        <span>
                            See on {{item.platform}}
                        </span>
                        </a>
                </div>
            </template>
            <template v-else-if="item.type=='list'">
                <div class="pl-4 md:pl-7 w-full indent">
                    <p class="" :key="text" v-for="text in item.items">- {{text}}</p>
                </div>
            </template>
            <template v-else-if="item.type=='title'">
                <h2 class="indent font-dm-sans text-xl font-semibold text-left w-full">{{item.text}}</h2>
            </template>
            <template v-else-if="item.type=='paragraph'">
                <p class="indent text-left w-full">{{item.text}}</p>
            </template>
            <template v-else-if="item.type=='viewcount'">
                <p class="w-full text-left indent">{{project.read_count}} {{(project.read_count==1) ? 'view':'views'}}</p>
            </template>
            <template v-else-if="item.type=='serialization-error'">
                <div class="pt-56 flex flex-col gap-2 items-center">
                    <h1 class="font-dm-sans font-medium text-2xl">Serializations error</h1>
                    <p class=" text-gray-700">Could not serialize this blog post</p>
                    <router-link to="/" class="bg-gray-900 w-max px-6 py-3 text-white border border-gray-900 hover:bg-white hover:text-gray-900 transition-all delay-75">Go Home.</router-link>
                </div>
            </template>
        </template>

        <!-- ... -->
        <div class=" h-16"/>
    </div>
</template>

<style scoped>
.indent{
    max-width: 800px;
}
</style>


<script>
import { analytic_ping } from '../api';
export default {
    data: function (){
        return {
            serialized_post: []
        }
    },
    props: {
        project: {type: Object, required: true}
    },
    created: function(){
        try{
            this.serialized_post = JSON.parse(this.project.article);
            for (let i=0; i<this.serialized_post.length; i++) {
                const item = this.serialized_post[i];
                item["id"] = i;
                item.type = item.type.toLowerCase()
                if (item.platform){
                    item.platform = item.platform.toLowerCase()
                }
            }
            
            // analytics
            analytic_ping(this.project.id)
        }catch (e){
            this.serialized_post = [
                {"type": "serialization-error"}
            ];
        }
    }
}
</script>