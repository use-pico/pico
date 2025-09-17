import type { FC, PropsWithChildren } from "react";
import type { Cls } from "../types/Cls";
import { ClsContext } from "./ClsContext";

export namespace ClsProvider {
	export interface Props extends PropsWithChildren {
		value: Cls.Type<any>;
	}
}

/**
 * Provider component for cls context.
 *
 * @param children - React children
 * @param value - The cls instance to provide to child components
 *
 * ⚠️ **Important**: The `value` parameter should be a stable reference to prevent
 * unnecessary re-renders. Define your cls instances outside of components or use
 * `useMemo` to ensure the reference doesn't change on every render.
 *
 * @example
 * ```tsx
 * // Provide a cls instance (stable reference)
 * <ClsProvider value={ButtonCls}>
 *   <App />
 * </ClsProvider>
 *
 * // With useMemo for dynamic cls instances
 * function App() {
 *   const dynamicCls = useMemo(() => cls(contract, definition), []);
 *
 *   return (
 *     <ClsProvider value={dynamicCls}>
 *       <App />
 *     </ClsProvider>
 *   );
 * }
 * ```
 */
export const ClsProvider: FC<ClsProvider.Props> = ({ children, value }) => {
	return <ClsContext value={value}>{children}</ClsContext>;
};
