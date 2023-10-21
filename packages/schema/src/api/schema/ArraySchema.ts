import {type PicoSchema} from "../PicoSchema";

export interface ArraySchema<
    TItem extends PicoSchema,
    TOutput = PicoSchema.Output<TItem>[]
> extends PicoSchema<PicoSchema.Input<TItem>[], TOutput> {
    schema: "array";
    array: {
        item: TItem;
    };
}

export namespace ArraySchema {
    export type PathItem = {
        schema: "array";
        input: any[];
        key: number;
        value: any;
    }
}
