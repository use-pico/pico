import type { Cls, WhatUtil } from "../types";
import type { Contract } from "../types/Contract";
import type { Definition } from "../types/Definition";
import type { Slot } from "../types/Slot";
import type { Token } from "../types/Token";
import type { Variant } from "../types/Variant";
import { merge } from "./merge";

// Standalone function to compute variants
export function withVariants<
	const TTokenContract extends Token.Type,
	const TSlotContract extends Slot.Type,
	const TVariantContract extends Variant.Type,
	const TContract extends Contract.Type<
		TTokenContract,
		TSlotContract,
		TVariantContract,
		any
	>,
>(
	{ contract, definition }: Pick<Cls<TContract>, "contract" | "definition">,
	userConfigFn?: WhatUtil.Config.Fn<TContract>,
	internalConfigFn?: WhatUtil.Config.Fn<TContract>,
): Variant.VariantOf<TContract> {
	const config = merge(userConfigFn, internalConfigFn)();

	// Build inheritance chain (base -> child order)
	const layers: {
		contract: Contract.Type<Token.Type, Slot.Type, Variant.Type>;
		definition: Definition.Type<
			Contract.Type<Token.Type, Slot.Type, Variant.Type>
		>;
	}[] = [];

	let current:
		| Contract.Type<Token.Type, Slot.Type, Variant.Type>
		| undefined = contract;
	let currentDef:
		| Definition.Type<Contract.Type<Token.Type, Slot.Type, Variant.Type>>
		| undefined = definition;

	while (current && currentDef) {
		layers.unshift({
			contract: current,
			definition: currentDef,
		});
		current = current["~use"] as
			| Contract.Type<Token.Type, Slot.Type, Variant.Type>
			| undefined;
		currentDef = current?.["~definition"] as
			| Definition.Type<
					Contract.Type<Token.Type, Slot.Type, Variant.Type>
			  >
			| undefined;
	}

	// Merge defaults from ALL layers in inheritance order
	const defaultVariant = {} as Variant.VariantOf<TContract>;

	// Process layers in inheritance order (base first, child last)
	for (const { definition: d } of layers) {
		// Merge defaults (child overrides base)
		Object.assign(defaultVariant, d.defaults);
	}

	// Compute effective variant by merging defaults with config
	return {
		...defaultVariant,
		...Object.fromEntries(
			Object.entries(config.variant ?? {}).filter(
				([, value]) => value !== undefined,
			),
		),
	};
}
