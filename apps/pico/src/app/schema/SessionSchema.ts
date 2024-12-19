import { z } from "zod";

export const SessionSchema = z.object({});

export type SessionSchema = typeof SessionSchema;

export namespace SessionSchema {
	export type Type = z.infer<SessionSchema>;
}
