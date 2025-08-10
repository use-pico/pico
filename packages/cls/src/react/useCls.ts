import type { Cls, Contract, CreateConfig, WhatUtil } from "../types";
import { useClsContext } from "./ClsContext";

/**
 * React hook for using cls instances.
 * This hook provides a convenient way to use cls styling in React components.
 *
 * Note: This is a simple implementation that creates classes on every render.
 * For performance optimization, consider memoizing the config objects using `useMemo`
 * if you experience performance issues.
 *
 * ⚠️ **Context Integration**: This hook reads from ClsContext to apply token overrides
 * from the context's definition. The context tokens are added to the internal config,
 * and if `internalConfig` provides its own tokens, they will take precedence over
 * context tokens. This integration is not type-safe and relies on runtime token matching.
 *
 * @template TContract - The contract type of the cls instance
 * @param clsInstance - The cls instance to use
 * @param userConfig - User-land configuration for this instance (takes precedence over internal)
 * @param internalConfig - Optional component-controlled configuration (user wins on conflicts, internal tokens win over context tokens)
 * @returns The generated CSS classes for all slots
 *
 * @example
 * ```typescript
 * // Basic usage (user config only)
 * const Button: React.FC<{ variant?: "primary" | "secondary"; size?: "sm" | "md" | "lg" }> = ({
 *   variant = "primary",
 *   size = "md",
 *   children,
 *   ...props
 * }) => {
 *   const classes = useCls(ButtonCls, {
 *     variant: { variant, size }
 *   });
 *
 *   return (
 *     <button className={classes.root()} {...props}>
 *       {children}
 *     </button>
 *   );
 * };
 *
 * // With slot overrides (user config only)
 * const LoadingButton: React.FC<{ loading?: boolean }> = ({
 *   loading = false,
 *   children,
 *   ...props
 * }) => {
 *   const classes = useCls(ButtonCls, {
 *     variant: { variant: "primary" },
 *     slot: {
 *       icon: loading ? { class: ["animate-spin"] } : undefined
 *     }
 *   });
 *
 *   return (
 *     <button className={classes.root()} {...props}>
 *       {loading && <span className={classes.icon()}>⏳</span>}
 *       <span className={classes.label()}>{children}</span>
 *     </button>
 *   );
 * };
 *
 * // With both user and internal configs (user wins on conflicts)
 * const AdvancedButton: React.FC<{ disabled?: boolean }> = ({
 *   disabled = false,
 *   children,
 *   ...props
 * }) => {
 *   const classes = useCls(
 *     ButtonCls,
 *     { variant: { disabled } }, // user config
 *     {
 *       variant: { disabled: true },
 *       slot: { root: { class: ["px-2"] } }
 *     } // internal config
 *   );
 *   // disabled -> false (from user), internal slot appends are still applied
 *
 *   return (
 *     <button className={classes.root()} {...props}>
 *       {children}
 *     </button>
 *   );
 * };
 *
 * // With context token inheritance
 * function App() {
 *   return (
 *     <ClsProvider value={ThemedButtonCls}>
 *       <Button variant="primary">Uses ThemedButtonCls tokens</Button>
 *     </ClsProvider>
 *   );
 * }
 *
 * // Context tokens are merged with internal config
 * function Button({ variant, size, children }) {
 *   const classes = useCls(
 *     ButtonCls,
 *     { variant: { variant, size } }, // user config
 *     { token: { "primary.bgColor": { default: ["bg-orange-500"] } } } // internal config
 *   );
 *   // Internal tokens win over context tokens
 *   // Result: orange background (internal) overrides context background
 *
 *   return <button className={classes.root()}>{children}</button>;
 * }
 * ```
 */
export function useCls<TContract extends Contract<any, any, any>>(
	clsInstance: Cls<TContract>,
	userConfig?: (props: {
		what: WhatUtil<TContract>;
	}) => Partial<CreateConfig<TContract>>,
	internalConfig?: (props: {
		what: WhatUtil<TContract>;
	}) => Partial<CreateConfig<TContract>>,
) {
	// Get context cls instance
	const contextCls = useClsContext();

	// Merge context tokens with internal config
	let mergedInternalConfig = internalConfig;
	if (contextCls?.definition?.token) {
		mergedInternalConfig = (props: { what: WhatUtil<TContract> }) => {
			const config = internalConfig?.(props) ?? {};
			return {
				...config,
				token: {
					...contextCls.definition.token,
					...config.token, // Internal tokens win over context tokens
				} as any, // Type assertion for runtime token merging
			};
		};
	}

	// Simple implementation - creates classes on every render
	// For performance optimization, consider memoizing the config objects
	return clsInstance.create(userConfig, mergedInternalConfig);
}
