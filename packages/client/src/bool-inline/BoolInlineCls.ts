import { cls } from "@use-pico/common";
import { IconCls } from "../icon/IconCls";

export const BoolInlineCls = cls({
	use: IconCls,
	slot: {},
	variant: {
		value: {
			true: "text-green-600",
			false: "text-amber-600",
		},
	},
	defaults: {
		value: false,
	},
});

export namespace BoolInlineCls {
	export type Props<P = unknown> = cls.Props<typeof BoolInlineCls, P>;
}
