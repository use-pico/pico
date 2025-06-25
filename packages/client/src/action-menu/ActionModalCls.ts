import { cls } from "@use-pico/common";
import { ActionCls } from "./ActionCls";

export const ActionModalCls = cls({
	use: ActionCls,
	slot: {},
	variant: {},
	defaults: {},
});

export namespace ActionModalCls {
	export type Props<P = unknown> = cls.Props<typeof ActionModalCls, P>;
}
