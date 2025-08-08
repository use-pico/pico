import { type Component, component } from "@use-pico/cls";

export const TxCls = component({
	slots: [
		"base",
	],
	slot: {
		base: {
			class: [],
		},
	},
});

export namespace TxCls {
	export type Props<P = unknown> = Component<typeof TxCls, P>;
}
