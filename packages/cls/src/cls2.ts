import type { ClassName } from "./types/ClassName";

// --- Core Types ---

export type Variant<Keys extends string> = Partial<Record<Keys, ClassName>>;

export type Variants<Keys extends string> = Record<
	string,
	Record<string, Variant<Keys>>
>;

// --- Helpers ---

/** merge local slot‐keys + any inherited slot‐keys from `use` */
type MergeSlots<
	Local extends string,
	U extends Factory<any, any> | undefined,
> = U extends Factory<infer USlots, any> ? Local | USlots : Local;

/** merge local Variants map + any inherited variants for defaults & match.if */
type MergeVariants<
	Local extends Variants<any>,
	U extends Factory<any, any> | undefined,
> = Local & (U extends Factory<any, any> ? U["~type"]["variants"] : {});

// --- Extracted Match Types ---

/** allowed shape for one `if: { … }` clause */
type MatchCondition<
	LocalVars extends Variants<any>,
	U extends Factory<any, any> | undefined,
> = Partial<{
	[K in keyof MergeVariants<LocalVars, U> & string]: keyof MergeVariants<
		LocalVars,
		U
	>[K];
}>;

/** allowed shape for one `do: { … }` clause */
type MatchAction<
	SlotKeys extends string,
	U extends Factory<any, any> | undefined,
> = Partial<Record<MergeSlots<SlotKeys, U>, ClassName[]>>;

/** one `{ if, do }` entry */
type MatchRule<
	SlotKeys extends string,
	LocalVars extends Variants<SlotKeys>,
	U extends Factory<any, any> | undefined,
> = {
	if: MatchCondition<LocalVars, U>;
	do: MatchAction<SlotKeys, U>;
};

// --- Internal Core ---

export interface Cls<TSlotKeys extends string> {
	slot: Record<TSlotKeys, false>;
}

export interface Factory<
	TSlotKeys extends string,
	TVariants extends Variants<TSlotKeys>,
> {
	create(): Cls<TSlotKeys>;
	"~type": {
		slots: { [K in TSlotKeys]: true };
		variants: TVariants;
	};
}

// --- Public API ---

export namespace cls {
	export interface Props<
		SlotKeys extends string,
		LocalVariants extends Variants<SlotKeys>,
		U extends Factory<any, any> | undefined = undefined,
	> {
		use?: U;

		slot: (U extends Factory<any, any>
			? Partial<Record<MergeSlots<SlotKeys, U>, ClassName>>
			: Partial<Record<SlotKeys, ClassName>>) & {
			[key: string]: ClassName;
		};

		variant: Variants<MergeSlots<SlotKeys, U>> & LocalVariants;

		/** now a named type instead of inline */
		match?: MatchRule<SlotKeys, LocalVariants, U>[];

		defaults: {
			[K in keyof MergeVariants<LocalVariants, U> &
				string]: keyof MergeVariants<LocalVariants, U>[K];
		};
	}
}

export function cls<
	SlotKeys extends string,
	LocalVariants extends Variants<SlotKeys>,
	U extends Factory<any, any> | undefined = undefined,
>(
	props: cls.Props<SlotKeys, LocalVariants, U>,
): Factory<MergeSlots<SlotKeys, U>, MergeVariants<LocalVariants, U>> {
	return {
		create() {
			return {} as any;
		},
		"~type": {
			slots: props.use
				? (Object.fromEntries(
						Object.keys(props.use["~type"].slots).map((k) => [
							k,
							true,
						]),
					) as any)
				: ({} as any),
			variants: props.variant as any,
		},
	};
}

// --- Test Examples ---

const UltraBaseCls = cls({
	/**
	 * TODO Tokens support
	 */
	tokens: {
		/**
		 * Contract defines all keys available in the "tokens" and in the rest of CLS
		 */
		contract: [
			"bgColor",
			"hoverColor",
		],
		dictionary: {
			// Token group (used to pick the token group)
			// Tokens should support inheritance, but they _must_ conform to the "contract"
			// One option is to setup contract before
			primary: {
				// Here are all "contract"; all tokens must be present as keys here
				bgColor: [
					"abc",
				],
			},
		},
	},
	slot: {
		ultra: [],
	},
	variant: {
		ultra: {
			variant: {
				ultra: [],
			},
			another: {
				ultra: [],
			},
		},
	},
	defaults: {
		ultra: "variant",
	},
});

const BaseCls = cls({
	use: UltraBaseCls,
	slot: {
		root: [],
		label: [
			"abc",
		],
	},
	variant: {
		color: {
			blue: {
				root: [],
				label: [
					"text-blue-500",
				],
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
});

const SomeCls = cls({
	use: BaseCls,
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
	match: [
		{
			if: {
				color: "blue", // only "blue"|"red"
				foo: "baz", // only "bar"|"baz"
				ultra: "another", // only "variant"|"another"
			},
			do: {
				some: [
					"foo-style",
				], // only "some"|"pica"|"root"|"label"|"ultra"
				pica: [
					"pica-style",
				],
				// ❌ any other key here will now error
			},
		},
	],

	defaults: {
		foo: "bar",
		color: "red",
		ultra: "variant",
	},
});
