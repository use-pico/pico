import { z } from "zod";
import { IdentitySchema } from "./IdentitySchema";
import { TokenSchema } from "./TokenSchema";

/**
 * Ticket schema defines minimal "user" (without name and other stuff):
 * - holds ID (of a user)
 * - holds access tokens (for client-side ACL check)
 */
export const TicketSchema = IdentitySchema.extend(
	z
		.strictObject({
			name: z.string(),
			site: z.string(),
		})
		.extend(TokenSchema),
);

export type TicketSchema = typeof TicketSchema;

export namespace TicketSchema {
	export type Type = z.infer<TicketSchema>;
}
