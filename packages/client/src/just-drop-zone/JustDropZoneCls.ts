import { type Component, classes, match, variant } from "@use-pico/cls";

export const JustDropZoneCls = variant({
	slots: [
		"base",
		"label",
		"zone",
	],
	variants: {
		active: [
			"bool",
		],
		rejected: [
			"bool",
		],
	},
	rule: [
		match(undefined, {
			base: classes([
				"flex",
				"flex-col",
				"gap-2",
				"items-center",
				"justify-center",
				"w-full",
			]),
			label: classes([
				"flex",
				"flex-col",
				"items-center",
				"justify-center",
				"w-full",
				"h-64",
				"border-2",
				"border-gray-300",
				"border-dashed",
				"rounded-lg",
				"cursor-pointer",
				"bg-gray-50",
				"hover:bg-gray-100",
			]),
			zone: classes([
				"flex",
				"flex-col",
				"items-center",
				"justify-center",
				"pt-5",
				"pb-6",
				"text-slate-500",
			]),
		}),
		match(
			{
				active: true,
			},
			{
				label: classes([
					"text-blue-400",
				]),
				zone: classes([
					"text-blue-400",
				]),
			},
		),
		match(
			{
				rejected: true,
			},
			{
				label: classes([
					"text-red-400",
				]),
				zone: classes([
					"text-red-400",
				]),
			},
		),
	],
	defaults: {
		active: false,
		rejected: false,
	},
});
export type JustDropZoneCls = typeof JustDropZoneCls;

export namespace JustDropZoneCls {
	export type Props<P = unknown> = Component<JustDropZoneCls, P>;
}
