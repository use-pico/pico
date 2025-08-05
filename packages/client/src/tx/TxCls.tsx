import { type ClsProps, cls } from "@use-pico/cls";

export const TxCls = cls({
	slot: {
		base: [],
	},
	variant: {},
	defaults: {},
});

export namespace TxCls {
	export type Props<P = unknown> = ClsProps<typeof TxCls, P>;
}
