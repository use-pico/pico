import { diffOf } from "@use-pico/common";
import type { TokenType } from "./TokenType";

export namespace useTokenOf {
	export interface Props {
		tokens: TokenType.Tokens;
		source: string[];
	}
}

/**
 * Check if the user has the required token(s).
 *
 * @group hooks
 */
export const useTokensOf = ({
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
	return diff.length
		? {
				success: false,
				missing: diff,
			}
		: {
				success: true,
			};
};
