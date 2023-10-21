import {type Schema} from "../Schema";

export interface ArraySchema<
    TItem extends Schema,
    TOutput = Schema.Output<TItem>[]
> extends Schema<Schema.Input<TItem>[], TOutput> {
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
