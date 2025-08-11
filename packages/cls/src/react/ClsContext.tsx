import { createContext, type ReactNode, useContext } from "react";
import type { Cls } from "../types";

/**
 * Context for providing a cls instance to child components.
 * This allows components to inherit from a parent cls instance.
 */
const ClsContext = createContext<Cls<any> | undefined>(undefined);

/**
 * Provider component for cls context.
 *
 * @param children - React children
 * @param value - The cls instance to provide to child components
 *
 * @example
 * ```tsx
 * // Provide a cls instance
 * <ClsProvider value={ButtonCls}>
 *   <App />
 * </ClsProvider>
 * ```
 */
export function ClsProvider({
	children,
	value,
}: {
	children: ReactNode;
	value: Cls<any>;
}) {
	return <ClsContext.Provider value={value}>{children}</ClsContext.Provider>;
}

/**
 * Hook to access the cls context.
 *
 * @returns The current cls instance or undefined if not provided
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const clsInstance = useClsContext();
 *
 *   if (clsInstance) {
 *     // Use the cls instance from context
 *     const classes = clsInstance.create({ variant: { size: "md" } });
 *   }
 * }
 * ```
 */
export function useClsContext(): Cls<any> | undefined {
	return useContext(ClsContext);
}

/**
 * Hook to get the cls instance from context.
 *
 * @returns The cls instance from context or undefined if not provided
 *
 * @example
 * ```tsx
 * function Button({ variant, size }) {
 *   const contextCls = useClsContext();
 *
 *   if (contextCls) {
 *     const classes = contextCls.create({ variant: { variant, size } });
 *     // Use the cls instance from context
 *   }
 * }
 * ```
 */
export function useClsFromContext(): Cls<any> | undefined {
	return useClsContext();
}
