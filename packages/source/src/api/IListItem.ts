import {type PicoSchema} from "@use-pico/schema";

export namespace IListItem {
    export interface WithIdentity<TSchema extends PicoSchema> {
        id: string;
        item: PicoSchema.Output<TSchema>;
    }

    export type Item<TSchema extends PicoSchema> = PicoSchema.Output<TSchema>;
}
