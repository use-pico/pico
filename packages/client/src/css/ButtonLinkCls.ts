import { cls } from "@use-pico/cls";

export const ButtonLinkCls = cls({
	slot: {
		base: [
			"flex",
			"flex-row",
			"gap-2",
			"items-center",
			"px-4",
			"py-2",
			"rounded-md",
			"text-md",
			"text-blue-400",
			"hover:text-blue-600",
		],
	},
	variant: {
		disabled: {
			true: [
				"cursor-not-allowed",
				"text-slate-400",
				"hover:text-slate-400",
			],
		},
	},
	defaults: {
		disabled: false,
	},
});
export type ButtonLinkCls = typeof ButtonLinkCls;

export namespace ButtonLinkCls {
	export type Props<P = unknown> = cls.Props<ButtonLinkCls, P>;

	export type Slots = cls.Slots<ButtonLinkCls>;
}
