import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const AppLayoutCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
			"header",
			"content",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				base: what.css([
					"min-h-screen",
					"flex",
					"flex-col",
				]),
				header: what.both(
					[
						"flex",
						"flex-row",
						"items-center",
						"shadow-xs",
						"border-b",
						"w-full",
						"gap-4",
						"p-4",
					],
					[
						"tone.neutral.light.bg",
						"tone.neutral.light.border",
					],
				),
				content: what.both(
					[
						"grow",
						"h-full",
						"border-b",
						"p-2",
					],
					[
						"tone.neutral.light.border",
					],
				),
			}),
		],
		defaults: def.defaults({}),
	}),
);

export type AppLayoutCls = typeof AppLayoutCls;

export namespace AppLayoutCls {
	export type Props<P = unknown> = Component<AppLayoutCls, P>;
}
