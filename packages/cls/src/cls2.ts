import type { ClassName } from "./types/ClassName";
import { proxyOf } from "./utils/proxyOf";

/**
 * Contract defines what a "cls" contains, it's used for a stable inference
 * source of truth.
 */
export interface Contract<
	TSlotKeys extends readonly string[],
	TVariantKeys extends readonly string[],
	TVariants extends Record<TVariantKeys[number], readonly string[]>,
> {
	slot: TSlotKeys;
	variant: TVariants;
}

/**
 * Variant defines which slots uses which classes when this variant is active.
 */
export type Variant<TSlotKeys extends string> = Partial<{
	[K in TSlotKeys]: ClassName;
}>;

/**
 * Variants is a record of variants, each variant has a record of slots and their
 * classes.
 */
export type Variants<
	TVariantKeys extends string,
	TSlotKeys extends string,
> = Partial<{
	[S in TVariantKeys]: {
		[V in TVariantKeys]: Variant<TSlotKeys>;
	};
}>;

/**
 * This is a public facing instance of used "cls".
 */
export interface Cls<TContract extends Contract<any, any, any>> {
	create(): any;
	"~contract": TContract;
}

/**
 * Definition is used as the primary place to define classes on slots.
 */
export interface Definition<
	TContract extends Contract<any, any, any>,
	TUse extends Cls<any> | undefined = undefined,
> {
	use?: TUse;

	slot: Record<TContract["slot"][number], ClassName>;

	variant: Variants<TContract["variant"][number], TContract["slot"][number]>;

	/** now a named type instead of inline */
	// match?: MatchRule<TContract["slot"][number], U>[];

	defaults: any;
}

export namespace cls {
	export interface Props<
		TSlotKeys extends readonly string[],
		TVariantKeys extends readonly string[],
		TVariants extends Record<TVariantKeys[number], readonly string[]>,
		TContract extends Contract<TSlotKeys, TVariantKeys, TVariants>,
		TUse extends Cls<any> | undefined = undefined,
	> {
		contract: TContract;
		definition: Definition<TContract, TUse>;
	}
}

export function cls<
	const TSlotKeys extends readonly string[],
	const TVariantKeys extends readonly string[],
	const TVariants extends Record<TVariantKeys[number], readonly string[]>,
	TContract extends Contract<TSlotKeys, TVariantKeys, TVariants>,
	TUse extends Cls<any> | undefined = undefined,
>(
	props: cls.Props<TSlotKeys, TVariantKeys, TVariants, TContract, TUse>,
): Cls<TContract> {
	const proxy = proxyOf();

	return {
		create() {
			return {} as any;
		},
		"~contract": proxy,
	};
}

// --- Test Examples ---

const UltraBaseCls = cls({
	contract: {
		slot: [
			"foo",
			"ultra",
			// 'bla',
			"new",
		],
		variant: {
			some: [
				"foo",
				"bar",
			],
		},
	},
	definition: {
		slot: {
			foo: [],
			ultra: [],
			new: [],
			// dfg: [],
		},
		variant: {            
			ultra: {
				variant: {
					foo: [],
				},
				another: {
					foo: [],
				},
			},
		},
		defaults: {
			ultra: "variant",
		},
	},
});

type _UltraBaseCls = (typeof UltraBaseCls)["~contract"];

// const BaseCls = cls({
// 	use: UltraBaseCls,
// 	slot: {
// 		root: [],
// 		label: [
// 			"abc",
// 		],
// 	},
// 	variant: {
// 		color: {
// 			blue: {
// 				root: [],
// 				label: [
// 					"text-blue-500",
// 				],
// 			},
// 			red: {
// 				root: [],
// 			},
// 		},
// 	},
// 	defaults: {
// 		color: "blue",
// 		ultra: "another",
// 	},
// });

// const SomeCls = cls({
// 	use: BaseCls,
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
// 				ultra: [],
// 			},
// 			baz: {
// 				some: [],
// 			},
// 		},
// 	},

// 	// ✅ fully inferred MatchRule[]
// 	match: [
// 		{
// 			if: {
// 				color: "blue", // only "blue"|"red"
// 				foo: "baz", // only "bar"|"baz"
// 				ultra: "another", // only "variant"|"another"
// 			},
// 			do: {
// 				some: [
// 					"foo-style",
// 				], // only "some"|"pica"|"root"|"label"|"ultra"
// 				pica: [
// 					"pica-style",
// 				],
// 				// ❌ any other key here will now error
// 			},
// 		},
// 	],

// 	defaults: {
// 		foo: "bar",
// 		color: "red",
// 		ultra: "variant",
// 	},
// });
