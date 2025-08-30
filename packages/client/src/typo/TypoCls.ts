import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const TypoCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [],
		defaults: def.defaults({}),
	}),
);

export type TypoCls = typeof TypoCls;

export namespace TypoCls {
	export type Props<P = unknown> = Component<TypoCls, P>;
}
