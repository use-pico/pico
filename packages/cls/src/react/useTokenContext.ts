import { useContext } from "react";
import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import { TokenContext } from "./TokenContext";

/**
 * Hook to access the TokenContext.
 *
 * Returns the current cls instance whose tokens are provided via context,
 * or undefined if no provider is present. Only tokens are affected by this context.
 */
export function useTokenContext(): Cls.Type<Contract.Any> | undefined {
	/**
	 * This is not nice to override return type, we're expecting a user knows, what he
	 * does (hopefully).
	 */
	return useContext(TokenContext);
}
