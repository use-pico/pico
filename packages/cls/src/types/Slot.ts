import type { WhatUtil } from "../types";
import type { Contract } from "./Contract";

/**
 * Namespace for slot-related types and utilities
 */
export namespace Slot {
	/**
	 * Base slot contract type that defines the structure of slot names
	 */
	export type Type = readonly string[];

	/**
	 * Extracts all slot names from a contract and its inheritance chain.
	 *
	 * This utility type recursively traverses the inheritance chain (via the "~use" property)
	 * and extracts all slot names from the current contract and all parent contracts.
	 * This provides a complete view of all available slots in the inheritance chain.
	 *
	 * @template T - The contract type to extract slot names from
	 * @returns A union type of all slot names from the inheritance chain
	 */
	export type Extract<T extends Contract.Any> = T extends {
		"~use"?: infer U;
	}
		? U extends Contract.Any
			? T["slot"][number] | Extract<U>
			: T["slot"][number]
		: T["slot"][number];

	/**
	 * Mapping type for slot styling values
	 */
	// TODO Add condition if there are no slots it should not allow any values
	export type Mapping<T extends Contract.Any> = {
		[K in Extract<T>]?: WhatUtil.Value.Any<T>;
	};
}
