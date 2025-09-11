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
		variant: {},
	},
	({ what, def }) => ({
		token: def.token({
			"scrollable.fade.color": what.css([
				"[--fade-color:var(--color-orange-200)]",
			]),
		}),
		rules: [
			def.root({
				root: what.both(
					[
						"relative",
						"isolate",
						"min-h-0",
						"h-full",
						"overflow-hidden",
						"[--fade-solid:12px]",
					],
					[
						"round.lg",
						"scrollable.fade.color",
					],
				),

				viewport: what.css([
					"h-full",
					"overflow-auto",
					"overscroll-contain",
					"z-0",
				]),

				content: what.css([
					"min-h-full",
					"grid",
					"content-center",
					"justify-items-stretch",
				]),

				// horní fade (gradient → plynule do transparent)
				fadeTop: what.css([
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
		],
		defaults: def.defaults({}),
	}),
);

export type ScrollableCls = typeof ScrollableCls;

export namespace ScrollableCls {
	export type Props<P = unknown> = Cls.Props<ScrollableCls, P>;
}
