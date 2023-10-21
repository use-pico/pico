import {type Parse} from "./Parse";

export interface PicoSchema<TInput = any, TOutput = TInput> {
    parse(input: unknown, info?: Parse.Info): Parse.Result<TOutput>;

    types?: {
        input: TInput;
        output: TOutput;
    };
}

export namespace PicoSchema {
    export type Input<TSchema extends PicoSchema> = NonNullable<TSchema["types"]>["input"];
    export type Output<TSchema extends PicoSchema> = NonNullable<TSchema["types"]>["output"];
}
