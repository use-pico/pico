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

// export type Slot<TContract extends Contract<any, any, any>> =
// 	TContract["use"] extends Contract<any, any, any>
// 		? Record<TContract["slot"][number], ClassName> &
// 				Partial<Record<TContract["use"]["slot"][number], ClassName>>
// 		: Record<TContract["slot"][number], ClassName>;

// type MergeSlots<TContract extends Contract<any, any, any>> =
// 	TContract["use"] extends Contract<any, any, any>
// 		? TContract["slot"][number] | TContract["use"]["slot"][number]
// 		: TContract["slot"][number];

// /**
//  * Variants is a record of variants, each variant has a record of slots and their
//  * classes.
//  */
// export type Variants<TContract extends Contract<any, any, any>> = {
// 	[K in keyof TContract["variant"]]: {
// 		[V in TContract["variant"][K][number]]: Partial<
// 			Record<MergeSlots<TContract>, ClassName>
// 		>;
// 	};
// } & (TContract["use"] extends Contract<any, any, any>
// 	? {
// 			[K in Exclude<
// 				keyof TContract["use"]["variant"],
// 				keyof TContract["variant"]
// 			>]?: {
// 				[V in TContract["use"]["variant"][K][number]]: Partial<
// 					Record<MergeSlots<TContract>, ClassName>
// 				>;
// 			};
// 		}
// 	: {});

// export type Defaults<TContract extends Contract<any, any, any>> =
// 	TContract["use"] extends Contract<any, any, any, any>
// 		? {
// 				[S in keyof TContract["variant"]]: TContract["variant"][S][number];
// 			} & {
// 				[S in keyof TContract["use"]["variant"]]: TContract["use"]["variant"][S][number];
// 			}
// 		: {
// 				[S in keyof TContract["variant"]]: TContract["variant"][S][number];
// 			};

// /**
//  * Definition is used as the primary place to define classes on slots.
//  */
// export interface Definition<TContract extends Contract<any, any, any>> {
// 	slot: Slot<TContract>;
// 	variant: Variants<TContract>;
// 	/** now a named type instead of inline */
// 	// match?: MatchRule<TContract["slot"][number], U>[];
// 	defaults: Defaults<TContract>;
// }

export interface Props<
	TSlot extends Slot,
	TVariant extends Record<string, Variant>,
	TUse extends Contract<any, any, any> | unknown = unknown,
> {
	contract: Contract<TSlot, TVariant, TUse>;
	// definition: Definition<TContract>;
}

/**
 * This is a public facing instance of used "cls".
 */
export interface Cls<TContract extends Contract<any, any, any>> {
	create(): any;
	contract: TContract;
}

export function cls<
	const TSlot extends Slot,
	const TVariant extends Record<string, Variant>,
	const TUse extends Contract<any, any, any> | unknown = unknown,
>(props: Props<TSlot, TVariant, TUse>): Cls<Contract<TSlot, TVariant, TUse>> {
	const proxy = proxyOf();

	return {
		create() {
			return {} as any;
		},
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
	// definition: {
	// 	slot: {
	// 		root: [
	// 			"root-cls",
	// 		],
	// 		wrapper: [
	// 			"wrapper-cls",
	// 		],
	// 		// dfg: [],
	// 	},
	// 	variant: {
	// 		// dfdF: [],
	// 		color: {
	// 			blue: {
	// 				root: [
	// 					"root-blue-cls",
	// 				],
	// 			},
	// 			red: {
	// 				root: [
	// 					"root-red-cls",
	// 				],
	// 			},
	// 		},
	// 	},
	// 	defaults: {
	// 		color: "red",
	// 	},
	// },
});

type _UltraBaseCls = (typeof CoreCls)["contract"];

const ButtonCls = cls({
	contract: {
		use: CoreCls.contract,
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
	// definition: {
	// 	slot: {
	// 		// root: [],
	// 		// wrapper: [],
	// 		label: [
	// 			"abc",
	// 		],
	// 		icon: [],
	// 		// icon: [],
	// 	},
	// 	variant: {
	// 		icon: {
	// 			large: {
	// 				icon: [],
	// 			},
	// 			small: {
	// 				icon: [],
	// 			},
	// 		},
	// 		// color: {
	// 		// 	blue: {
	// 		// 		root: [],
	// 		// 		// label: [
	// 		// 		// 	"text-blue-500",
	// 		// 		// ],
	// 		// 	},
	// 		// 	red: {
	// 		// 		root: [],
	// 		// 	},
	// 		// },
	// 	},
	// 	defaults: {
	// 		icon: "large",
	// 		// color: "red",
	// 	},
	// },
});

type _ButtonCls = (typeof ButtonCls)["contract"];

const SomeButtonCls = cls({
	contract: {
		use: ButtonCls.contract,
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
	// definition: {
	// 	slot: {
	// 		some: [],
	// 		pica: [],
	// 	},
	// 	variant: {
	// 		foo: {
	// 			bar: {
	// 				some: [
	// 					"foo",
	// 				],
	// 				root: [
	// 					"this-works",
	// 				],
	// 			},
	// 			baz: {
	// 				some: [],
	// 				root: [],
	// 			},
	// 		},
	// 	},

	// 	// ✅ fully inferred MatchRule[]
	// 	// match: [
	// 	// 	{
	// 	// 		if: {
	// 	// 			color: "blue", // only "blue"|"red"
	// 	// 			foo: "baz", // only "bar"|"baz"
	// 	// 			ultra: "another", // only "variant"|"another"
	// 	// 		},
	// 	// 		do: {
	// 	// 			some: [
	// 	// 				"foo-style",
	// 	// 			], // only "some"|"pica"|"root"|"label"|"ultra"
	// 	// 			pica: [
	// 	// 				"pica-style",
	// 	// 			],
	// 	// 			// ❌ any other key here will now error
	// 	// 		},
	// 	// 	},
	// 	// ],

	// 	defaults: {
	// 		icon: "large",
	// 		foo: "bar",
	// 		color: "red",
	// 	},
	// },
});

type _SomeButtonCls = (typeof SomeButtonCls)["contract"];
