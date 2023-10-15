import {z} from "@use-pico/utils";

export const CursorSchema = z.object({
    page: z.number().gte(0, "invalid-cursor-page"),
    size: z.number().gte(1, "invalid-cursor-size"),
});
export namespace CursorSchema {
    export type Schema = typeof CursorSchema;
    export type Type = z.infer<Schema>;
}
