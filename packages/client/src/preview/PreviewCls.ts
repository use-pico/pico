import type { Component } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const PreviewCls = PicoCls.extend(
	{
		tokens: {},
		slot: [
			"base",
			"container",
			"title",
			"links",
			"actions",
			"extra",
		],
		variant: {},
	},
	{
		token: {},
		rules: ({ root }) => [
			root({
				base: {
					class: [
						"pico--preview",
						"flex",
						"flex-col",
						"gap-2",
						"bg-(--color-bg)",
						"p-2",
						"rounded-md",
						"border",
						"border-(--color-border)",
					],
				},
				container: {
					class: [
						"flex",
						"flex-row",
						"items-center",
						"justify-between",
						"gap-1",
					],
				},
				title: {
					class: [
						"flex",
						"flex-row",
						"items-center",
						"gap-4",
					],
				},
				links: {
					class: [
						"flex",
						"flex-row",
						"items-center",
						"gap-4",
						"justify-end",
					],
				},
				actions: {
					class: [
						"flex",
						"flex-row",
						"items-center",
						"gap-4",
					],
				},
				extra: {
					class: [
						"flex",
						"flex-row",
						"gap-4",
						"justify-end",
					],
				},
			}),
		],
		defaults: {},
	},
);

export type PreviewCls = typeof PreviewCls;

export namespace PreviewCls {
	export type Props<P = unknown> = Component<PreviewCls, P>;
}
