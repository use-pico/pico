import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const ScrollableCls = PicoCls.extend(
	{
		tokens: [
			"scrollable.fade.color",
		],
		slot: [
			"root",
			"viewport",
			"content",
			"fadeTop",
			"fadeBottom",
		],
		variant: {
			layout: [
				"grid",
				"flex",
				"absolute",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({
			"scrollable.fade.color": what.css([
				"[--fade-color:var(--color-slate-300)]",
			]),
		}),
		rules: [
			def.root({
				root: what.both(
					[
						"Scrollable-root",
						"relative",
						"isolate",
						"overflow-hidden",
						"[--fade-solid:12px]",
					],
					[
						"round.lg",
						"scrollable.fade.color",
					],
				),

				viewport: what.css([
					"Scrollable-viewport",
					"overflow-auto",
					"overscroll-y-contain",
					"h-full",
					"min-h-0",
				]),

				content: what.css([
					"Scrollable-content",
					"grid",
					"content-center",
					"justify-items-stretch",
					"min-h-full",
				]),

				fadeTop: what.css([
					"Scrollable-fadeTop",
					"pointer-events-none",
					"absolute",
					"inset-x-0",
					"-top-px",
					"z-10",
					"opacity-0",
					"will-change-[opacity]",
					"bg-[linear-gradient(to_bottom,var(--fade-color),var(--fade-color)_var(--fade-solid),transparent)]",
				]),

				fadeBottom: what.css([
					"Scrollable-fadeBottom",
					"pointer-events-none",
					"absolute",
					"inset-x-0",
					"-bottom-px",
					"z-10",
					"opacity-0",
					"will-change-[opacity]",
					"bg-[linear-gradient(to_top,var(--fade-color),var(--fade-color)_var(--fade-solid),transparent)]",
				]),
			}),

			// ===== Layout variants =====

			def.rule(
				what.variant({
					layout: "grid",
				}),
				{
					root: what.css([
						"min-h-0",
						"h-full",
					]),
				},
			),

			def.rule(
				what.variant({
					layout: "flex",
				}),
				{
					root: what.css([
						"flex-1",
						"min-h-0",
						"h-auto",
					]),
				},
			),

			def.rule(
				what.variant({
					layout: "absolute",
				}),
				{
					root: what.css([
						"absolute",
						"inset-0",
					]),
				},
			),
		],
		defaults: def.defaults({
			layout: "flex",
		}),
	}),
);

export type ScrollableCls = typeof ScrollableCls;
export namespace ScrollableCls {
	export type Props<P = unknown> = Cls.Props<ScrollableCls, P>;
}
