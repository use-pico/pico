import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const PreviewCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"base",
			"container",
			"title",
			"links",
			"actions",
			"extra",
			"divider",
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
						"flex-col",
						"gap-2",
						"p-2",
					],
					[
						"border.default",
						"tone.neutral.light.bg",
						"tone.neutral.light.border",
						"round.md",
					],
				),
				container: what.css([
					"flex",
					"flex-row",
					"items-center",
					"justify-between",
					"gap-1",
				]),
				title: what.css([
					"flex",
					"flex-row",
					"items-center",
					"gap-4",
				]),
				links: what.css([
					"flex",
					"flex-row",
					"items-center",
					"gap-4",
					"justify-end",
				]),
				actions: what.css([
					"flex",
					"flex-row",
					"items-center",
					"gap-4",
				]),
				extra: what.css([
					"flex",
					"flex-row",
					"gap-4",
					"justify-end",
				]),
				divider: what.both(
					[
						"w-full",
						"border-b",
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

export type PreviewCls = typeof PreviewCls;

export namespace PreviewCls {
	export type Props<P = unknown> = Cls.Props<PreviewCls, P>;
}
