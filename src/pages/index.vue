<script setup lang="ts">
// @ts-ignore
import SvgIcon from "@jamescoyle/vue-icon";
import NavigationBar from "@/components/NavigationBar.vue";
import FooterBar from "@/components/FooterBar.vue";
import { mdiGithub, mdiPostOutline, mdiPalette, mdiFileAccount } from "@mdi/js";
import { socialLinks } from "@/constants";

const featuredItems = [
  {
    name: "Featured Post",
    icon: mdiPostOutline,
    img: "https://cdn.hashnode.com/res/hashnode/image/upload/v1609630335560/qwDVrDJ6-.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
    title: "Argparse: Command-line parsing.",
    summary:
      "This series covers some of the more frequently reused building blocks that solve problems common to so many applications",
    link: "https://codewithrubbie.hashnode.dev/argparse-command-line-parsing",
  },
  {
    name: "Featured Project",
    icon: mdiGithub,
    img: "https://raw.githubusercontent.com/rubbieKelvin/courier/refs/heads/main/images/cover.png",
    title: "Courier",
    summary:
      "Courier is desktop aplication witten in Python and Qt for data transfer between machines connected to the same network.",
    link: "https://github.com/rubbieKelvin/courier",
  },
  {
    name: "Featured Artwork",
    icon: mdiPalette,
    img: "https://i.pinimg.com/originals/eb/1d/76/eb1d76692ce400d2059889ff21405f1f.png",
    title: "Rubbie: Character art",
    summary:
      "Rubbie Kelvin, a tall and charismatic African character in Nigeria, blends tech and art seamlessly.",
    link: "https://www.pinterest.com/pin/941744972065560763/",
  },
];
</script>

<template>
  <div class="md:container md:mx-auto">
    <div class="md:pt-4 flex flex-col gap-6">
      <NavigationBar />

      <!-- cards 1 -->
      <div class="min-h-[650px] flex gap-4 md:flex-row flex-col px-10 md:px-0">
        <!-- intro card -->
        <div
          class="md:bg-gray-100 md:flex-[60%] md:border p-8 flex flex-col gap-12"
        >
          <h1 class="text-6xl lg:text-8xl font-pixel text-center md:text-start">
            <span class="italic text-gray-600">Hello world</span>,
            <br />
            I'm&nbsp;<span class="font-medium">Rubbie kelvin</span>
          </h1>
          <p class="text-xl md:w-[70%] text-gray-800 text-center md:text-start">
            I love solving complex problems with creative solutions. My
            experience spans everything from building scalable systems to
            crafting sleek front-end designs, always aiming for seamless user
            experiences. Whether it’s powering up back-end processes or refining
            front-end interfaces, I’m here to make technology work for people.
          </p>
          <div class="md:flex-grow" />
          <div class="pb-2 flex items-center gap-4 flex-col sm:flex-row">
            <a
              href="https://drive.google.com/file/d/12qISjwJ74seuPHEd0V1qg5XGZdV2QkNl/view?usp=drive_link"
              target="_blank"
              class="bg-gray-900 hover:bg-black text-white p-4 rounded-full text-lg flex items-center gap-2"
            >
              <SvgIcon type="mdi" :path="mdiFileAccount" size="22" />
              <span class="font-pixel"> See resume </span>
            </a>
            <div class="flex gap-4 items-center">
              <a
                v-for="sl in socialLinks"
                :key="sl.label"
                :href="sl.link"
                :title="sl.label"
                class="flex p-4 text-black border border-gray-600 hover:bg-black hover:text-white rounded-full"
              >
                <SvgIcon type="mdi" :path="sl.icon" />
              </a>
            </div>
          </div>
        </div>
        <!-- image card -->
        <div class="flex-[40%] relative md:h-auto">
          <img src="/rubbie.gif" alt="rubbie" class="sticky top-1" />
          <div
            class="md:bg-gray-100 md:border absolute w-full top-[35%] bottom-0 -z-10"
          />
        </div>
      </div>

      <!-- featured -->
      <div class="flex gap-4 md:flex-row flex-col px-10 md:px-0">
        <a
          v-for="item in featuredItems"
          :href="item.link"
          class="flex-[33%] border bg-gray-100 p-4 flex flex-col gap-4"
          :key="item.name"
        >
          <div class="flex items-center gap-2">
            <SvgIcon type="mdi" :path="item.icon" size="20" />
            <p class="font-medium font-pixel">{{ item.name }}</p>
          </div>

          <div class="flex-grow">
            <img
              :src="item.img"
              :alt="item.title"
              class="object-cover h-52 lg:h-96 w-full border border-gray-200"
            />
          </div>

          <h2 class="text-3xl font-pixel font-medium">{{ item.title }}</h2>
          <p>
            {{ item.summary }}
          </p>
        </a>
      </div>

      <FooterBar />
    </div>
  </div>
</template>
