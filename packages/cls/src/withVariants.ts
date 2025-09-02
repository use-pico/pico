import { merge } from "./merge";
import type {
	Cls,
	Contract,
	CreateConfig,
	Definition,
	SlotContract,
	TokenContract,
	VariantContract,
	VariantValueMapping,
	WhatConfigFn,
} from "./types";

// Standalone function to compute variants
export function withVariants<
	const TTokenContract extends TokenContract,
	const TSlotContract extends SlotContract,
	const TVariantContract extends VariantContract,
	const TContract extends Contract<
		TTokenContract,
		TSlotContract,
		TVariantContract,
		any
	>,
>(
	clsInstance: Cls<TContract>,
	userConfigFn?: WhatConfigFn<TContract>,
	internalConfigFn?: WhatConfigFn<TContract>,
): VariantValueMapping<TContract> {
	const contract = clsInstance.contract;
	const definition = clsInstance.definition;
	const config = merge(
		userConfigFn,
		internalConfigFn,
	)() as CreateConfig<TContract>;

	// Build inheritance chain (base -> child order)
	const layers: {
		contract: Contract<TokenContract, SlotContract, VariantContract>;
		definition: Definition<
			Contract<TokenContract, SlotContract, VariantContract>
		>;
	}[] = [];

	let current:
		| Contract<TokenContract, SlotContract, VariantContract>
		| undefined = contract;
	let currentDef:
		| Definition<Contract<TokenContract, SlotContract, VariantContract>>
		| undefined = definition;

	while (current && currentDef) {
		layers.unshift({
			contract: current,
			definition: currentDef,
		});
		current = current["~use"] as
			| Contract<TokenContract, SlotContract, VariantContract>
			| undefined;
		currentDef = current?.["~definition"] as
			| Definition<Contract<TokenContract, SlotContract, VariantContract>>
			| undefined;
	}

	// Merge defaults from ALL layers in inheritance order
	const defaultVariant = {} as VariantValueMapping<TContract>;

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
