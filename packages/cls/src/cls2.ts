import type { ClassName } from "./types/ClassName";

export type Slots<TKeys extends string> = {
	[K in TKeys]: ClassName;
};

export type Variant<TSlotKeys extends string> = {
	[K in NoInfer<TSlotKeys>]?: ClassName;
};

export type Variants<TSlotKeys extends string, TVariantKeys extends string> = {
	[VK in TVariantKeys]: Record<string, Variant<TSlotKeys>>;
};

export type Cls2Fn = () => void;

//
//
//
//

export namespace cls2 {
	export interface Props<
		TSlotKeys extends string,
		TVariantKeys extends string,
	> {
		slot: Slots<TSlotKeys>;
		variant: Variants<TSlotKeys, TVariantKeys>;
		use?: Cls2Fn;
	}
}

export const cls2 = <TSlotKeys extends string, TVariantKeys extends string>({
	slot,
	variant,
	use,
}: cls2.Props<TSlotKeys, TVariantKeys>): Cls2Fn => {
	return () => {
		//
	};
};

const BaseCls = cls2({
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
		},
	},
});

const SomeCls = cls2({
	use: BaseCls,
	slot: {},
	variant: {},
});
