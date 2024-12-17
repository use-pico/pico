import { useTokenOf } from "./useTokenOf";
import { useTokensOf } from "./useTokensOf";

/**
 * Wrapper around token checks. Defaults to "any" mode.
 *
 * @group hooks
 */
export namespace useToken {
	export type Tokens = [string, ...string[]];
	export type Mode = "required" | "any";
	export type Result =
		| {
				success: true;
		  }
		| {
				success: false;
				missing: string[];
		  };

	export interface Props {
		tokens: useToken.Tokens;
		source: string[];
		mode: useToken.Mode;
	}
}

export const useToken = ({
	tokens,
	source,
	mode = "any",
}: useToken.Props): useToken.Result => {
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
