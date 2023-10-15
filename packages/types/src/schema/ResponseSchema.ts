import {type z} from "@pico/utils";

export type ResponseSchema = z.ZodSchema;
export namespace ResponseSchema {
    export type Type = z.infer<ResponseSchema>;
}
