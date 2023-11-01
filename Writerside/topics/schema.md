# @use-pico/schema

![npm](https://img.shields.io/npm/v/%40use-pico%2Fschema)
![npm](https://deno.bundlejs.com/badge?q=@use-pico/schema@^2.0.0&treeshake=[*])

> Credits for this library goes to **[valibot](https://github.com/fabian-hiller/valibot)** as the source is based on it.

## Overview

Main motivation for this library was heavy use of `generics` in the source which usually does not play well with validation libraries
(like [Zod](https://zod.dev/) or even [valibot](https://github.com/fabian-hiller/valibot)).

Result of object schemas with generics was `polluted types` hard to debug and even harder to understand. So that's the reason for the existence
of this lib as it `fixed` those problems, but with a bit more limited feature set.

## Installation

<tabs>
    <tab title="npm">
        <code>$ npm i @use-pico/<b>schema</b></code>
    </tab>
</tabs>
