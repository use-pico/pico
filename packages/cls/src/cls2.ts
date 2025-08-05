import type { ClassName } from "./types/ClassName";
import { proxyOf } from "./utils/proxyOf";

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

export interface Cls<TSlotKeys extends string, TVariantKeys extends string> {
	slot: { [K in TSlotKeys]: false };
}

export interface Factory<
	TSlotKeys extends string,
	TVariantKeys extends string,
	TUse extends Factory<any, any, any> | unknown = unknown,
> {
	create(): Cls<TSlotKeys, TVariantKeys>;
	"~type": {
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
>({
	use: _3,
	slot: _1,
	variant: _2,
}: cls.Props<TSlotKeys, TVariantKeys, TUse>): Factory<
	TSlotKeys,
	TVariantKeys,
	TUse
> {
	const proxy = proxyOf();

	return {
		create() {
			return {} as any;
		},
		"~type": {
			slots: proxy,
			variants: proxy,
		},
	};
}

const BaseCls = cls({
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
type _BaseCls = typeof BaseCls;

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
				root: [
					"this-works",
				],
				gfdg: [],
			},
		},
	},
});

type _SomeCls = typeof _SomeCls;
