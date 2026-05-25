---
title: Building is hard
publishedAt: 2025-09-08
description: Casually building shit in rust
author: rubbie-kelvin
categories:
  - developer-tools
  - rust
  - programming
mainImage: /images/e550963986472bb8715a4b7f9b1bf13af20534d7-1920x1080.png
---

I'm writing this so I don't get lost in the abyss of all this Rust code as I continue building Native Doctor. Three months ago, I had a half-baked idea and a custom language-parser that barely worked. Today, I have something that actually executes HTTP requests based on YAML configuration, handles dependencies, and might even be useful to other people. The journey from there to here has been... stressful & educational.

## In the beginning

I just want to build something okay? I think that's enough reason. But why this tho? I started a project in 2020 named snowman.. terrible name I know but it was basically postman but without the whole postman login crap. No UI tho, no CLI, so yeah there was no interface. The project was basically scrap and unusable, so I put that one in the trash where it belonged.

Although that's behind me now, I still don't much like postman. The terrible sign-in wall and a ton of other things make me ick. So, like the time-wasting person that I am, I decided to build snowman again, but this time in rust. And this time, I'm calling it Native Doctor because apparently I still suck at naming things.

The core idea hasn't changed: define API tests and workflows in a structured, human-readable format that lives somewhere in your project folder and can be included in your commits. No signing up for API testing tools, no losing your work when the service goes down, just files in your repo that everyone can see and edit.

## God strikes babel once again

Three months ago, after doing what I generously called "DX research," I decided to create a domain-specific language. I settled on what I thought was a friendly syntax where you could specify environment variables, define multiple requests, and call them. It looked like this:

> NOTE: Yes i considered *.http* but it wouldn't have worked out without modifying the *.http* file specification to fit my requirements

```
@env
  base_url = "https://api.yourapp.com/v1"
  base_url.dev = "http://localhost:800/v1" // Override for "dev" environment
@end

@request LoginUser
  POST {{base_url}}/auth/login

  @headers {
    Content-Type: application/json
  }
  
  @body:json
    {
      "email": "{{user_email}}",
      "password": "{{user_password}}"
    }
@end

@call LoginUser
```

The idea was simple: define your variables, requests, and specify which request to call. I was so proud of this syntax. I thought I was building the future of API testing but i was actually building a headache.

## Yes, let's write a parser in rust

I moved on to write the parsing expression grammar because apparently I hate myself. First attempt was with nom.rs, and I got completely lost in combinator hell. The learning curve was like climbing Everest in flip-flops. I found myself spending more time fighting the parser than building anything useful.

Then I switched to pest.rs and used gemini to generate the pest file *(shout out to google for enabling my bad decisions)*. While it worked better than nom, I was still spending way too much time on parsing instead of the actual HTTP request logic. Weeks turned into months, and I had a parser that could barely handle my custom syntax but couldn't actually make HTTP requests.

After what felt like an eternity of wrestling with parsing combinators and grammar rules, I had an epiphany while staring at yet another "expected token" error: I was solving the wrong problem! I didn't need a new language. I needed a tool that worked.

## YAML isn't so bad i guess

So I threw away months of parser work and switched to YAML. Best decision I made on this entire project. Now, a request can look like this:

```yaml
name: Headers Inspection Test
method: GET
url: https://httpbin.org/headers
doc: Test request headers inspection - returns all headers sent by client
headers:
  User-Agent: "Native-Doctor/1.0"
  Accept: "application/json"
  X-Custom-Header: "custom-value"
  X-Test-Suite: "httpbin-native-doctor"
  X-Request-ID: "req-12345"

```

Clean, readable, and I get syntax highlighting and validation for free (after writing [the schema](https://github.com/rubbieKelvin/nativedoctor/tree/main/definations) of course). Plus, every developer (i guess) already knows YAML. Sometimes the boring solution is the right solution, and sometimes you need to waste three months learning that lesson.

## Actually building the thing

With YAML handling the configuration, I could finally focus on actual problems. The first real challenge was request dependencies. I wanted requests to depend on other requests running first, like needing to login before accessing protected endpoints. This meant building a dependency system that could create a call stack and execute requests in the right order.

The tricky part was detecting circular dependencies. Imagine if request A depends on request B, which depends on request A. That's an infinite loop waiting to ruin someone's day. I wrote recursive functions that traverse the dependency graph and throw errors when they find cycles. It took several iterations to get right, and I'm still not entirely convinced it handles all edge cases.

I also introduced project files that can define sequences of requests. You can organize related requests and run them as workflows, which is perfect for integration testing where you need a whole chain of API calls to verify a feature works end-to-end.

## The scripting rabbit hole

Originally, I wanted JavaScript for post-request validation, following the Postman model. This turned into one of those rabbit holes that makes you question your life choices.

### #1 Deno core

I tried deno_core to embed a JavaScript runtime. The documentation was sparse, and setting up the runtime felt like using a nuclear reactor to power a flashlight. I spent days trying to get basic script execution working and kept hitting weird runtime issues that made no sense.

### #2 Rustyscript

I found a crate called RustyScript that promised easy JavaScript integration. Got it working initially, but then encountered these bizarre runtime errors that were impossible to debug. The error messages were about as helpful as a chocolate teapot, and the documentation was basically "good luck, figure it out yourself."

### #3 Lua

I also considered Lua with the hlua crate. Lua is simpler and has better Rust integration, but then I'd be forcing users to learn Lua just for simple assertions. That seemed like trading one problem for another.

### #4 Rhai

Current plan: [Rhai](https://rhai.rs/), a scripting language designed specifically for embedding in Rust applications. It has Rust-like syntax, excellent error handling, and is built for exactly this use case. I haven't implemented it yet, but it feels like the right fit for post-request testing and validation.

## Where I am now

> Development has not been linear, i have a full time job, so when i say 3 months i mean my free Saturday mornings in the span of 3 months

Three months after that first attempt with the custom language, Native Doctor actually works. It can handle HTTP requests with YAML configuration, manage request dependencies, support multiple body types, and organize everything into projects. I even built a comprehensive test suite with [29 test files](https://github.com/rubbieKelvin/nativedoctor/tree/main/httpbin) covering all the httpbin.org endpoints because apparently I enjoy writing tests now.

But it's still early development. Project sequence execution is partially implemented but not complete. Response output handling needs work. The Rhai scripting integration is still on the todo list. Error messages could be more helpful. There are probably bugs I haven't found yet.

The thing about building software is that it's never as straightforward as you think. I thought I'd spend most of my time on HTTP request logic, but instead I spent months on parsing, weeks on dependency resolution, and countless hours debugging edge cases I never saw coming.

## Building is hard but worth it

I learned some expensive lessons on this project. Don't build a language unless you absolutely have to. YAML solved 90% of my problems with 10% of the effort. Focus on the core problem first instead of getting distracted by shiny parsing libraries. The Rust ecosystem is amazing but overwhelming, with five different crates for every problem, each with different trade-offs.

But here's the thing: even with all the frustrations, dead ends, and moments where I wanted to throw my laptop out the window, building Native Doctor has been incredibly rewarding. Every time I get a feature working, every time I fix a bug that's been bothering me for weeks, every time I see the tool actually solving a real problem, it makes all the struggle worth it.

The goal is still the same as it was with snowman: a simple, powerful API testing tool that doesn't require signing up for anything, stores configuration in your repo, and just works. I'm not there yet, but I'm a lot closer than I was three months ago when I was fighting with parsing combinators.

Building is hard, but it's also the most fun I've had in a long time. Even if the problems I'm solving are ones I created for myself by refusing to just use Postman like a normal person.


