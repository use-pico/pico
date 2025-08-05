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

		match?: Array<{
			if: Partial<{
				[K in keyof MergeVariants<LocalVariants, U> &
					string]: keyof MergeVariants<LocalVariants, U>[K];
			}>;

			do: Partial<Record<MergeSlots<SlotKeys, U>, ClassName>>;
		}>;

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

const bla: typeof UltraBaseCls = BaseCls;

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
	match: [
		{
			if: {
				color: "blue",
				foo: "bar",
			},
			do: {
				// only these keys are allowed now:
				some: [
					"foo-style",
				],
				pica: [
					"pica-style",
				],
				// ❌ 'hovno' or 'customSlot' would now error
			},
		},
	],
	defaults: {
		foo: "bar",
		color: "red",
		ultra: "variant",
	},
});
