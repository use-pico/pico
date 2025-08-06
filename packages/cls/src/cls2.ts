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
	tokens: any;
	use?: TUse;
}

type HasBaseInUseChain<Sub, Base> = Sub extends Base
	? true
	: Sub extends {
				use?: infer U;
			}
		? HasBaseInUseChain<U, Base>
		: false;

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

type MergeVariants<A extends VariantRecord, B extends VariantRecord> = {
	[K in keyof A | keyof B]: K extends keyof B
		? K extends keyof A
			? [
					...A[K],
					...B[K],
				]
			: B[K]
		: K extends keyof A
			? A[K]
			: never;
};

export type VariantEx<T extends Contract<any, any, any>> = T extends {
	variant: infer V extends VariantRecord;
	use?: infer U;
}
	? U extends Contract<any, any, any>
		? MergeVariants<VariantEx<U>, V>
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
	[K in InheritedVariantKeys<TContract>]: {
		[V in VariantEx<TContract>[K][number]]: Partial<
			Record<SlotKey<TContract>, ClassName>
		>;
	};
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

export function cls2cls<
	Base extends Contract<any, any, any>,
	Sub extends Contract<any, any, any>,
>(
	_: Cls<Base>,
	sub: Cls<Sub> & {
		contract: HasBaseInUseChain<Sub, Base> extends true
			? unknown
			: [
					"❌ Not derived from Base contract",
					{
						sub: Sub;
						base: Base;
					},
				];
	},
): Cls<Base> {
	return sub as unknown as Cls<Base>;
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
		/**
		 * TODO Token support:
		 *
		 * This must implement inheritance same as "variant" in Contract do
		 */
		tokens: {
			/**
			 * Define available groups we can use
			 */
			group: [
				"group-1",
				"group-2",
			],
			/**
			 * Each group must provide all those values
			 */
			value: [
				"variable-1",
				"variable-2",
			],
		},
	},
	definition: {
		/**
		 * Token definition - here are enforced rules from Contract.tokens
		 */
		tokens: {
			"group-1": {
				"variable-1": [
					"ClassName",
				],
				"variable-2": [
					"ClassName",
				],
			},
			"group-2": {
				"variable-3": [
					"ClassName",
				],
				"variable-4": [
					"ClassName",
				],
			},
		},
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
			color: [
				"purple",
			],
		},
		tokens: {
			/**
			 * From now on all tokens must also provide "foo-bar" value,
			 * even ones from inheritance, see the comment below
			 */
			group: [
				"new-one",
			],
			value: [
				"foo-bar",
			],
		},
	},
	definition: {
		tokens: {
			/**
			 * Because we've defined new value, inherited tokens forces to define those here,
			 * inherited values are not required to be defined again (variables-1 and variables-2)
			 */
			"group-1": {
				"foo-bar": [
					"ClassName",
				],
			},
			"group-2": {
				"foo-bar": [
					"ClassName",
				],
			},
			/**
			 * But this fresh one must implement all values, include ones from inheritance
			 */
			"new-one": {
				"variable-1": [
					"ClassName",
				],
				"variable-2": [
					"ClassName",
				],
				"foo-bar": [
					"ClassName",
				],
			},
		},
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
				purple: {
					label: [],
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

const Uncompatible = cls({
	contract: {
		slot: [
			"foo",
		],
		variant: {},
	},
	definition: {
		slot: {
			foo: [],
		},
		variant: {},
		defaults: {},
	},
});

// TODO Fix assigning
const _testAssign = cls2cls(CoreCls, Uncompatible);
const _testAssign2 = cls2cls(CoreCls, ButtonCls);

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
