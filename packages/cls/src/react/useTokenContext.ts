import { useContext } from "react";
import type { Contract } from "../types/Contract";
import type { Token } from "../types/Token";
import { TokenContext } from "./TokenContext";

/**
 * Hook to access the TokenContext.
 *
 * Returns the current token tweaks provided via context,
 * or undefined if no provider is present. Only tokens are affected by this context.
 */
export function useTokenContext(): Token.Optional<Contract.Any> {
	return useContext(TokenContext);
}
