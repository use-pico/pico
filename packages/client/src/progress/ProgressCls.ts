import { type ClsProps, cls } from "@use-pico/cls";

export const ProgressCls = cls({
	slot: {
		base: [
			"h-full",
			"w-full",
			"bg-slate-200",
			"rounded-sm",
			"transition-all",
		],
		progress: [
			"h-full",
			"bg-blue-400",
			"rounded-sm",
			"leading-none",
			"transition-all",
		],
	},
	variant: {
		size: {
			xs: "h-0.5",
			sm: "h-1",
			md: "h-2",
			lg: "h-4",
		},
	},
	defaults: {
		size: "md",
	},
});
export type ProgressCls = typeof ProgressCls;

export namespace ProgressCls {
	export type Props<P = unknown> = ClsProps<typeof ProgressCls, P>;
}
