import type { SlotDef } from "../definition/SlotDef";

/**
 * Computes the extended slots by merging current slots with slots from extensions (uses).
 * TSlot represents the current component's slot definition.
 * TUse represents an extension function that may provide additional slots.
 * This type ensures that when a component extends another, all slots from both are available.
 */
export type SlotEx<
	TSlot extends SlotDef<any>,
	TUse extends
		| (() => {
				"~type": {
					slot?: SlotDef<any>;
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
