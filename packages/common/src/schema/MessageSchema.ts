import { z } from "zod";
import { MessageTypeSchema } from "./MessageTypeSchema";

export const MessageSchema = z.object({
	message: z.string(),
	type: MessageTypeSchema,
});

export type MessageSchema = typeof MessageSchema;

export namespace MessageSchema {
	export type Type = z.infer<MessageSchema>;
}
