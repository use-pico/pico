import { css } from "@use-pico/common";

export const PreviewCss = css({
	slot: {
		base: ["bg-blue-50", "p-2", "rounded-md", "border", "border-blue-200"],
		container: ["grid", "grid-cols-2", "grid-rows-2", "gap-1"],
		title: ["col-span-1", "row-span-1", "border-b", "border-b-slate-300", "pb-2"],
		links: ["col-span-1", "row-span-1", "border-b", "border-b-slate-300", "pb-2", "flex", "flex-row", "items-center", "gap-4", "justify-end"],
		actions: ["col-span-1", "row-span-1", "flex", "flex-row", "items-center", "gap-4"],
		extra: ["col-span-1", "row-span-1", "flex", "flex-row", "gap-4", "justify-end"],
	},
	variant: {},
	defaults: {},
});

export namespace PreviewCss {
	export type Props<P = unknown> = css.Props<typeof PreviewCss, P>;
}
