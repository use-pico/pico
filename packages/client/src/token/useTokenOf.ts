import { diffOf } from "@use-pico/common";
import type { TokenType } from "./TokenType";

export namespace useTokenOf {
	export interface Props {
		tokens: TokenType.Tokens;
		source: string[];
	}
}

/**
 * Check if the user has any of the token(s).
 *
 * @group hooks
 */
export const useTokenOf = ({
	tokens,
	source,
}: useTokenOf.Props): TokenType.Result => {
	const diff = diffOf(
		/**
		 * Required tokens.
		 */
		tokens,
		/**
		 * Current user's tokens.
		 */
		source,
	) as string[];

	/**
	 * Returns true, when the user has all the required tokens.
	 */
	return diff.length < tokens.length
		? {
				success: true,
			}
		: {
				success: false,
				missing: tokens,
			};
};
