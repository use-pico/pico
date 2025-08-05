import type { ClassName } from "./types/ClassName";

// --- Core Types ---

export type Variant<TSlotKeys extends string> = Partial<
	Record<TSlotKeys, ClassName>
>;

export type Variants<TSlotKeys extends string> = Record<
	string,
	Record<string, Variant<TSlotKeys>>
>;

// --- Helper: merge local + inherited variant maps ---

type MergeVariants<
	Local extends Variants<any>,
	Use extends Factory<any, any, any> | undefined,
> = Local &
	(Use extends Factory<any, any, any> ? Use["~type"]["variants"] : {});

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

		variant: TVariantMap;

		defaults: {
			[K in keyof MergeVariants<TVariantMap, TUse> &
				string]: keyof MergeVariants<TVariantMap, TUse>[K];
		};
	}
}

export function cls<
	TSlotKeys extends string,
	TVariantMap extends Variants<TSlotKeys>,
	TUse extends Factory<any, any, any> | undefined = undefined,
>(
	props: cls.Props<TSlotKeys, TVariantMap, TUse>,
): Factory<
	TUse extends Factory<any, any, any>
		? TSlotKeys | TUse["~type"]["slotKeys"]
		: TSlotKeys,
	keyof MergeVariants<TVariantMap, TUse> & string,
	MergeVariants<TVariantMap, TUse>
> {
	return {
		create() {
			return {} as any;
		},
		"~type": {
			slotKeys: props.use ? (null as any) : (null as any),
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
		color: "blue", // ✅ "blue" | "red"
		ultra: "another", // ✅ inherited: "variant" | "another"
	},
});

// TODO This should be assignable
const blabla: typeof UltraBaseCls = BaseCls;

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
		foo: "bar", // ✅ "bar" | "baz"
		color: "red", // ✅ inherited
		ultra: "variant", // ✅ inherited
	},
});
