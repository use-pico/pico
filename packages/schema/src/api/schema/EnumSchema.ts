import {type Schema} from "../Schema";

export interface EnumSchema<
    TEnum extends EnumSchema.Enum,
    TOutput = TEnum[number],
> extends Schema<TEnum[number], TOutput> {
    schema: "enum",
    enum: TEnum;
}

export namespace EnumSchema {
    export type Enum<TOption extends string = string> =
        | Readonly<[TOption, ...TOption[]]>
        | [TOption, ...TOption[]];
}
