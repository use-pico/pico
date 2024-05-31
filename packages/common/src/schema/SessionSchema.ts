import {z} from "zod";

export const SessionSchema = z.object({
	id: z.string(),
	name: z.string().min(1),
	site: z.string().optional(),
	tokens: z.array(z.string().min(1)),
});
export type SessionSchema = typeof SessionSchema;
export namespace SessionSchema {
	export type Type = z.infer<SessionSchema>;
}
