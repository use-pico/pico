# Object schema

> When you need more complex validation rules covering an object, this schema is suitable for you.
>
{style="note"}

Object schema is a starting point for schema as you usually start with describing more complex validation structures.

## Basic usage

> Please keep in mind this belongs to a concept, how to organize schemas and use types related to them.

<procedure type="steps">
    <step>
        <p>Import schema</p>
        <code-block lang="typescript" src="schema/object/basic.ts" include-lines="1-4"/>
    </step>
    <step>
        <p>
            <tip>
            Notice usage of <b><code>z.</code></b> in factory - this is kind reference to <b>Zod</b> as it was very first validation
            library used in this project. Also it's a bit simpler to move your existing schemas to this validation library.
            </tip>
        </p>
        <p>Use factory method to create a schema (same for all schemas)</p>
        <code-block lang="typescript" src="schema/object/basic.ts" include-lines="1-6"/>
    </step>
    <step>
        <p><note>
            Your IDE should give you intentions what you can you on the <b><code>z.</code></b>.
        </note></p>
        <p>Define object properties (validation rules)</p>
        <code-block lang="typescript" src="schema/object/basic.ts" include-lines="1-9"/>
    </step>
    <step>
        <p>Export types</p>
        <code-block lang="typescript" src="schema/object/basic.ts" include-lines="1-27"/>
    </step>
    <step>
        <p>
            Usage
        </p>
        <code-block lang="typescript" src="schema/object/basic.ts" include-lines="29-"/>
        <p>
            <note>You'll get nicely typed schema, so you know what you can use.</note>
        </p>
        <p><img src="showcase.png"/></p>
    </step>
</procedure>

## Advanced usage

> This is a bit more advanced example, but still quite a simple one.

<procedure type="steps">
    <step>
        <p>Define object, including nested object</p>
        <code-block lang="typescript" src="schema/object/advanced.ts" include-lines="1-16"/>
    </step>
    <step>
        <p>
            Usage
        </p>
        <code-block lang="typescript" src="schema/object/advanced.ts" include-lines="24-"/>
        <p>
            <note>Again, everything is typed. Error is here, because "required" property is marked as a number, but assigned is string.</note>
        </p>
        <p><img src="showcase-2.png"/></p>
    </step>
</procedure>

## Example with generics

> Generics with validation libraries kinda sucks, but here is **quite a nice solution**.
>
{style="note"}

This is piece of code picked up from source code of [`@use-pico/query`](query.md) package.

Generics could be handled like this: create a factory function to handle wrapping schema with generics and returning right types back.

<code-block lang="typescript" src="schema/object/generics.ts"/>

Generic schema could be done like this: _draw_ schema on type level (this is where this library shines), you have all the tools to describe schema "manually",
so you can provide proper shape, even using generics and get everything properly typed.

<code-block lang="typescript" src="schema/object/generics-type.ts"/>
