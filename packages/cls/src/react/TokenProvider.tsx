import type { JSX, PropsWithChildren } from "react";
import type { Cls } from "../types/Cls";
import type { Contract } from "../types/Contract";
import { TokenContext } from "./TokenContext";

/**
 * TokenProvider namespace containing component and related types
 */
export namespace TokenProvider {
	/**
	 * Props for TokenProvider component
	 */
	export interface Props<TContract extends Contract.Any>
		extends PropsWithChildren {
		/**
		 * CLS instance to extract tokens from
		 */
		cls: Cls.Type<TContract>;
	}
}

/**
 * Provider component that extracts tokens from a CLS instance and provides them via context.
 *
 * This component takes a CLS instance and extracts its token definitions to provide them
 * to child components via TokenContext. This makes the API more intuitive as you can pass
 * a complete CLS instance rather than manually extracting tokens.
 *
 * @template TContract - The contract type of the CLS instance
 * @param cls - CLS instance to extract tokens from
 * @param children - Child components that will receive the token context
 *
 * @example
 * ```tsx
 * // Pass a theme CLS instance
 * <TokenProvider cls={ThemeCls}>
 *   <Button>Click me</Button>
 * </TokenProvider>
 * ```
 *
 * @example
 * ```tsx
 * // Pass a component CLS instance for token overrides
 * <TokenProvider cls={CustomButtonCls}>
 *   <Button>Custom styled button</Button>
 * </TokenProvider>
 * ```
 */
export function TokenProvider<TContract extends Contract.Any>({
	cls,
	children,
}: TokenProvider.Props<TContract>): JSX.Element {
	return (
		<TokenContext value={cls?.definition?.token}>{children}</TokenContext>
	);
}
