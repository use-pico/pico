import { z } from "zod";

export const MessageTypeSchema = z.enum([
	"info",
	"warning",
	"error",
]);

export type MessageTypeSchema = typeof MessageTypeSchema;

export namespace MessageTypeSchema {
	export type Type = z.infer<MessageTypeSchema>;
}
