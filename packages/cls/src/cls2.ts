import type { ClassName } from "./types/ClassName";
import { proxyOf } from "./utils/proxyOf";

// --- Base Types ---

type Slot = [
	string,
	...string[],
];
type Variant = [
	string,
	...string[],
];

type VariantRecord = Record<string, readonly string[]>;

// --- Recursive Helpers ---

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

type AllVariants<T> = T extends {
	variant: infer V extends VariantRecord;
	use?: infer U;
}
	? U extends Contract<any, any, any>
		? AllVariants<U> & V
		: V
	: {};

type LocalVariantKeys<T> = T extends {
	variant: infer V extends VariantRecord;
}
	? keyof V
	: never;

type AllVariantKeys<T> = keyof AllVariants<T>;

// --- Contract and Derived Types ---

export interface Contract<
	TSlot extends Slot,
	TVariant extends Record<string, Variant>,
	TUse extends Contract<any, any, any> | unknown = unknown,
> {
	slot: TSlot;
	variant: TVariant;
	use?: TUse;
}

export type Slots<T extends Contract<any, any, any>> = Record<
	T["slot"][number],
	ClassName
> &
	Partial<
		Record<Exclude<AllSlotKeys<T>[number], T["slot"][number]>, ClassName>
	>;

export type Variants<T extends Contract<any, any, any>> = {
	[K in Extract<keyof AllVariants<T>, LocalVariantKeys<T>>]: {
		[V in AllVariants<T>[K][number]]: Partial<
			Record<keyof Slots<T>, ClassName>
		>;
	};
} & Partial<{
	[K in Exclude<keyof AllVariants<T>, LocalVariantKeys<T>>]: Partial<{
		[V in AllVariants<T>[K][number]]: Partial<
			Record<keyof Slots<T>, ClassName>
		>;
	}>;
}>;

type MatchRule<T extends Contract<any, any, any>> = {
	if?: { [K in AllVariantKeys<T>]?: AllVariants<T>[K][number] };
	do?: Partial<Record<keyof Slots<T>, ClassName>>;
};

export type Defaults<T extends Contract<any, any, any>> = {
	[K in AllVariantKeys<T>]: AllVariants<T>[K][number];
};

// --- Main Structures ---

export interface Definition<T extends Contract<any, any, any>> {
	slot: Slots<T>;
	variant: Variants<T>;
	match?: MatchRule<T>[];
	defaults: Defaults<T>;
}

export interface Props<T extends Contract<any, any, any>> {
	contract: T;
	definition: Definition<T>;
}

export interface Cls<T extends Contract<any, any, any>> {
	create(): any;
	use<
		const TSlot extends Slot,
		const TVariant extends Record<string, Variant>,
	>(
		props: Props<Contract<TSlot, TVariant, T>>,
	): Cls<Contract<TSlot, TVariant, T>>;
	contract: T;
}

export function cls<const T extends Contract<any, any, any>>(
	props: Props<T>,
): Cls<T> {
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
