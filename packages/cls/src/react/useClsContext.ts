import { useContext } from "react";
import type { Cls } from "../types/Cls";
import { ClsContext } from "./ClsContext";

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
export function useClsContext<TCls extends Cls.Type<any>>(): TCls | undefined {
	/**
	 * This is not nice to override return type, we're expecting a user knows, what he
	 * does (hopefully).
	 */
	return useContext(ClsContext) as TCls;
}
