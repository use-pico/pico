import type {
	Cls,
	Contract,
	Definition,
	SlotContract,
	Token,
	VariantContract,
	VariantValueMapping,
	WhatUtil,
} from "../types";
import { merge } from "./merge";

// Standalone function to compute variants
export function withVariants<
	const TTokenContract extends Token.Type,
	const TSlotContract extends SlotContract,
	const TVariantContract extends VariantContract,
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
): VariantValueMapping<TContract> {
	const config = merge(userConfigFn, internalConfigFn)();

	// Build inheritance chain (base -> child order)
	const layers: {
		contract: Contract.Type<TTokenContract, SlotContract, VariantContract>;
		definition: Definition<
			Contract.Type<TTokenContract, SlotContract, VariantContract>
		>;
	}[] = [];

	let current:
		| Contract.Type<TTokenContract, SlotContract, VariantContract>
		| undefined = contract;
	let currentDef:
		| Definition<
				Contract.Type<TTokenContract, SlotContract, VariantContract>
		  >
		| undefined = definition;

	while (current && currentDef) {
		layers.unshift({
			contract: current,
			definition: currentDef,
		});
		current = current["~use"] as
			| Contract.Type<TTokenContract, SlotContract, VariantContract>
			| undefined;
		currentDef = current?.["~definition"] as
			| Definition<
					Contract.Type<TTokenContract, SlotContract, VariantContract>
			  >
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
