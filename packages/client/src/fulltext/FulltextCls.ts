import { type ClsProps, cls } from "@use-pico/cls";

export const FulltextCls = cls({
	slot: {
		base: [
			"relative",
			"w-full",
		],
		search: [
			"absolute",
			"inset-y-0",
			"left-2",
			"flex",
			"items-center",
			"pointer-events-none",
			"text-slate-500",
		],
		input: [
			"pl-8",
			"py-1",
			"w-full",
			"bg-slate-50",
			"text-slate-900",
			"text-sm",
			"border",
			"border-slate-300",
			"rounded-sm",
			"focus:border-sky-400",
			"focus:outline-hidden",
			"block",
		],
		clear: [
			"absolute",
			"inset-y-0",
			"right-2",
			"flex",
			"items-center",
			"cursor-pointer",
			"text-slate-300",
			"hover:text-slate-500",
		],
	},
	variant: {},
	defaults: {},
});

export namespace FulltextCls {
	export type Props<P = unknown> = ClsProps<typeof FulltextCls, P>;
}
