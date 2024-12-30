import {
    FilterSchema,
    IdentitySchema,
    withRepositorySchema,
} from "@use-pico/common";
import { z } from "zod";

export const UserSchema = withRepositorySchema({
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
});
