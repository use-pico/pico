import { type Component, classes, component } from "@use-pico/cls";

export const LinkToCls = component({
	slots: [
		"base",
	],
	root: {
		base: classes([
			"flex",
			"flex-row",
			"gap-2",
			"items-center",
			"justify-between",
			"text-blue-500",
			"rounded-sm",
			"px-1",
			"py-0.5",
			"hover:text-blue-700",
			"focus:outline-hidden",
			"w-fit",
			"truncate",
		]),
	},
	defaults: {},
});

export namespace LinkToCls {
	export type Props<P = unknown> = Component<typeof LinkToCls, P>;
}
