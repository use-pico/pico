# About @use-pico

![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/t/use-pico/pico)

> This library and docs are still in heavy development despite being here for quite a long time, so please keep that
> in mind and be lenient.
>
{style="warning"}

## About pico

If you're curious about quite edge ideas, you're welcome to this project as it provides interesting DX experience
for fullstack Next.js development with all the features one could expect from an advanced library.

## Origin

This is not any other new library which popped from the ether, but quite mature piece used already in production with
quite a history.

Original project name was `@leight-core`, but for it's strange name it was (_somehow_) shortened to `@use-pico` (as `@pico` itself
was already taken).

## What is covered

> So, you're here. That's nice, because you'll get a collection of libraries broken into small pieces, so you can pick up whatever you
> actually need.

You got it all.
This collection is aimed for **fullstack** `Next.js` development, so you got a lot of features for UI (based
on Mantine UI) and some cool features covering backend side, like DI or repositories.

## Dependencies

> Yes, modern hunting for tiny bundle size is not much covered here, but because a collection provides **real** features used in
> common applications, it's worth it as you don't need any other libraries (or at least _less of them_).

If you're looking for something small, you're on wrong place. Library tries to keep itself as small as possible, but due to use
of some quite heavy dependencies (like Mantine), it's not possible to stay slim.

Some pieces are really small, some are big, but in reality, when you use something from this lib, it will probably take half of the
stuff with it.

## Stack

> The Main goal is to try to **wrap** as much as possible to prevent rewriting existing libaries. There are a lot of examples
> where it was necessary to reinvent the wheel (like for `valibot`) or create a better implementation of a concept.

- [Next.js](https://nextjs.org/) as the base framework
- [Mantine UI](https://mantine.dev/) for UI stuff
- [react-hook-form](https://react-hook-form.com/) well, form forms
- [Zustand](https://github.com/pmndrs/zustand) for store management
- [react-intl](https://formatjs.io/docs/react-intl/) for translations
- [luxon](https://moment.github.io/luxon/#/) for date time manipulation
- In-house validation library directly based on [valibot](https://github.com/fabian-hiller/valibot), so credits go there
- In-house RPC, for details see [Concepts/RPC](concept-RPC.md)

## Epilogue

This project is here for **ages** (a few years) and is actively developed. Currently, it's not facing the public because a lot
of concepts and APIs are still in heavy development and there is no semver guaranteed. You can see this only because it's
full of interesting ideas you can learn from or get some inspiration.

<seealso>
    <category ref="wrs">
        <a href="Installation.md">Installtion</a>
        <a href="Getting-started.md">Getting started</a>
        <a href="Concepts.md">Concepts behind the library</a>
    </category>
</seealso>
