import type { ClassName } from "./types/ClassName";

// --- Core Types ---

export type Slots<TSlot extends string> = Record<TSlot, ClassName>;

export type Variant<TSlot extends string> = Partial<
	Record<NoInfer<TSlot>, ClassName>
>;

export type Variants<TSlot extends string, TVariant extends string> = {
	[VK in TVariant]: {
		[VV in string]: Variant<TSlot>;
	};
};

// --- Internal Type Inference ---

export interface Cls<TSlot extends string> {
	slot: Record<TSlot, false>;
}

export interface Factory<TSlot extends string, TVariant extends string> {
	create(): Cls<TSlot>;
	"~type": {
		slots: TSlot;
		variants: TVariant;
	};
}

// --- Factory Props & Function ---

export namespace cls {
	export interface Props<
		TSlot extends string,
		TVariant extends string,
		TUse extends Factory<any, any> | undefined = undefined,
	> {
		use?: TUse;
		slot: Slots<TSlot>;
		variant: Variants<TSlot, TVariant>;
	}
}

export function cls<
	TSlot extends string,
	TVariant extends string,
	TUse extends Factory<any, any> | undefined = undefined,
>(
	props: cls.Props<TSlot, TVariant, TUse>,
): Factory<
	TUse extends Factory<any, any> ? TSlot | TUse["~type"]["slots"] : TSlot,
	TUse extends Factory<any, any>
		? TVariant | TUse["~type"]["variants"]
		: TVariant
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
				qqqq: [],
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
	},
	variant: {
		foo: {
			bar: {
				some: [
					"foo",
				],
				// root: [
				// 	"this-works",
				// ],
				// gfdg: [],
			},
		},
	},
});

type _SomeCls = (typeof _SomeCls)["~type"];
