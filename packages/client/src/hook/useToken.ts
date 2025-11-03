import type { TokenType } from "../type/TokenType";
import { useTokenOf } from "./useTokenOf";
import { useTokensOf } from "./useTokensOf";

/**
 * Wrapper around token checks. Defaults to "any" mode.
 *
 * @group hooks
 */
export namespace useToken {
	export interface Props {
		tokens: TokenType.Tokens;
		source: string[];
		mode: TokenType.Mode;
	}
}

export const useToken = ({
	tokens,
	source,
	mode = "any",
}: useToken.Props): TokenType.Result => {
	const required = useTokensOf({
		tokens,
		source,
	});
	const any = useTokenOf({
		tokens,
		source,
	});

	switch (mode) {
		case "required":
			return required;
		case "any":
			return any;
	}
};
