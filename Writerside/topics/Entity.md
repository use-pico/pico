# Entity

When working with a common application, usually there is a need to create classic CRUD.

Here is a simple way, how to do this.

## Before you start

All the naming conventions are a <i>recommended way</i>, how to organize files. You can
use another way, if you want to.

<tip>
    You'll be creating bunch of files both on <i>client-side</i> and <i>server-side<i/>. It's a <b>good practice</b>
    to separate them properly to prevent bundling server-side code into client-side as it <i>may fail to build</i>.
</tip>

## Client-side

First we need to create all the client-side stuff.

## Create Dull Schema

Each entity needs quite a **bunch of schemas**, there is a tool to create one schema to _rule them all_,

<procedure type="steps">
    <step>
        <p>
            <tip>
                Create file <b>`./schema/TranslationDullSchema.ts`</b>
            </tip>
        </p>
    </step>
    <step>
        <p>Import dull schema</p>
        <code-block lang="typescript">
import {withDullSchema} from "@use-pico/dull-stuff";
        </code-block>
    </step>
    <step>
        <p>Define all-in-one schemas</p>
        <code-block lang="typescript">
export const TranslationDullSchema = withDullSchema({
    /**
     * Define a shape of entity; "identityOf" exposes
     * same API as "@use-pico/schema".
     * 
     * "identityOf" ensures entity schema has all the
     * required properties required by library.
     */
    entity:  identityOf(z => z.object({
        locale: z.string,
        key:    z.string,
        value:  z.string,
    })),
    /**
     * Define arbitrary shape of an entity used in mutations
     * (could be different, but it is usually same as entity).
     */
    shape:   schema(z => z.object({
        locale: z.string,
        key:    z.string,
        value:  z.string,
    })),
    /**
     * Specify filters available for your entity; this could
     * be any complexity you need as it's your responsibility
     * to implement filtering on server-side.
     */
    filter:  filterOf(z => z.object({
        locale: z.string$,
        key:    z.string$,
    })),
    /**
     * Provide orderBy keys available for you users.
     */
    orderBy: orderByOf(["locale", "key"]),
});
/**
 * Just a convention to export schema type next to schema itself.
 */
export type TranslationDullSchema = typeof TranslationDullSchema;
        </code-block>
    </step>
</procedure>

## Create Query Store

Query store is source of truth for setting client-side query, for example for tables or
other sources.

<procedure type="steps">
    <step>
        <p>
            <tip>
                Create file <b>`./store/TranslationQueryStore.ts`</b>
            </tip>
        </p>
    </step>
    <step>
        <p>Import factory</p>
        <code-block lang="typescript">
import {createQueryStore} from "@use-pico/query";
        </code-block>
    </step>
    <step>
        <p>And just use the schema you've already created</p>
        <code-block lang="typescript">
export const TranslationQueryStore = createQueryStore({
    name:   "TranslationQueryStore",
    schema: TranslationDullSchema.query
});
        </code-block>
    </step>
</procedure>

## Create RPC

Because there are some endpoints you need, there is factory for them.

<procedure type="steps">
    <step>
        <p>
            <tip>
                Create file <b>`./rpc/TranslationRpc.ts`</b>
            </tip>
        </p>
    </step>
    <step>
        <p>Import factory</p>
        <code-block lang="typescript">
import {withDullRpc} from "@use-pico/dull-stuff";
        </code-block>
    </step>
    <step>
        <p>This is simple stuff, just choose base key (basically <i>react-query</i> key) and import your <i>dull schema</i>.</p>
        <code-block lang="typescript">
export const TranslationRpc = withDullRpc({
    key:    ["pico", "translation"],
    schema: TranslationDullSchema,
});
export type TranslationRpc = typeof TranslationRpc;
        </code-block>
    </step>
</procedure>

## Create Common UI

There is a lot of repeating stuff which could be wrapped around, <i>here we go</i>.

<procedure type="steps">
    <step>
        <p>
            <tip>
                Create file <b>`./ui/TranslationUI.ts`</b>
            </tip>
        </p>
    </step>
    <step>
        <p>Import factory</p>
        <code-block lang="typescript">
import {withDullUI} from "@use-pico/dull-stuff";
        </code-block>
    </step>
    <step>
        <p>And just use the schema and RPC wrapper you've already created</p>
        <code-block lang="typescript">
export const TranslationUI = withDullUI({
    rpc:        TranslationRpc,
    queryStore: TranslationQueryStore,
});
        </code-block>
    </step>
</procedure>

## Server-side

Now we have all the required stuff for server-side.

## Create Repository

Repository defines default behavior of you entity, usually doesn't need to include much of code.

<procedure type="steps">
    <step>
        <p>
            <tip>
                Create file <b>`./repository/TranslationRepository.ts`</b>
            </tip>
        </p>
    </step>
    <step>
        <p>This is a template, but repositories may have basically same shape all the times.</p>
        <code-block lang="typescript" src="concept/entity/repository.ts"/>
    </step>
</procedure>

## DI Container wrapper

To use Repository in your code, there is a wrapper to simplify binding and using services (in this case Repository).

<procedure type="steps">
    <step>
        <p>
            <tip>
                Create file <b>`./container/withTranslationRepository.ts`</b>
            </tip>
        </p>
    </step>
    <step>
        <p>Here you just choose the name of your service (repository); be careful about service name collisions.</p>
        <code-block lang="typescript">
import {withService}                from "@use-pico/container";
import {type TranslationRepository} from "../repository/TranslationRepository";

export const withTranslationRepository = withService<TranslationRepository.Type>("
@use-pico/i18n/TranslationRepository");
</code-block>
</step>
</procedure>

## Expose services

This factory may contain more services, but in this context only repository is present.

<procedure type="steps">
    <step>
        <p>
            <tip>
                Create file <b>`./container/withTranslationContainer.ts`</b>
            </tip>
        </p>
    </step>
    <step>
        <p>You may have more services registered here, now we're using only previously created Repository.</p>
        <code-block lang="typescript" src="concept/entity/withTranslationContainer.ts"/>
    </step>
</procedure>

## Register services

You should have your DI container setup, so just add `withTranslationContainer` to register all the previously created
stuff.