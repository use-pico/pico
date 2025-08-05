import { type ClsProps, cls } from "@use-pico/cls";
import { ActionCls } from "./ActionCls";

export const ActionModalCls = cls({
	use: ActionCls,
	slot: {},
	variant: {},
	defaults: {},
});

export namespace ActionModalCls {
	export type Props<P = unknown> = ClsProps<typeof ActionModalCls, P>;
}
