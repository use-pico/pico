import {type Parse} from "./Parse";

export interface Schema<TInput = any, TOutput = TInput> {
    parse(input: unknown, info?: Parse.Info): Parse.Result<TOutput>;

    types?: {
        input: TInput;
        output: TOutput;
    };
}

export namespace Schema {
    export type Infer<TSchema extends Schema> = NonNullable<TSchema["types"]>["output"];
}
