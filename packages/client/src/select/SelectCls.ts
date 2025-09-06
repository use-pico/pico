import type { Cls } from "@use-pico/cls";
import { FormFieldCls } from "../form/FormFieldCls";

export const SelectCls = FormFieldCls.extend(
	{
		tokens: [],
		slot: [
			"popup",
			"item",
		],
		variant: {
			disabled: [
				"bool",
			],
			active: [
				"bool",
			],
			selected: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				input: what.css([
					"inline-flex",
					"flex-row",
					"w-fit",
					"items-center",
					"justify-between",
					"cursor-pointer",
					"gap-2",
				]),
				popup: what.both(
					[
						"flex",
						"flex-col",
						"overflow-y-auto",
						"bg-white",
						"focus:outline-hidden",
						"gap-1",
					],
					[
						"border.default",
						"shadow.default",
						"round.default",
						"tone.neutral.light.border",
						"square.xs",
					],
				),
				item: what.both(
					[
						"focus:outline-hidden",
						"flex",
						"items-center",
						"justify-between",
						"gap-2",
						"cursor-pointer",
					],
					[
						"padding.md",
						"round.default",
					],
				),
			}),
			def.rule(
				what.variant({
					disabled: true,
				}),
				{
					base: what.both(
						[
							"cursor-not-allowed",
							"hover:shadow-none",
							"opacity-50",
						],
						[
							"tone.neutral.light.border",
						],
					),
				},
			),
			def.rule(
				what.variant({
					selected: true,
				}),
				{
					item: what.token([
						"tone.neutral.light.bg",
					]),
				},
			),
			def.rule(
				what.variant({
					active: true,
				}),
				{
					item: what.token([
						"tone.neutral.light.bg:hover",
					]),
				},
			),
		],
		defaults: def.defaults({
			size: "md",
			isError: false,
			isLoading: false,
			isSubmitting: false,
			required: false,
			disabled: false,
			selected: false,
			active: false,
		}),
	}),
);

export type SelectCls = typeof SelectCls;

export namespace SelectCls {
	export type Props<P = unknown> = Cls.Props<SelectCls, P>;
}
