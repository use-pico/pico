import { css } from "@use-pico/common";

export const BoolInputCss = css({
	slot: {
		base: [
			"flex",
			"items-center",
			"justify-between",
			"text-sm",
			"font-medium",
			"text-slate-900",
			"w-full",
		],
		switch: [
			"relative",
			"w-11",
			"h-6",
			"bg-gray-200",
			"peer-focus:outline-none",
			"peer-focus:ring-4",
			"peer-focus:ring-blue-300",
			"dark:peer-focus:ring-blue-800",
			"rounded-full",
			"peer",
			"dark:bg-gray-700",
			"peer-checked:after:translate-x-full",
			"rtl:peer-checked:after:-translate-x-full",
			"peer-checked:after:border-white",
			"after:content-['']",
			"after:absolute",
			"after:top-[2px]",
			"after:start-[2px]",
			"after:bg-white",
			"after:border-gray-300",
			"after:border",
			"after:rounded-full",
			"after:h-5",
			"after:w-5",
			"after:transition-all",
			"dark:border-gray-600",
			"peer-checked:bg-blue-600",
		],
	},
	variant: {},
	defaults: {},
});

export namespace BoolInputCss {
	export type Props<P = unknown> = css.Props<typeof BoolInputCss, P>;
}
