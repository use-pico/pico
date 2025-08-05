import type { SlotProps } from "../props/SlotProps";

/**
 * Computes the extended slots by merging current slots with slots from extensions (uses).
 * TSlot represents the current component's slot definition.
 * TUse represents an extension function that may provide additional slots.
 * This type ensures that when a component extends another, all slots from both are available.
 */
export type SlotEx<
	TSlot extends SlotProps<any>,
	TUse extends
		| (() => {
				"~type": {
					slot?: SlotProps<any>;
				};
		  })
		| unknown = unknown,
> = TUse extends () => {
	"~type": {
		slot?: infer S;
	};
}
	? TSlot & S
	: TSlot;
