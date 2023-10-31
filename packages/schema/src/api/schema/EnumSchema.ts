import {type PicoSchema} from "../PicoSchema";

export interface EnumSchema<
    TEnum extends EnumSchema.Enum,
    TOutput = TEnum[keyof TEnum],
> extends PicoSchema<TEnum[keyof TEnum], TOutput> {
    schema: "enum",
    enum: TEnum;
}

export namespace EnumSchema {
    export type Enum = {
        [key: string]: string | number;
        [key: number]: string;
    };
}
