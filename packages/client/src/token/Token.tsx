import type { FC, PropsWithChildren } from "react";
import { Status } from "../status/Status";
import { Tx } from "../tx/Tx";
import { TokenInline } from "./TokenInline";
import type { TokenType } from "./TokenType";
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
		tokens: TokenType.Tokens;
		source: string[];
		mode?: TokenType.Mode;
		error?:
			| FC<{
					result: TokenType.Result;
			  }>
			| boolean;
	}
}

export const Token: FC<Token.Props> = ({
	tokens,
	source,
	mode = "any",
	error = true,
	children,
}) => {
	const result = useToken({
		tokens,
		source,
		mode,
	});

	const ErrorComponent: Token.Props["error"] =
		error === true
			? ({ result }) => (
					<Status
						icon={"icon-[ph--lock]"}
						textTitle={
							mode === "any" ? (
								<Tx label={"Missing any token(s). (title)"} />
							) : (
								<Tx
									label={"Missing required token(s). (title)"}
								/>
							)
						}
						textMessage={
							mode === "any" ? (
								<Tx label={"Missing any token(s). (message)"} />
							) : (
								<Tx
									label={
										"Missing required token(s). (message)"
									}
								/>
							)
						}
					>
						{!result.success && (
							<div
								className={
									"flex flex-col items-center gap-2 border-t border-slate-200 p-4 mt-4"
								}
							>
								{result.missing.map((token) => (
									<div
										key={`missing-token-${token}`}
										className={
											"rounded-2xl bg-amber-300 border border-amber-400 text-amber-900 px-2 py-1 my-1"
										}
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
			: error;

	return result.success ? (
		children
	) : ErrorComponent ? (
		<ErrorComponent result={result} />
	) : null;
};
