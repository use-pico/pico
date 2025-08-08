import { type Component, variant } from "@use-pico/cls";

export const LoadingOverlayCls = variant({
	slots: [
		"base",
	],
	variants: {
		show: [
			"bool",
		],
	},
	rules: ({ root, rule, classes }) => [
		root({
			base: classes([
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
			]),
		}),
		rule(
			{
				show: true,
			},
			{
				base: classes([
					"bg-opacity-50",
					"backdrop-blur-xs",
					"pointer-events-auto",
				]),
			},
		),
	],
	defaults: {
		show: true,
	},
});

export namespace LoadingOverlayCls {
	export type Props<P = unknown> = Component<typeof LoadingOverlayCls, P>;
}
