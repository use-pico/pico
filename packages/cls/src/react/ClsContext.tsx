import { createContext, type ReactNode, useContext } from "react";
import type { Cls } from "../types/Cls";

/**
 * Context for providing a cls instance to child components.
 * This allows components to inherit from a parent cls instance.
 */
const ClsContext = createContext<Cls.Type<any> | undefined>(undefined);

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
	value: Cls.Type<any>;
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
export function useClsContext(): Cls.Type<any> | undefined {
	return useContext(ClsContext);
}
