import type { ClassName } from "./types/ClassName";

// --- Core Types ---

export type Slots<TSlotKeys extends string> = Record<TSlotKeys, ClassName>;

export type Variant<TSlotKeys extends string> = Partial<
	Record<TSlotKeys, ClassName>
>;

export type Variants<TSlotKeys extends string, TVariantKeys extends string> = {
	[V in TVariantKeys]: {
		[S in string]: Variant<TSlotKeys>;
	};
};

// --- Internal Type Inference ---

export interface Cls<TSlotKeys extends string> {
	slot: Record<TSlotKeys, false>;
}

export interface Factory<
	TSlotKeys extends string,
	TVariantKeys extends string,
> {
	create(): Cls<TSlotKeys>;
	"~type": {
		slots: TSlotKeys;
		variants: TVariantKeys;
	};
}

// --- Factory Props & Function ---

export namespace cls {
	export interface Props<
		TSlotKeys extends string,
		TVariantKeys extends string,
		TUse extends Factory<any, any> | undefined = undefined,
	> {
		use?: TUse;
		slot: (TUse extends Factory<any, any>
			? Partial<Record<TSlotKeys | TUse["~type"]["slots"], ClassName>>
			: Partial<Record<TSlotKeys, ClassName>>) & {
			[key: string]: ClassName;
		};
		variant: Variants<
			TUse extends Factory<any, any>
				? TSlotKeys | TUse["~type"]["slots"]
				: TSlotKeys,
			TVariantKeys
		>;
	}
}

export function cls<
	TSlotKeys extends string,
	TVariantKeys extends string,
	TUse extends Factory<any, any> | undefined = undefined,
>(
	props: cls.Props<TSlotKeys, TVariantKeys, TUse>,
): Factory<
	TUse extends Factory<any, any>
		? TSlotKeys | TUse["~type"]["slots"]
		: TSlotKeys,
	TUse extends Factory<any, any>
		? TVariantKeys | TUse["~type"]["variants"]
		: TVariantKeys
> {
	return {
		create() {
			return {} as any;
		},
		"~type": {
			slots: null as any,
			variants: null as any,
		},
	};
}

//
//
//
//
//

const UltraBaseCls = cls({
	slot: {
		ultra: [],
	},
	variant: {
		ultra: {
			variant: {
				ultra: [],
			},
		},
	},
});
type _UltraBaseCls = (typeof UltraBaseCls)["~type"];

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
				// qqqq: [],
				label: [
					"text-blue-500",
				],
			},
		},
	},
});
type _BaseCls = (typeof BaseCls)["~type"];

const _SomeCls = cls({
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
				// gfdg: [],
			},
		},
	},
});

type _SomeCls = (typeof _SomeCls)["~type"];
