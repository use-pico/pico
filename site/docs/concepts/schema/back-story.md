---
title: Back Story
---

Why another schema library?

That's simle. Even this was quite **long research**, what to use and it wasn't some random decision.

## Zod

Yes, I've used Zod before and **I liked it**. Ok. _I didn't liked it), because at the core, it worked very well, but core is the simplest
thing of the schema library.

What's the hard part is to make use **schemas** with **generics**, which was overall the biggest challange to take.

And here is, where Zod failed.

## Valibot

I want to give credit to **Valibot**, because `@use-pico/schema` is directly built on top of it's sources, but polishes some things Valibot
_**fails to deliver**_.

Again, problem was deep typings under generics, which `@pico` uses _**quite heavily**_.

## @use-pico/schema

Tradaa! Here we are! This library is standalone, without any dependencies to keep it quite reusable. Why it exists? Because it can handle
**deep generics** without any problems.

See **[how to](/docs/category/schema-usage)** section of schemas to read more, usages and reasons, why this library exists.
