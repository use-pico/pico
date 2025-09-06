import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const DetailCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
			"section",
			"item",
			"value",
			"label",
			"field",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				root: what.css([
					"flex",
					"flex-col",
					"gap-4",
				]),
				section: what.both(
					[
						"flex",
						"flex-col",
					],
					[
						"square.md",
					],
				),
				item: what.css([
					"flex",
					"flex-row",
					"gap-4",
					"items-center",
				]),
				value: what.both(
					[
						"flex-1",
						"flex-col",
						"gap-2",
						"p-2",
					],
					[
						"border.default",
						"tone.neutral.light.border",
						"round.default",
					],
				),
				label: what.both(
					[
						"font-bold",
						"text-sm",
						"pb-1",
						"opacity-50",
					],
					[
						"tone.neutral.light.text",
					],
				),
				field: what.both(
					[
						"text-lg",
						"px-3",
						"py-1.5",
						"transition-all",
						"duration-300",
					],
					[
						"border.default",
						"shadow.default",
						"round.default",
						"tone.neutral.light.border",
						"tone.neutral.light.border:hover",
						"tone.neutral.light.shadow",
						"tone.neutral.light.shadow:hover",
					],
				),
			}),
		],
		defaults: def.defaults({}),
	}),
);

export type DetailCls = typeof DetailCls;

export namespace DetailCls {
	export type Props<P = unknown> = Cls.Props<DetailCls, P>;

	export type Slots = Cls.SlotsOf<DetailCls>;
}
