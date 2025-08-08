import { cls } from "./cls";
import type { Cls, Contract, Definition, TokenContract } from "./types";

/**
 * Props for the token helper.
 *
 * - tokens: token contract (groups → variants)
 * - slots: slot contract (list of slots)
 * - token: concrete token definitions mapping to classes
 * - slot: optional single base rule mapping slots → what (class/token)
 */
export type TokenProps<TTokens extends TokenContract> = {
	tokens: TTokens;
	token: Definition<Contract<TTokens, readonly [], {}>>["token"];
};

/**
 * token(props)
 *
 * Shortcut for building a cls using only tokens (no variants).
 * Accepts token/slot contracts and token definitions, and optionally a single
 * base rule for slots. Returns a fully-typed Cls.
 */
export function token<const TTokens extends TokenContract>({
	tokens,
	token: tokenDef,
}: TokenProps<TTokens>): Cls<Contract<TTokens, readonly [], {}>> {
	return cls(
		{
			tokens,
			slot: [],
			variant: {},
		},
		{
			token: tokenDef,
			rule: [],
			defaults: {},
		},
	);
}
