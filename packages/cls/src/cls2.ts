import type { ClassName } from "./types/ClassName";

// --- Core Types ---

export type Variant<Keys extends string> = Partial<Record<Keys, ClassName>>;

export type Variants<Keys extends string> = Record<
	string,
	Record<string, Variant<Keys>>
>;

// --- Helpers ---

/** Merge your local slot‐keys + any inherited slot‐keys from `use` */
type MergeSlots<
	Local extends string,
	U extends Factory<any, any> | undefined,
> = U extends Factory<infer USlots, any> ? Local | USlots : Local;

/** Merge your local Variants map + any inherited variants map for defaults */
type MergeVariants<
	Local extends Variants<any>,
	U extends Factory<any, any> | undefined,
> = Local & (U extends Factory<any, any> ? U["~type"]["variants"] : {});

// --- Internal Core ---

export interface Cls<Keys extends string> {
	slot: Record<Keys, false>;
}

export interface Factory<
	SlotKeys extends string,
	TVariants extends Variants<SlotKeys>,
> {
	create(): Cls<SlotKeys>;
	"~type": {
		slots: { [K in SlotKeys]: true };
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

		// ◀ exactly as before
		slot: (U extends Factory<any, any>
			? Partial<Record<MergeSlots<SlotKeys, U>, ClassName>>
			: Partial<Record<SlotKeys, ClassName>>) & {
			[key: string]: ClassName;
		};

		// ▶ now we merge inherited slots into the variant definition
		variant: Variants<MergeSlots<SlotKeys, U>> & LocalVariants;

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

// ✅ assignable
const blabla: typeof UltraBaseCls = BaseCls;

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
				ultra: [], // ▶ now you get autocomplete for 'ultra' too!
			},
			baz: {
				some: [],
			},
		},
	},
	// TODO Create types for this one, all should be properly inferred and typed
	match: [
		{
			if: {
				// Matching against "variants" - keys are all available variant keys (+ their values)
				color: "blue",
				foo: "baz",
			},
			do: {
				// Matching against "slots" - keys are all available slot keys
				root: [
					"some-root-style",
				],
				ultra: [
					"some-style",
				],
			},
		},
	],
	defaults: {
		foo: "bar",
		color: "red",
		ultra: "variant",
	},
});
