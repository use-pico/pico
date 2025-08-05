import { type ClsProps, cls } from "@use-pico/cls";

export const LoadingOverlayCls = cls({
	slot: {
		base: [
			"fixed",
			"inset-0",
			"h-full",
			"items-center",
			"justify-center",
			"bg-slate-100",
			"flex",
			"transition-all",
			"duration-200",
			"z-10",
			"pointer-events-none",
			"bg-opacity-0",
			"backdrop-blur-none",
		],
	},
	variant: {
		show: {
			true: [
				"bg-opacity-50",
				"backdrop-blur-xs",
				"pointer-events-auto",
			],
		},
	},
	defaults: {
		show: true,
	},
});

export namespace LoadingOverlayCls {
	export type Props<P = unknown> = ClsProps<typeof LoadingOverlayCls, P>;
}
