<template>
    <div class="wrapp container mx-auto flex flex-col items-center justify-center pt-28" style="">
        <div class=" px-10 md:p-10 min-w-96 md:border rounded-md border-gray-200 flex flex-col flex-grow md:flex-grow-0 gap-4">
            <div class="flex flex-col gap-2">
                <h1 class="font-dm-sans font-bold text-2xl">Hire Me!</h1>
                <p class=" text-sm text-gray-500">*Only available for remote work</p>
            </div>

            <div class=" bg-gray-200" style="height: 1px;"/>

            <div class="text-xs bg-blue-50 border-blue-300 px-3 py-1" v-if="status.sending">
                Sending mail...
            </div>

            <div class="text-xs bg-blue-50 border border-blue-300 px-3 py-1" v-if="typeof status.successful === 'boolean'">
                {{(status.successful) ? "Mail Sent!" : "Error sending mail..."}}
            </div>

            <form class="flex flex-col gap-4 flex-grow">
                <div class="flex flex-col gap-2">
                    <label for="email-field">Email</label>
                    <div class="rounded-md px-4 border-2 border-gray-300 focus-within:border-blue-500 flex focus-within:text-blue-500 items-center gap-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 20H4C2.89543 20 2 19.1046 2 18V5.913C2.04661 4.84255 2.92853 3.99899 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20ZM4 7.868V18H20V7.868L12 13.2L4 7.868ZM4.8 6L12 10.8L19.2 6H4.8Z" fill="currentColor"/>
                        </svg>
                        <input v-model="form.email" class=" h-16 text-gray-900 focus:outline-none" type="email" name="email-field" required placeholder="example@email.com">
                    </div>
                </div>

                <div class=" flex flex-col gap-2">
                    <label for="msg-field">Message</label>
                    <textarea v-model="form.message" class="rounded-md pt-1 focus:border-blue-500 resize-none text-gray-900 focus:outline-none px-4 border-2 h-48 border-gray-300" required placeholder="Discuss job details..."/>
                </div>
                <div class="md:hidden flex-grow"/>
                <button :disabled="status.sending" @click.prevent="sendMail" type="submit" class=" cursor-pointer bg-accent rounded-lg w-full flex items-center justify-center text-white h-16">
                    <svg v-if="status.sending" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{(status.sending) ? 'Sending...' : 'Send' }}
                </button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.wrapp{
    min-height: 85vh;
}
@media (min-width: 768px) {
    .wrapp{
        min-height: 92vh;
    }
}
</style>

<script>
import { send_mail } from '../api'

const emai_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
    data(){
        return {
            status: {
                sending: false,
                successful: null
            },
            form: {
                email: "",
                message: ""
            }
        }
    },
    created(){
        document.title = "Hire Rubbie!"
    },
    methods: {
        async sendMail(){
            const email = this.form.email.trim().toLowerCase()
            const message = this.form.message.trim()

            if ((!emai_regex.test(email)) || email.length<7 || message.length<1) return

            this.status.successful = null
            this.status.sending = true

            const res = await send_mail(email, message)

            this.form.email = ""
            this.form.message = ""
            this.status.sending = false
            this.status.successful = res

            const self = this
            window.setTimeout(() => {self.status.successful=null}, 6000)
        }
    }
}
</script>