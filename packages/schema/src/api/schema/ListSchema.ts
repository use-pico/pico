import {type PicoSchema} from "../PicoSchema";

export interface ListSchema<
    TValues extends ListSchema.Values,
    TOutput = TValues[number],
> extends PicoSchema<TValues[number], TOutput> {
    schema: "list";
    values: TValues;
}

export namespace ListSchema {
    export type Values<TValue extends string = string> =
        | Readonly<[TValue, ...TValue[]]>
        | [TValue, ...TValue[]];
}
