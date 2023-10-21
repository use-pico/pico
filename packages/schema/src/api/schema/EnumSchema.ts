import {type PicoSchema} from "../PicoSchema";

export interface EnumSchema<
    TEnum extends EnumSchema.Enum,
    TOutput = TEnum[number],
> extends PicoSchema<TEnum[number], TOutput> {
    schema: "enum",
    enum: TEnum;
}

export namespace EnumSchema {
    export type Enum<TOption extends string = string> =
        | Readonly<[TOption, ...TOption[]]>
        | [TOption, ...TOption[]];
}
