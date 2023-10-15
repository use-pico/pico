import {type z} from "@pico/utils";

export interface WithItem<TItem> {
    item: TItem;
}

export namespace WithItem {
    export type Schema<TSchema extends z.ZodSchema> = WithItem<z.infer<TSchema>>;
}
