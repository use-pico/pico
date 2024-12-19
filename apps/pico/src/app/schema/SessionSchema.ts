import { z } from "zod";

export const SessionSchema = z.object({
	id: z.string(),
	name: z.string(),
	login: z.string(),
});

export type SessionSchema = typeof SessionSchema;

export namespace SessionSchema {
	export type Type = z.infer<SessionSchema>;
}
