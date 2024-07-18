import {useTokenOf}  from "./useTokenOf";
import {useTokensOf} from "./useTokensOf";

/**
 * Wrapper around token checks. Defaults to "any" mode.
 *
 * @group hooks
 */
export namespace useToken {
	export type Tokens = [string, ...string[]];
	export type Mode = "required" | "any";
	export type Result = {
		success: true;
	} | {
		success: false;
		missing: string[];
	};
}

export const useToken = (
	tokens: useToken.Tokens,
	mode: useToken.Mode = "any",
): useToken.Result => {
	const required = useTokensOf(tokens);
	const any = useTokenOf(tokens);

	switch (mode) {
		case "required":
			return required;
		case "any":
			return any;
	}
};
