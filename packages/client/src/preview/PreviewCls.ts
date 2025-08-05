import { cls } from "@use-pico/cls";

export const PreviewCls = cls({
	slot: {
		base: [
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
		container: [
			"flex",
			"flex-row",
			"items-center",
			"justify-between",
			"gap-1",
		],
		title: [
			"flex",
			"flex-row",
			"items-center",
			"gap-4",
		],
		links: [
			"flex",
			"flex-row",
			"items-center",
			"gap-4",
			"justify-end",
		],
		actions: [
			"flex",
			"flex-row",
			"items-center",
			"gap-4",
		],
		extra: [
			"flex",
			"flex-row",
			"gap-4",
			"justify-end",
		],
	},
	variant: {},
	defaults: {},
});
export type PreviewCls = typeof PreviewCls;

export namespace PreviewCls {
	export type Props<P = unknown> = cls.Props<PreviewCls, P>;

	export type Slots = cls.Slots<PreviewCls>;
}
