import type { ClassName } from "./types/ClassName";
import { proxyOf } from "./utils/proxyOf";

// --- Core Types ---

type Slot = [
	string,
	...string[],
];
type Variant = [
	string,
	...string[],
];

export interface Contract<
	TSlot extends Slot,
	TVariant extends Record<string, Variant>,
	TUse extends Contract<any, any, any> | unknown = unknown,
> {
	slot: TSlot;
	variant: TVariant;
	use?: TUse;
}

// --- Slot Helpers ---

type AllSlotKeys<T> = T extends {
	slot: infer S extends readonly string[];
	use?: infer U;
}
	? U extends Contract<any, any, any>
		? [
				...AllSlotKeys<U>,
				...S,
			]
		: S
	: [];

type OwnSlotKeys<T extends Contract<any, any, any>> = T["slot"][number];
type InheritedSlotKeys<T extends Contract<any, any, any>> = Exclude<
	AllSlotKeys<T>[number],
	OwnSlotKeys<T>
>;
type SlotKey<T extends Contract<any, any, any>> = AllSlotKeys<T>[number];

export type Slots<TContract extends Contract<any, any, any>> = Record<
	OwnSlotKeys<TContract>,
	ClassName
> &
	Partial<Record<InheritedSlotKeys<TContract>, ClassName>>;

// --- Variant Helpers ---

type VariantRecord = Record<string, readonly string[]>;

export type VariantEx<T extends Contract<any, any, any>> = T extends {
	variant: infer V extends VariantRecord;
	use?: infer U;
}
	? U extends Contract<any, any, any>
		? VariantEx<U> & V
		: V
	: {};

type OwnVariantKeys<T extends Contract<any, any, any>> = keyof T["variant"];
type InheritedVariantKeys<T extends Contract<any, any, any>> = Exclude<
	keyof VariantEx<T>,
	OwnVariantKeys<T>
>;
type VariantKey<T extends Contract<any, any, any>> = keyof VariantEx<T>;

// --- Variants ---

export type Variants<TContract extends Contract<any, any, any>> = {
	[K in OwnVariantKeys<TContract>]: {
		[V in VariantEx<TContract>[K][number]]: Partial<
			Record<SlotKey<TContract>, ClassName>
		>;
	};
} & Partial<{
	[K in InheritedVariantKeys<TContract>]: Partial<{
		[V in VariantEx<TContract>[K][number]]: Partial<
			Record<SlotKey<TContract>, ClassName>
		>;
	}>;
}>;

// --- Match Rules ---

type MatchRule<TContract extends Contract<any, any, any>> = {
	if?: { [K in VariantKey<TContract>]?: VariantEx<TContract>[K][number] };
	do?: Partial<Record<SlotKey<TContract>, ClassName>>;
};

// --- Defaults ---

export type Defaults<TContract extends Contract<any, any, any>> = {
	[K in VariantKey<TContract>]: VariantEx<TContract>[K][number];
};

// --- Definition ---

type VariantDefinition<T extends Contract<any, any, any>> = {
	[K in OwnVariantKeys<T>]: {
		[V in VariantEx<T>[K][number]]: Partial<Record<SlotKey<T>, ClassName>>;
	};
} & Partial<{
	[K in InheritedVariantKeys<T>]: {
		[V in VariantEx<T>[K][number]]: Partial<Record<SlotKey<T>, ClassName>>;
	};
}>;

export interface Definition<TContract extends Contract<any, any, any>> {
	slot: Slots<TContract>;
	variant: VariantDefinition<TContract>;
	match?: MatchRule<TContract>[];
	defaults: Defaults<TContract>;
}

export interface Props<TContract extends Contract<any, any, any>> {
	contract: TContract;
	definition: Definition<TContract>;
}

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

// TODO Fix assigning
// const _testAssign: _CoreCls = ButtonCls;

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
