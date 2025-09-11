import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const StatusCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
			"title",
			"body",
		],
		variant: {
			tone: [
				"inherit",
				"primary",
				"secondary",
				"danger",
				"warning",
				"neutral",
				"subtle",
				"link",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				root: what.css([
					"w-full",
					"flex",
					"flex-col",
					"items-center",
					"justify-center",
					"gap-2",
				]),
				title: what.css([
					"flex",
					"flex-col",
					"gap-1",
					"items-center",
					"justify-center",
				]),
			}),
			/**
			 * Tones are not defined as Status are forwarding it's
			 * styles to "Icon" and "Typo" components which implements
			 * their own styles.
			 */
		],
		defaults: def.defaults({
			tone: "inherit",
		}),
	}),
);

export type StatusCls = typeof StatusCls;

export namespace StatusCls {
	export type Props<P = unknown> = Cls.Props<typeof StatusCls, P>;
}
