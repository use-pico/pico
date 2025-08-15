import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const BoolInputCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
			"switch",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.both(
					[
						"flex",
						"items-center",
						"justify-between",
						"text-sm",
						"font-medium",
						"w-full",
					],
					[
						"tone.neutral.light.text:hover",
					],
				),
				switch: what.both(
					[
						"relative",
						"w-11",
						"h-6",
						"peer-focus:outline-hidden",
						"peer-focus:ring-4",
						"rounded-full",
						"peer",
						"peer-checked:after:translate-x-full",
						"peer-checked:rtl:after:-translate-x-full",
						"peer-checked:after:border-white",
						"after:content-['']",
						"after:absolute",
						"after:top-[2px]",
						"after:start-[2px]",
						"after:bg-white",
						"after:border",
						"after:rounded-full",
						"after:h-5",
						"after:w-5",
						"after:transition-all",
					],
					[
						"tone.neutral.light.bg",
						"tone.neutral.light.border",
						"tone.neutral.light.border",
					],
				),
			}),
		],
		defaults: def.defaults({}),
	}),
);

export type BoolInputCls = typeof BoolInputCls;

export namespace BoolInputCls {
	export type Props<P = unknown> = Component<BoolInputCls, P>;
}
