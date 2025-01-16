import { css } from "@use-pico/common";

export const BlueprintDependenciesInlineCss = css({
	slot: {
		item: [
			"flex",
			"flex-row",
			"gap-2",
			"items-center",
			"bg-sky-100",
			"border",
			"rounded",
			"border-sky-300",
			"py-1",
			"px-2",
			"bg-sky-100",
			"border-sky-300",
			"text-sky-500",
		],
	},
	variant: {
		missing: {
			true: [],
		},
	},
	match: [
		{
			if: {
				missing: true,
			},
			then: {
				item: ["bg-amber-100", "border-amber-300"],
			},
		},
	],
	defaults: {
		missing: false,
	},
});

export namespace BlueprintDependenciesInlineCss {
	export type Props<P = unknown> = css.Props<
		typeof BlueprintDependenciesInlineCss,
		P
	>;
}
