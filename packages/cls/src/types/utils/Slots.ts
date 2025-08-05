import type { ClsFn } from "../fn/ClsFn";

/**
 * Extracts the slots type from a cls function.
 * TCls represents the cls function type.
 * This type gives you access to the slots object type that the cls function returns.
 */
export type Slots<TCls extends ClsFn<any, any, any>> =
	ReturnType<TCls>["slots"];
