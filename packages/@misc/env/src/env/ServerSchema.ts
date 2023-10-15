import {z} from "@pico/utils";

export const ServerSchema = z.object({
    DATABASE_URL:    z.string().url(),
    NODE_ENV:        z.enum([
        "development",
        "test",
        "production"
    ]),
    NEXTAUTH_URL:    z.string().url(),
    NEXTAUTH_SECRET: process.env.NODE_ENV === "production"
                         ? z.string().min(1)
                         : z.string().min(1).optional(),
});
