import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const StatusCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
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
				base: what.css([
					"w-full",
					"flex",
					"flex-col",
					"items-center",
					"justify-center",
				]),
				title: what.css([
					"text-xl",
					"text-bold",
					"w-full",
					"text-center",
				]),
				message: what.both(
					[
						"text-base",
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
