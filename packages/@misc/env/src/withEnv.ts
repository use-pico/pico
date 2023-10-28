import {
    merge,
    type ObjectSchema,
    parse$,
    type PicoSchema
} from "@use-pico/schema";

export namespace withEnv {
    export interface Props<
        TClientSchema extends ObjectSchema<any>,
        TServerSchema extends ObjectSchema<any>,
    > {
        client: TClientSchema;
        server: TServerSchema;
        processEnv?: Record<string, any>;
        validate?: boolean;
    }
}

export const withEnv = <
    TClientSchema extends ObjectSchema<any>,
    TServerSchema extends ObjectSchema<any>,
>(
    {
        client,
        server,
        processEnv,
        validate = true,
    }: withEnv.Props<TClientSchema, TServerSchema>
) => {
    const schema = merge([
        client,
        server,
    ]);

    let env: PicoSchema.Output<typeof schema> = process.env as any;
    if (validate) {
        const isServer = typeof window === "undefined";
        const result = isServer
            ? parse$(schema, processEnv)
            : parse$(client, processEnv);
        if (!result.success) {
            console.error(
                "❌ Invalid environment variables:",
                processEnv,
                result.issues,
            );
            throw new Error("Invalid environment variables");
        }
        env = new Proxy<typeof result.data>(result.data, {
            get(target, prop) {
                if (typeof prop !== "string") {
                    return undefined;
                }
                if (!isServer && !prop.startsWith("NEXT_PUBLIC_")) {
                    throw new Error(
                        process.env.NODE_ENV === "production"
                            ? "❌ Attempted to access a server-side environment variable on the client"
                            : `❌ Attempted to access a server-side environment variable '${prop}' on the client`,
                    );
                }
                return (target as any)[prop];
            },
        }) as any;
    }

    return {
        client,
        server,
        schema,
        env,
    };
};
