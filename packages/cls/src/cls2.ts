import type { ClassName } from "./types/ClassName";

// --- Core Types ---

export type Variant<TSlotKeys extends string> = Partial<
	Record<TSlotKeys, ClassName>
>;

export type Variants<TSlotKeys extends string> = Record<
	string,
	Record<string, Variant<TSlotKeys>>
>;

// --- Defaults Helper ---
// Reads the fully-merged variantMap from a Factory's "~type" and
// requires one default for every variant key, each constrained
// to the literal union of that variant's options.
type Defaults<F extends Factory<any, any, any>> = {
	[K in keyof F["~type"]["variants"] &
		string]: keyof F["~type"]["variants"][K];
};

// --- Internal Core ---

export interface Cls<TSlotKeys extends string> {
	slot: Record<TSlotKeys, false>;
}

export interface Factory<
	TSlotKeys extends string,
	TVariantKeys extends string,
	TVariants extends Variants<TSlotKeys>,
> {
	create(): Cls<TSlotKeys>;
	"~type": {
		slotKeys: TSlotKeys;
		variantKeys: TVariantKeys;
		variants: TVariants;
	};
}

// --- Public API ---

export namespace cls {
	export interface Props<
		TSlotKeys extends string,
		TVariantMap extends Variants<TSlotKeys>,
		TUse extends Factory<any, any, any> | undefined = undefined,
	> {
		use?: TUse;

		slot: (TUse extends Factory<any, any, any>
			? Partial<Record<TSlotKeys | TUse["~type"]["slotKeys"], ClassName>>
			: Partial<Record<TSlotKeys, ClassName>>) & {
			[key: string]: ClassName;
		};

		/** Your local variant definitions */
		variant: TVariantMap;

		/**
		 * Required defaults for **every** variant key (local + inherited).
		 * Values are constrained to the exact set of keys under each variant.
		 */
		defaults: Defaults<
			Factory<
				/* slots */ TUse extends Factory<any, any, any>
					? TSlotKeys | TUse["~type"]["slotKeys"]
					: TSlotKeys,
				/* keys  */ keyof TVariantMap & string,
				/* map   */ TVariantMap &
					(TUse extends Factory<any, any, any>
						? TUse["~type"]["variants"]
						: {})
			>
		>;
	}
}

export function cls<
	TSlotKeys extends string,
	TVariantMap extends Variants<TSlotKeys>,
	TUse extends Factory<any, any, any> | undefined = undefined,
>(
	props: cls.Props<TSlotKeys, TVariantMap, TUse>,
): Factory<
	/* merged slots */ TUse extends Factory<any, any, any>
		? TSlotKeys | TUse["~type"]["slotKeys"]
		: TSlotKeys,
	/* merged keys  */ keyof TVariantMap & string,
	/* merged map   */ TVariantMap &
		(TUse extends Factory<any, any, any> ? TUse["~type"]["variants"] : {})
> {
	return {
		create() {
			return {} as any;
		},
		"~type": {
			slotKeys: null as any,
			variantKeys: null as any,
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
		ultra: "variant", // ✅ only "variant" | "another"
	},
});
type _UltraBase = (typeof UltraBaseCls)["~type"];

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
		color: "red",
		ultra: "another", // ✅ inherited: "variant" | "another"
	},
});
type _Base = (typeof BaseCls)["~type"];

const SomeCls = cls({
	use: BaseCls,
	slot: {
		some: [] as string[],
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
			},
			baz: {
				some: [],
			},
		},
	},
	defaults: {
		foo: "bar", // ✅ only "bar" | "baz"
		color: "blue", // ✅ inherited
		ultra: "variant", // ✅ inherited
	},
});
type _Some = (typeof SomeCls)["~type"];
