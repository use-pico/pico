import type { Component, ComponentSlots } from "@use-pico/cls";
import { FormFieldCls } from "../form/FormFieldCls";

export const PopupSelectCls = FormFieldCls.extend(
	{
		tokens: [],
		slot: [
			"content",
		],
		variant: {
			selected: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: {},
		rules: [
			def.root({
				input: what.both(
					[
						"flex",
						"flex-row",
						"gap-2",
						"items-center",
						"cursor-pointer",
						"transition-all",
						"duration-100",
					],
					[
						"tone.neutral.light.bg:hover",
						"tone.neutral.light.border:hover",
						"tone.neutral.light.shadow:hover",
					],
				),
			}),
			def.rule(
				what.variant({
					selected: true,
				}),
				{
					input: what.token([
						"tone.neutral.light.bg",
						"tone.neutral.light.text:hover",
						"tone.neutral.light.bg:hover",
						"tone.neutral.light.text:hover",
					]),
				},
			),
		],
		defaults: def.defaults({
			disabled: false,
			isError: false,
			isLoading: false,
			isSubmitting: false,
			required: false,
			selected: false,
		}),
	}),
);

export type PopupSelectCls = typeof PopupSelectCls;

export namespace PopupSelectCls {
	export type Props<P = unknown> = Component<PopupSelectCls, P>;

	export type Slots = ComponentSlots<PopupSelectCls>;
}
