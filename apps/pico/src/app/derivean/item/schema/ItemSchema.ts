import { IdentitySchema } from "@use-pico/common";
import { z } from "zod";

export const ItemSchema = IdentitySchema.merge(
	z.object({
		name: z.string(),
		kind: z.enum(["building", "resource"]),
	}),
);

export type ItemSchema = typeof ItemSchema;

export namespace ItemSchema {
	export type Type = z.infer<ItemSchema>;
}
