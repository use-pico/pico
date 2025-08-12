import { PicoCls } from "../cls/PicoCls";

export const ActionCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"root",
		],
		variant: {
			variant: [
				"common",
				"warning",
				"danger",
			],
			disabled: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				root: what.css([
					"flex",
					"flex-row",
					"gap-2",
					"items-center",
					"rounded-sm",
					"px-2",
					"py-0.5",
					"cursor-pointer",
				]),
			}),
			def.rule(
				what.variant({
					variant: "common",
				}),
				{
					root: what.css([
						"pico--action-menu-item-common",
					]),
				},
			),
			def.rule(
				what.variant({
					variant: "warning",
				}),
				{
					root: what.css([
						"pico--action-menu-item-warning",
					]),
				},
			),
			def.rule(
				what.variant({
					variant: "danger",
				}),
				{
					root: what.css([
						"pico--action-menu-item-danger",
					]),
				},
			),
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					root: what.css([
						"cursor-not-allowed",
						"hover:text-(--pico-text-default)",
						"hover:bg-(--pico-bg-default)",
					]),
				},
			),
		],
		defaults: def.defaults({
			variant: "common",
			disabled: false,
		}),
	}),
);
