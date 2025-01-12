import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { withUserSchema } from "~/app/derivean/db/sdk";

export const UserSchema = withUserSchema({
	shape: z.object({
		name: z.string().min(1),
		login: z.string().min(1),
		password: z.string().min(1),
	}),
	filter: FilterSchema.merge(
		z.object({
			login: z.string().optional(),
			password: z.string().optional(),
		}),
	),
});

export type UserSchema = typeof UserSchema;
