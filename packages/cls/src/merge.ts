import type { Contract, CreateConfig } from "./types";

/**
 * merge(internal, user)
 *
 * Merges two CreateConfig objects of the same contract type.
 * - Field-level precedence: user wins over internal (variant, slot, override, token)
 * - Shallow merge per field to match cls.create() semantics
 */
export function merge<const TContract extends Contract<any, any, any>>(
	user?: Partial<CreateConfig<TContract>>,
	internal?: Partial<CreateConfig<TContract>>,
): Partial<CreateConfig<TContract>> {
	return {
		...(internal ?? {}),
		...(user ?? {}),
		variant: {
			...internal?.variant,
			...user?.variant,
		} as Partial<CreateConfig<TContract>["variant"]>,
		slot: {
			...internal?.slot,
			...user?.slot,
		} as Partial<CreateConfig<TContract>["slot"]>,
		override: {
			...internal?.override,
			...user?.override,
		} as Partial<CreateConfig<TContract>["override"]>,
		token: {
			...internal?.token,
			...user?.token,
		} as Partial<CreateConfig<TContract>["token"]>,
	};
}
