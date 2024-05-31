import {z}                  from "zod";
import {TokenSchema}        from "./TokenSchema";
import {WithIdentitySchema} from "./WithIdentitySchema";

/**
 * Ticket schema defines minimal "user" (without name and other stuff):
 * - holds ID (of a user)
 * - holds access tokens (for client-side ACL check)
 */
export const TicketSchema = WithIdentitySchema.merge(TokenSchema);
export type TicketSchema = typeof TicketSchema;
export namespace TicketSchema {
	export type Type = z.infer<TicketSchema>;
}
