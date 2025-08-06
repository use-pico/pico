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

export type Slot<TContract extends Contract<any, any, any>> = Record<
	TContract["slot"][number],
	ClassName
>;

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
	TContract extends Contract<any, any, any>,
	TUse extends Contract<any, any, any> | undefined = undefined,
> = {
	[S in keyof TContract["variant"]]: {
		[V in TContract["variant"][S][number]]: Partial<{
			[K in TContract["slot"][number]]: ClassName;
		}>;
	};
};

export type Defaults<TContract extends Contract<any, any, any>> = {
	[S in keyof TContract["variant"]]: TContract["variant"][S][number];
};

/**
 * Definition is used as the primary place to define classes on slots.
 */
export interface Definition<
	TContract extends Contract<any, any, any>,
	TUse extends Contract<any, any, any> | undefined = undefined,
> {
	use?: TUse;
	slot: TUse extends Contract<any, any, any>
		? Slot<TContract> & Partial<Slot<TUse>>
		: Slot<TContract>;
	variant: Variants<TContract, TUse>;
	/** now a named type instead of inline */
	// match?: MatchRule<TContract["slot"][number], U>[];
	defaults: Defaults<TContract>;
}

export interface Props<
	TSlotKeys extends readonly string[],
	TVariantKeys extends readonly string[],
	TVariants extends Record<TVariantKeys[number], readonly string[]>,
	TContract extends Contract<TSlotKeys, TVariantKeys, TVariants>,
	TUse extends Contract<any, any, any> | undefined = undefined,
> {
	contract: TContract;
	definition: Definition<TContract, TUse>;
}

/**
 * This is a public facing instance of used "cls".
 */
export interface Cls<TUseContract extends Contract<any, any, any>> {
	create(): any;
	use<
		const TSlotKeys extends readonly string[],
		const TVariantKeys extends readonly string[],
		const TVariants extends Record<TVariantKeys[number], readonly string[]>,
		TContract extends Contract<TSlotKeys, TVariantKeys, TVariants>,
	>(
		props: Props<
			TSlotKeys,
			TVariantKeys,
			TVariants,
			TContract,
			TUseContract
		>,
	): Cls<TUseContract>;
	"~contract": TUseContract;
}

export function cls<
	const TSlotKeys extends readonly string[],
	const TVariantKeys extends readonly string[],
	const TVariants extends Record<TVariantKeys[number], readonly string[]>,
	TContract extends Contract<TSlotKeys, TVariantKeys, TVariants>,
	TUse extends Contract<any, any, any> | undefined = undefined,
>(
	props: Props<TSlotKeys, TVariantKeys, TVariants, TContract, TUse>,
): Cls<TContract> {
	const proxy = proxyOf();

	return {
		create() {
			return {} as any;
		},
		use() {
			return null as any;
		},
		"~contract": proxy,
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
		slot: {
			root: [
				"root-cls",
			],
			wrapper: [
				"wrapper-cls",
			],
			// dfg: [],
		},
		variant: {
			// dfdF: [],
			color: {
				blue: {
					root: [
						"root-blue-cls",
					],
				},
				red: {
					root: [
						"root-red-cls",
					],
				},
			},
		},
		defaults: {
			color: "red",
		},
	},
});

type _UltraBaseCls = (typeof CoreCls)["~contract"];

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
			// root: [],
			// wrapper: [],
			label: [
				"abc",
			],
			icon: [],
			// icon: [],
		},
		variant: {
			icon: {
				large: {
					icon: [],
				},
				small: {
					icon: [],
				},
			},
			color: {
				blue: {
					root: [],
					// label: [
					// 	"text-blue-500",
					// ],
				},
				red: {
					root: [],
				},
			},
		},
		defaults: {
			color: "blue",
			ultra: "another",
		},
	},
});

const SomeButtonCls = ButtonCls.use({
	contract: {
		slot: [],
		variant: {},
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
					ultra: [],
				},
				baz: {
					some: [],
				},
			},
		},

		// ✅ fully inferred MatchRule[]
		// match: [
		// 	{
		// 		if: {
		// 			color: "blue", // only "blue"|"red"
		// 			foo: "baz", // only "bar"|"baz"
		// 			ultra: "another", // only "variant"|"another"
		// 		},
		// 		do: {
		// 			some: [
		// 				"foo-style",
		// 			], // only "some"|"pica"|"root"|"label"|"ultra"
		// 			pica: [
		// 				"pica-style",
		// 			],
		// 			// ❌ any other key here will now error
		// 		},
		// 	},
		// ],

		defaults: {
			foo: "bar",
			color: "red",
			ultra: "variant",
		},
	},
});
