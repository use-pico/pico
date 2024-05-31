import {z} from "zod";

export const DummySchema = z.object({}).strip();
export type DummySchema = typeof DummySchema;
export namespace DummySchema {
	export type Type = z.infer<DummySchema>;
}
