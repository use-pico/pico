import {z} from "../index";

export const DummySchema = z.any().nullish();
export type DummySchema = typeof DummySchema;
export namespace DummySchema {
    export type Type = z.infer<DummySchema>;
}
