import { diffOf } from "@use-pico/common";
import type { useToken } from "./useToken";

export namespace useTokenOf {
	export interface Props {
		tokens: useToken.Tokens;
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
}: useTokenOf.Props): useToken.Result => {
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
