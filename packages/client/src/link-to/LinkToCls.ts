import { cls } from "@use-pico/common";

export const LinkToCls = cls({
	slot: {
		base: [
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
		],
	},
	variant: {},
	defaults: {},
});

export namespace LinkToCls {
	export type Props<P = unknown> = cls.Props<typeof LinkToCls, P>;
}
