import { diffOf } from "@use-pico/common";
import { TicketStore } from "./TicketStore";
import { useToken } from "./useToken";

/**
 * Check if the user has the required token(s).
 *
 * @group hooks
 */
export const useTokensOf = (tokens: useToken.Tokens): useToken.Result => {
	const ticketStore = TicketStore.useSelector(({ tokens }) => ({ tokens }));
	const diff = diffOf(
		/**
		 * Required tokens.
		 */
		tokens,
		/**
		 * Current user's tokens.
		 */
		ticketStore.tokens,
	) as string[];

	/**
	 * Returns true, when the user has all the required tokens.
	 */
	return diff.length ?
			{
				success: false,
				missing: diff,
			}
		:	{
				success: true,
			};
};
