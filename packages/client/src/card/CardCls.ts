import { cls } from "@use-pico/cls";

export const CardCls = cls({
	slot: {
		base: [
			"flex",
			"flex-col",
			"gap-4",
			"border",
			"border-slate-100",
			"p-4",
			"rounded-lg",
		],
	},
	variant: {
		inline: {
			true: [
				"flex-row",
				"border-none",
				"gap-1",
				"p-0",
				"flex-1",
			],
		},
	},
	defaults: {
		inline: false,
	},
});
export type CardCls = typeof CardCls;

export namespace CardCls {
	export type Props<P = unknown> = cls.Props<CardCls, P>;

	export type Slots = cls.Slots<CardCls>;
}
