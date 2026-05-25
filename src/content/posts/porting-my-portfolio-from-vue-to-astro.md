---
title: Porting my portfolio from vue to astro
publishedAt: 2025-08-25
description: 
author: rubbie-kelvin
categories:
  - programming
mainImage: /images/c367eb185ee7f0cd962cffa1e55cecedeff88582-1920x1080.png
---

# Intro

I've had all my portfolios written in nuxt/vue for the longest time. i remember picking up vue since august 2020, it was so easy to learn and i wrote my first [first vue project](https://github.com/rubbieKelvin/pseudoapi) a day after reading vue docs. vue's still my go-to when building web apps, but when it comes to building static sites, astro just became my new love.

## Why the switch?

The switch was made out of frustration actually. i needed a way to post static content on my blog and nuxt came through with [nuxt content](https://content.nuxt.com/). however, after some update i made, i couldn't really get the blog part working smoothly anymore. i noticed my post no longer showed up until i refresh the page. the error that showed up on my vue page was

```
Access to fetch at 'https://www.rubbietheone.com/?v=v3.3.0--vHJ6qT1DnX' (redirected from 'https://iam.rubbietheone.com/api/content/blog/database.sql?v=v3.3.0--vHJ6qT1DnX') from origin 'https://iam.rubbietheone.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

I spent a while trying to fix that error, then i concluded it wasn't worth it anymore. i decided to move to [sanity](https://www.sanity.io/), which i've used in the past to setup [Colabra's blogs and change-logs](https://colabra.ai/blog). Setting up sanity in nuxt, was pretty simple, until i hit this weird error:

```
Error: The requested module '_nuxt/react-compiler-runtime/dist/index.js' does not provide an export named 'c' on sanity
```

I spent a few more hours trying to fix this, maybe a skill issue idk... but truth be told i followed sanity's docs to the letter (except the names & credentials of course). I got tired and decided i should give something else a shot.

> All of this was in one night btw.

## Okay, but why astro?

Tbh i just went for the next cool thing and that wasn't react. Thank you xD. Also astro was listed in sanity's docs so sanity support was assured.

# Astro so far.

I haven't written anything in astro before now, so setting up a new site in a day was really awesome, i like how bare astro-out-of-the-box can be (i saw it was [framework agnostic](https://docs.astro.build/en/guides/framework-components/)). it's pretty close to html and maybe what the html-css-js trio would have been if it was designed in the modern day. Simplicity out of the box, static site generation is a breeze, and everything just works really good on the get go.


Though i'm not sure how Astro plays out on big apps, it's a really awesome frontend framework and you should give it a try.
