import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ColumnLayoutCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
		],
		variant: {
			layout: [
				"header-content-footer",
				"content-footer",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				root: what.both(
					[
						"ColumnLayout-root",
						"h-full",
						"grid",
						"gap-1",
					],
					[
						"square.sm",
					],
				),
			}),
			def.rule(
				what.variant({
					layout: "header-content-footer",
				}),
				{
					root: what.css([
						"grid-rows-[min-content_minmax(0,1fr)_min-content]",
					]),
				},
			),
			def.rule(
				what.variant({
					layout: "content-footer",
				}),
				{
					root: what.css([
						"grid-rows-[minmax(0,1fr)_min-content]",
					]),
				},
			),
		],
		defaults: def.defaults({
			layout: "header-content-footer",
		}),
	}),
);

export type ColumnLayoutCls = typeof ColumnLayoutCls;

export namespace ColumnLayoutCls {
	export type Props<P = unknown> = Cls.Props<ColumnLayoutCls, P>;
}
