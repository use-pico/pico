import type {
	Contract,
	Defaults,
	Definition,
	Slot,
	TokenDefinition,
	TokenSchema,
	VariantDefinition,
	VariantRecord,
} from "./types";

/**
 * Create contract and definition for a component with only token system
 * Perfect for design system foundations (colors, spacing, typography, etc.)
 *
 * Usage: cls(...clsTokens({ ... }))
 */
export function clsTokens<const TTokens extends TokenSchema>(config: {
	tokens: TTokens;
	definitions: TokenDefinition<Contract<[], {}, TTokens>>;
}): [
	Contract<[], {}, TTokens>,
	Definition<Contract<[], {}, TTokens>>,
] {
	return [
		{
			slot: [],
			variant: {},
			tokens: config.tokens,
		},
		{
			slot: {},
			variant: {},
			tokens: config.definitions,
			defaults: {},
		},
	];
}

/**
 * Create contract and definition for a component with only slots and variants
 * Perfect for UI components without token dependencies
 *
 * Usage: cls(...clsComponent({ ... }))
 */
export function clsComponent<
	const TSlot extends Slot,
	const TVariant extends VariantRecord = {},
>(config: {
	slots: TSlot;
	variants?: TVariant;
	definitions: {
		variants?: VariantDefinition<
			Contract<
				TSlot,
				TVariant,
				{
					variant: [];
					group: {};
				}
			>
		>;
		defaults?: Defaults<
			Contract<
				TSlot,
				TVariant,
				{
					variant: [];
					group: {};
				}
			>
		>;
	};
	classes: {
		[S in TSlot[number]]: string[];
	};
}): [
	Contract<
		TSlot,
		TVariant,
		{
			variant: [];
			group: {};
		}
	>,
	Definition<
		Contract<
			TSlot,
			TVariant,
			{
				variant: [];
				group: {};
			}
		>
	>,
] {
	const variants = config.variants || ({} as TVariant);

	return [
		{
			slot: config.slots,
			variant: variants,
			tokens: {
				variant: [],
				group: {},
			} as const, // Empty token schema for new system
		},
		{
			slot: Object.fromEntries(
				config.slots.map((slotName) => [
					slotName,
					{
						class: config.classes[slotName as TSlot[number]],
						token: [],
					},
				]),
			) as any,
			variant: config.definitions.variants || ({} as any),
			tokens: {},
			defaults: config.definitions.defaults || ({} as any),
		},
	];
}

/**
 * Create contract and definition for a minimal component with just slots and basic classes
 * Perfect for simple wrappers or basic components
 *
 * Usage: cls(...clsSlots({ ... }))
 */
export function clsSlots<const TSlot extends Slot>(config: {
	slots: TSlot;
	classes: {
		[S in TSlot[number]]: string[];
	};
}): [
	Contract<
		TSlot,
		{},
		{
			variant: [];
			group: {};
		}
	>,
	Definition<
		Contract<
			TSlot,
			{},
			{
				variant: [];
				group: {};
			}
		>
	>,
] {
	return [
		{
			slot: config.slots,
			variant: {},
			tokens: {
				variant: [],
				group: {},
			} as const, // Empty token schema for new system
		},
		{
			slot: Object.fromEntries(
				config.slots.map((slotName) => [
					slotName,
					{
						class: config.classes[slotName as TSlot[number]],
						token: [],
					},
				]),
			) as any,
			variant: {},
			tokens: {},
			defaults: {},
		},
	];
}
