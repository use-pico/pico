import {type z} from "@use-pico/utils";

export type ResponseSchema = z.ZodSchema;
export namespace ResponseSchema {
    export type Type = z.infer<ResponseSchema>;
}
