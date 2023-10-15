import {z}            from "@use-pico/utils";
import {ClientSchema} from "./ClientSchema";
import {ServerSchema} from "./ServerSchema";

export interface IWithEnvProps<
    TServerSchema extends z.ZodSchema,
    TClientSchema extends z.ZodSchema
> {
    serverSchema?: TServerSchema;
    clientSchema?: TClientSchema;
    processEnv?: Record<string, any>;
    validate?: boolean;
}

export const withEnv = <
    TServerSchema extends z.AnyZodObject,
    TClientSchema extends z.AnyZodObject
>(
    {
        serverSchema,
        clientSchema,
        processEnv,
        validate = true,
    }: IWithEnvProps<TServerSchema, TClientSchema>) => {
    const $serverSchema = ServerSchema.merge(serverSchema || z.object({}));
    const $clientSchema = ClientSchema.merge(clientSchema || z.object({}));
    const $schema = $serverSchema.merge($clientSchema);
    const $processEnv = {
        DATABASE_URL:    process.env.DATABASE_URL,
        NODE_ENV:        process.env.NODE_ENV,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL:    process.env.NEXTAUTH_URL,
        ...processEnv,
    };

    let env: z.infer<typeof $schema> = process.env as any;
    if (validate) {
        const isServer = typeof window === "undefined";
        const result = isServer
            ? $schema.safeParse($processEnv)
            : $clientSchema.safeParse($processEnv);
        if (!result.success) {
            console.error(
                "❌ Invalid environment variables:",
                result.error.flatten().fieldErrors,
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
                            : `❌ Attempted to access server-side environment variable '${prop}' on the client`,
                    );
                }
                return (target as any)[prop];
            },
        }) as any;
    }

    return {
        serverSchema: $serverSchema,
        clientSchema: $clientSchema,
        schema:       $schema,
        env,
    };
};
