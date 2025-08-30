import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const StatusCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
			"title",
			"message",
			"body",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				root: what.css([
					"w-full",
					"flex",
					"flex-col",
					"items-center",
					"justify-center",
				]),
				title: what.css([
					"w-full",
					"text-center",
				]),
				message: what.both(
					[
						"w-full",
						"text-center",
					],
					[
						"tone.neutral.light.text",
					],
				),
				body: what.css([
					"pt-2",
					"w-full",
				]),
			}),
		],
		defaults: def.defaults({}),
	}),
);

export type StatusCls = typeof StatusCls;

export namespace StatusCls {
	export type Props<P = unknown> = Component<typeof StatusCls, P>;
}
