import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const FlowCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
		],
		variant: {
			direction: [
				"row",
				"col",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				root: what.css([
					"flex",
					"flex-1",
				]),
			}),
			def.rule(
				what.variant({
					direction: "row",
				}),
				{
					root: what.css([
						"flex-row",
						"w-full",
						"bg-blue-100",
					]),
				},
			),
			def.rule(
				what.variant({
					direction: "col",
				}),
				{
					root: what.css([
						"flex-col",
						"bg-red-100",
					]),
				},
			),
		],
		defaults: def.defaults({
			direction: "col",
		}),
	}),
);

export type FlowCls = typeof FlowCls;

export namespace FlowCls {
	export type Props<P = unknown> = Cls.Props<FlowCls, P>;
}
