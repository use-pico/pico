import { hashOf } from "@use-pico/common";
import { useMemo } from "react";

/**
 * A wrapper around useMemo that uses hashOf for stable dependency comparison.
 * This ensures that objects and arrays with the same content but different order
 * will be treated as the same dependency.
 *
 * ⚠️ **Important**: Functions in dependencies use reference equality (not hashed).
 * If you pass objects containing functions, the hashOf function will throw an error,
 * but this hook will catch it and fall back to native React comparison with a warning.
 * This prevents crashes but may cause unnecessary re-computations.
 *
 * Performance: Takes a small performance penalty (~25-100% slower than regular useMemo
 * for small data ≤20 items) due to hashing overhead, but provides significant benefits
 * for preventing unnecessary re-computations when data structure changes but content
 * remains the same. For typical use cases, the stability benefits outweigh the cost.
 *
 * Function handling: Functions in dependencies fall through to native React comparison
 * (reference equality), which is typically the desired behavior for callbacks and
 * event handlers. Objects containing functions will trigger a warning and fall back
 * to native React comparison.
 *
 * @param factory - Function that returns the memoized value
 * @param deps - Dependencies array (objects/arrays will be hashed, functions use reference equality)
 * @returns The memoized value
 *
 * @example
 * ```tsx
 * // ✅ Good - functions use reference equality
 * const memoizedValue = useStableMemo(() => {
 *   return expensiveCalculation(data);
 * }, [data, callback]); // data hashed, callback uses reference equality
 *
 * // ✅ Good - objects with data only
 * const memoizedData = useStableMemo(() => {
 *   return processData(config);
 * }, [{ id: 1, name: "test" }]); // Object will be hashed
 *
 * // ⚠️ Warning - object contains function (will fall back to native comparison)
 * const memoizedWarning = useStableMemo(() => {
 *   return processData(config);
 * }, [{ id: 1, setValue: (v) => {} }]); // Warning + fallback to native comparison
 *
 * // ✅ Solution - extract function reference
 * const setValue = (v) => {};
 * const memoizedGood = useStableMemo(() => {
 *   return processData(config);
 * }, [{ id: 1 }, setValue]); // Object hashed, function uses reference equality
 * ```
 */
export const useStableMemo = <T>(
	factory: () => T,
	deps: readonly unknown[],
): T => {
	return useMemo(
		factory,
		// biome-ignore lint/correctness/useExhaustiveDependencies: We've stable hash here
		deps.map((dep) => {
			// Functions fall through to native React comparison (reference equality)
			if (typeof dep === "function") {
				return dep;
			}

			try {
				return hashOf(dep);
			} catch (error) {
				// If hashOf throws (e.g., object contains functions),
				// fall back to the original dependency for native React comparison
				console.trace(
					`useStableMemo: Falling back to native React comparison for dependency that contains functions.\n` +
						`This may cause unnecessary re-computations. Consider extracting function references or using local state.\n` +
						`Error: ${(error as Error).message}`,
				);
				return dep;
			}
		}),
	);
};
