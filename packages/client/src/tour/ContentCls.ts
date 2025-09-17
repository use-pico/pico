import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ContentCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
			"tooltip",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				root: what.css([
					"top-0",
					"left-0",
					"max-w-[100dvw]",
					"max-h-[100dvh]",
					"z-[10000]",
				]),
				tooltip: what.both(
					[
						"overflow-auto",
					],
					[
						"round.lg",
						"border.default",
						"shadow.default",
						"square.md",
						"tone.secondary.light.text",
						"tone.secondary.light.bg",
						"tone.secondary.light.border",
						"tone.secondary.light.shadow",
					],
				),
			}),
		],
		defaults: def.defaults({
			tone: "primary",
			theme: "light",
		}),
	}),
);

export type ContentCls = typeof ContentCls;

export namespace ContentCls {
	export type Props<P = unknown> = Cls.Props<ContentCls, P>;
}
