import type { Cls } from "@use-pico/cls";
import { PicoCls } from "../cls/PicoCls";

export const AppLayoutCls = PicoCls.extend(
	{
		tokens: [],
		slot: [
			"root",
			"header",
			"content",
		],
		variant: {},
	},
	({ what, def }) => ({
		token: def.token({}),
		rules: [
			def.root({
				root: what.css([
					"AppLayout-root",
					"min-h-screen",
					"flex",
					"flex-col",
				]),
				header: what.both(
					[
						"AppLayout-header",
						"flex",
						"flex-row",
						"items-center",
						"shadow-xs",
						"border-b",
						"w-full",
						"gap-4",
						"p-4",
					],
					[
						"tone.neutral.light.bg",
						"tone.neutral.light.border",
					],
				),
				content: what.both(
					[
						"AppLayout-content",
						"grow",
						"h-full",
						"border-b",
						"p-2",
					],
					[
						"tone.neutral.light.border",
					],
				),
			}),
		],
		defaults: def.defaults({
			tone: "primary",
			theme: "light",
		}),
	}),
);

export type AppLayoutCls = typeof AppLayoutCls;

export namespace AppLayoutCls {
	export type Props<P = unknown> = Cls.Props<AppLayoutCls, P>;
}
