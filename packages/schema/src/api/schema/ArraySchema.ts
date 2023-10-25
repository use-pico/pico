import {type PicoSchema}     from "../PicoSchema";
import {type NullishSchema}  from "./NullishSchema";
import {type OptionalSchema} from "./OptionalSchema";

export interface ArraySchema<
    TItem extends PicoSchema,
    TOutput = PicoSchema.Output<TItem>[]
> extends PicoSchema<PicoSchema.Input<TItem>[], TOutput> {
    schema: "array";
    item: TItem;

    nullish(): NullishSchema<this>;

    optional(): OptionalSchema<this>;
}

export namespace ArraySchema {
    export type PathItem = {
        schema: "array";
        input: any[];
        key: number;
        value: any;
    }
}
