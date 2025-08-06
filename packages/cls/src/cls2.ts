import type { ClassName } from "./types/ClassName";
import { proxyOf } from "./utils/proxyOf";

type Slot = [
	string,
	...string[],
];

type Variant = [
	string,
	...string[],
];

/**
 * Contract defines what a "cls" contains, it's used for a stable inference
 * source of truth.
 */
export interface Contract<
	TSlot extends Slot,
	TVariant extends Record<string, Variant>,
	TUse extends Contract<any, any, any> | unknown = unknown,
> {
	slot: TSlot;
	variant: TVariant;
	use?: TUse;
}

type SlotKeys<T> = T extends {
	slot: infer S extends readonly string[];
}
	? S
	: [];

type SlotsEx<T> = T extends {
	use?: infer U;
}
	? U extends Contract<any, any, any>
		? [
				...SlotsEx<U>,
				...SlotKeys<T>,
			]
		: SlotKeys<T>
	: SlotKeys<T>;

export type Slots<TContract extends Contract<any, any, any>> = Partial<
	Required<TContract>["use"] extends Contract<any, any, any>
		? Record<SlotsEx<Required<TContract>["use"]>[number], ClassName>
		: {}
> &
	Record<TContract["slot"][number], ClassName>;

type VariantRecord = Record<string, readonly string[]>;

type VariantEx<T extends Contract<any, any, any>> = T extends {
	variant: infer V extends VariantRecord;
	use?: infer U;
}
	? U extends Contract<any, any, any>
		? VariantEx<U> & V
		: V
	: {};

type LocalVariantKeys<T> = T extends {
	variant: infer V extends VariantRecord;
}
	? keyof V
	: never;

type VariantKeys<T extends Contract<any, any, any>> = keyof VariantEx<T>;

/**
 * Variants is a record of variants, each variant has a record of slots and their
 * classes.
 */
export type Variants<TContract extends Contract<any, any, any>> = {
	[K in Extract<keyof VariantEx<TContract>, LocalVariantKeys<TContract>>]: {
		[V in VariantEx<TContract>[K][number]]: Partial<
			Record<keyof Slots<TContract>, ClassName>
		>;
	};
} & Partial<{
	[K in Exclude<
		keyof VariantEx<TContract>,
		LocalVariantKeys<TContract>
	>]: Partial<{
		[V in VariantEx<TContract>[K][number]]: Partial<
			Record<keyof Slots<TContract>, ClassName>
		>;
	}>;
}>;

type MatchRule<TContract extends Contract<any, any, any>> = {
	if?: { [K in VariantKeys<TContract>]?: VariantEx<TContract>[K][number] };
	do?: Partial<Record<keyof Slots<TContract>, ClassName>>;
};

export type Defaults<TContract extends Contract<any, any, any>> = {
	[K in VariantKeys<TContract>]: VariantEx<TContract>[K][number];
};

/**
 * Definition is used as the primary place to define classes on slots.
 */
export interface Definition<TContract extends Contract<any, any, any>> {
	slot: Slots<TContract>;
	variant: Variants<TContract>;
	match?: MatchRule<TContract>[];
	defaults: Defaults<TContract>;
}

export interface Props<TContract extends Contract<any, any, any>> {
	// TODO Support variant extensions from "use", e.g. color in inherited "cls"
	contract: TContract;
	definition: Definition<TContract>;
}

/**
 * This is a public facing instance of used "cls".
 */
export interface Cls<TContract extends Contract<any, any, any>> {
	create(): any;
	use<
		const TSlot extends Slot,
		const TVariant extends Record<string, Variant>,
	>(
		props: Props<Contract<TSlot, TVariant, TContract>>,
	): Cls<Contract<TSlot, TVariant, TContract>>;
	contract: TContract;
}

export function cls<const TContract extends Contract<any, any, any>>(
	props: Props<TContract>,
): Cls<TContract> {
	const proxy = proxyOf();

	return {
		create() {
			return {} as any;
		},
		use: null as any,
		contract: proxy,
	};
}

// --- Test Examples ---

const CoreCls = cls({
	contract: {
		slot: [
			"root",
			"wrapper",
		],
		variant: {
			color: [
				"blue",
				"red",
			],
		},
	},
	definition: {
		variant: {
			// dfdF: [],
			color: {
				blue: {
					root: [
						"root-blue-cls",
					],
				},
				// sdfd: [],
				red: {
					root: [
						"root-red-cls",
					],
				},
			},
		},
		slot: {
			root: [
				"root-cls",
			],
			wrapper: [
				"wrapper-cls",
			],
			// dfg: [],
		},
		defaults: {
			color: "red",
		},
	},
});

type _CoreCls = typeof CoreCls;
type _CoreClsContract = _CoreCls["contract"];
type _CoreClsSlots = keyof Slots<_CoreClsContract>;

const ButtonCls = CoreCls.use({
	contract: {
		slot: [
			"label",
			"icon",
		],
		variant: {
			icon: [
				"small",
				"large",
			],
		},
	},
	definition: {
		slot: {
			root: [],
			// wrapper: [],
			label: [
				"abc",
			],
			icon: [],
			// pica: [],
			// icon: [],
		},
		variant: {
			color: {
				blue: {
					label: [],
				},
				red: {
					icon: [],
				},
			},
			icon: {
				large: {
					icon: [],
					root: [],
				},
				small: {
					icon: [],
				},
			},
		},
		defaults: {
			color: "blue",
			icon: "large",
		},
	},
});

type _ButtonCls = typeof ButtonCls;

type _ButtonClsContract = _ButtonCls["contract"];

type _ButtonClsSlots = Slots<_ButtonClsContract>;

type _ButtonClsUse = _ButtonClsContract["use"];

const SomeButtonCls = ButtonCls.use({
	contract: {
		slot: [
			"some",
			"pica",
		],
		variant: {
			foo: [
				"bar",
				"baz",
			],
		},
	},
	definition: {
		slot: {
			some: [],
			pica: [],
		},
		variant: {
			foo: {
				bar: {
					some: [
						"foo",
					],
					root: [
						"this-works",
					],
					label: [],
					// dfg: [],
				},
				baz: {
					some: [],
					root: [],
				},
			},
		},
		match: [
			{
				if: {
					color: "red",
					icon: "large",
				},
				do: {
					root: [
						"root-blue-large-cls",
					],
					wrapper: [
						"wrapper-blue-large-cls",
					],
				},
			},
		],
		defaults: {
			color: "red",
			foo: "bar",
			icon: "large",
		},
	},
});

type _SomeButtonCls = typeof SomeButtonCls;

type _SomeButtonClsContract = _SomeButtonCls["contract"];

type _SomeButtonClsSlots = Slots<_SomeButtonClsContract>;

type _SomeButtonClsSlotsKeys = keyof _SomeButtonClsSlots;

type _SomeButtonClsUse = _SomeButtonClsContract["use"];
