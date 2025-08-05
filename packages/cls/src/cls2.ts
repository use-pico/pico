import type { ClassName } from "./types/ClassName";

export type Slots<TKeys extends string> = {
	[K in TKeys]: ClassName;
};

export type Variant<TSlotKeys extends string> = {
	[K in NoInfer<TSlotKeys>]?: ClassName;
};

export type Variants<TSlotKeys extends string, TVariantKeys extends string> = {
	[VK in TVariantKeys]: {
		[VV in string]: Variant<TSlotKeys>;
	};
};

export interface Cls<TSlotKeys extends string> {
	slot: { [K in TSlotKeys]: false };
}

export interface Factory<
	TSlotKeys extends string,
	TVariantKeys extends string,
	TUse extends Factory<any, any, any> | unknown = unknown,
> {
	create(): Cls<TSlotKeys>;
	"~type": TUse extends Factory<any, any, any>
		? {
				slots: TSlotKeys | TUse["~type"]["slots"];
				variants: TVariantKeys | TUse["~type"]["variants"];
			}
		: {
				slots: TSlotKeys;
				variants: TVariantKeys;
			};
}

//
//
//
//

export namespace cls {
	export interface Props<
		TSlotKeys extends string,
		TVariantKeys extends string,
		TUse extends Factory<any, any, any> | unknown = unknown,
	> {
		use?: TUse;
		slot: Slots<TSlotKeys>;
		variant: Variants<TSlotKeys, TVariantKeys>;
	}
}

export function cls<
	TSlotKeys extends string,
	TVariantKeys extends string,
	TUse extends Factory<any, any, any> | unknown = unknown,
>({ use, slot, variant }: cls.Props<TSlotKeys, TVariantKeys, TUse>) {
	return {
		create() {
			return {} as any;
		},
		"~type": {
			slots: "slots",
			variants: "variants",
		} as {
			slots: TUse extends Factory<any, any, any>
				? TSlotKeys | TUse["~type"]["slots"]
				: TSlotKeys;
			variants: TUse extends Factory<any, any, any>
				? TVariantKeys | TUse["~type"]["variants"]
				: TVariantKeys;
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
