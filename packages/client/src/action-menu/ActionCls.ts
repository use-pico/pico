import { PicoCls } from "../cls/PicoCls";

export const ActionCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
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
				base: what.css([
					"flex",
					"flex-row",
					"gap-2",
					"items-center",
					"rounded-sm",
					"px-2",
					"py-0.5",
					"cursor-pointer",
					"text-(--pico-text-default)",
					"hover:bg-(--pico-bg-hover)",
					"hover:text-(--pico-text-hover)",
				]),
			}),
			def.rule(
				what.variant({
					variant: "common",
				}),
				{
					base: what.css([
						"pico--action-menu-item-common",
					]),
				},
			),
			def.rule(
				what.variant({
					variant: "warning",
				}),
				{
					base: what.css([
						"pico--action-menu-item-warning",
					]),
				},
			),
			def.rule(
				what.variant({
					variant: "danger",
				}),
				{
					base: what.css([
						"pico--action-menu-item-danger",
					]),
				},
			),
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					base: what.css([
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
