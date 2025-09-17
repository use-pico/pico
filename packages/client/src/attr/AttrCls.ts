import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const AttrCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
		],
		variant: {
			inline: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				root: what.both(
					[
						"Attr-root",
						"transition-all",
					],
					[
						"padding.md",
						// "shadow.sm",
						// "border.default",
						// "tone.neutral.light.border",
						// "tone.neutral.light.shadow",
						// "tone.neutral.light.shadow:hover",
					],
				),
			}),
			def.rule(
				what.variant({
					inline: false,
				}),
				{
					root: what.css([
						"flex",
						"flex-col",
						"gap-2",
					]),
				},
			),
			def.rule(
				what.variant({
					inline: true,
				}),
				{
					root: what.css([
						"inline-flex",
						"gap-2",
						"items-center",
					]),
				},
			),
		],
		defaults: def.defaults({
			tone: "primary",
			theme: "light",
			inline: false,
		}),
	}),
);

export type AttrCls = typeof AttrCls;

export namespace AttrCls {
	export type Props<P = unknown> = Cls.Props<AttrCls, P>;
}
