import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const LoadingOverlayCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
		],
		variant: {
			show: [
				"bool",
			],
		},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				root: what.both(
					[
						"LoadingOverlay-root",
						"fixed",
						"inset-0",
						"h-full",
						"items-center",
						"justify-center",
						"flex",
						"transition-all",
						"duration-200",
						"z-10",
						"pointer-events-none",
						"bg-opacity-0",
						"backdrop-blur-none",
					],
					[
						"tone.neutral.light.bg",
					],
				),
			}),
			def.rule(
				what.variant({
					show: true,
				}),
				{
					root: what.css([
						"bg-opacity-50",
						"backdrop-blur-xs",
						"pointer-events-auto",
					]),
				},
			),
		],
		defaults: def.defaults({
			show: true,
		}),
	}),
);

export type LoadingOverlayCls = typeof LoadingOverlayCls;

export namespace LoadingOverlayCls {
	export type Props<P = unknown> = Cls.Props<LoadingOverlayCls, P>;
}
