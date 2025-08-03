import { z } from "zod";
import { EntitySchema } from "../source/EntitySchema";
import { TokenSchema } from "./TokenSchema";

/**
 * Ticket schema defines minimal "user" (without name and other stuff):
 * - holds ID (of a user)
 * - holds access tokens (for client-side ACL check)
 */
export const TicketSchema = z.object({
	...EntitySchema.shape,
	...TokenSchema.shape,
	name: z.string(),
	site: z.string(),
});

export type TicketSchema = typeof TicketSchema;

export namespace TicketSchema {
	export type Type = z.infer<TicketSchema>;
}
