import { cls } from "@use-pico/cls";
import { ActionCls } from "./ActionCls";

export const ActionClickCls = cls({
	use: ActionCls,
	slot: {},
	variant: {
		loading: {
			true: [
				"pointer-events-none",
				"opacity-50",
			],
		},
	},
	defaults: {
		loading: false,
	},
});

export namespace ActionClickCls {
	export type Props<P = unknown> = cls.Props<typeof ActionClickCls, P>;
}
