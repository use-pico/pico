import {type z} from "@use-pico/utils";

export namespace IListItem {
    export interface WithIdentity<TSchema extends z.ZodSchema> {
        id: string;
        item: z.infer<TSchema>;
    }

    export type Item<TSchema extends z.ZodSchema> = z.infer<TSchema>;
}
