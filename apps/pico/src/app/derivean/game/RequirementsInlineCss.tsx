import { css } from "@use-pico/common";

export const RequirementsInlineCss = css({
	slot: {
		item: [
			"flex",
			"flex-row",
			"gap-2",
			"items-center",
			"bg-sky-100",
			"border",
			"rounded-sm",
			"border-sky-300",
			"py-1",
			"px-2",
		],
	},
	variant: {
		passive: {
			true: [],
		},
		missing: {
			true: [],
		},
	},
	match: [
		{
			if: {
				passive: true,
			},
			then: {
				item: ["bg-purple-100", "border-purple-300", "text-purple-500"],
			},
		},
		{
			if: {
				passive: false,
			},
			then: {
				item: ["bg-sky-100", "border-sky-300", "text-sky-500"],
			},
		},
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
		passive: false,
		missing: false,
	},
});

export namespace RequirementsInlineCss {
	export type Props<P = unknown> = css.Props<typeof RequirementsInlineCss, P>;
}
