import { cssOf } from "@use-pico/common";
import { type FC, type PropsWithChildren } from "react";
import { t } from "../i18n/t";
import { Status } from "../ui/Status";
import { TokenInline } from "./TokenInline";
import { useToken } from "./useToken";

/**
 * Renders children if the user has the required token.
 *
 * @group ui
 */
export namespace Token {
	export interface Props extends PropsWithChildren {
		/**
		 * Required token(s).
		 */
		tokens: [string, ...string[]];
		mode?: useToken.Mode;
		error?:
			| FC<{
					result: useToken.Result;
			  }>
			| boolean;
	}
}

export const Token: FC<Token.Props> = ({
	tokens,
	mode = "any",
	error = true,
	children,
}) => {
	const result = useToken(tokens, mode);
	const Error: Token.Props["error"] =
		error === true ?
			({ result }) => (
				<Status
					icon={"icon-[ph--lock]"}
					text={
						mode === "any" ?
							{
								title: t()`Missing any token(s). (title)`,
								message: t()`Missing any token(s). (message)`,
							}
						:	{
								title: t()`Missing required token(s). (title)`,
								message: t()`Missing required token(s). (message)`,
							}
					}
				>
					{!result.success && (
						<div
							className={cssOf(
								"flex flex-col items-center gap-2",
								"border-t border-slate-200 p-4 mt-4",
							)}
						>
							{result.missing.map((token) => (
								<div
									key={`missing-token-${token}`}
									className={cssOf(
										"rounded-2xl bg-amber-300 border border-amber-400 text-amber-900 px-2 py-1 my-1",
									)}
								>
									<TokenInline
										entity={{
											token,
										}}
									/>
								</div>
							))}
						</div>
					)}
				</Status>
			)
		:	error;

	return (
		result.success ? <>{children}</>
		: Error ? <Error result={result} />
		: null
	);
};
