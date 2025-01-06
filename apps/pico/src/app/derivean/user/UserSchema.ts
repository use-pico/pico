import {
    FilterSchema,
    IdentitySchema,
    withSourceSchema,
} from "@use-pico/common";
import { z } from "zod";

export const UserSchema = withSourceSchema({
	entity: IdentitySchema.merge(
		z.object({
			name: z.string().min(1),
			login: z.string().min(1),
			password: z.string().min(1),
		}),
	),
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
	sort: ["name", "login"],
});

export type UserSchema = typeof UserSchema;
