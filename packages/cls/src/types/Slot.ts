import type { Contract } from "./Contract";
import type { Tweak } from "./Tweak";
import type { What } from "./What";

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
	 * @template TContract - The contract type to extract slot names from
	 * @returns A union type of all slot names from the inheritance chain
	 */
	export type Raw<TContract extends Contract.Any> = TContract extends {
		"~use"?: infer U;
	}
		? U extends Contract.Any
			? TContract["slot"][number] | Raw<U>
			: TContract["slot"][number]
		: TContract["slot"][number];

	export type Has<TContract extends Contract.Any> =
		TContract["slot"][number] extends never ? false : true;

	export type With<TContract extends Contract.Any> =
		Raw<TContract> extends never ? false : true;

	/**
	 * Mapping type for slot styling values
	 */
	export type SlotOf<TContract extends Contract.Any> = {
		[K in Raw<TContract>]?: What.Any<TContract>;
	};

	export type Required<TContract extends Contract.Any> =
		With<TContract> extends false
			? Record<string, never>
			: SlotOf<TContract>;

	export type RequiredFn<TContract extends Contract.Any> = (
		slot: Required<TContract>,
	) => Required<TContract>;

	export type Optional<TContract extends Contract.Any> =
		With<TContract> extends false
			? Record<string, never>
			: Partial<SlotOf<TContract>>;

	export type OptionalFn<TContract extends Contract.Any> = (
		slot: Optional<TContract>,
	) => Optional<TContract>;

	/**
	 * Function type for individual slot functions that return CSS class strings
	 */
	export type Fn<TContract extends Contract.Any> = (
		props?: Tweak.Fn<TContract>,
	) => string;

	/**
	 * Object type containing all slot functions for a contract
	 *
	 * This type is directly facing an user when using the cls instance.
	 */
	export type Kit<TContract extends Contract.Any> = {
		[K in Raw<TContract>]: Fn<TContract>;
	};
}
